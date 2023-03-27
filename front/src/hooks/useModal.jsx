import { useState, useEffect, useRef, useCallback } from "react";

export const useModal = ({ target }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  modalRef.current = target;

  const handleCloser = useCallback((e) => {
    if (isOpen && target.current && !target.current.contains(e.target)) setIsOpen(false);
  }, [isOpen, target]);

  useEffect(() => {
    document.addEventListener("click", handleCloser);
    return () => {
      document.removeEventListener("click", handleCloser);
    };
  }, [handleCloser]);

  return {
    isOpen,
    setIsOpen,
    handleCloser,
  }
};
