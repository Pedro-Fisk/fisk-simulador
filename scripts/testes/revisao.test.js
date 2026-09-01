/* Confere a fila da revisão espaçada com histórico sintético. */
global.window = {}; require('../../assets/diagnostico.js');
const D = global.window.FiskDiagnostico;
const DIA = 86400000, HOJE = 1788000000000;
const dias = n => HOJE - n*DIA;

/* mapa mínimo: os tópicos existem na lição 1 do Transitions 1 */
const mapa = { chaveDoNome:{'Transitions 1':'transitions1'},
  escada:{ingles:['essentials1','transitions1']},
  licoes:{ transitions1:{ 'Simple Past':1, 'Tag Questions':2, 'Zero Conditional':3,
                          'Gerunds':4, 'Comparatives':5 } } };
let falhas = 0;
const ok = (nome, cond, extra) => { console.log((cond?'  ok  ':'  ✗   ')+nome+(cond?'':' → '+JSON.stringify(extra))); if(!cond) falhas++; };

const p = (t, tops) => ({ t, book:'Transitions 1', topicos:tops });

/* ── 1. ponto fraco visto ontem: caixa 0, prazo 1 dia, vence hoje ── */
let r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1',
  provas:[ p(dias(1), [{topico:'Simple Past', c:2, q:10}]) ] });
ok('ponto fraco de ontem entra na fila', r.fila.length===1 && r.fila[0].topico==='Simple Past', r.fila);
ok('caixa zera quando errou', r.fila[0] && r.fila[0].caixa===0, r.fila[0]);
ok('a URL leva o topico e o livro na QUERY',
   /\?book=Transitions%201/.test(r.url||'') && /topicos=Simple%20Past/.test(r.url||''), r.url);
/* ⚠️ A IDENTIDADE TEM DE FICAR NO FRAGMENTO. Query string chega ao servidor do
   GitHub Pages e ao Referer; o `nome` e o nome completo de um menor. Este caso
   existe para o proximo que mexer na URL nao devolver o raf para a query sem
   perceber. */
const comAluno = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', aluno:{raf:'1234-567', nome:'Ana Silva'},
  provas:[ p(dias(1), [{topico:'Simple Past', c:2, q:10}]) ] });
const u = comAluno.url || '';
ok('o raf e o nome vao no fragmento, nunca na query',
   /#raf=1234-567&nome=Ana%20Silva$/.test(u) && !/[?&]raf=/.test(u.split('#')[0]) && !/[?&]nome=/.test(u.split('#')[0]),
   u);
ok('sem objeto `aluno`, nao sobra fragmento', !(r.url||'').includes('#'), r.url);
/* ⚠️ COM aluno e RAF VAZIO, o carimbo SAI: as ferramentas usam a presenca do
   `raf` como sinal de "veio do Portal", e e por ele que o botao de voltar leva
   ao Portal do Aluno em vez do Fisk Hub. A Direcao entra com o RAF em branco. */
const semRaf = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', aluno:{raf:'', nome:'Direção'},
  provas:[ p(dias(1), [{topico:'Simple Past', c:2, q:10}]) ] });
