import { LabelStyled, InputStyled } from "./styled";

export const CheckBox = ({ color, size, text, id, onChange, checked }) => {
  return (
    <>
      <InputStyled type="checkbox" color={color} size={size} id={id} onChange={onChange} checked={checked} />
      <LabelStyled color={color} size={size} htmlFor={id}>{text}</LabelStyled>
    </>
  );
};
