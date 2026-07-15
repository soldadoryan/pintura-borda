import { ASSETS } from "@/constants/assets";

/**
 * As fotos da galeria, na ordem em que aparecem. O carrossel e o modal leem
 * esta mesma lista, então a ordem daqui vale para os dois.
 *
 * Cada foto entra uma vez só: quem dá a volta sem emenda é o carrossel, que
 * repete a lista internamente. Duplicar aqui faria a mesma foto aparecer duas
 * vezes na mesma volta.
 *
 * O `id` é a chave de renderização — descreve a foto para quem lê o código, já
 * que o caminho do arquivo só diz o número.
 */
export const GALLERY = [
  { id: "imperio-dos-ossos", ...ASSETS.product1 },
  { id: "tipografia-matias", ...ASSETS.product2 },
  { id: "gaburieru-brochura", ...ASSETS.product3 },
  { id: "royal-gates", ...ASSETS.product4 },
  { id: "hacker-do-tempo", ...ASSETS.product5 },
];
