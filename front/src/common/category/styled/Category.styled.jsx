import styled from "styled-components"

export const CategoryOpenerStyled = styled.button`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #ccc;
    transition: all 0.3s ease-out;
  }
`;

const CategoryBoxStyled = styled.ul`
  margin-top: 2%;
  width: 100%;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  line-height: 250%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: #888;

  & > li {
    margin-left: 10%;
    width: 40%;
    transition: color 0.2s ease-in-out;
    font-weight: normal;
  }
  & > li:hover {
    color: #333;
    font-weight: bold;
  }
`;

// export const CategoryOpener = ({ height, onClick, children }) => {
//   return (
//     <CategoryOpenerStyled height={height} onClick={onClick}>
//       {children}
//     </CategoryOpenerStyled>
//   );
// };

export const CategoryBox = ({ height, width, children }) => {
  return (
    <CategoryBoxStyled height={height} width={width}>
      {children}
    </CategoryBoxStyled>
  );
};


export const RecommendWrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

const TextHeaderWrap = styled.div`
  height: 15%;
  padding-bottom: 2%;
  margin-bottom: 10%;
  border-bottom: 1px solid #ececec;

  & h2 {
    font-size: 1.3rem;
  }
`

export const TextHeader = ({children}) => {
  return (
    <TextHeaderWrap>
      <h2>{children}</h2>
    </TextHeaderWrap>
  )
}

export const PageCounter = styled.div`
    width: 100%;
    height: 100px;
    /* background-color:red; */
`
