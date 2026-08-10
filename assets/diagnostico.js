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

  raiz.FiskDiagnostico = {
    REGRA: REGRA, montar: montar, carregarMapa: carregarMapa,
    estagiosValidos: estagiosValidos, ondeEstuda: ondeEstuda
  };
})(typeof window !== 'undefined' ? window : globalThis);
