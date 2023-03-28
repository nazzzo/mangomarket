import styled from "styled-components";

export const HashTagContainer = styled.div`
  width: ${({ width }) => width};


  & .input-style {
    height: ${({ height }) => height};
    margin-left: 2%;
    width: 80%;
    border: none;
  }
`;

export const HashTagItem = styled.div`
  background: ${({ theme, color }) => theme[color].color};
  color: #fff;
  padding: 0 2%;
  border-radius: 6px;
  margin-top: 0.5rem;
  margin-right: 1rem;
  display: inline-block;
  position: relative;

  &:hover::after {
    content: "x";
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 0.8rem;
    text-align: center;
    line-height: 1.1rem;
    background-color: #555;
    color: #fff;
    z-index: 2;
    top: -5%;
    right: -10%;
    border-radius: 50%;
    position: absolute;
}
`;

export const HashTagText = styled.span`
  margin-right: 0.5rem;
`;
