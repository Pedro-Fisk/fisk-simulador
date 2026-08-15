# Inmediato 1 e 2 — 340 questões revisadas (i1: midterm 105 final 85 | i2: midterm 75 final 75)

## ALTA (aluno erra questão certa, ou aprende errado)

### `i1m34` (inmediato1.json) — gabarito errado + palavra sobrando
- **Enunciado:** `¿Con qué frecuencia estudias español? Estudio ___ los martes y jueves.`
- **Alternativas:** `['nunca', 'a veces', 'los', 'todos']` correct=2 → "los"
- **Problema:** com o gabarito atual a frase montada fica "Estudio **los los** martes y jueves". A alternativa que fecha a frase é "todos" → "Estudio todos los martes y jueves".
- **Correção sugerida:** manter o enunciado e trocar `correct` para **3** ("todos"). Explicação nova: `'Todos los' + dia da semana indica frequência semanal regular. A frase completa fica 'Estudio todos los martes y jueves' = estudo todas as terças e quintas. Portanto, a resposta correta é 'TODOS'.`

### `i1f08` (inmediato1.json) — palavra sobrando
- **Enunciado:** `A mí me gusta el fútbol. ¿Y a ti?, ___ también.`
- **Alternativas:** `['A mí no', 'A mí tampoco', 'Yo sí', 'A mí también']` correct=3 → "A mí también"
- **Problema:** a frase montada fica "¿Y a ti?, **A mí también también**." O "también" já está no enunciado. Além disso a pontuação `?,` está errada.
- **Correção sugerida:** enunciado novo: `A mí me gusta el fútbol. ¿Y a ti? ___.` (mesmas alternativas, mesmo `correct=3`). Explicação: `Para concordar com uma frase afirmativa, usamos 'a mí también'. 'A mí también me gusta el fútbol' = eu também gosto. Portanto, a resposta correta é 'A MÍ TAMBIÉN'.`

### `i2m51` (inmediato2.json) — gabarito errado (a própria explicação desmente o gabarito)
- **Enunciado:** `Completa el aviso: '_____ prohibido fumar en este edificio.'`
- **Alternativas:** `['Se es', 'Está', 'Se', 'Es']` correct=2 → "Se"
- **Problema:** "Se prohibido fumar" não existe em espanhol — e a própria explicação escreve isso ("'Se prohibido fumar' não existe"). A única alternativa que fecha o aviso é "Está".
- **Correção sugerida:** trocar `correct` para **1** ("Está"). Explicação nova: `Um aviso desse tipo usa 'estar' + particípio: 'Está prohibido fumar en este edificio'. Com o SE impessoal o verbo precisa vir conjugado ('Se prohíbe fumar'), nunca com o particípio. Portanto, a resposta correta é 'ESTÁ'.`

### `i2f15` (inmediato2.json) — regra falsa: a questão não tem alternativa incorreta
- **Enunciado:** `¿En cuál de las siguientes oraciones el uso de la conjunción es INCORRECTO?`
- **Alternativas:** `['Habla español e inglés muy bien.', '¿Quieres café u otra bebida?', 'Tiene siete u ocho años.', 'Es inteligente y honesta.']` correct=3 → "Es inteligente y honesta."
- **Problema:** "Es inteligente y honesta" está **correta**. A troca `o → u` vale para a conjunção "o", nunca para "y"; "y" só vira "e" diante do som /i/. A explicação ensina uma regra inexistente ("o correto seria 'Es inteligente u honesta'"), e nenhuma das quatro frases está errada.
- **Correção sugerida:** trocar a alternativa 3 por uma frase de fato errada e manter `correct=3`: `'Compramos siete o ocho libros.'` Explicação nova: `'Ocho' começa com o som /o/, então a conjunção 'o' tem de virar 'u': o correto é 'siete u ocho libros'. As outras três estão certas: 'e inglés' (som /i/), 'u otra' e 'u ocho' (som /o/). Portanto, a frase incorreta é 'COMPRAMOS SIETE O OCHO LIBROS'.`

