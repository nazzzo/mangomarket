import styled, { css } from "styled-components";

const inputStyle = css`
  border: none;
  outline: none;
  padding: 0 3%;
  width: 100%;
  height: 100%;
`;

export const InputStyled = styled.span`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: block;
  position: relative;
  border: solid 1px #dadada;
  background: ${(props) => props.color};

  & .iconify {
    font-size: ${(props) => props.fontSize};
    top: 50%;
    right: 3%;
    transform: translate(-50%, -50%);
    position: absolute;
    color: #999;
}

& .iconify.password-icon {
  color: #000;
  cursor: pointer;
}

  & input {
    ${inputStyle}
    font-size: ${(props) => props.fontSize};
    z-index: 2;
  }
`;