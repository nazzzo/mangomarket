import styled from "styled-components";
import Select from "react-select";

export const TimerBtnStyled = styled.button`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  outline: none;
  border: none;
  position: relative;
  background-color: transparent;
  line-height: 1rem;
  transition: all 0.3s ease-out;
`;

export const SelectorStyled = styled(Select)`
  width: ${(props) => props.width};

  &.select_menu {
    top: 100%;
  }
`;
