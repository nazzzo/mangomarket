import { useEffect, useRef } from "react";
import { AlertWrapper, AlertContent } from "./styled";
import { Icon } from '@iconify/react';


export const Alert = ({ isOpenAlert, onClose, children, width, height, color }) => {
  const AlertRef = useRef(null);

  useEffect(() => {
    const handleClose = (e) => {
      if (AlertRef.current && !AlertRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return isOpenAlert ? (
    <AlertWrapper>
      <AlertContent ref={AlertRef} width={width} height={height} color={color}>
        <Icon icon="ph:x" onClick={onClose} />
        {children}
      </AlertContent>
    </AlertWrapper>
  ) : null;
};
