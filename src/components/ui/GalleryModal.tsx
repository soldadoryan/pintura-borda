"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { GALLERY } from "@/constants/gallery";

const TOTAL = GALLERY.length;

/**
 * Onde a foto para. Como a <img> usa fill, ela se resolve contra a caixa de
 * padding do pai e um padding aqui não a empurraria — o inset empurra. É o que
 * a mantém fora das setas. O 3xl:inset-0 devolve a foto a 100% da tela: a
 * margem existe só onde as setas disputariam espaço com ela.
 */
const PHOTO_INSET =
  "absolute inset-x-4 inset-y-20 sm:inset-x-20 sm:inset-y-24 lg:inset-24 3xl:inset-0";

export function GalleryModal({
  index,
  onClose,
  onStep,
}: {
  /** Índice real da foto na GALLERY, ou null com o modal fechado. */
  index: number | null;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;

  /**
   * As duas pontas do cruzamento. Duas camadas, e não a galeria inteira
   * empilhada: aqui as fotos são pedidas em 100vw, e manter todas montadas
   * baixaria a galeria toda em tamanho cheio só para trocar de uma foto.
   */
  const [{ current, previous }, setPhotos] = useState<{
    current: number | null;
    previous: number | null;
  }>({ current: index, previous: null });

  /**
   * Ajuste durante a renderização, e não num efeito: o efeito só rodaria depois
   * do primeiro paint, e a foto nova daria um flash antes de a animação pegar.
   */
  if (current !== index) {
    setPhotos({
      current: index,
      // Fechando não há cruzamento. Zerar aqui é o que impede a foto do último
      // passo de reaparecer saindo na próxima vez que o modal abrir.
      previous: index === null ? null : current,
    });
  }

  /**
   * O <dialog> nativo é aberto por método, não por prop — daí o efeito
   * espelhando o estado. Em troca, o showModal() dá de graça o Esc, o foco
   * preso dentro do modal e o "top layer": ele sobe acima de qualquer
   * z-index da página, inclusive o do botão flutuante do WhatsApp.
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onStep]);

  return (
    <dialog
      ref={dialogRef}
      // O Esc fecha o dialog por conta própria: sem este onClose o estado do
      // React ficaria achando que o modal continua aberto.
      onClose={onClose}
      // fixed + inset-0 em vez de medir a largura em 100vw: o 100vw conta a
      // barra de rolagem da página como se fosse espaço útil, e o modal nascia
      // mais largo que a tela — era daí a barra horizontal que aparecia ao
      // abrir. Preso ao inset, ele mede a área visível de verdade. O
      // overflow-hidden é a garantia de que nada aqui dentro crie barra.
      className="fixed inset-0 m-0 h-auto max-h-none w-auto max-w-none overflow-hidden bg-gray-950/95 backdrop:bg-gray-950/80"
    >
      {current !== null && (
        <div className="relative flex h-full w-full items-center justify-center">
          {/* A key remonta a camada a cada troca, e é o que faz a animação tocar
              de novo: sem ela o React só trocaria o src e o CSS não teria motivo
              para reiniciar. Envolve só as fotos — as setas e o contador ficam
              de fora para não piscarem junto. */}
          {previous !== null && (
            <Photo
              key={`saindo-${previous}`}
              index={previous}
              decorative
              className="gallery-fade-out"
              // A camada que saiu já está invisível: desmontar aqui evita
              // deixar uma foto de tamanho cheio pendurada no DOM.
              onAnimationEnd={() =>
                setPhotos((photos) => ({ ...photos, previous: null }))
              }
            />
          )}

          <Photo
            key={`entrando-${current}`}
            index={current}
            className="gallery-fade-in"
          />

          <div className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
            <RoundIconButton label="Fechar" onClick={onClose}>
              <FiX aria-hidden className="size-6" />
            </RoundIconButton>
          </div>

          <div className="absolute top-1/2 left-3 z-10 -translate-y-1/2 sm:left-6">
            <RoundIconButton label="Foto anterior" onClick={() => onStep(-1)}>
              <FiChevronLeft aria-hidden className="size-6" />
            </RoundIconButton>
          </div>

          <div className="absolute top-1/2 right-3 z-10 -translate-y-1/2 sm:right-6">
            <RoundIconButton label="Próxima foto" onClick={() => onStep(1)}>
              <FiChevronRight aria-hidden className="size-6" />
            </RoundIconButton>
          </div>

          <span
            aria-live="polite"
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gray-950/60 px-4 py-2 text-sm text-gray-300"
          >
            {current + 1} / {TOTAL}
          </span>
        </div>
      )}
    </dialog>
  );
}

function Photo({
  index,
  className,
  decorative = false,
  onAnimationEnd,
}: {
  index: number;
  className: string;
  /** A foto que está saindo: ainda na tela, mas já não é o conteúdo. */
  decorative?: boolean;
  onAnimationEnd?: () => void;
}) {
  const photo = GALLERY[index];

  return (
    <div
      // Some do leitor de tela enquanto sai, senão as duas fotos seriam
      // anunciadas ao mesmo tempo no meio do cruzamento.
      aria-hidden={decorative || undefined}
      onAnimationEnd={onAnimationEnd}
      className={`${PHOTO_INSET} ${className}`}
    >
      <Image
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        fill
        sizes="100vw"
        priority
        // object-contain, não cover: aqui a foto é o conteúdo principal,
        // então ela cresce até ocupar a tela inteira sem perder pedaço.
        className="object-contain"
      />
    </div>
  );
}