### `i2f31` (inmediato2.json) — gabarito incompatível com o substantivo do enunciado
- **Enunciado:** `¿Cuál es el apócope correcto en: 'Necesito _____ minutos más.'?`
- **Alternativas:** `['algún', 'alguno', 'algunos', 'alguna']` correct=0 → "algún"
- **Problema:** "minutos" é plural; "Necesito algún minutos más" é agramatical. Com o enunciado atual a resposta certa seria "algunos", que não é apócope. O aluno atento erra.
- **Correção sugerida:** enunciado novo: `¿Cuál es el apócope correcto en: '¿Tienes _____ problema con el horario?'?` (mantendo `correct=0`, "algún"). Explicação: `'Alguno' apocopa para 'algún' antes de substantivo masculino singular: 'algún problema', 'algún libro'. No feminino não há apócope ('alguna duda'), e no plural também não ('algunos problemas'). Portanto, a resposta correta é 'ALGÚN'.`

### `i2f33` (inmediato2.json) — explicação cita a LETRA de uma alternativa
- **Enunciado:** `¿Cuál de las siguientes afirmaciones sobre los apócopes es INCORRECTA?`
- **Alternativas:** `["'Santo' se convierte en 'San'…", "'Ciento' se convierte en 'cien'…", "'Bueno' se apocopa ante sustantivos femeninos también", "'Ninguno' se convierte en 'ningún'…"]` correct=2
- **Problema:** a explicação abre com "A opção incorreta é **C**". Como as alternativas são embaralhadas a cada sessão, essa letra quase sempre aponta para outra alternativa. Defeito sem conserto no formato atual.
- **Correção sugerida:** explicação nova: `A afirmação falsa é a que diz que 'bueno' se apocopa antes de substantivo feminino: isso não acontece. 'Bueno' só apocopa antes de masculino singular ('buen libro'); no feminino fica inteiro ('buena idea'). As outras três afirmações estão corretas. Portanto, a resposta correta é a alternativa sobre 'BUENO' antes de femininos.`

### `i1f41` (inmediato1.json) — explicação ensina regra errada
- **Enunciado:** `Nosotros ___ en Roma en 2019. (vivir)`
- **Alternativas:** `['hemos vivido', 'vivíamos', 'viviremos', 'vivimos']` correct=3 → "vivimos"
- **Problema:** a explicação afirma "para verbos '-ir' **e '-er'**, 'nosotros' no indefinido tem a mesma forma que no presente". Falso para -er: *comemos* (presente) × *comimos* (indefinido). Só os verbos em -ir coincidem.
- **Correção sugerida:** explicação nova: `Com data fechada no passado (en 2019), usa-se o pretérito indefinido: 'vivimos'. Atenção: só nos verbos em '-ir' a forma de 'nosotros' no indefinido é igual à do presente (vivimos/vivimos). Nos verbos em '-er' elas mudam: comemos (presente) × comimos (indefinido).`

### `i1f50` (inmediato1.json) — duas respostas defensáveis, e contradiz `i1f41`
- **Enunciado:** `Nosotros ___ en ese barrio hace diez años. (vivir)`
- **Alternativas:** `['vivimos', 'hemos vivido', 'viviremos', 'vivíamos']` correct=3 → "vivíamos"
- **Problema:** "hace diez años" é marcador de passado pontual e aceita perfeitamente o indefinido "vivimos" ("moramos naquele bairro dez anos atrás") — que é exatamente a resposta cobrada em `i1f41` com um marcador do mesmo tipo. As duas questões, com o mesmo verbo, ensinam critérios opostos.
- **Correção sugerida:** enunciado novo, com marcador de hábito/descrição inequívoco: `Cuando éramos niños, nosotros ___ en ese barrio. (vivir)` (mesmas alternativas, `correct=3`). Explicação: `'Cuando éramos niños' descreve uma situação contínua no passado, terreno do imperfeito: 'vivíamos en ese barrio'. Com um momento fechado ('en 2019', 'hace diez años') entraria o indefinido 'vivimos'.`

