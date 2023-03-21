import { useState, useEffect, useRef } from "react";

export const useModal = ({ target }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  modalRef.current = target;

  const handleCloser = (e) => {
    if (isOpen && target.current && !target.current.contains(e.target)) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleCloser);
    return () => {
      document.removeEventListener("click", handleCloser);
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    handleCloser,
  }
};
