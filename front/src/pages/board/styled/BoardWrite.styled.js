import styled from "styled-components";
import React from "react";

const SubjectWrap = styled.div`
  margin-top: 2%;
  width: 100%;
  height: ${({ height }) => height};
  border-bottom: 1px solid #ddd;

  & > .input-style,
  input {
    border: none;
    font-size: 1.2rem;
  }
`;

export const Subject = ({ height, children }) => {
  return <SubjectWrap height={height}>{children}</SubjectWrap>;
};

const CategoryOpenerStyled = styled.div`
  padding-left: 2%;
  margin-top: 2%;
  width: 100%;
  height: ${({ height }) => height};
  line-height: 250%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
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

export const CategoryOpener = ({ height, onClick, children }) => {
  return (
    <CategoryOpenerStyled height={height} onClick={onClick}>
      {children}
    </CategoryOpenerStyled>
  );
};

export const CategoryBox = ({ height, width, children }) => {
  return (
    <CategoryBoxStyled height={height} width={width}>
      {children}
    </CategoryBoxStyled>
  );
};

export const Category = styled.input`
  margin-left: 2rem;
  border: none;
  outline: none;
  height: ${({ height }) => height};
  font-size: ${({ fontSize }) => fontSize};
  color: #666;
  cursor: pointer;
`;

const WishListWrap = styled.div`
  padding-left: 2%;
  margin-top: 1%;
  width: 100%;
  height: ${({ height }) => height};
  line-height: 250%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
`;
export const WishList = ({ height, children }) => {
  return <WishListWrap height={height}>{children}</WishListWrap>;
};

const TextArea = styled.textarea`
  margin-top: 2%;
  padding: 2%;
  width: 100%;
  height: ${({ height }) => height};
  font-size: 1.2rem;
  outline: none;
  border: none;
  resize: none;

  &::placeholder {
    color: #999;
  }
`;
export const Content = React.forwardRef((props, ref) => {
    const { height, placeholder } = props;
    return (
      <>
        <TextArea ref={ref} height={height} placeholder={placeholder} />
      </>
    );
  });

export const Submit = styled.button`
  outline: none;
  border: none;
  margin: 1% 0 5% 75%;
  padding: 1.5% 3%;
  border-radius: 6px;
  font-size: ${(props) => props.fontSize};
  background: ${({ theme, color }) => theme[color].color};
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background: ${({ theme, color }) => theme[color].hover};
    transition: all 0.3s ease-out;
  }
`;
