/**
 * Botão redondo de ícone, compartilhado pelas setas do carrossel e pelos
 * controles do modal. O fundo semitransparente só aparece por cima das fotos
 * do modal — sobre o gray-950 da seção ele se dissolve no próprio fundo.
 */
export function RoundIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-gray-950/60 text-white transition-colors hover:border-cyan-500 hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
    >
      {children}
    </button>
  );
}
