import styled from "styled-components";

export const InfoWrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
`

export const UserImg = styled.img`
  width: ${(props) => props.imgSize};
  height: ${(props) => props.imgSize};
  border-radius: 50%;
`

export const UserName = styled.span`
  margin-left: 12px;
  font-size: ${(props) => props.fontSize};
`