import { CategoryOpenerStyled } from "./styled"

export const CategoryOpener = ({ width, height, onClick }) => {
  return (
    <CategoryOpenerStyled width={width} height={height} onClick={onClick}>
      + 카테고리 선택
    </CategoryOpenerStyled>
  );
};