### `i1m55`, `i1m56`, `i1m98` (inmediato1.json) — comparativos sem contexto: três alternativas produzem espanhol correto
- **Enunciado:** `Pedro es ___ alto ___ Juan.` / `Esta película es ___ interesante ___ la otra.` / `Este hotel es ___ caro ___ el otro.`
- **Alternativas:** i1m55 correct=3 "más...que"; i1m56 correct=1 "tan...como"; i1m98 correct=3 "menos...que"
- **Problema:** nada na frase diz qual comparação é a pretendida. "Pedro es tan alto como Juan" e "Pedro es menos alto que Juan" são igualmente corretos; idem nas outras duas. Só a alternativa "más...de" / "menos...como" é de fato errada. Um professor aceitaria as três.
- **Correção sugerida:** acrescentar a informação ao enunciado, no padrão de pista que o banco já usa:
  - i1m55: `Pedro mide 1,85 m y Juan mide 1,70 m. Pedro es ___ alto ___ Juan.`
  - i1m56: `Las dos películas me gustaron igual. Esta película es ___ interesante ___ la otra. (igualdad)`
  - i1m98: `Este hotel cuesta 50 euros y el otro cuesta 90. Este hotel es ___ caro ___ el otro.`

### `i1m62`, `i1m63`, `i1m64` (inmediato1.json) — localizadores sem contexto: as quatro alternativas cabem
- **Enunciado:** `El banco está ___ la farmacia.` / `Las llaves están ___ la mesa.` / `El gato está ___ la silla.`
- **Alternativas:** i1m62 correct=3 "al lado de"; i1m63 correct=3 "encima de"; i1m64 correct=3 "debajo de"
- **Problema:** "encima de / detrás de / debajo de / al lado de la farmacia" são todas frases corretas em espanhol. Sem imagem nem pista, o aluno não tem como escolher — só adivinhar. (Compare com `i1m101`, que resolve isso com "al otro lado de la calle".)
- **Correção sugerida:** ancorar cada frase, mantendo os índices:
  - i1m62: `El banco y la farmacia están juntos, en el mismo edificio: el banco está ___ la farmacia.`
  - i1m63: `Puedes coger las llaves sin agacharte: están ___ la mesa.`
  - i1m64: `El gato se escondió y solo se le ven las patas: está ___ la silla.`

### `i1m03` (inmediato1.json) — duas respostas corretas
- **Enunciado:** `¿Cuál es el artículo determinado correcto para 'estudiantes'?`
- **Alternativas:** `['el', 'la', 'los', 'las']` correct=2 → "los"
- **Problema:** "estudiante" é de gênero comum: "las estudiantes" (um grupo só de mulheres) é tão correto quanto "los estudiantes". A própria explicação admite "masculino plural (ou misto)". O aluno que marca "las" está certo e é reprovado.
- **Correção sugerida:** enunciado novo: `¿Cuál es el artículo determinado correcto para 'estudiantes' cuando el grupo incluye chicos y chicas?` Explicação: `Quando o grupo é misto (ou masculino), o espanhol usa o artigo masculino plural: 'los estudiantes'. Se o grupo fosse só de mulheres, seria 'las estudiantes'.`

### `i2m18` (inmediato2.json) — duas respostas corretas
- **Enunciado:** `Elige la oración correcta:`
- **Alternativas:** `['¿Hay algo interesante en la tienda?', '¿Hay nada interesante en la tienda?', '¿Hay nadie interesante en la tienda?', '¿Hay alguien interesante en la tienda?']` correct=0
- **Problema:** "¿Hay alguien interesante en la tienda?" é espanhol perfeitamente correto — e a explicação chega a dizer que "algo" e "alguien" são os indefinidos positivos usados em pergunta. Duas alternativas certas.
- **Correção sugerida:** trocar a alternativa `'¿Hay alguien interesante en la tienda?'` por `'¿Hay ninguna cosa interesante en la tienda?'` (mantendo `correct=0`). Explicação: `Em pergunta sem negação, usam-se os indefinidos positivos: 'algo' para coisas e 'alguien' para pessoas. 'Nada' e 'nadie' só aparecem com 'no' antes do verbo ou antes do próprio verbo.`

