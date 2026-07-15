"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { GalleryModal } from "@/components/ui/GalleryModal";
import { Reveal } from "@/components/ui/Reveal";
import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { GALLERY } from "@/constants/gallery";
import { revealDelay } from "@/constants/reveal";

/**
 * Lado do quadrado, definido por breakpoint numa variável CSS. O min() é o que
 * segura os dois extremos: em tela baixa e larga quem manda é o vh, em tela
 * estreita e alta quem manda é o vw. Preso só em vh, como estava, o iPad em
 * retrato pedia 192% da largura da coluna e a foto nem cabia.
 *
 * De 1920px pra cima volta o 72vh original: lá a tela sempre deu conta, e o
 * min() encolhia a foto 19% sem necessidade.
 */
const SLIDE_SIZE_CLASS =
  "[--slide-size:min(80vw,55vh)] lg:[--slide-size:min(58vh,44vw)] 3xl:[--slide-size:72vh]";

/** O transform e o tamanho do <li> precisam ler o mesmo valor. */
const SLIDE_SIZE = "var(--slide-size)";

/** Precisa espelhar o `gap-4` da trilha — entra na conta do deslocamento. */
const SLIDE_GAP = "1rem";

/** Arrasto mínimo (px) para virar a foto. Abaixo disso, volta pro lugar. */
const DRAG_THRESHOLD = 60;

/** Folga (px) até onde o gesto ainda conta como clique, e não como arrasto. */
const CLICK_TOLERANCE = 5;

const TOTAL = GALLERY.length;

/**
 * Três cópias da lista, e o índice começa na do meio. É isso que faz a
 * primeira foto reaparecer depois da última em vez de o carrossel voltar
 * correndo pro começo: sempre há uma cópia vizinha pronta para os dois lados.
 */
const SLIDES = [...GALLERY, ...GALLERY, ...GALLERY];

/** Traz qualquer índice de volta para a faixa da cópia do meio. */
const normalize = (index: number) =>
  TOTAL + (((index % TOTAL) + TOTAL) % TOTAL);

