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

const saida = {
  _sobre: 'GERADO por scripts/build-topicos.js — não edite à mão.',
  licoes: LESSON_MAP,
  capitulosMet: capitulos,
  escada: ESCADA,
  chaveDoNome: nomes,
};

const arquivo = path.join(RAIZ, 'topicos.json');
fs.writeFileSync(arquivo, JSON.stringify(saida, null, 1), 'utf8');

const nLivros = Object.keys(LESSON_MAP).length;
const nTopicos = Object.keys(LESSON_MAP).reduce((a, k) => a + Object.keys(LESSON_MAP[k]).length, 0);
console.log('→ topicos.json:', nTopicos, 'tópicos em', nLivros, 'livros ·',
            Object.keys(capitulos).length, 'capítulos do MET ·',
            Object.keys(nomes).length, 'nomes de estágio');
