import styled from "styled-components";
import { useTimeStamp } from "../../../hooks";

const GlobalChatWrapStyled = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #fff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  overflow-y: hidden;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 8.5%;
  border-radius: 6px 6px 0 0;
  background: url(https://i.ibb.co/Xxbw7Bb/mangomarket5.png) no-repeat;
  background-color: #fda31b;
  background-size: 35%;
  background-position: center 50%;
`;

export const GlobalChatWrap = ({ width, height, children }) => {
  return (
    <GlobalChatWrapStyled width={width} height={height}>
      <ImageBox />
      {children}
    </GlobalChatWrapStyled>
  );
};

export const ChatterWrap = styled.div`
  height: 81.5%;
  width: 100%;
  overflow-y: scroll;
`

export const Chatters = styled.ul``;

export const ChatterItem = styled.li`
  display: flex;
  height: 80px;
  width: 100%;
  padding: 0 3%;
  margin: 0 auto;
  position: relative;

  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
`;

export const ChatterImgWrap = styled.div`
  width: 16%;
  padding: 2% 0;
`;

export const ChatterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const ChatterContentWrap = styled.div`
  width: 66%;
  height: 100%;
  padding: 3%;
  display: flex;
  flex-direction: column;
`;

const ChatterUserWrap = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: left;
  align-items: center;

  & > div + div {
    margin-top: 0.5rem;
  }
`;
const ChatterUserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;
const ChatterUserInfo = styled.span`
  font-size: 0.75rem;
  color: #999;
  padding-left: 0.5rem;
`;

export const ChatterUser = ({ username, address, date }) => {
  return (
    <ChatterUserWrap>
      <ChatterUserName>{username}</ChatterUserName>
      <ChatterUserInfo>
        {address}•{useTimeStamp(date)}
      </ChatterUserInfo>
    </ChatterUserWrap>
  );
};

export const ChatterContent = styled.span`
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const BoardImgWrap = styled.div`
  width: 18%;
  padding: 4% 2%;
  border-radius: 4px;
`;

export const BoardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
