# Teens (Elementary 2, Connect 1, Connect 2) — 288 questões revisadas (48 em `teenselementary2.json`, 120 em `teensconnect1.json`, 120 em `teensconnect2.json`)

## ALTA (aluno erra questão certa, ou aprende errado)

### `tc1m38` (teensconnect1.json, midterm) — duas respostas corretas
- **Enunciado:** `Choose the correct question for this answer: "Mom is in the kitchen."`
- **Alternativas:** `['Who is in the kitchen?', 'Where is Mom?', 'What is Mom?', 'How old is Mom?']` correct=1 → `"Where is Mom?"`
- **Problema:** "Who is in the kitchen?" tem como resposta natural exatamente a frase dada, palavra por palavra: "Mom is in the kitchen." As duas alternativas são perguntas corretas para a mesma resposta, e o aluno que raciocina bem erra.
- **Correção sugerida:** trocar o distrator por um que não sirva de pergunta para essa resposta.
  - Alternativas: `['Where is the kitchen?', 'Where is Mom?', 'What is Mom?', 'How old is Mom?']` correct=1
  - Explicação: `"A resposta diz o lugar onde a mãe está: na cozinha. A pergunta sobre lugar usa 'Where'. Cuidado: 'Where is the kitchen?' pergunta o lugar da cozinha, e não onde a mãe está. Portanto, a resposta correta é 'WHERE is Mom?'"`

### `tc2f13` (teensconnect2.json, final) — duas respostas corretas (falta marca de passado)
- **Enunciado:** `The lions _____ resting in the cave.`
- **Alternativas:** `['were', 'was', 'are', 'did']` correct=0 → `"were"`
- **Problema:** a frase não tem nenhuma marca de tempo. "The lions **are** resting in the cave." é inglês perfeito (present continuous) e qualquer professor aceitaria. O item só funciona se o passado estiver ancorado no enunciado.
- **Correção sugerida:**
  - Enunciado: `The lions _____ resting in the cave when we arrived.`
  - Explicação: `"O Past Continuous usa 'was' ou 'were' + verbo com '-ing'. O 'when we arrived' mostra que tudo aconteceu no passado, e 'the lions' é plural, ou seja, 'they', que pede 'were'. Portanto, a resposta correta é 'The lions WERE resting in the cave when we arrived.'"`

### `tc2f37` (teensconnect2.json, final) — duas respostas corretas (falta marca de passado)
- **Enunciado:** `_____ a woman at the corner.`
- **Alternativas:** `['There was', 'There were', 'There is', 'There are']` correct=0 → `"There was"`
- **Problema:** sem referência de tempo, "**There is** a woman at the corner." é uma frase correta e comum. O par tc2f38 ("_____ four cars on the street.") escapa por acidente, porque lá o `There are` não foi oferecido; aqui foi.
- **Correção sugerida:**
  - Enunciado: `_____ a woman at the corner yesterday.`
  - Explicação: `"Quando falamos que existia UMA coisa ou pessoa no passado, usamos 'there was'. O 'yesterday' mostra que é passado, e 'a woman' é uma pessoa só. Portanto, a resposta correta é 'THERE WAS a woman at the corner yesterday.'"`

## MÉDIA (confunde ou irrita, mas não invalida)

### `tc2f14` (teensconnect2.json, final) — distrator defensável (mesma família do tc2f13)
- **Enunciado:** `Bob _____ walking his dog at 8 a.m.`
- **Alternativas:** `['were', 'was', 'is', 'did']` correct=1 → `"was"`
- **Problema:** "Bob **is** walking his dog at 8 a.m." é aceitável como compromisso marcado (present continuous com valor de futuro). Não é tão redondo quanto o tc2f13, mas o item continua sem nenhuma âncora de passado.
- **Correção sugerida:**
  - Enunciado: `Bob _____ walking his dog at 8 a.m. yesterday.`
  - Explicação: `"No Past Continuous, usamos 'was' para 'he', 'she' e 'it'. Bob é 'he', e o 'yesterday' mostra que a ação estava acontecendo no passado. Portanto, a resposta correta é 'Bob WAS walking his dog at 8 a.m. yesterday.'"`