### `i2m20` (inmediato2.json) — duas respostas corretas
- **Enunciado:** `Selecciona la oración con el uso correcto de los indefinidos:`
- **Alternativas:** `['Alguien llamó a la puerta.', 'Algo llamó a la puerta.', 'Nadie llamó a la puerta y escuché la voz.', 'Nada está esperando afuera.']` correct=0
- **Problema:** "Nada está esperando afuera" é gramaticalmente correta e faz sentido ("Nada está esperando lá fora"). O critério do gabarito é semântico e não fica claro no comando.
- **Correção sugerida:** trocar a alternativa por uma agramatical: `'Nada está esperando afuera.'` → `'No está esperando nadie… ni nada tampoco algo.'` ou, mais limpo, `'Nadie no llamó a la puerta.'` (mantendo `correct=0`). Explicação: `'Alguien' se refere a uma pessoa indefinida e é o único uso correto aqui. Em espanhol, 'nadie' antes do verbo dispensa o 'no': diz-se 'Nadie llamó', nunca 'Nadie no llamó'.`

### `i2m50` (inmediato2.json) — a alternativa isolada também está certa
- **Enunciado:** `¿Cómo se dice impersonalmente 'En este país la gente trabaja mucho'?`
- **Alternativas:** `['En este país se trabaja mucho.', 'En este país se trabajan mucho.', 'En este país uno trabaja mucho.', "'Se trabaja mucho' y 'uno trabaja mucho' son correctas."]` correct=3
- **Problema:** "En este país se trabaja mucho." é resposta correta por si só — o aluno que a marca acerta o espanhol e perde a questão. Alternativa do tipo "todas as anteriores" não funciona num banco com alternativas embaralhadas.
- **Correção sugerida:** reformular para uma escolha única. Enunciado: `¿Cómo se dice impersonalmente 'En este país la gente trabaja mucho'?` Alternativas: `['En este país se trabaja mucho.', 'En este país se trabajan mucho.', 'En este país se trabajando mucho.', 'En este país trabajan se mucho.']`, `correct=0`. Explicação: `Com o SE impessoal, o verbo fica na 3ª pessoa do singular: 'se trabaja'. Não há sujeito plural para concordar, então 'se trabajan' está errado aqui. Portanto, a resposta correta é 'EN ESTE PAÍS SE TRABAJA MUCHO'.`

### `i2m15` (inmediato2.json) — dois distratores têm a mesma estrutura pedida
- **Enunciado:** `Selecciona la traducción LITERAL (misma estructura) de 'Nos aburre la tarea':`
- **Alternativas:** `['Nós entediamos a tarefa.', 'A lição de casa nos entedia.', 'Nós ficamos entediados com a tarefa.', 'A tarefa nos entedia.']` correct=3
- **Problema:** "A lição de casa nos entedia." tem exatamente a estrutura cobrada (sujeito = a coisa; nós = objeto) e "la tarea" traduz-se justamente por "a lição de casa". O critério real é lexical, não estrutural, mas o comando pede estrutura.
- **Correção sugerida:** trocar a alternativa `'A lição de casa nos entedia.'` por `'Nós entediamos com a tarefa.'` (mantendo `correct=3`). Explicação inalterada.

