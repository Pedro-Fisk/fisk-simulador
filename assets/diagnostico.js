/* Diagnóstico pedagógico do aluno — a REGRA, em um lugar só.
 *
 * Duas telas mostram este diagnóstico: "Meu histórico", no Portal do Aluno, e o
 * Dossiê, no Fisk Hub. As duas desenham HTML próprio (o CSS é bem diferente),
 * mas a régua não pode divergir: se um dia "domina" virar 75% no aluno e
 * continuar 70% no professor, os dois passam a discordar sobre o mesmo aluno.
 * Por isso aqui mora só o CÁLCULO, e cada tela renderiza como quiser.
 *
 * COMO USAR
 *   const mapa = await FiskDiagnostico.carregarMapa();
 *   const d = FiskDiagnostico.montar({ provas, estagio: 'In Focus', mapa });
 *   d.desafios / d.domina / d.progresso / d.semDado / d.comentario
 *
 * DE ONDE VEM O DADO. Cada tentativa que o backend grava traz
 * `topicos: [{topico, c, q}]`, calculado no servidor a partir das respostas —
 * nunca do placar do cliente. É o mesmo dado para o aluno e para o professor.
 */
(function (raiz) {
  'use strict';

  /* A régua, definida pelo Pedro em 10/08/2026.
     O PISO é a parte que mais importa e a que é fácil esquecer: com poucas
     questões respondidas, dizer "você domina" é chute. Errar com confiança é
     pior do que não opinar, então abaixo do piso o tópico vai para "ainda sem
     dado suficiente" em vez de virar elogio ou alarme. */
  var REGRA = {
    domina: 70,     // % de acerto para considerar dominado
    progresso: 40,  // abaixo disso é desafio
    piso: 6         // questões respondidas no tópico antes de opinar
  };

  var URL_MAPA = 'https://pedro-fisk.github.io/fisk-simulador/topicos.json';

  var mapaCache = null;
  function carregarMapa(url) {
    if (mapaCache) return Promise.resolve(mapaCache);
    return fetch(url || URL_MAPA, { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (m) { mapaCache = m; return m; })
      /* Sem o mapa o painel ainda serve: ele perde só o "reveja a Lesson 7". */
      .catch(function () { return null; });
  }

  /* Os estágios que contam. Sem `incluirAnteriores`, só o do aluno; com ele, o
     dele e os de trás na mesma trilha — nunca os de outra trilha, e nunca os da
     frente, que ele ainda não viu. */
  function estagiosValidos(estagio, incluirAnteriores, mapa) {
    if (!estagio) return null;                       // sem estágio: não filtra
    if (!incluirAnteriores) return [estagio];
    if (!mapa || !mapa.escada || !mapa.chaveDoNome) return [estagio];
    var chave = mapa.chaveDoNome[estagio];
    if (!chave) return [estagio];
    var nomePorChave = {};
    Object.keys(mapa.chaveDoNome).forEach(function (nome) { nomePorChave[mapa.chaveDoNome[nome]] = nome; });
    var trilhas = Object.keys(mapa.escada);
    for (var i = 0; i < trilhas.length; i++) {
      var passos = mapa.escada[trilhas[i]];
      var pos = passos.indexOf(chave);
      if (pos >= 0) return passos.slice(0, pos + 1).map(function (k) { return nomePorChave[k]; });
    }
    return [estagio];
  }

  /* Onde o aluno vai reforçar este ponto. É o que responde "e agora?". */
  function ondeEstuda(topico, estagio, mapa) {
    if (!mapa) return null;
    var cap = mapa.capitulosMet && mapa.capitulosMet[topico];
    if (cap) return { tipo: 'capitulo', capitulo: cap.n, pagina: cap.pagina,
                      rotulo: 'Study Guide, p. ' + cap.pagina };
    /* Rótulo de habilidade do simulado ("Listening · Detalhe"): não é ponto de
       gramática, não tem lição. */
    if (topico.indexOf(' · ') > 0) {
      return { tipo: 'habilidade', rotulo: topico.split(' · ')[0] };
    }
    var licoes = mapa.licoes || {};
    var chave = mapa.chaveDoNome && mapa.chaveDoNome[estagio];
    var candidatos = chave && licoes[chave] ? [chave] : Object.keys(licoes);
    for (var i = 0; i < candidatos.length; i++) {
      var v = licoes[candidatos[i]] && licoes[candidatos[i]][topico];
      if (v === undefined) continue;
      if (typeof v === 'number') return { tipo: 'licao', licao: v, rotulo: 'Lesson ' + v };
      return { tipo: 'frente', rotulo: String(v) };
    }
    return null;
  }

  /* Para onde mandar o aluno praticar este ponto. É o que transforma o painel
     de retrato em plano de ação.
       · ponto do Quick Practice        → abre o Custom Practice já marcado nele
       · capítulo do MET                → abre os tópicos equivalentes do QP
                                          (mapa editorial, no topicos.json)
       · rótulo de habilidade do MET    → não há treino por tópico: vai para o
         ("Listening · Detalhe")          simulado, onde ele treina a seção */
  var URL_QP  = 'https://pedro-fisk.github.io/fisk-simulador/';
  var URL_MET = 'https://pedro-fisk.github.io/met-siele-simulador/';

  /* A porta do Quick Practice, num lugar so: o botao de UM ponto (aqui embaixo)
     e a fila de revisao (mais abaixo) abrem a mesma tela, e montar a URL duas
     vezes e o jeito conhecido de um dos dois parar de levar o RAF junto. */
  function urlQp(topicos, estagio, aluno) {
    var ident = '';
    if (aluno && aluno.raf) {
      ident = '&raf=' + encodeURIComponent(aluno.raf) +
              '&nome=' + encodeURIComponent(aluno.nome || '');
    }
    return URL_QP + '?book=' + encodeURIComponent(estagio) +
           '&topicos=' + encodeURIComponent(topicos.join('|')) + ident;
  }

  function praticar(ponto, estagio, mapa, aluno) {
    if (!mapa) return null;
    var ident = '';
    if (aluno && aluno.raf) {
      ident = '&raf=' + encodeURIComponent(aluno.raf) +
              '&nome=' + encodeURIComponent(aluno.nome || '');
    }
    var topico = ponto.topico;
    var chave = mapa.chaveDoNome && mapa.chaveDoNome[estagio];
    var doLivro = chave && mapa.licoes && mapa.licoes[chave] && (topico in mapa.licoes[chave]);

    if (doLivro) {
      return { onde: 'qp', rotulo: 'Praticar', topicos: [topico],
               url: urlQp([topico], estagio, aluno) };
    }
    var equivalentes = mapa.praticaMet && mapa.praticaMet[topico];
    if (equivalentes && equivalentes.length && chave) {
      /* Só manda o que o estágio realmente tem, senão o Quick Practice abre
         com caixas que não existem e o aluno vê uma lista vazia. */
      var validos = equivalentes.filter(function (t) { return t in mapa.licoes[chave]; });
      if (validos.length) {
        return { onde: 'qp', rotulo: 'Praticar', topicos: validos,
                 url: urlQp(validos, estagio, aluno) };
      }
    }
    if (topico.indexOf('Listening · ') === 0 || topico.indexOf('Reading · ') === 0) {
      return { onde: 'met', rotulo: 'Treinar no MET', url: URL_MET + '?' + ident.slice(1) };
    }
    return null;
  }

  function faixaDe(pct, q) {
    if (q < REGRA.piso) return 'pouco';
    if (pct >= REGRA.domina) return 'domina';
    if (pct >= REGRA.progresso) return 'progresso';
    return 'desafio';
  }

  function montar(op) {
    op = op || {};
    var provas = op.provas || [];
    var mapa = op.mapa || null;
    var estagio = op.estagio || '';
    var validos = estagiosValidos(estagio, !!op.incluirAnteriores, mapa);

    var usadas = provas.filter(function (p) {
      if (!p || !p.topicos || !p.topicos.length) return false;
      if (!validos) return true;
      /* Tentativa sem `book` é antiga (gravada antes do estágio viajar junto).
         Fica de fora do recorte por estágio em vez de poluir o retrato. */
      return validos.indexOf(p.book) >= 0;
    });

    var acc = {};
    usadas.forEach(function (p) {
      p.topicos.forEach(function (t) {
        var nome = t.topico || '—';
        var a = acc[nome] || (acc[nome] = { topico: nome, c: 0, q: 0, tentativas: 0 });
        a.c += Number(t.c) || 0;
        a.q += Number(t.q) || 0;
        a.tentativas++;
      });
    });

    var pontos = Object.keys(acc).map(function (k) {
      var a = acc[k];
      a.pct = a.q ? Math.round(a.c / a.q * 100) : 0;
      a.faixa = faixaDe(a.pct, a.q);
      a.onde = ondeEstuda(a.topico, estagio, mapa);
      /* Só nos pontos que precisam de trabalho: pendurar "praticar" no que ele
         já domina convida a gastar tempo onde não falta. */
      a.praticar = (a.faixa === 'desafio' || a.faixa === 'progresso')
        ? praticar(a, estagio, mapa, op.aluno) : null;
      return a;
    });

    /* Pior primeiro dentro de cada faixa: o painel é para agir, e o que dói
       mais tem de aparecer em cima. */
    pontos.sort(function (x, y) { return x.pct - y.pct || y.q - x.q; });

    var por = function (f) { return pontos.filter(function (p) { return p.faixa === f; }); };
    var desafios = por('desafio'), progresso = por('progresso');
    var domina = por('domina').slice().reverse();     // melhor primeiro
    var semDado = por('pouco');

    var somaQ = 0, somaC = 0;
    pontos.forEach(function (p) { somaQ += p.q; somaC += p.c; });

    return {
      estagio: estagio,
      incluirAnteriores: !!op.incluirAnteriores,
      estagiosConsiderados: validos,
      tentativas: usadas.length,
      total: { c: somaC, q: somaQ, pct: somaQ ? Math.round(somaC / somaQ * 100) : 0 },
      pontos: pontos, desafios: desafios, progresso: progresso,
      domina: domina, semDado: semDado,
      regra: REGRA,
      comentario: comentario(desafios, progresso, domina, semDado, usadas.length)
    };
  }

  function lista(ps, n) {
    return ps.slice(0, n || 3).map(function (p) { return p.topico; }).join(', ');
  }

  /* O texto que o Pedro pediu: "você parece dominar isto, e ainda tem desafio
     naquilo". Fala do que há, e cala sobre o que não há — prometer diagnóstico
     sem dado é o jeito mais rápido de a plataforma perder crédito. */
  function comentario(desafios, progresso, domina, semDado, tentativas) {
    if (!tentativas) {
      return 'Assim que você fizer alguns exercícios, aparece aqui um retrato dos seus pontos fortes e do que ainda precisa treinar.';
    }
    var partes = [];
    if (domina.length) {
      partes.push('Você já demonstra domínio em ' + lista(domina) +
                  (domina.length > 3 ? ' e mais ' + (domina.length - 3) + '.' : '.'));
    }
    if (desafios.length) {
      partes.push('O seu desafio agora está em ' + lista(desafios) +
                  (desafios.length > 3 ? ' e mais ' + (desafios.length - 3) + '.' : '.'));
    } else if (progresso.length) {
      partes.push('Está quase lá em ' + lista(progresso) + ' — falta firmar.');
    }
    if (!domina.length && !desafios.length && !progresso.length) {
      partes.push('Ainda são poucos exercícios para dizer onde você está firme. Continue praticando que o retrato aparece.');
    } else if (semDado.length) {
      partes.push('Outros ' + semDado.length + (semDado.length > 1 ? ' pontos ainda têm' : ' ponto ainda tem') +
                  ' poucos exercícios para avaliar.');
    }
    return partes.join(' ');
  }

  /* ══ REVISÃO ESPAÇADA ═════════════════════════════════════════════════════
   * O painel de diagnóstico responde "onde eu estou". Esta função responde
   * "o que eu faço HOJE" — a fila do dia, de três pontos, que vira uma sessão
   * de dez questões no Quick Practice.
   *
   * POR QUE MORA AQUI, e não no Portal. Pela mesma razão que a régua dos 70%:
   * um dia o Dossiê do professor vai querer dizer "este aluno tem quatro
   * pontos vencidos", e duas implementações discordariam sobre o mesmo aluno.
   * O Portal desenha; a decisão de o que entra na fila é daqui.
   *
   * ⚠️ É REVISÃO POR PONTO, NÃO POR QUESTÃO, e a diferença é honesta. Um SM-2
   * de verdade agenda cada CARTÃO, e para isso seria preciso guardar por
   * questão o que o aluno respondeu e quando. O que existe hoje na nuvem é a
   * tentativa com `topicos: [{topico, c, q}]` e um carimbo de tempo — que dá
   * para agendar o PONTO GRAMATICAL. Prometer mais do que o dado sustenta é o
   * jeito rápido de a plataforma perder crédito.
   *
   * A CAIXA É LEITNER, e de propósito ela NÃO usa os 70%. Os 70% são a régua
   * de "domina", que é um retrato da vida inteira do aluno naquele ponto; a
   * caixa é outra pergunta — "das últimas vezes, ele acertou tudo?". Uma
   * sessão sem nenhum erro no ponto sobe uma caixa; um erro derruba para a
   * primeira. É o mecanismo clássico, e é o que faz o ponto voltar mais raro
   * conforme firma, em vez de voltar para sempre porque um dia foi mal.
   *
   *     caixa      0     1     2     3     4
   *     volta em   1d    3d    7d   16d   35d
   *
   * A FILA GUARDA UMA VAGA PARA MANUTENÇÃO. Duas vagas para o que está fraco
   * e uma para um ponto já dominado que venceu — porque revisão espaçada
   * serve para NÃO PERDER o que se sabe, e uma fila só de fraqueza vira lista
   * de deveres, não revisão.
   *
   * SÓ ENTRA PONTO COM PORTA DE TREINO no estágio do aluno (`praticar` do tipo
   * `qp`). A fila promete "dez questões agora": ponto sem banco no Quick
   * Practice não tem como cumprir a promessa. Ficam de fora, por isso, as
   * habilidades do MET ("Listening · Detalhe"), que não têm treino por tópico.
   *
   * NÃO HÁ ESTADO GUARDADO. A fila se esvazia sozinha: fazer a sessão grava
   * uma tentativa nova na nuvem, com a data de hoje, e no próximo login
   * aqueles pontos deixaram de estar vencidos. Um `localStorage` de "já fiz
   * hoje" mentiria em outro aparelho e teria de ser sincronizado.
   */
  var ESCADA_DIAS = [1, 3, 7, 16, 35];
  var DIA = 86400000;

  /* Em que caixa este ponto está, e quando foi a última vez que ele apareceu.
     Anda da tentativa mais nova para trás enquanto o aluno acertou TUDO do
     ponto naquela sessão; o primeiro tropeço encerra a contagem. */
  function caixaDe(provas, topico) {
    var toques = [];
    provas.forEach(function (p) {
      (p.topicos || []).forEach(function (t) {
        if ((t.topico || '—') !== topico) return;
        toques.push({ t: Number(p.t) || 0, c: Number(t.c) || 0, q: Number(t.q) || 0 });
      });
    });
    toques.sort(function (a, b) { return b.t - a.t; });
    var caixa = 0;
    for (var i = 0; i < toques.length && caixa < ESCADA_DIAS.length - 1; i++) {
      if (toques[i].q > 0 && toques[i].c === toques[i].q) caixa++;
      else break;
    }
    return { caixa: caixa, ultimo: toques.length ? toques[0].t : 0, sessoes: toques.length };
  }

  var PESO = { desafio: 0, pouco: 1, progresso: 2, domina: 3 };

  function revisao(op) {
    op = op || {};
    var hoje = op.hoje || Date.now();
    var max = op.maxTopicos || 3;
    var estagio = op.estagio || '';
    var mapa = op.mapa || null;
    var provas = op.provas || [];

    /* A fila SEMPRE olha os estágios anteriores, e isso não é uma escolha de
       tela: revisar é justamente voltar. O recorte "só o meu estágio" existe
       no painel porque lá a pergunta é outra (onde estou HOJE). */
    var d = montar({ provas: provas, mapa: mapa, estagio: estagio,
                     incluirAnteriores: true, aluno: op.aluno });

    var itens = [];
    d.pontos.forEach(function (p) {
      var pr = praticar(p, estagio, mapa, op.aluno);
      if (!pr || pr.onde !== 'qp') return;
      var cx = caixaDe(provas, p.topico);
      if (!cx.ultimo) return;
      var prazo = ESCADA_DIAS[Math.min(cx.caixa, ESCADA_DIAS.length - 1)];
      var dias = Math.floor((hoje - cx.ultimo) / DIA);
      itens.push({ topico: p.topico, pct: p.pct, c: p.c, q: p.q, faixa: p.faixa,
                   caixa: cx.caixa, sessoes: cx.sessoes, ultimo: cx.ultimo,
                   dias: dias, prazo: prazo, atraso: dias - prazo,
                   vence: cx.ultimo + prazo * DIA, praticar: pr });
    });

    var vencidos = itens.filter(function (i) { return i.atraso >= 0; });
    /* ⚠️ A ORDEM AQUI NÃO É A DO PAINEL, e a diferença é deliberada. O painel
       põe o pior em cima, porque a pergunta lá é "onde eu estou". A fila põe o
       MAIS ATRASADO em cima dentro de cada faixa, porque a pergunta aqui é
       "o que está vencendo": ordenar só pela nota faz o ponto de 35% nunca
       chegar à vez enquanto existir um de 10%, e o de 35% apodrece. Dentro do
       mesmo atraso, aí sim o pior primeiro. */
    var ordem = function (a, b) {
      return (PESO[a.faixa] - PESO[b.faixa]) || (b.atraso - a.atraso) || (a.pct - b.pct);
    };
    var fracos = vencidos.filter(function (i) { return i.faixa !== 'domina'; }).sort(ordem);
    var manut  = vencidos.filter(function (i) { return i.faixa === 'domina'; })
                         .sort(function (a, b) { return b.atraso - a.atraso; });

    var fila = fracos.slice(0, manut.length && max > 1 ? max - 1 : max);
    fila = fila.concat(manut.slice(0, Math.max(0, max - fila.length)));

    /* Quando a próxima vence, para a tela poder dizer "volta amanhã" em vez de
       só "nada hoje" — o aluno precisa saber que a fila não morreu. */
    var proxima = null;
    itens.forEach(function (i) {
      if (i.atraso >= 0) return;
      if (proxima === null || i.vence < proxima) proxima = i.vence;
    });

    return {
      fila: fila, vencidos: vencidos.length, acompanhados: itens.length,
      proxima: proxima, escada: ESCADA_DIAS, max: max,
      url: fila.length ? urlQp(fila.map(function (i) { return i.topico; }), estagio, op.aluno) : null
    };
  }

  raiz.FiskDiagnostico = {
    REGRA: REGRA, ESCADA_DIAS: ESCADA_DIAS,
    montar: montar, revisao: revisao, carregarMapa: carregarMapa,
    estagiosValidos: estagiosValidos, ondeEstuda: ondeEstuda, praticar: praticar
  };
})(typeof window !== 'undefined' ? window : globalThis);