### `tc2m13` (teensconnect2.json, midterm) — distrator que forma frase correta
- **Enunciado:** `Would you like juice _____ soda?`
- **Alternativas:** `['or', 'and', 'but', 'so']` correct=0 → `"or"`
- **Problema:** "Would you like juice **and** soda?" é inglês perfeitamente correto — é só um oferecimento das duas coisas juntas, como "Would you like cake and coffee?". Nada no enunciado obriga a leitura de escolha, que é justamente o que a explicação afirma.
- **Correção sugerida:** fechar a leitura com a resposta do diálogo, no formato de travessão que o arquivo já usa.
  - Enunciado: `Would you like juice _____ soda? — Juice, please.`
  - Explicação: `"Quando oferecemos uma escolha entre duas opções, usamos 'or'. A resposta mostra que a pessoa escolheu só uma das duas: suco. Portanto, a resposta correta é 'juice OR soda'."`

### `tc1m50` (teensconnect1.json, midterm) — distrator repete a palavra da lacuna
- **Enunciado:** `The flag is green and yellow. It is a _____ flag.`
- **Alternativas:** `['flag colorful', 'colorful', 'colorfuls', 'color']` correct=1 → `"colorful"`
- **Problema:** montada na lacuna, a alternativa `flag colorful` produz "It is a **flag colorful flag**." O substantivo aparece duas vezes e o aluno não consegue ler o distrator como uma frase possível — é o mesmo defeito de palavra sobrando que os alunos já relataram, só que dentro de uma alternativa errada. O item deixa de testar posição do adjetivo e vira caça ao absurdo.
- **Correção sugerida:** tirar o substantivo do enunciado e passá-lo para as alternativas.
  - Enunciado: `The flag is green and yellow. It is a _____.`
  - Alternativas: `['colorful flag', 'flag colorful', 'colorfuls flag', 'color flag']` correct=0
  - Explicação: `"Em inglês, o adjetivo vem ANTES da palavra que ele descreve: 'a colorful flag', e não 'a flag colorful'. E o adjetivo nunca ganha 's'. Portanto, a resposta correta é 'It is a COLORFUL FLAG.'"`

### `tc1m16` (teensconnect1.json, midterm) — alternativa que não é palavra
- **Enunciado:** `My mom is _____ architect.`
- **Alternativas:** `['a', 'an', 'the', '–']` correct=1 → `"an"`
- **Problema:** a quarta alternativa é um traço solto. Embaralhada no meio das outras, ela parece defeito de formatação, e um aluno de 11-12 anos não tem como saber que o traço significa "nenhum artigo" — convenção de livro de gramática adulto que nunca é explicada na tela.
- **Correção sugerida:** manter enunciado e explicação, trocando só a alternativa.
  - Alternativas: `['a', 'an', 'the', 'any']` correct=1

### `tc2m30` (teensconnect2.json, midterm) — explicação enfraquece o gabarito
- **Enunciado:** `Choose the correct sentence:`
- **Alternativas:** `['That is the bike of Karen.', "That is Karen's bike.", 'That is Karens bike.', "That is Karen bike's."]` correct=1 → `"That is Karen's bike."`
- **Problema:** o comando manda escolher a frase **correta**, mas a explicação diz que "preferimos o apóstrofo". O aluno que marcou "the bike of Karen" sai da questão achando que a resposta dele também estava certa, só que menos usada — e leva esse "of" para as próximas.
- **Correção sugerida (explicação):** `"Com pessoas, o inglês marca o dono com apóstrofo + 's' logo depois do nome: Karen's bike. A construção 'the bike of Karen' não é usada com pessoas, e o apóstrofo vai no dono, nunca na coisa. Portanto, a resposta correta é 'That is KAREN'S bike.'"`

## BAIXA (cosmético)

### `tc2m02` (teensconnect2.json, midterm) — espaço duplo e formato de diálogo fora do padrão
- **Enunciado:** `A: Can you play the piano?  B: No, I _____.`
- **Alternativas:** `["don't", 'not', "can't", 'can']` correct=2 → `"can't"`
- **Problema:** há dois espaços entre `?` e `B:`, e este é o único dos 15 diálogos do arquivo com o formato "A:/B:" — os outros 14 usam travessão (`Does she like pizza? — No, she _____.`).
- **Correção sugerida (enunciado):** `Can you play the piano? — No, I _____.`

