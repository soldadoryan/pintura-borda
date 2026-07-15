import { ASSETS } from "@/constants/assets";

/** Quantos slots a galeria tem. */
const PLACEHOLDER_COUNT = 6;

/**
 * PLACEHOLDER: a galeria alterna entre as duas fotos que já existem no
 * projeto — é o suficiente para dar pra perceber a troca ao passar. Substitua
 * por uma lista real; cada item só precisa de `id`, `src` e `alt`.
 */
const PLACEHOLDER_PHOTOS = [
  {
    src: ASSETS.heroBackground.src,
    // O alt de heroBackground é vazio de propósito: no banner ela é
    // decorativa e some para o leitor de tela. Aqui a foto é o conteúdo, e
    // conteúdo precisa de descrição própria.
    alt: 'Exemplares do livro "O Hacker do Tempo" com as bordas das páginas pintadas de preto.',
  },
  {
    src: ASSETS.product1.src,
    alt: ASSETS.product1.alt,
  },
];

export const GALLERY = Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => ({
  id: `pintura-${index + 1}`,
  ...PLACEHOLDER_PHOTOS[index % PLACEHOLDER_PHOTOS.length],
}));
