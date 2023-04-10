import styled from "styled-components";
import Select from "react-select";

export const DistanceBtnStyled = styled.button`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-weight: bold; 
  font-size: 1rem;
  line-height: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #ccc;
    transition: all 0.3s ease-out;
  }
`;

export const SelectStyled = styled(Select)`
  width: ${(props) => props.width};
`;