### `tc1f47` (teensconnect1.json, final) — comando depois da frase
- **Enunciado:** `"_____, snakes are not good pets for children." Choose the option that gives an OPINION:`
- **Alternativas:** `['In my opinion', 'Where', 'There are', 'How many']` correct=0 → `"In my opinion"`
- **Problema:** é o único item dos três bancos em que o comando vem **depois** da frase; o aluno lê a lacuna antes de saber o que precisa fazer.
- **Correção sugerida (enunciado):** `Choose the option that gives an OPINION: "_____, snakes are not good pets for children."`

### `tc1m58` (teensconnect1.json, midterm) — tópico não bate com o que a questão cobra
- **Enunciado:** `The tennis class is _____ Monday _____ Friday.`
- **Alternativas:** `['from / to', 'in / on', 'on / in', 'to / from']` correct=0 → `"from / to"`
- **Problema:** a questão está marcada como `Prepositions: In / On (Time)`, mas o que ela testa é `from… to…`. No Custom Practice, o aluno que marca a caixa de in/on cai numa estrutura que não é a que ele quis praticar (e sobra só duas questões de fato de in/on na Lesson 5).
- **Correção sugerida:** manter o tópico e trocar o item por um de in/on de verdade (o `from… to…` não tem tópico próprio no LESSON_MAP e não vale criar um para uma questão).
  - Enunciado: `My English class is _____ Tuesdays, and my birthday is _____ September.`
  - Alternativas: `['on / in', 'in / on', 'at / on', 'on / at']` correct=0
  - Explicação: `"Com dias da semana usamos 'on' (on Tuesdays) e com meses usamos 'in' (in September). Portanto, a resposta correta é 'ON Tuesdays… IN September'."`

## Repetitividade dos enunciados genéricos

Conta só os enunciados **nus**, aqueles em que a tela não mostra nada além do comando (o conteúdo todo está nas alternativas). "Find the mistake: …" e "Choose the correct question for this answer: …" ficaram de fora da conta porque trazem a frase no próprio enunciado — o aluno vê texto diferente a cada vez.

| Arquivo | Bloco | Enunciado genérico | Vezes | Risco (P de cair ≥2 na mesma sessão de 10) |
|---|---|---|---|---|
| teenselementary2 | midterm | — nenhum — | 0 | nulo |
| teenselementary2 | final | — nenhum — | 0 | nulo |
| teensconnect1 | midterm | `Find the correct question:` | 3 | 7% |
| teensconnect1 | midterm | `Choose the correct sentence:` | 2 | 3% |
| teensconnect1 | midterm | `Choose the NEGATIVE sentence:` | 1 | — |
| teensconnect1 | midterm | **total de enunciados nus** | **6 / 60** | **26%** de ver dois comandos idênticos ou quase |
| teensconnect1 | final | `Choose the NEGATIVE sentence:` / `Choose the correct sentence:` / `Find the correct question:` / `Choose the correct question:` | 1 cada | baixo |
| teensconnect1 | final | **total de enunciados nus** | **4 / 60** | **13%** |
| teensconnect2 | midterm | `Choose the correct sentence:` | 4 | 13% |
| teensconnect2 | midterm | `Which sentence is WRONG?` | 3 | 7% |
| teensconnect2 | midterm | `Choose the correct question:` | 1 | — |
| teensconnect2 | midterm | **total de enunciados nus** | **8 / 60** | **40%** |
| teensconnect2 | final | `Which sentence is WRONG?` | 5 | **19%** — o pior caso do banco |
| teensconnect2 | final | **total de enunciados nus** | **5 / 60** | **19%** |

Leitura: o problema real é o **`Which sentence is WRONG?` do final do Connect 2** — cinco questões com o enunciado literalmente idêntico, uma em cada cinco sessões mostrando duas delas ("já não respondi essa?"). O `Choose the correct sentence:` do midterm do Connect 2 (quatro) vem logo atrás. Nos dois casos a saída é barata: personalizar o comando com o ponto testado, sem mexer nas alternativas — `Which sentence is WRONG? (simple present)`, `Which sentence is WRONG? (was / were)`, `Which sentence is WRONG? (plural)`, `Choose the correct sentence about ability:`, `Choose the correct sentence about advice:` e assim por diante. Isso também ajuda o aluno a saber o que está sendo cobrado. O Connect 1 está no limite do aceitável e o Elementary 2 não tem o problema: lá todo enunciado carrega contexto.

