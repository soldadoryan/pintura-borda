/**
 * Os números da entrada das seções ao rolar. Ficam fora do <Reveal> porque ele
 * é "use client": o que mora num módulo de cliente não pode ser *chamado* pelo
 * servidor, só renderizado — e o revealDelay precisa rodar dentro das seções,
 * que são Server Components.
 */

/**
 * A margem negativa embaixo encurta a área de gatilho: sem ela a animação
 * dispararia com o bloco ainda colado na borda inferior da tela, e a pessoa
 * chegaria na seção com a entrada já terminada. Os 15% de antes ainda soltavam
 * cedo demais — em 20% a seção já entrou de verdade quando a entrada começa.
 */
export const REVEAL_TRIGGER_MARGIN = "0px 0px -20% 0px";

/**
 * Distância entre a entrada de um elemento e a do vizinho. Em 100ms os
 * elementos praticamente subiam juntos e o escalonamento não se lia.
 */
const REVEAL_STEP_MS = 160;

/**
 * Atraso da entrada, contado em passos. É o que escalona os elementos de uma
 * seção em vez de fazer todos surgirem de uma vez só.
 */
export function revealDelay(step: number) {
  return {
    "--reveal-delay": `${step * REVEAL_STEP_MS}ms`,
  } as React.CSSProperties;
}
