import styled from 'styled-components'

export const ButtonStyled = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    background: ${({ theme, color }) => theme[color].color};
    color: ${({ fontColor }) => fontColor};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    font-size: ${({ fontSize }) => fontSize};
    transition: all 0.3s ease-out;
    &.active {
        background: ${({ theme, color }) => theme[color].active};
    }
    &:hover {
        background: ${({ theme, color }) => theme[color].hover};
        transition: all 0.3s ease-out;
    }
`