## Observações gerais

1. **O Elementary 2 passou limpo.** As 48 questões estão consistentes: toda frase com lacuna monta corretamente com o gabarito, todo item de passado tem marca de tempo (`yesterday`, `last Monday`, `when I was a kid`, `when I fell`), nenhuma alternativa cita a letra de outra e as explicações seguem o padrão "Quando queremos… Portanto, a resposta correta é X". Se o livro vai ser descontinuado, este banco não é motivo de atraso.

2. **O defeito sistêmico dos três arquivos é o item de passado sem âncora de tempo.** Os três achados de gravidade ALTA/MÉDIA de duas respostas (tc2f13, tc2f37, tc2f14) são a mesma coisa: frase de Past Continuous ou There was/were sem `yesterday`, `last night`, `when…`. Rodei a checagem em todas as 27 questões dos três bancos que misturam presente e passado do verbo *be* nas alternativas e essas três são as únicas descobertas — as outras 24 trazem a marca de tempo. Vale virar regra de escrita: **item de passado nasce com a expressão de tempo dentro do enunciado**, mesmo quando parece redundante.

3. **Montagem da frase com o gabarito: nenhum caso de palavra sobrando ou faltando.** Verifiquei uma a uma, substituindo a alternativa correta na lacuna, nas 288 questões. Nenhum "It will rain rain", nenhuma resposta curta que repete o "No," do enunciado. O único parente desse defeito está num *distrator* (tc1m50, "a flag colorful flag").

4. **Os itens "Which sentence is WRONG?" e "Choose the correct sentence:" estão sãos por dentro.** Conferi os oito do tipo WRONG e os oito do tipo correct, frase por frase: em todos há exatamente uma errada (ou exatamente uma certa). O risco número um destes bancos não se materializou — o problema deles é de repetição, não de gabarito.

5. **Nenhum problema de adequação etária, conteúdo sensível ou estereótipo.** Os contextos são escola, família, bichos, comida, férias e rotina; a descrição física do tc2m24 ("average height") está tratada de forma neutra; as datas americanas (Halloween, Thanksgiving, Easter) são conteúdo do livro. O que existe são pressupostos leves de classe, herdados do material — "Your dad's car needs gas" (tc2f44), "Pedro wants to stay away from his phone" (tc2m59), viagem de avião (tc1f36). Nada que eu mandaria corrigir hoje, mas é o tipo de moldura que vale despersonalizar quando esses itens forem reescritos ("The car needs gas…").

6. **Ortografia e digitação:** rodei varredura de espaço duplo, mojibake, espaço no início/fim, número de underscores da lacuna e alternativa repetida nos três arquivos. Um único achado real, o espaço duplo do tc2m02. Todas as lacunas usam exatamente cinco underscores, todos os IDs são únicos, todos os `correct` estão dentro de 0-3 e todas as explicações citam de fato a alternativa apontada pelo gabarito (checado por script). Português das explicações correto e no registro certo para a idade.

7. **Formato de diálogo difere entre arquivos:** o Connect 1 marca fala com aspas (`"_____ is this?" "It's an eraser."`, 46 questões) e o Connect 2 com travessão (`Does she like pizza? — No, she _____.`, 14 questões). Cada arquivo é coerente consigo mesmo, então não é defeito; só vale fixar um padrão único quando um terceiro banco de teens for escrito.

8. **Ponto de atenção que deixei passar de propósito:** em `Find the correct question:` aparecem distratores que são perguntas declarativas do inglês falado — `You are in the garage?` (tc1m36) e `Your friends are from where?` (tc1m47). São erradas para o nível e para a prova escrita, e é assim que todo livro as usa, mas um aluno mais exposto a inglês de internet pode reclamar. Não mandaria mexer; registro só para não parecer que passou despercebido.

9. **Lembrete de deploy:** qualquer correção destas exige regerar o `Gabarito.js` do `fisk-hub-backend` e reimplantar. Mudar só o JSON deste repositório faz `corrigirProva_` ignorar a questão em silêncio — a tentativa fecha com total menor do que o aluno respondeu e os tópicos não chegam ao diagnóstico.