### `i2m33` (inmediato2.json) — a alternativa correta afirma algo falso
- **Enunciado:** `Identifica el error en: 'Se les enviamos el correo ayer.'`
- **Alternativas:** `['El pronombre CI está incorrecto', 'El pronombre CD está incorrecto', 'El orden de los pronombres está incorrecto', "Hay una combinación incorrecta: 'se les' no existe"]` correct=3
- **Problema:** "se les" existe e é frequente em espanhol ("Se les olvidó el libro", "Se les dijo la verdad"). O erro da frase é outro: "se" já substitui "les", então os dois não podem coexistir *nessa* construção. Do jeito que está, o aluno decora uma proibição falsa. A explicação também está confusa.
- **Correção sugerida:** alternativa correta nova: `'Se' ya sustituye a 'les': los dos juntos sobran` (manter `correct=3`). Explicação: `Quando 'le/les' vem antes de 'lo, la, los, las', ele se transforma em 'se' — e aí o 'les' desaparece. Por isso 'Se les enviamos el correo' tem um pronome sobrando; o correto é 'Se lo enviamos ayer'.`

## MÉDIA (confunde ou irrita, mas não invalida)

### `i1m50`, `i1m57`, `i1m65`, `i1m66`, `i1m67`, `i1f09`, `i1f10`, `i1f54`, `i1f65`, `i1f66` (inmediato1.json) — dica entre parênteses em INGLÊS num exame de espanhol para brasileiros
- **Enunciado:** ex. `Los libros son muy ___. (interesting)`, `Carlos es el ___ estudiante de la clase. (best)`, `Este libro es ___. (mine)`, `Ese apartamento no es nuestro, es ___. (his)`, `Yo no como carne., Yo ___. (I don't eat it either)`
- **Alternativas:** inalteradas
- **Problema:** o aluno é brasileiro aprendendo espanhol; a pista em inglês é ruído e, em `i1f54`, a pista mistura três línguas: `(experiência de vida, I have gone)` — com "experiência" em português dentro de um enunciado em espanhol.
- **Correção sugerida:** trocar a pista para espanhol (ou português), no padrão que o resto do banco já usa: i1m50 `(interesante)`; i1m57 `(el superlativo de 'bueno')`; i1m65/i1m66 `(de mí)`; i1m67 `(de él)`; i1f09 `(yo sí lo tomo)`; i1f10 `(yo tampoco)`; i1f54 `(experiencia de vida, sin fecha concreta)`; i1f65 `(a mí también)`; i1f66 `(estoy de acuerdo)`.

### `i1f09`, `i1f10`, `i1f65`, `i1f66` (inmediato1.json) — pontuação `.,` no meio do enunciado
- **Enunciado:** `A mí no me gusta el café., Pues a mí ___.` / `Yo no como carne., Yo ___.` / `Me encanta bailar., Pues a mí ___.` / `No me gustan nada las películas de terror., ___, son muy aburridas.`
- **Alternativas:** inalteradas
- **Problema:** ponto seguido de vírgula. Parece falha de conversão e sugere que falta texto.
- **Correção sugerida:** usar travessão de diálogo: `— A mí no me gusta el café. — Pues a mí ___.`; `— Yo no como carne. — Yo ___.`; `— Me encanta bailar. — Pues a mí ___.`; `— No me gustan nada las películas de terror. — ___, son muy aburridas.`

### `i1m23` (inmediato1.json) — pontuação e formatação do enunciado
- **Enunciado:** `¿Qué es ___?, (señalando algo cuyo nombre no sabes)`
- **Alternativas:** `['ese', 'este', 'esto', 'esa']` correct=2
- **Problema:** vírgula depois do ponto de interrogação; a pista de contexto deveria vir antes ou entre parênteses limpos.
- **Correção sugerida:** `(Señalando algo cuyo nombre no sabes) ¿Qué es ___?`

### `i1m103` (inmediato1.json) — pista em espanhol incorreto
- **Enunciado:** `Ese ordenador no es mío, es ___. (de tú)`
- **Alternativas:** `['suyo', 'mío', 'nuestro', 'tuyo']` correct=3
- **Problema:** depois da preposição "de" o pronome é "ti", não "tú". A questão `i1m53` já escreve corretamente `(de ti)`.
- **Correção sugerida:** enunciado novo: `Ese ordenador no es mío, es ___. (de ti)`

