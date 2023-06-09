import { useEffect, useRef } from "react";
import { ModalWrapper, ModalContent } from "./styled";
import { Icon } from '@iconify/react';


export const Modal = ({ isOpen, setIsOpen, children, width, height }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClose = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen();
      }
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        setIsOpen();
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  return isOpen ? (
    <ModalWrapper>
      <ModalContent ref={modalRef} width={width} height={height}>
        <Icon icon="ph:x" onClick={() => setIsOpen(false)} />
        {children}
      </ModalContent>
    </ModalWrapper>
  ) : null;
};
