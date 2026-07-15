/** Espelha `max-w-[49.28rem]` aplicado na logo do HeroBanner. */
const LOGO_MAX_WIDTH = "49.28rem";

/** Espelha `w-[79.2vw]`: abaixo do breakpoint a logo acompanha a tela. */
const LOGO_FLUID_WIDTH = "79.2vw";

/**
 * Onde o max-w passa a valer: 49.28rem = 788,48px, e 788,48 / 0,792 = 995,6px.
 * Ou seja, a logo só trava a partir de ~996px de tela — não de 768px, como
 * estava aqui. No meio dessa faixa o sizes prometia 788px enquanto a logo
 * renderizava 608px, e o next/image baixava arquivo maior que o necessário.
 */
const LOGO_BREAKPOINT = "996px";

/**
 * O desenho da logo não chega no fim do arquivo: o PNG tem 809px de altura, mas
 * o traço para em 562. Os 247px de baixo são transparentes — e o navegador não
 * tem como saber disso, pra ele a caixa vai até o fim. O resultado é um vão
 * invisível entre a logo e o que vier embaixo dela.
 *
 * 247/2814 = 8,778% da LARGURA do arquivo. Como a largura renderizada é
 * `min(79.2vw, 49.28rem)`, a faixa é essa mesma conta nas duas pontas: assim
 * ela se cancela certo em qualquer tela, sem precisar de breakpoint. Um valor
 * fixo acertaria numa largura só.
 */
const LOGO_BOTTOM_VOID = `min(${(0.08778 * 79.2).toFixed(3)}vw, ${(
  0.08778 * 49.28
).toFixed(3)}rem)`;

/** O respiro que sobra depois de descontar a faixa. Este sim se vê. */
const TAGLINE_GAP = "1rem";

export const HERO_LOGO = {
  maxWidth: LOGO_MAX_WIDTH,
  // Se o `sizes` mentir sobre o tamanho renderizado, o next/image escolhe um
  // arquivo na resolução errada — daí manter os valores presos aqui.
  sizes: `(min-width: ${LOGO_BREAKPOINT}) ${LOGO_MAX_WIDTH}, ${LOGO_FLUID_WIDTH}`,
  // Negativo na maior parte das telas: ele engole a faixa transparente e só
  // então abre o vão de verdade.
  taglineMarginTop: `calc(${TAGLINE_GAP} - ${LOGO_BOTTOM_VOID})`,
} as const;
