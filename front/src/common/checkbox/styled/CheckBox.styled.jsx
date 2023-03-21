import styled, { css } from "styled-components";

export const LabelStyled = styled.label`
  cursor: pointer;
  font-size: ${({ size }) => size};
  color: ${({ theme, color }) => theme[color].color};
`;

export const InputStyled = styled.input`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  color: ${({ theme, color }) => theme[color].hover};
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  border-radius: 50%;
  background-color: #ffffff;
  transition: background 300ms;
  cursor: pointer;
  margin-right: 5px;

  &::before {
    content: "";
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 1px #ccd3d8;
  }

  &:checked {
    background-color: currentcolor;
  }

  &:checked::before {
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
  }
`;
