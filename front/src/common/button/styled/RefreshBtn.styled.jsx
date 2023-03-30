import styled, { css, keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RefreshBtnStyled = styled.button`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.3rem;
  line-height: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #ccc;
    transition: all 0.3s ease-out;
  }

  & .iconify {
    ${({ isRotating }) =>
      isRotating &&
      css`
        animation: ${rotate360} 0.5s linear infinite;
      `}
  }
`;