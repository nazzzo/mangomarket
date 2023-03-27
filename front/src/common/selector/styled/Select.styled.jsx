import styled from "styled-components";

export const SelectorWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  width: ${({width}) => width};
  height: ${({height}) => height};
`;


export const Selector = styled.li`
  flex: 1;
  cursor: pointer;
  font-size:20px;
  background-color: ${(props) => (props.isActive ? "#fff" : "#ededed")};
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({fontSize}) => fontSize}
`;