### `i1f47` (inmediato1.json) — distrator aceitável
- **Enunciado:** `Él llegó ___ tres horas.`
- **Alternativas:** `['en', 'desde', 'hasta', 'hace']` correct=3 → "hace"
- **Problema:** "Él llegó en tres horas" também é espanhol correto (levou três horas para chegar). Sem mais contexto, um professor aceitaria.
- **Correção sugerida:** enunciado novo: `Él ya está aquí: llegó ___ tres horas.` Explicação: `'Hace' + período indica há quanto tempo algo aconteceu: 'llegó hace tres horas' = chegou há três horas. Cuidado com 'en tres horas', que significa 'em três horas' (a duração do trajeto).`

### `i1f75` (inmediato1.json) — distratores impossíveis entregam a resposta
- **Enunciado:** `___ año he viajado mucho por Europa.`
- **Alternativas:** `['El año pasado', 'Ayer', 'Hace dos años', 'Este']` correct=3
- **Problema:** como a palavra "año" já está no enunciado, os três distratores produzem "El año pasado **año**", "Ayer **año**", "Hace dos años **año**". A questão se resolve pela sintaxe, sem testar o marcador temporal.
- **Correção sugerida:** enunciado novo: `___ he viajado mucho por Europa.` com alternativas `['Ayer', 'Hace dos años', 'El año pasado', 'Este año']`, `correct=3`.

### `i1f72` (inmediato1.json) — verbo com sentido vulgar em boa parte da América Latina
- **Enunciado:** `Nunca cojo el avión, prefiero viajar ___ tren.`
- **Alternativas:** `['a', 'de', 'con', 'en']` correct=3
- **Problema:** "coger" na Espanha é neutro, mas na Argentina, México, Uruguai, Venezuela e vários outros países é vulgar. Num banco que não declara a variante, expor o aluno a "yo cojo" sem aviso é um risco desnecessário — e o item testa preposição, não esse verbo.
- **Correção sugerida:** enunciado novo: `Nunca tomo el avión, prefiero viajar ___ tren.`

### `i2m56` (inmediato2.json) — enunciado agramatical em espanhol
- **Enunciado:** `¿Qué pronombre CI y forma de 'tocar' completar correctamente? 'Esta semana _____ (a nosotros) cocinar.'`
- **Alternativas:** `['se nos toca', 'nos toca', 'nos tocan', 'les toca']` correct=1
- **Problema:** "¿Qué pronombre… completar correctamente?" não é espanhol; falta o verbo conjugado. Também é a única questão do bloco com o comando antes da frase.
- **Correção sugerida:** `¿Qué pronombre de CI y qué forma de 'tocar' completan correctamente la frase? 'Esta semana _____ (a nosotros) cocinar.'`

### `i2f51` (inmediato2.json) — explicação cita alternativa que não existe
- **Enunciado:** `Completa: 'Mañana yo te _____ (decir) toda la verdad.'`
- **Alternativas:** `['deciré', 'diré', 'diría', 'dije']` correct=1
- **Problema:** a explicação diz "'Diría' é condicional e **'digo'** é presente" — mas "digo" não é alternativa; a quarta é "dije".
- **Correção sugerida:** explicação nova: `'Decir' perde a sílaba do meio no futuro e fica com a raiz 'dir-': diré, dirás, dirá, diremos, diréis, dirán. 'Diría' é condicional e 'dije' é pretérito indefinido. Portanto, a resposta correta é 'DIRÉ'.`

### `i2m17` (inmediato2.json) — explicação confusa e desalinhada com a frase
- **Enunciado:** `Completa: 'No hay _____ en casa.' (ninguna persona)`
- **Alternativas:** `['alguien', 'nadie', 'algo', 'nada']` correct=1
- **Problema:** a explicação diz "Com 'no' antes do verbo, não é necessário adicionar outra negação antes de 'nadie'", o que sugere que "No hay nadie" seria dupla negação indevida — justamente a construção cobrada.
- **Correção sugerida:** explicação nova: `'Nadie' se refere a pessoas e 'nada' a coisas. Em espanhol a dupla negação é obrigatória quando o indefinido vem depois do verbo: 'No hay nadie en casa'. Se ele vier antes, o 'no' desaparece: 'Nadie está en casa'.`

