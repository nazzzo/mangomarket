import { useState } from "react"
import { RefreshBtnStyled } from "./styled"
import { Icon } from '@iconify/react';

export const RefreshBtn = ({ width, height, onClick }) => {
    const [isRotating, setIsRotating] = useState(false);
  
    const handleClick = () => {
        setIsRotating(true);
        setTimeout(() => {
          setIsRotating(false);
        }, 500);
        onClick();
      };
  
    return (
      <RefreshBtnStyled width={width} height={height} onClick={handleClick} isRotating={isRotating}>
        <Icon icon="material-symbols:refresh" />
      </RefreshBtnStyled>
    );
  };