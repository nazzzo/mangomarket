import { SwitchBoxStyled, SwitchStyled } from "./styled";


export const SwitchBox = ({width, height, children}) => {
  return (
    <SwitchBoxStyled width={width} height={height}>
      {[children]}
    </SwitchBoxStyled>
  );
};


export const Switch = ({ children, isActive, onClick, fontSize }) => {
  return (
    <SwitchStyled isActive={isActive} onClick={!isActive ? onClick : null} fontSize={fontSize}>
      {children}
    </SwitchStyled>
  );
};