import { useCallback } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  // Обработчик клика для закрытия по бекдропу
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  return createPortal(
    <dialog
      open
      className="fixed inset-0 w-full h-full z-50 bg-black/75 flex justify-center items-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded-lg shadow max-w-md w-full relative">
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-full absolute top-2 right-2"
          >
            ❌
          </button>
        )}
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};
