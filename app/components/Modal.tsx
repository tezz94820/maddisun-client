"use client";

import { useModal } from "../context/ModalContext";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/40 flex justify-center items-center z-50">
      {content}
    </div>
  );
};

export default Modal;
