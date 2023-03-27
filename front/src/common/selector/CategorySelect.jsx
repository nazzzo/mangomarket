import { SelectorWrap, Selector } from "./styled";



export const CategorySelector = ({ children, isActive, onClick, fontSize }) => {
  return (
    <SelectorWrap>
        <Selector isActive={isActive} onClick={!isActive ? onClick : null} fontSize={fontSize}>
        {children}
      </Selector>
    </SelectorWrap>
  );
};