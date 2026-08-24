# fisk-simulador — Quick Practice

Mini simulados de gramática por estágio, para o aluno revisar antes da prova.
Servido pelo GitHub Pages em `pedro-fisk.github.io/fisk-simulador`.
**HTML estático puro, sem build, sem dependências.** Todo o app é o
`index.html`; o conteúdo mora em `questions/<livro>.json`.

O **estado do catálogo e as decisões** (o que existe hoje, por que o espanhol
cresceu, onde mora a régua do diagnóstico, o que falta) estão em
`docs/roadmap-quick-practice.md`. Aqui ficam as convenções e o que é fácil errar.

Chega gente por três portas, e isso muda a tela:

| Como entra | URL | O que muda |
|---|---|---|
| Aluno, pelo Portal | `?raf=&nome=&book=` | nome preenchido e travado; só vê o livro dele e os anteriores da trilha; resultado vai para a nuvem com o RAF |
| Aluno, direto de um vídeo de explicação | `…&topicos=A\|B&licao=5` | já abre no Custom Practice com as caixas marcadas |
| Professor, pelo Fisk Hub | `?modo=professor` | uma questão por vez, para projetar na TV; sem nome, sem timer |

## Como o conteúdo é organizado

Cada JSON tem `midterm` e `final`, e cada questão carrega um `topic`. Quem
transforma tópico em lição é o **`LESSON_MAP`** do `index.html`: `topic → número
da lição (1–10)`. Ele é a fonte de:

- os grupos "Lesson 1", "Lesson 2"… do **Custom Practice**;
- o feedback do resultado ("você pode reforçar: Lesson 7: Gerunds…");
- o alvo do botão **"praticar este ponto"** dos Explanation Videos do Portal.

Um tópico que existe no JSON e não está no `LESSON_MAP` **desaparece** do Custom
Practice sem erro nenhum. O caminho contrário (mapa apontando para tópico sem
questão) some silenciosamente também. Há um script que confere os dois lados no
fim de `portal-aluno-fisk/docs/explanation-videos-quick-practice.md` — rode-o
depois de mexer em tópico.

## A escada dos estágios

```
inglês:   Essentials 1 → Essentials 2 → Transitions 1 → Transitions 2
          → Fluency 1 → Fluency 2 → In Focus
espanhol: Inmediato 1 → Inmediato 2 → Inmediato 3
```

O aluno alcança o estágio dele **e os anteriores da mesma trilha** — nunca os
seguintes, e nunca a outra trilha. Livro sem banco cai na mensagem de "ainda não
está disponível", que é o comportamento certo: não expõe o conteúdo de outro
estágio.

⚠️ **As trilhas teens TÊM Quick Practice desde 15/08/2026** (Teens Connect 1 e 2
e Teens Elementary 2). Três lugares diziam o contrário até 22/08 — este arquivo,
o comentário do `ESCADA_QP` e o roadmap. Quem continua sem banco é a trilha kids,
mais os degraus fantasmas `teensconnect3`, `teensconnect4` e `teenselementary1`,
que existem na escada só para posicionar o aluno e alcançar os anteriores.

## In Focus — o último estágio

O In Focus é o único **sem prova formal** (`soPractice: true`): a avaliação dele
é o simulado MET, que vive em outro repositório. Por isso a tela mostra só dois
cards, **Practice** (sorteia 10 questões entre as 10 lições) e **Custom
Practice** (o aluno escolhe os pontos).

Até 08/2026 o banco do Focus era desenhado em cima do **Study Guide**, a apostila
complementar, e o Custom Practice agrupava por seção do guia ("Conditionals",
"Passive Voice"). Agora ele segue a **tabela de conteúdos do livro do aluno**,
lição por lição, como todos os outros estágios. A tabela do livro:

| Lição | Tema | Gramática | Vocabulário |
|---|---|---|---|
| 1 | Education | Verb tenses — present and past (inclui *used to* × *be/get used to*) | Education word web |
| 2 | Environmental Science | Verb tenses — future; future perfect; future continuous | Compound adjectives |
| 3 | Visual Arts | Emphatic forms: *do/does/did*; reflexive e intensive pronouns; cleft sentences | Visual arts careers |
| 4 | Physical Education | Subjunctive: *wish + were*, *if + were*, adjetivo + *that*, verbo + *that* | Workouts; noun + particle |
| 5 | History | Conditionals: zero, first, second, third e mixed | War and peace |
| 6 | Computer Science | Inversion: *neither/nor/so*; condicional formal (*had/were/should*); palavras negativas; expressões com *only* | Computer tasks; homographs |
| 7 | Social Sciences | Gerunds and infinitives (inclui verbo + objeto + infinitivo e possessivo + gerúndio) | Immigration |
| 8 | Literature | Relative clauses: pronomes, omissão, defining × non-defining, uso especial de *which* | Literary genres; confusing words |
| 9 | Musical Arts | Adjectives: comparações; *the* + comp… *the* + comp; comp + *and* + comp | Music |
| 10 | Biology | Passive voice: estrutura, verbos com dois objetos, agente indefinido | Branches of biology; homophones |

Apêndice do livro: Grammar Files (p. 86), Vocabulary Files (96), List of Phrasal
Verbs (101), Prepositions (103), Self-Study (105).

Os cinco itens de vocabulário que viraram tópico no Quick Practice são os que têm
estrutura testável em múltipla escolha — compound adjectives, nouns + particles,
homographs, confusing words e homophones. Os outros são campos semânticos
(word web, careers, music) e ficaram de fora de propósito.

### O Study Guide não é o livro em outra ordem

