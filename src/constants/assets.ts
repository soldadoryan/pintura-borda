import { SITE } from "@/constants/site";

export const ASSETS = {
  logo: {
    src: "/logo.png",
    width: 2814,
    height: 809,
    alt: `Logo ${SITE.name}`,
  },
  heroBackground: {
    src: "/background.png",
    alt: "",
  },
  product1: {
    src: "/product1.png",
    width: 2848,
    height: 1490,
    alt: 'Exemplares do livro "O Império dos Ossos", de Andrea Stewart, empilhados sobre tecido azul, com as bordas das páginas pintadas de verde-água no mesmo tom da capa.',
  },
  product2: {
    src: "/product2.png",
    width: 2524,
    height: 1664,
    alt: "Cartões de visita da Tipografia Matias, em papel cru, espalhados sobre veludo azul com as bordas pintadas de preto.",
  },
  product3: {
    src: "/product3.png",
    width: 2752,
    height: 1536,
    alt: 'Exemplares de "Gaburieru no Japão", de Renato Almeida, em brochura vermelha e branca, com as bordas das páginas pintadas de vermelho.',
  },
  product4: {
    src: "/product4.png",
    width: 2848,
    height: 1490,
    alt: "Cartões de visita da Royal Gates, em papel azul-marinho, espalhados sobre tecido azul com as bordas pintadas de dourado.",
  },
  // É a mesma foto do heroBackground — arquivo idêntico, byte a byte. Lá ela é
  // fundo e vai escurecida atrás da logo, aqui ela é produto e aparece inteira,
  // então a descrição existe (no banner o alt é vazio, de decorativa).
  product5: {
    src: "/product5.png",
    width: 2400,
    height: 1788,
    alt: 'Exemplares do livro "O Hacker do Tempo", de Luis Giffoni, com as bordas das páginas pintadas de preto; ao lado, um exemplar aberto em leque mostra o corte preto.',
  },
} as const;
