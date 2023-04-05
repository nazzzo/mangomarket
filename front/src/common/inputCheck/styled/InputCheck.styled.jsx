import styled from "styled-components"

export const InvalidInputAlert = styled.span`
    color: ${({ theme, color }) => theme[color].color};
    font-size: 0.75rem;
`