### `i2f37` (inmediato2.json) — comando não bate com as alternativas
- **Enunciado:** `¿Cómo se dice '¡Ven aquí!' en Imperativo afirmativo?`
- **Alternativas:** `["Es el imperativo de 'ver' para 'tú'", "Es el imperativo de 'venir' para 'tú'", "Es el imperativo de 'venir' para 'usted'", "Es el imperativo de 'ver' para 'usted'"]` correct=1
- **Problema:** o comando pergunta "como se diz", mas as alternativas identificam o que a forma é. A frase já está no imperativo afirmativo.
- **Correção sugerida:** enunciado novo: `'¡Ven aquí!' ¿de qué verbo y de qué persona es este imperativo?`

## BAIXA (cosmético)

### `i1m29` (inmediato1.json) — forma inexistente apresentada sem marca
- **Enunciado:** `La clase ___ a las nueve de la mañana. (empezar)`
- **Alternativas:** `['empieza', 'empieze', 'empeza', 'empezamos']` correct=0
- **Problema:** a explicação escreve "a raiz muda: 'empeza' → 'empieza'", como se "empeza" fosse uma etapa real. Não existe.
- **Correção sugerida:** `'Empezar' é irregular E>IE: nas formas de raiz tônica o 'e' vira 'ie'. Com 'él/ella': 'empieza'. Com 'nosotros' não há mudança: 'empezamos'.`

### `i1m44` (inmediato1.json) — acento faltando em alternativa
- **Enunciado:** `¿___ tú hablar francés? (poder)`
- **Alternativas:** `['pode', 'puedo', 'podeis', 'puedes']` correct=3
- **Problema:** "podeis" sem til. A forma espanhola é "podéis"; escrita assim, vira erro ortográfico não intencional num banco que cobra acentuação.
- **Correção sugerida:** trocar a alternativa `'podeis'` por `'podéis'` (continua sendo distrator, é a forma de 'vosotros').

### `i1f14` (inmediato1.json) — português da explicação
- **Enunciado:** `___ un banco cerca de aquí.`
- **Alternativas:** `['Tiene', 'Es', 'Está', 'Hay']` correct=3
- **Problema:** "Nunca usa artigo definido depois de 'hay'" (falta o "se"); e a explicação exemplifica com a forma interrogativa enquanto o enunciado é afirmativo.
- **Correção sugerida:** `'Hay' indica existência de algo não específico: 'Hay un banco cerca de aquí' = tem um banco aqui perto. Depois de 'hay' nunca se usa artigo definido (el, la, los, las).`

### `i2f36` (inmediato2.json) — nota prescritiva desatualizada
- **Enunciado:** `¿Cuál es el imperativo afirmativo correcto de 'decir' para 'vosotros'?`
- **Alternativas:** `['deced', 'decid', 'diced', 'dicen']` correct=1
- **Problema:** a explicação fecha com "Exceção: 'irse' → 'idos' (não 'iros')". A RAE admite "iros" desde 2018.
- **Correção sugerida:** `…Exceção: 'irse', cuja forma tradicional é 'idos', embora hoje a RAE também aceite 'iros'.`

### `i2f73` (inmediato2.json) — enunciado com forma pouco natural
- **Enunciado:** `'Decírmelo' en Imperativo Negativo para 'tú' es: '¡No _____!'`
- **Alternativas:** `['dígamelo', 'me lo digas', 'lo me digas', 'me digas lo']` correct=1
- **Problema:** o ponto de partida natural do exercício é o imperativo afirmativo "Dímelo", não o infinitivo com pronomes.
- **Correção sugerida:** `'¡Dímelo!' en Imperativo Negativo para 'tú' es: '¡No _____!'`

