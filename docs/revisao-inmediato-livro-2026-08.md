# Revisão dos Inmediato contra o livro (22/08/2026)

Até 22/08/2026 os três bancos de espanhol tinham sido escritos **sem a tabela de
conteúdos dos livros**, que não existia em lugar nenhum. Nesse dia o Pedro
digitalizou os três *Libro del Profesor* (tabela + apêndice *Recursos y
Actividades*, com gabarito), e a transcrição integral ficou em
`TABELA DE CONTEÚDOS (for reference)/decoupagem-inmediato-{1,2,3}.md`; a
tabela por lição e os fios que atravessam os três livros estão em
`portal-aluno-fisk/docs/tabelas-de-conteudo.md` (seção "Espanhol"). **É a fonte
obrigatória de qualquer questão de espanhol daqui em diante.**

Esta revisão cruzou os bancos com o livro, lição a lição. Cada lição passou por
um autor e dois revisores independentes (um tentando refutar a resposta única
e o espanhol; outro conferindo estágio, explicação e formato), e o resultado
foi lido pelo Pedro antes de publicar.

## O que entrou

| | antes | depois | tópicos novos |
|---|---|---|---|
| Inmediato 1 | 190 | 298 | 14 |
| Inmediato 2 | 150 | 208 | 5 |
| Inmediato 3 | 160 | 229 | 8 |
| **total** | **500** | **735** | **27** |

**235 questões novas**: 162 nos 27 tópicos que o livro ensina e o banco não
cobria, e 73 de reforço em tópicos que já existiam, onde o apêndice cobra uma
forma que nenhuma questão testava (um irregular da tabela, um marcador, uma
posição de pronome). **120 consertos** em questões que já estavam no ar.

Tópicos novos, na lição em que o livro os apresenta:

- **Inmediato 1**: Tratamientos Formal e Informal (tú / usted) [L1] · Verbos
  Irregulares (-GO) e Números Cardinales (0–100) [L2] · Verbos Irregulares
  (E>I) e La Hora [L3] · La Familia [L4] · Números Ordinales [L5] · Presente de
  Indicativo (querer / preferir) e Números Cardinales (de 100 en adelante) [L6]
  · Dar Direcciones [L7] · Expresiones de Opinión [L8] · Es que / Porque [L9] ·
  Posición de los Pronombres de Complemento Directo e Hacer un Pedido [L10].
- **Inmediato 2**: Muy / Mucho(a)(s) [L1] · El Cuerpo Humano [L4] ·
  Introductores de Condicional (yo que tú...) [L7] · Conmigo / Contigo / Consigo
  [L8] · Posición de los Pronombres con Imperativo [L10].
- **Inmediato 3**: Localizadores (adelante / atrás...) e Pretérito Perfecto de
  Subjuntivo [L2] · Preposiciones (de... a / desde... hasta) [L4] · Contraste
  Condicional Simple y Compuesto [L6] · Preposiciones (ante / bajo / tras) [L7]
  · Usos de "Apenas" [L8] · Conectores [L9] · Perífrasis Verbales (andar / ir +
  gerundio, acabar de...) [L10].

Nenhum tópico foi renomeado nem trocado de lição: o `LESSON_MAP` antigo já
seguia a numeração do livro. Os nomes novos entraram nele e no `topicos.json`.

## O que a auditoria contra o livro encontrou (48 alta, 53 média, 19 baixa)

Três famílias de defeito que só o livro revela, e que valem para qualquer
questão nova:

1. **Conteúdo de lição posterior.** A questão está na lição certa pelo tópico,
   mas a frase usa algo que o aluno ainda não viu: presente contínuo na L1 do
   I1 (`i1m79`), *fueron* e *me gustaron* na L4 (`i1m54`, `i1m56`),
   superlativo (que é I3 L2) cobrado na L4 do I1 (`i1m57`, `i1m99`),
   imperativo de *vosotros* no I1 (`i1f23`, `i1f57`), pluscuamperfecto de
   subjuntivo na L3 do I3 (`i3m38`), condicional de passado na L4 do I3
   (`i3m50`). A escada dos três livros está no `tabelas-de-conteudo.md`.
2. **Sentido que o livro não ensina naquela lição.** As cinco questões de
   *quedar* da L8 do I1 (`i1f28`, `i1f29`, `i1f30`, `i1f73`, `i1f74`) testavam
   *quedar con alguien* (combinar encontro), que é L9; a L8 ensina *quedar
   bien / mal* (roupa). O tópico continuou na L8 e as questões mudaram de
   sentido.
3. **Distrator que um professor aceitaria**, agora com o livro como juiz:
   presente simples onde o enunciado não marcava ação em curso (`i1m68`,
   `i1m69`, `i1m70`, `i1m104`, `i1m105`), *desde* e *hasta* trocáveis sem
   contexto (`i1f12`, `i1f68`), *antes de que* com subjuntivo (`i3f55`,
   `i3f56`), *muy* como superlativo absoluto (`i3m28`, `i3m68`), *hubiera* na
   apódose que o próprio livro aceita (`i3f02`). A saída, como na varredura de
   15/08, foi ancorar o enunciado, não trocar o distrator por forma
   agramatical.

E dois defeitos de montagem: a lacuna de *gustar* sem o pronome (`i1f04`,
`i1f05`: "A mí ___ el chocolate" montava "A mí gusta") e alternativas do tipo
"tanto *se* como *uno* são corretas" (`i3m03`, `i3f20`), que citam outras
alternativas e viram mentira depois do embaralhamento.

## O que os revisores derrubaram

Duas questões propostas não entraram: uma de *Localizadores* no I3 L2 (o
tópico ficou com 5) e uma de *Contraste Condicional Simple y Compuesto* no I3
L6 (a questão tinha as duas formas aceitáveis, como o próprio livro admite).

## Como foi publicado

Os cinco arquivos mudam juntos: `questions/inmediato{1,2,3}.json`,
`index.html` (`LESSON_MAP`) e `topicos.json` (gerado por
`scripts/build-topicos.js`). Depois do commit, o servidor precisa aprender as
questões novas, senão elas são ignoradas em silêncio na correção:

```bash
cd ../fisk-hub-backend && node scripts/build-gabarito.js
# conferir git status dos repositórios-fonte antes de aceitar o rebuild
# clasp push · nova versão · clasp deploy -i na implantação de produção
```

Como os tópicos novos entraram no `topicos.json`, o `DG_V` do módulo de
diagnóstico sobe nos dois consumidores (`portal-aluno-fisk/index.html` e
`fisk-hub/aluno.html`) para o painel "Onde você está" enxergar as lições novas.
