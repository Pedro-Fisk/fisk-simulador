#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""O MODO OUVIR do Quick Practice (22/09/2026): gera o áudio de cada questão e o índice.

Fase 2 da escuta atravessando o portal (pedido do Pedro). O aluno escolhe, antes
de começar, se faz a prova LENDO ou OUVINDO; ouvindo, a questão rende 30% a mais
de Fisk Dólares (o servidor paga, ver alunoAtividade no fisk-hub-backend).

    audio/qp/<livro>/<id>.mp3     o enunciado FALADO (voz TTS neural)
    questions/escuta.json          { livro: { id: { a: caminho, dica: "(…)" } } }

Como o enunciado vira fala:
  · a lacuna (_____) vira pausa;
  · a dica entre parênteses ("(intend / pretend)", "(long answer)", "(I → ?)")
    NÃO é falada: é instrução, e continua ESCRITA na tela, no campo `dica`;
  · o "A:" / "B:" dos diálogos sai da fala.

Regras do Pedro: voz sempre TTS neural; lenta (-25%) no Essentials e nos teens;
vozes variadas (americanas no inglês, as do programa no espanhol).
O gabarito do servidor (build-gabarito.js) lê o índice para marcar quais
questões TÊM áudio: só elas podem render o bônus.

    python3 scripts/audios-escuta.py            # gera o que falta ou mudou
    python3 scripts/audios-escuta.py --listar   # só a conta
"""
import asyncio, glob, hashlib, json, os, re, subprocess, sys, tempfile
import edge_tts

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDICE = os.path.join(REPO, 'questions', 'escuta.json')
VOZES_EN = ['en-US-AndrewNeural', 'en-US-AriaNeural', 'en-US-GuyNeural', 'en-US-JennyNeural',
            'en-US-ChristopherNeural', 'en-US-EmmaNeural', 'en-US-BrianNeural', 'en-US-AvaNeural']
VOZES_ES = ['es-MX-DaliaNeural', 'es-MX-JorgeNeural', 'es-CO-SalomeNeural',
            'es-US-AlonsoNeural', 'es-ES-ElviraNeural', 'es-ES-AlvaroNeural']
LENTO = '-25%'


def taxa_de(livro):
    return LENTO if livro.startswith(('essentials', 'teens')) else '+0%'


def falavel(texto):
    """(fala, dica): o que a voz diz, e a instrução entre parênteses que fica escrita."""
    t = str(texto).replace('\n', ' ')
    dicas = re.findall(r'\([^()]*\)', t)
    t = re.sub(r'\s*\([^()]*\)', '', t)
    t = re.sub(r'(^|[.!?]\s+|\s)[AB]:\s*', r'\1', t)       # "A: … B: …" sem os rótulos
    t = re.sub(r'_{2,}', ' … ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t, ' '.join(dicas)


def assinatura(texto, voz, taxa):
    return hashlib.sha1((texto + '|' + voz + '|' + taxa).encode('utf-8')).hexdigest()[:16]


def monta():
    tarefas, indice = [], {}
    for f in sorted(glob.glob(os.path.join(REPO, 'questions', '*.json'))):
        livro = os.path.basename(f)[:-5]
        if livro == 'escuta':
            continue
        d = json.load(open(f, encoding='utf-8'))
        es = livro.startswith('inmediato')
        vozes = VOZES_ES if es else VOZES_EN
        pasta = os.path.join(REPO, 'audio', 'qp', livro)
        for bloco in d.values():
            if not isinstance(bloco, dict) or 'questions' not in bloco:
                continue
            for q in bloco['questions']:
                qid, txt = q.get('id'), q.get('question')
                if not qid or not txt:
                    continue
                fala, dica = falavel(txt)
                if len(fala) < 3:
                    continue
                voz = vozes[int(hashlib.md5(qid.encode()).hexdigest(), 16) % len(vozes)]
                arq = qid + '.mp3'
                tarefas.append((pasta, arq, fala, voz, taxa_de(livro)))
                e = {'a': 'audio/qp/' + livro + '/' + arq}
                if dica:
                    e['dica'] = dica
                indice.setdefault(livro, {})[qid] = e
    return tarefas, indice


def manifesto(pasta):
    f = os.path.join(pasta, '.tts.json')
    return json.load(open(f, encoding='utf-8')) if os.path.exists(f) else {}


async def gera(t, tmp, sem):
    pasta, arq, texto, voz, taxa = t
    async with sem:
        cru = os.path.join(tmp, arq + '.cru.mp3')
        await edge_tts.Communicate(texto, voz, rate=taxa).save(cru)
        subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', cru,
                               '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '48k',
                               os.path.join(pasta, arq)])
    return t


def main():
    tarefas, indice = monta()
    mans, falta = {}, []
    for t in tarefas:
        pasta, arq, texto, voz, taxa = t
        if pasta not in mans:
            os.makedirs(pasta, exist_ok=True)
            mans[pasta] = manifesto(pasta)
        if mans[pasta].get(arq) != assinatura(texto, voz, taxa) or not os.path.exists(os.path.join(pasta, arq)):
            falta.append(t)
    print('%d questões com áudio, %d a gerar' % (len(tarefas), len(falta)), flush=True)
    if '--listar' in sys.argv:
        return
    rodada = 0
    with tempfile.TemporaryDirectory() as tmp:
        while falta and rodada < 12:
            rodada += 1

            async def todas():
                sem = asyncio.Semaphore(6)   # dentro do laço: no Python 3.9 o de fora é de outro laço
                return await asyncio.gather(*[gera(t, tmp, sem) for t in falta], return_exceptions=True)
            res = asyncio.run(todas())
            for (pasta, arq, texto, voz, taxa), r in zip(falta, res):
                if not isinstance(r, Exception):
                    mans[pasta][arq] = assinatura(texto, voz, taxa)
            for pasta, m in mans.items():
                json.dump(m, open(os.path.join(pasta, '.tts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
            erros = [r for r in res if isinstance(r, Exception)]
            falta = [t for t, r in zip(falta, res) if isinstance(r, Exception)]
            print('rodada %d: %d recusados%s' % (rodada, len(falta), (' · ' + type(erros[0]).__name__) if erros else ''), flush=True)
    sem_arq = {(t[0], t[1]) for t in falta}
    for livro, qs in indice.items():
        for qid in list(qs):
            if (os.path.join(REPO, 'audio', 'qp', livro), qid + '.mp3') in sem_arq:
                del qs[qid]
    json.dump(indice, open(INDICE, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    print('índice: questions/escuta.json (%d questões)%s' % (sum(len(v) for v in indice.values()),
          ' · ⚠️ %d sem áudio, rode de novo' % len(falta) if falta else ''), flush=True)


if __name__ == '__main__':
    main()