O `MET Study Guide` (em `Cadernos-Atividades-Fisk/Focus_Caderno/`) **não** é uma
apostila complementar da gramática do livro: é o mapa do exame. Os 11 capítulos
saíram da classificação, uma a uma, das 100 questões de gramática dos cinco
simulados oficiais do MET, e estão em ordem de **peso na prova**, não de lição:

| # | Capítulo | Questões | Tem lição no livro? |
|---|---|---|---|
| 1 | Connectors | 13 | não |
| 2 | Gerunds & Infinitives | 12 | Lesson 7 |
| 3 | Phrasal Verbs & Prepositions | 11 | só apêndice (p. 101 e 103) |
| 4 | Inversion & Emphasis | 10 | Lessons 3 e 6 |
| 5 | Pronouns & Determiners | 10 | parcial (reflexivos na 3) |
| 6 | Comparatives & Superlatives | 10 | Lesson 9 |
| 7 | Embedded Questions & Word Order | 10 | não |
| 8 | Conditionals & Subjunctive | 7 | Lessons 4 e 5 |
| 9 | Adverbs, Modals & Tags | 7 | não |
| 10 | Tenses | 6 | Lessons 1 e 2 |
| 11 | Relative Clauses & Passive | 4 | Lessons 8 e 10 |

Os quatro capítulos que não têm lição no livro — Connectors (13), Phrasal Verbs
& Prepositions (11), Embedded Questions & Word Order (10) e Adverbs, Modals &
Tags (7), juntos 41 das 100 questões — viraram o bloco **`met`** do
`infocus.json`: 13 tópicos, 65 questões. No Custom Practice eles aparecem num
grupo próprio, **"MET Study Guide"**, depois da Lesson 10.

Por isso o `LESSON_MAP` aceita dois tipos de valor: **número** (lição do livro) e
**texto** (frente própria). `ordenarGrupos()` põe as lições primeiro e as frentes
depois; `rotuloGrupo()` decide entre "Lesson N" e o nome da frente. Chamar esses
capítulos de "Lesson 11" seria mentira — eles não estão no livro.

O bloco `met` entra no `todasQuestoes()`, então o Custom Practice e o feedback o
enxergam. **O card Practice não**: ele lê só `midterm` + `final`, e continua
sorteando apenas o que é conteúdo do livro.

## Phrasal Verbs — o quarto card

Fluency 1 e 2 têm, além de Midterm, Final e Custom, um card **Phrasal Verbs**:
prática dedicada, 10 questões sorteadas. O conteúdo vem da seção Phrasal Verbs
do **Caderno de Atividades** (fonte:
`Cadernos-Atividades-Fisk/Essentials1_Caderno/build.js` → `STAGES.f1/f2.phrasal`),
uma categoria por lição — 79 itens no Fluency 1, 80 no Fluency 2.

Ele mora num terceiro bloco do JSON, `phrasal`, ao lado de `midterm` e `final`:

- **Midterm e Final não enxergam esse bloco** — a prova simulada continua sendo
  só o que cai na prova do livro.
- **Custom Practice enxerga** (`todasQuestoes()`), então cada lição do picker
  mostra a gramática dela e o `Phrasal Verbs – <categoria>` correspondente.
- O card aparece sozinho em qualquer livro que ganhe um bloco `phrasal`: quem
  decide é o JSON, não uma flag no `BOOKS`.

## Convenções de código

- JS moderno mas sem framework e sem bundler, tudo inline no `index.html`.
- O traço dos nomes de tópico é **meia-risca `–`**, não hífen. O Portal compara
  esses nomes **letra por letra**; trocar um caractere quebra o botão de
  praticar sem erro visível.
- Interface em inglês (espanhol nos Inmediato); explicações das questões em
  **português**, sem metalinguagem — o padrão está em toda questão existente:
  "Quando queremos… Portanto, a resposta correta é X."
- Commits e comentários em português.

## O que é fácil errar

- **Alternativa que só é verdade no fim da lista.** As alternativas são
  embaralhadas a cada sessão; "All of the above" vira mentira se cair como A.
  O `PRESA_NO_FIM` prende essas no fim — não escreva alternativa que cite a
  *letra* de outra ("as opções A e C"), porque para essas não há conserto.
- **O índice da resposta é do banco, não da tela.** O servidor corrige contra a
  ordem original; `_origs` é quem traduz o clique do aluno.
- **Todo simulado tem 10 questões** (`MAX_QUESTOES`), inclusive o Custom. Quando
  o aluno marca mais do que isso, o contador avisa ("10 of 37 questions") — se
  algum dia o corte mudar, o contador precisa mudar junto.
- **Nome de tópico é chave.** Renomear um tópico sem atualizar o `LESSON_MAP` e o
  `qp` dos vídeos do Portal derruba o atalho "praticar este ponto".
- **Publicar questão aqui não basta.** Quem corrige é o servidor, pelo
  `Gabarito.js` do `fisk-hub-backend`, que é gerado destes JSONs — e
  `corrigirProva_` ignora **em silêncio** a questão que não está lá. Sem regerar
  e implantar, a tentativa tem total menor do que o aluno respondeu, ele ganha
  menos Fisk Dólares e os tópicos daquelas questões não chegam ao diagnóstico.
  Aconteceu com as 48 questões de espanhol de agosto. Ver
  `docs/roadmap-quick-practice.md`.
- **Distrator que forma frase correta é o defeito mais caro do banco**, e nenhum
  teste automático pega. A pergunta certa em cada revisão é: *um professor
  aceitaria esta alternativa errada como resposta nesta frase?* Duas armadilhas
  recorrentes: alternativas corretas por outra regra que o livro também ensina
  (mixed conditional entrando de distrator num third conditional) e frases sem
  contexto suficiente para excluir o distrator. O contraste clássico que é o
  motivo do exercício existir — "will finish by Friday" contra o future perfect —
  esse fica.
