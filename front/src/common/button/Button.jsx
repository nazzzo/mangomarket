import { ButtonStyled } from "./styled";

export const Button = ({ children, color, fontColor, fontSize, width, height, active }) => {
  const isActive = active && {className: 'active'}

  return (
    <ButtonStyled
      color={color}
      active={color.active}
      fontColor={fontColor}
      fontSize={fontSize}
      width={width}
      height={height}
      {...isActive}
    >
      {children}
    </ButtonStyled>
  );
};