export function GallerySection() {
  const [index, setIndex] = useState(TOTAL);
  const [dragOffset, setDragOffset] = useState(0);
  // Estado, não ref: o cursor e a transição dependem disso para renderizar.
  const [isDragging, setIsDragging] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  // Só marca que houve arrasto — nada aqui é lido durante a renderização.
  const didDrag = useRef(false);

  function goTo(direction: number) {
    setWithTransition(true);
    setIndex((current) => current + direction);
  }

  /**
   * Assim que a animação termina, se o índice saiu da cópia do meio, ele
   * volta para a posição equivalente sem transição. O pulo é invisível
   * porque as cópias são idênticas e o frame pintado é o mesmo.
   */
  function handleTransitionEnd() {
    if (index < TOTAL || index >= TOTAL * 2) {
      setWithTransition(false);
      setIndex(normalize(index));
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLUListElement>) {
    dragStartX.current = event.clientX;
    didDrag.current = false;
    setIsDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLUListElement>) {
    if (dragStartX.current === null) return;

    const offset = event.clientX - dragStartX.current;

    if (!didDrag.current && Math.abs(offset) > CLICK_TOLERANCE) {
      didDrag.current = true;
      // A captura entra só aqui, quando o gesto virou arrasto de fato. Ela é
      // o que permite soltar o mouse fora da trilha sem travar o arrasto —
      // mas, enquanto ativa, o navegador redireciona o `click` para o <ul>.
      // Capturar já no pointerdown fazia isso valer até para um clique
      // parado, e era por isso que a foto não abria o modal.
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    setDragOffset(offset);
  }

  function handlePointerUp() {
    if (dragStartX.current === null) return;

    if (Math.abs(dragOffset) > DRAG_THRESHOLD) {
      goTo(dragOffset < 0 ? 1 : -1);
    }

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  /**
   * Escutado na trilha e resolvido por delegação: o alvo do clique é a <img>
   * de dentro do slide, então subir com closest() até o [data-photo-index]
   * acha a foto certa — e funciona igual pelo teclado, onde o evento nasce no
   * próprio botão e sobe até aqui.
   */
  function handleClick(event: React.MouseEvent<HTMLUListElement>) {
    // Terminar um arrasto em cima de uma foto não pode abrir o modal. O
    // detail 0 identifica o clique vindo do teclado, onde arrasto não existe
    // e o didDrag pode ser resquício do último gesto de mouse.
    const fromKeyboard = event.detail === 0;
    if (!fromKeyboard && didDrag.current) return;

    const slide = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-photo-index]",
    );
    if (!slide?.dataset.photoIndex) return;

    setZoomIndex(Number(slide.dataset.photoIndex));
  }

  const closeZoom = useCallback(() => setZoomIndex(null), []);

  const stepZoom = useCallback((direction: number) => {
    setZoomIndex((current) =>
      current === null ? current : (current + direction + TOTAL) % TOTAL,
    );
  }, []);

  const isAnimated = withTransition && !isDragging;

  return (
    // As duas colunas só entram no lg: no iPad em retrato a tela é estreita e
    // alta demais para dividir ao meio, então lá ele fica empilhado.
    <section
      className={`w-full overflow-hidden bg-gray-950 lg:h-[80vh] ${SLIDE_SIZE_CLASS}`}
    >
      <Reveal className="grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 pt-16 pb-10 sm:px-8 lg:py-0 lg:pl-16">
          <h2 className="reveal text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Nossas Pinturas
          </h2>

          <p
            style={revealDelay(1)}
            className="reveal mt-6 max-w-lg text-lg text-gray-400 sm:mt-8 sm:text-xl lg:text-2xl"
          >
            Além de livros, fazemos em cartões e outros materiais.
          </p>

          <div
            style={revealDelay(2)}
            className="reveal mt-8 flex items-center gap-3 lg:mt-10"
          >
            <RoundIconButton label="Foto anterior" onClick={() => goTo(-1)}>
              <FiChevronLeft aria-hidden className="size-6" />
            </RoundIconButton>
            <RoundIconButton label="Próxima foto" onClick={() => goTo(1)}>
              <FiChevronRight aria-hidden className="size-6" />
            </RoundIconButton>

            <span aria-live="polite" className="ml-3 text-sm text-gray-500">
              {(normalize(index) % TOTAL) + 1} / {TOTAL}
            </span>
          </div>
        </div>

        {/* O overflow-hidden aqui é o que impede a trilha de invadir a coluna
            do texto ao deslizar. Como esta coluna termina na borda direita da
            tela, o corte do segundo quadrado continua acontecendo lá.
            O pl no empilhado alinha a foto com o texto de cima; no lg some,
            porque aí a coluna já começa no meio da tela. */}
        {/* A entrada fica nesta coluna, e não na trilha lá dentro: a trilha tem
            transform próprio pra se deslocar, e a animação o sobrescreveria —
            o carrossel daria um pulo pra posição errada ao aparecer. */}
        <div
          style={revealDelay(3)}
          className="reveal flex h-full items-center overflow-hidden pb-16 pl-6 sm:pl-8 lg:pb-0 lg:pl-0"
        >
          <ul
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTransitionEnd={handleTransitionEnd}
            onClick={handleClick}
            style={{
              transform: `translateX(calc(${-index} * (${SLIDE_SIZE} + ${SLIDE_GAP}) + ${dragOffset}px))`,
            }}
            // touch-pan-y preserva o scroll vertical da página no celular:
            // sem isso o arrasto do carrossel engoliria o gesto.
            // Enquanto arrasta, o grabbing precisa valer também por cima das
            // fotos — elas são botões e, paradas, mostram o pointer da regra
            // base. No meio do gesto o que está acontecendo é arrasto, não
            // clique, e o cursor tem que dizer isso.
            className={`flex touch-pan-y gap-4 select-none ${
              isDragging
                ? "cursor-grabbing [&_button]:cursor-grabbing"
                : "cursor-grab"
            } ${isAnimated ? "transition-transform duration-500 ease-out" : ""}`}
          >
            {SLIDES.map((photo, position) => (
              <li
                key={`${photo.id}-${position}`}
                className="shrink-0"
                style={{ width: SLIDE_SIZE, height: SLIDE_SIZE }}
              >
                <button
                  type="button"
                  data-photo-index={position % TOTAL}
                  aria-label={`Ampliar: ${photo.alt}`}
                  // O pointer vem da regra base: parada, a foto abre o modal, e
                  // é isso que ela anuncia. Quem assume durante o arrasto é a
                  // trilha, com o grabbing.
                  className="relative block size-full overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    // O fantasma nativo de arrastar imagem competiria com o
                    // nosso gesto de pointer.
                    draggable={false}
                    sizes="(min-width: 1024px) 45vw, 80vw"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <GalleryModal index={zoomIndex} onClose={closeZoom} onStep={stepZoom} />
    </section>
  );
}
