"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import { RoundIconButton } from "@/components/ui/RoundIconButton";
import { GALLERY } from "@/constants/gallery";

const TOTAL = GALLERY.length;

export function GalleryModal({
  index,
  direction,
  onClose,
  onStep,
}: {
  /** Índice real da foto na GALLERY, ou null com o modal fechado. */
  index: number | null;
  /** Sinal do último passo: decide de que lado a foto nova entra. */
  direction: number;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;

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
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-gray-950/95 backdrop:bg-gray-950/80"
    >
      {/* Guarda no próprio index, e não numa variável derivada: é ele que
          precisa chegar não-nulo lá embaixo, no contador. */}
      {index !== null && (
        <div className="relative flex h-full w-full items-center justify-center">
          {/* A key remonta este bloco a cada troca, e é o que faz a animação
              tocar de novo: sem ela o React só trocaria o src e o CSS não
              teria motivo para reiniciar. Envolve só a foto — as setas e o
              contador ficam de fora para não piscarem junto. */}
          {/* O inset dá a margem: como a <img> usa fill, ela se resolve contra
              a caixa de padding do pai e um padding aqui não a empurraria —
              o inset empurra. É o que mantém a foto fora das setas. */}
          <div
            key={index}
            style={
              {
                "--gallery-slide-from": direction > 0 ? "3rem" : "-3rem",
              } as React.CSSProperties
            }
            className="gallery-slide-in absolute inset-x-4 inset-y-20 sm:inset-x-20 sm:inset-y-24 lg:inset-24"
          >
            <Image
              src={GALLERY[index].src}
              alt={GALLERY[index].alt}
              fill
              sizes="100vw"
              priority
              // object-contain, não cover: aqui a foto é o conteúdo principal,
              // então ela cresce até ocupar a tela inteira sem perder pedaço.
              className="object-contain"
            />
          </div>

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
            {index + 1} / {TOTAL}
          </span>
        </div>
      )}
    </dialog>
  );
}