### Formatação geral (os dois arquivos) — inconsistências visíveis para o aluno
- **Problema:** `inmediato1.json` usa `___` (3 underscores) em 179 lacunas e `inmediato2.json` usa `_____` (5) em 48; `inmediato2.json` põe a frase entre aspas simples ("Completa: 'Cuando llegaste, yo ya _____ …'") e `inmediato1.json` não; as questões acrescentadas depois (i1f81–i1f85, i2m70–i2m83, i2f50–i2f75) fecham com "Portanto, a resposta correta é 'X'" e as antigas não; algumas usam maiúsculas com aspas ('SALDREMOS') e outras sem (HABLAREMOS). Os ids também estão fora de ordem nos blocos (i1f81–83 entre i1f61 e i1f62; i2m70–71 no meio do bloco de pronomes).
- **Correção sugerida:** padronizar a lacuna em `_____`, retirar as aspas simples em volta da frase, adotar o fecho "Portanto, a resposta correta é 'X'" (sempre com aspas simples, não caixa alta solta) em todas as explicações e reordenar os ids dentro de cada bloco.

## Observações gerais

1. **O defeito da "palavra sobrando" existe, mas é raro aqui:** varri as 340 questões montando a frase final com a alternativa correta. Só `i1m34` e `i1f08` repetem palavra — os dois casos que já estavam sob suspeita, e ambos confirmados. As dicas entre parênteses (`(inteligente)`, `(alto)`) não são repetição e não foram reportadas.
2. **O padrão mais frequente e mais caro é a falta de contexto que exclua o distrator.** Comparativos (`i1m55/56/98`) e localizadores (`i1m62/63/64`) são nove itens em que duas, três ou quatro alternativas produzem espanhol perfeito. Como cada simulado sorteia 10 questões, a chance de o aluno topar com pelo menos um item impossível é alta. `i1m101` mostra o remédio: uma pista curta no enunciado ("al otro lado de la calle").
3. **Questões de "escolha a frase correta/incorreta" são o segundo foco de risco.** `i2m18`, `i2m20`, `i2f15` e `i2m50` falham todas pelo mesmo motivo: distratores que, isolados, são espanhol legítimo. Recomendo revisar cada item desse formato com a pergunta "esta alternativa está errada *em espanhol*, ou só é menos adequada?".
4. **Três explicações ensinam regra falsa** (`i1f41` sobre -er/-ir, `i2f15` sobre y/u, `i2m33` sobre "se les") e uma cita a letra da alternativa (`i2f33`, insanável com embaralhamento). Um gabarito está objetivamente errado e desmentido pela própria explicação (`i2m51`), outro é incompatível com o número do substantivo (`i2f31`) e um terceiro produz frase agramatical (`i1m34`).
5. **Não há conteúdo inadequado nem estereótipo de país.** O único risco cultural é lexical: `i1f72` usa "cojo el avión", vulgar em grande parte da América Latina. O banco é claramente peninsular (vosotros, "quedar" no sentido de combinar, pretérito perfecto com "esta mañana", "ordenador", "coger", "piso"), o que é legítimo — mas só `i2m26` diz isso ao aluno ("en español peninsular"). Vale um aviso de variante na abertura do simulado, ou repetir a marca nos itens em que a resposta muda conforme a variante (`i1f31`, `i1f35`, `i1f37`, `i2m26`, `i2m58`).
6. **Mistura de línguas nas pistas:** dez enunciados de `inmediato1.json` trazem a pista em inglês, e `i1f54` mistura português, espanhol e inglês na mesma linha. Nenhum item de `inmediato2.json` faz isso — a padronização já existe, falta aplicá-la ao arquivo 1.
7. **Verificações automáticas limpas:** nenhuma alternativa duplicada dentro de uma questão, nenhum enunciado repetido entre os dois arquivos, nenhum mojibake real (os acertos de busca eram "NÃO" em português), nenhum espaço duplo e nenhum `?`/`!` sem o sinal de abertura.