ok('a Direcao (RAF vazio) ainda leva o sinal no fragmento',
   /#raf=&nome=/.test(semRaf.url||''), semRaf.url);

/* ── 2. mesmo ponto visto HOJE: nao vence ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1',
  provas:[ p(dias(0), [{topico:'Simple Past', c:2, q:10}]) ] });
ok('o que acabou de ser feito nao volta hoje', r.fila.length===0, r.fila);
ok('e a tela sabe quando ele volta', r.proxima === dias(0)+DIA, r.proxima);

/* ── 3. a caixa sobe com sessao perfeita e o prazo estica ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1',
  provas:[ p(dias(2), [{topico:'Gerunds', c:5, q:5}]),
           p(dias(9), [{topico:'Gerunds', c:4, q:4}]) ] });
ok('duas sessoes perfeitas = caixa 2 (prazo 7 dias)',
   r.acompanhados===1 && r.fila.length===0, {acomp:r.acompanhados, fila:r.fila});
r = D.revisao({ hoje:HOJE+8*DIA, mapa, estagio:'Transitions 1',
  provas:[ p(dias(2), [{topico:'Gerunds', c:5, q:5}]),
           p(dias(9), [{topico:'Gerunds', c:4, q:4}]) ] });
ok('e volta quando o prazo da caixa 2 vence', r.fila.length===1, r.fila);

/* ── 4. um erro derruba a caixa, mesmo com passado perfeito ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1',
  provas:[ p(dias(2), [{topico:'Gerunds', c:4, q:5}]),
           p(dias(9), [{topico:'Gerunds', c:5, q:5}]),
           p(dias(20),[{topico:'Gerunds', c:5, q:5}]) ] });
ok('um erro na ultima sessao volta para a caixa 0', r.fila.length===1 && r.fila[0].caixa===0, r.fila[0]);

/* ── 5. a vaga de manutencao ── */
const perfeito = (nome, d) => p(dias(d), [{topico:nome, c:8, q:8}]);
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', provas:[
  p(dias(3), [{topico:'Simple Past', c:1, q:10}]),
  p(dias(4), [{topico:'Tag Questions', c:2, q:10}]),
  p(dias(5), [{topico:'Zero Conditional', c:3, q:10}]),
  perfeito('Gerunds', 40), perfeito('Gerunds', 60), perfeito('Gerunds', 80),
  perfeito('Gerunds', 100), perfeito('Gerunds', 120)
]});
ok('a fila tem no maximo 3', r.fila.length===3, r.fila.map(i=>i.topico));
ok('duas vagas de fraqueza e uma de manutencao',
   r.fila.filter(i=>i.faixa!=='domina').length===2 && r.fila.filter(i=>i.faixa==='domina').length===1,
   r.fila.map(i=>i.topico+':'+i.faixa));
/* O MAIS ATRASADO primeiro, e nao o pior: o Zero Conditional (30%, parado ha 5
   dias) passa na frente do Simple Past (10%, parado ha 3). Ordenar pela nota
   faria o de 30% nunca chegar a vez enquanto existisse um de 10%. */
ok('o mais atrasado vem primeiro, nao o pior',
   r.fila[0].topico==='Zero Conditional' && r.fila[1].topico==='Tag Questions',
   r.fila.map(i=>i.topico+' atraso '+i.atraso));

/* Empatados no atraso, ai sim o pior primeiro. */
let e = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', provas:[
  p(dias(4), [{topico:'Simple Past', c:1, q:10}]),
  p(dias(4), [{topico:'Tag Questions', c:3, q:10}])
]});
ok('empatados no atraso, o pior primeiro', e.fila[0].topico==='Simple Past',
   e.fila.map(i=>i.topico+' '+i.pct+'%'));
ok('a caixa do dominado parou no teto', r.fila[2].caixa===D.ESCADA_DIAS.length-1, r.fila[2]);

/* ── 6. sem manutencao vencida, as tres vagas vao para a fraqueza ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', provas:[
  p(dias(3), [{topico:'Simple Past', c:1, q:10}]),
  p(dias(4), [{topico:'Tag Questions', c:2, q:10}]),
  p(dias(5), [{topico:'Zero Conditional', c:3, q:10}]),
  p(dias(6), [{topico:'Comparatives', c:2, q:10}])
]});
ok('sem manutencao, tres pontos fracos', r.fila.length===3 && r.fila.every(i=>i.faixa!=='domina'),
   r.fila.map(i=>i.topico+':'+i.faixa));

/* ── 7. ponto sem porta de treino fica de fora ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1',
  provas:[ p(dias(9), [{topico:'Listening · Detalhe', c:1, q:10}]) ] });
ok('habilidade do MET nao entra na fila (nao tem banco por topico)',
   r.fila.length===0 && r.acompanhados===0, r);

/* ── 8. sem historico, sem fila e sem promessa ── */
r = D.revisao({ hoje:HOJE, mapa, estagio:'Transitions 1', provas:[] });
ok('sem historico a fila e vazia e a URL e nula', r.fila.length===0 && r.url===null, r);

/* ── 9. a fila nao mexe no painel: a regua dos 70% segue intacta ── */
ok('a regra de dominar continua 70 com piso 6',
   D.REGRA.domina===70 && D.REGRA.piso===6, D.REGRA);

console.log(falhas ? '\n'+falhas+' caso(s) falharam' : '\ntodos os casos passaram');
process.exit(falhas?1:0);
