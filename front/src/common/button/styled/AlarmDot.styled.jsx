import styled from 'styled-components'

export const DotStyled = styled.div`
    width: 12px;
    height: 12px;
    background-color: #cd342f;
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: ${({ top }) => top};
    left: ${({ left }) => left};
    right: ${({ right }) => right};
`