/* Gera `topicos.json`: de que lição do livro é cada tópico, e de que capítulo
 * do Study Guide é cada tópico do MET.
 *
 * POR QUE ESTE ARQUIVO EXISTE. O painel de diagnóstico (no Portal do Aluno e no
 * Dossiê do professor) precisa dizer "reveja a Lesson 7" ao lado do ponto que o
 * aluno erra. Esse mapa é o LESSON_MAP daqui, e copiá-lo para os outros dois
 * repositórios criaria três fontes para a mesma verdade — exatamente o que já
 * dá dor de cabeça no acoplamento dos nomes de tópico. Então ele é publicado
 * como um arquivo só, servido pelo GitHub Pages junto do resto do simulador.
 *
 * FONTES:
 *   index.html (LESSON_MAP)                          → tópico → lição / frente
 *   ../met-siele-simulador/questions/*.json           → capítulos do MET e a
 *                                                       página no Study Guide
 *
 * RODE ao mexer no LESSON_MAP ou nos capítulos do guia:
 *     node scripts/build-topicos.js
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const METSIM = path.join(RAIZ, '..', 'met-siele-simulador');

/* ── tópico → lição, direto do LESSON_MAP ─────────────────────────────────── */
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const ini = html.indexOf('const LESSON_MAP');
const fim = html.indexOf('\n};', ini);
if (ini < 0 || fim < 0) throw new Error('Não achei o LESSON_MAP no index.html');
const LESSON_MAP = eval('(' + html.slice(ini, fim + 2).replace(/^const LESSON_MAP\s*=\s*/, '') + ')');

/* ── capítulos do MET → página do Study Guide ─────────────────────────────── */
const capitulos = {};
const dirMet = path.join(METSIM, 'questions');
if (fs.existsSync(dirMet)) {
  fs.readdirSync(dirMet).filter(f => f.endsWith('.json')).forEach(f => {
    const d = JSON.parse(fs.readFileSync(path.join(dirMet, f), 'utf8'));
    (d.grammarChapters || []).forEach(c => {
      capitulos[c.topic] = { n: c.n, pagina: c.guidePage, questoesNoMet: c.metQuestions };
    });
  });
}

/* ── a escada dos estágios, para o "incluir estágios anteriores" ──────────── */
const iniE = html.indexOf('const ESCADA_QP');
const fimE = html.indexOf('\n};', iniE);
if (iniE < 0 || fimE < 0) throw new Error('Não achei a ESCADA_QP no index.html');
const ESCADA = eval('(' + html.slice(iniE, fimE + 2).replace(/^const ESCADA_QP\s*=\s*/, '') + ')');

/* ── nome do livro como o aluno o vê ("In Focus") → chave interna ─────────── */
const nomes = {};
const reBooks = /(\w+):\s*\{\s*name:\s*'([^']+)'/g;
let m;
while ((m = reBooks.exec(html))) { if (ESCADA.ingles.concat(ESCADA.espanhol).indexOf(m[1]) >= 0) nomes[m[2]] = m[1]; }

/* ── capítulo do MET → o que praticar no Quick Practice ───────────────────────
   Sem isto, o botão "praticar" de um erro do simulado cairia na home da
   ferramenta. A correspondência é editorial e por isso é escrita à mão: são 11
   linhas, e adivinhar por semelhança de nome mandaria o aluno para o lugar
   errado com cara de acerto. Só entram tópicos que existem no In Focus. */
const PRATICA_MET = {
  'Connectors': ['Connectors – Contrast', 'Connectors – Cause & Result',
                 'Connectors – Purpose & Condition', 'Connectors – Addition & Sequence'],
  'Gerunds & Infinitives': ['Gerunds vs Infinitives', 'Gerunds vs Infinitives – Meaning Change',
                            'Gerunds – Prepositions', 'Verb + Object + Infinitive', 'Possessive + Gerund'],
  'Phrasal Verbs & Prepositions': ['Phrasal Verbs – MET High-Frequency', 'Verb + Preposition',
                                   'Adjective + Preposition'],
  'Inversion & Emphasis': ['Inversion', 'Inversion – Negative Adverbials', 'Inversion – So/Neither',
                           'Inversion – Expressions with Only', 'Emphatic Forms – Do/Does/Did',
                           'Cleft Sentences', 'Cleft Sentences – It Is...That', 'Cleft Sentences – What'],
  'Pronouns & Determiners': ['Reflexive and Intensive Pronouns'],
  'Comparatives & Superlatives': ['Comparatives/Superlatives – Advanced', 'Comparatives – Modification',
                                  'The + Comparative… The + Comparative', 'Comparative + and + Comparative'],
  'Embedded Questions & Word Order': ['Embedded Questions', 'If vs Whether / Wh- + Infinitive',
                                      'Word Order & Parallel Structure'],
  'Conditionals & Subjunctive': ['Zero Conditional', 'First Conditional', 'Second Conditional',
                                 'Third Conditional', 'Mixed Conditionals', 'Conditionals – Unless/As Long As',
                                 'Subjunctive – Wish / If + Were', 'Subjunctive – That-Clauses'],
  'Adverbs, Modals & Tags': ['Adverbs – Almost, Hardly, Still, Yet, Else', 'Modal Perfects',
                             'Tag Questions & Short Answers'],
  'Tenses': ['Present Tenses', 'Present Tenses – State Verbs', 'Past Tenses', 'Past Tenses – While/When',
             'Used To / Be Used To', 'Future Tenses', 'Future Tenses – Future Perfect', 'Future Continuous'],
  'Relative Clauses & Passive': ['Relative Pronouns – Advanced', 'Relative Pronouns – Non-Defining',
                                 'Relative Pronouns – Omission', 'Relative Clauses – Special Use of Which',
                                 'Passive Voice – All Tenses', 'Passive Voice – Modal',
                                 'Passive Voice – Continuous', 'Passive Voice – Reporting Verbs',
                                 'Passive Voice – Two Objects'],
};
/* Confere contra o LESSON_MAP: tópico que não existe mais vira link quebrado. */
Object.keys(PRATICA_MET).forEach(function (cap) {
  PRATICA_MET[cap].forEach(function (t) {
    if (!(t in LESSON_MAP.infocus)) throw new Error('PRATICA_MET aponta para tópico inexistente: ' + t);
  });
});

const saida = {
  _sobre: 'GERADO por scripts/build-topicos.js — não edite à mão.',
  licoes: LESSON_MAP,
  capitulosMet: capitulos,
  escada: ESCADA,
  chaveDoNome: nomes,
  praticaMet: PRATICA_MET,
};

const arquivo = path.join(RAIZ, 'topicos.json');
fs.writeFileSync(arquivo, JSON.stringify(saida, null, 1), 'utf8');

const nLivros = Object.keys(LESSON_MAP).length;
const nTopicos = Object.keys(LESSON_MAP).reduce((a, k) => a + Object.keys(LESSON_MAP[k]).length, 0);
console.log('→ topicos.json:', nTopicos, 'tópicos em', nLivros, 'livros ·',
            Object.keys(capitulos).length, 'capítulos do MET ·',
            Object.keys(nomes).length, 'nomes de estágio');
