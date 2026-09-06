/* ══ A ESTÉTICA DA CASA no Quick Practice ═══════════════════════════════════
 *
 * A casa de Hogwarts do aluno (campanha do Portal, setembro/2026) veste a
 * faixa preta do topo. O desenho está no assets/casa-tema.css.
 *
 * ⚠️ AQUI A CASA SÓ PODE VIR DA URL. Esta ferramenta mora no github.io e o
 * Portal em portalfisk.com.br: origens diferentes não compartilham
 * `localStorage`. O Portal manda a letra da casa no mesmo fragmento em que a
 * identidade já viaja (`#raf=…&nome=…&casa=g`), montado pelo `fiskIdentHash`
 * do config.js de lá. Quem chega por favorito, sem passar pelo Portal, abre a
 * tela preta de sempre, e isso não é defeito: é o que sempre foi.
 *
 * ⚠️ NÃO GUARDE a casa aqui. Guardar significaria manter uma segunda verdade
 * sobre a casa do aluno, que envelhece: quem desliga a pintura no menu do
 * Portal deixa de mandar o `casa=`, e uma cópia local continuaria pintando.
 *
 * O TREINO MET ficou de fora de propósito (decisão do Pedro, 06/09/2026): ele
 * é simulado de prova, e prova não usa fantasia.
 *
 * ⚠️ LÊ O FRAGMENTO NA HORA, PINTA DEPOIS, e a ordem não é estilo: a própria
 * página LIMPA o `#raf=` da barra de endereços assim que lê a identidade (RAF
 * é identidade, não fica exposto num link que alguém compartilha). Um script
 * com `defer`, ou que esperasse o `DOMContentLoaded` para só então olhar o
 * `location.hash`, chegaria depois da faxina e não acharia nada. Por isso este
 * arquivo entra no <head> SEM `defer`: ele guarda a letra antes, e só usa o
 * <body> quando ele existe.
 */
(function(){
  'use strict';
  var casa = '';
  try{
    var hs = new URLSearchParams(String(location.hash||'').replace(/^#/,''));
    casa = String(hs.get('casa') || '').trim();
  }catch(e){}
  if(['g','r','h','s'].indexOf(casa) < 0) return;
  function pinta(){ try{ document.body.setAttribute('data-casa', casa); }catch(e){} }
  if(document.body) pinta();
  else document.addEventListener('DOMContentLoaded', pinta);
})();
