# Quick Practice: decisões e roadmap

Este documento é o **estado** da ferramenta e o **porquê** das decisões. Como se
mexe no código, as convenções e as armadilhas de escrita de questão estão no
`CLAUDE.md` da raiz, que continua sendo a primeira leitura de quem vai editar.

## O catálogo hoje (22/08/2026)

**2.109 questões em 10 bancos**, um por estágio (sem contar os três bancos de teens).

| Estágio | Blocos | Total |
|---|---|---|
| Essentials 1 | midterm 80 + final 80 | 160 |
| Essentials 2 | midterm 75 + final 95 | 170 |
| Transitions 1 | midterm 70 + final 95 | 165 |
| Transitions 2 | midterm 65 + final 80 | 145 |
| Fluency 1 | midterm 60 + final 70 + phrasal 79 | 209 |
| Fluency 2 | midterm 65 + final 55 + phrasal 80 | 200 |
| In Focus | midterm 110 + final 150 + met 65 | 325 |
| Inmediato 1 | midterm 160 + final 138 | 298 |
| Inmediato 2 | midterm 102 + final 106 | 208 |
| Inmediato 3 | midterm 109 + final 120 | 229 |

Cada bloco é uma coisa diferente e nem todos entram em todo lugar: `midterm` e
`final` são o que cai na prova do livro e alimentam o card Practice; `phrasal` e
`met` só aparecem no Custom Practice. A regra e o motivo estão no `CLAUDE.md`.

## O espanhol saiu do mínimo (agosto/2026)

⭐ **Em 22/08/2026 os três bancos foram revisados contra o livro** (tabela de
conteúdos e apêndice com gabarito, digitalizados nesse dia): 27 tópicos novos,
235 questões novas e 120 consertos, para **735 questões**. O relato, a lista
dos tópicos e as três famílias de defeito que só o livro revela estão em
`docs/revisao-inmediato-livro-2026-08.md`. O que segue é a história anterior.

As três trilhas de Inmediato somavam **500 questões**. Elas nasceram magras e
cresceram em três rodadas de agosto: seis questões novas de Futuro Simple no
Inmediato 2, a correção de um distrator que era espanhol correto na `i2f03`, e
48 questões novas espalhadas pelos três estágios até **nenhuma lição ficar
abaixo de 15 questões**.

O piso de 15 por lição não é estético. Abaixo disso, um Custom Practice de uma
lição só repete as mesmas questões a cada tentativa, e o aluno decora a
alternativa em vez do ponto gramatical.

O defeito que a `i2f03` tinha é o mais caro do banco e nenhum teste pega:
**distrator que forma frase correta**. A pergunta de revisão é sempre a mesma,
*um professor aceitaria esta alternativa errada nesta frase?*, e ela está
detalhada no `CLAUDE.md`.

## A régua do diagnóstico mora aqui

`assets/diagnostico.js` é o **cálculo** do diagnóstico pedagógico do aluno, e
`topicos.json` é o mapa que diz de que lição do livro é cada ponto. Duas telas
de dois repositórios diferentes consomem os dois:

- **"Meu histórico"**, no Portal do Aluno;
- o **Dossiê do aluno**, no Fisk Hub, que é a mesma pergunta vista pelo professor.

Elas desenham HTML próprio, e só. Se cada uma tivesse a sua cópia da régua, um
dia "domina" viraria 75% de um lado e continuaria 70% do outro, e aluno e
professor passariam a discordar sobre o mesmo aluno.

⚠️ **A URL do módulo leva `DG_V`.** Sem versão, o navegador guarda o script e
segue aplicando a régua antiga por tempo indeterminado. Ao mexer no módulo ou no
mapa, suba o `DG_V` **nos dois consumidores**: `portal-aluno-fisk/index.html` e
`fisk-hub/aluno.html`.

## ⚠️ Publicar questão aqui não basta: o servidor precisa aprender

Este é o erro mais fácil de cometer e o mais difícil de notar, porque **não dá
erro nenhum**.

Quem corrige o Quick Practice é o servidor, pelo `Gabarito.js` do
`fisk-hub-backend`, que é **gerado** a partir destes JSONs. E `corrigirProva_`
ignora em silêncio a questão que não está no gabarito:

```js
const q = banco[id];
if (!q) return;   // questão que não existe no banco é ignorada
```

Então uma questão publicada aqui, mas ausente do gabarito implantado, faz três
coisas ao mesmo tempo, todas invisíveis:

1. o **total** da tentativa fica menor do que o aluno respondeu;
2. ele ganha **menos Fisk Dólares** do que merecia;
3. os **tópicos** daquelas questões não chegam ao diagnóstico.

Aconteceu com as 48 questões de espanhol: elas ficaram no ar por um tempo sem
que o servidor as conhecesse, e só apareceram quando o gabarito foi regerado por
outro motivo, em 12/08/2026 (o servidor foi de 2.020 para 2.074 questões de
prova). **Ao publicar conteúdo aqui, rode e implante junto:**

```bash
cd ../fisk-hub-backend && node scripts/build-gabarito.js
# depois: clasp push, nova versão e clasp deploy -i na implantação de produção
```

Quem publica o Apps Script sou eu, não o Pedro. O procedimento completo está no
`CLAUDE.md` do backend.

## Divisão de papéis com o Treino MET

Decidida em 10/08/2026: **o simulador MET é a prova, o Quick Practice é o
treino.** Cheguei a propor um quinto card "MET Practice" aqui dentro, e o Pedro
apontou que isso duplicaria a outra ferramenta. A proposta morreu.

O conteúdo de exame que o livro não ensina entra como **tópico do Custom
Practice do In Focus** (o bloco `met`, 13 tópicos e 65 questões), nunca como uma
prova imitando a outra. A ponte funciona nos dois sentidos: a tela de resultado
do simulado MET leva o aluno para cá com as caixas do Custom Practice já
marcadas nos pontos em que ele perdeu ponto.

⚠️ Essa ponte casa **nomes de tópico, letra por letra**. Tópico renomeado aqui
sem atualizar o `qp` dos capítulos no banco do MET desaparece do Custom Practice
sem erro nenhum.

## Próximos passos

- **Os teens ganharam banco em 15/08/2026** e foram para a régua da casa em
  22/08 (ver abaixo). Quem segue sem Quick Practice é a trilha **kids**, e essa
  continua sendo a maior lacuna do catálogo.
- **O piso de 15 questões por lição** já vale no espanhol. O inglês não foi
  medido com essa régua; vale conferir estágio por estágio.
- **Nenhum teste automático** cobre o banco. O que existe é o script que confere
  os dois lados do `LESSON_MAP` (no fim de
  `portal-aluno-fisk/docs/explanation-videos-quick-practice.md`), e ele só pega
  tópico órfão, não questão ruim.
