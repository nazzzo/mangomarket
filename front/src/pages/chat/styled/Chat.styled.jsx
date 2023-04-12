import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useTimeStamp } from "../../../hooks";



const CustomerChatWrapStyled = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #fff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  overflow-y: hidden;
`

const ImageBox = styled.div`
  width: 100%;
  height: 8.5%;
  border-radius: 6px 6px 0 0;
  background: url(https://i.ibb.co/Xxbw7Bb/mangomarket5.png) no-repeat;
  background-color: #fda31b;
  background-size: 35%;
  background-position: center 50%;
`;

export const CustomerChatWrap = ({ width, height, children }) => {
    return (
      <CustomerChatWrapStyled width={width} height={height}>
        <ImageBox />
        {children}
      </CustomerChatWrapStyled>
)}

const ChatterCardWrap = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  padding: 0 3%;
  margin: 0 auto;
  border-bottom: 1px solid #ececec;
`;

const GoBackBtn = styled.button`
  width: 10%;
  margin-left: auto;
  position: relative;
  border: none;
  outline: none;
  background: #fff;

  & .iconify {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    transition: all 0.3s ease-out;
  }
  & .iconify:hover {
    color: #999;
    transition: all 0.3s ease-out;
  }
`;

const ChatterImgWrap = styled.div`
  width: 11%;
  padding: 2.3% 0;
`;

const ChatterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

const ChatterInfoWrap = styled.div`
  padding: 2%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ChatterUserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const ChatterAddress = styled.span`
  padding-top: 3%;
  font-size: 0.75rem;
  color: #888;
`;

export const ChatterCard = ({ onClick, chatter }) => {
    console.log(chatter)
  return (
    <ChatterCardWrap>
      <ChatterImgWrap>
        <ChatterImg src={chatter.image} />
      </ChatterImgWrap>
      <ChatterInfoWrap>
        <ChatterUserName>{chatter.subject}</ChatterUserName>
        <ChatterAddress>{chatter.address}</ChatterAddress>
      </ChatterInfoWrap>
      <GoBackBtn onClick={onClick}>
        <Icon icon="mdi:backburger" />
      </GoBackBtn>
    </ChatterCardWrap>
  );
};

const ChatFormWrap = styled.div`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatFormStyled = styled.form`
  display: flex;
  width: 100%;
  justify-content: right;
  padding-right: 3%;
`;

export const ChatInput = styled.input`
  border: none;
  border-radius: 20px;
  width: 76%;
  height: 40px;
  background-color: #f3f3f3;
  padding-left: 5%;
  outline: none;
`;

export const ChatButtonStyled = styled.button`
  margin-left: 2%;
  width: 12%;
  position: relative;
  border: none;
  outline: none;
  background: #fff;

  & .iconify {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    transition: all 0.3s ease-out;
  }
  & .iconify:hover {
    color: #999;
    transition: all 0.3s ease-out;
  }
`;


export const ChatOptionStyled = styled.div`
  margin-left: 2%;
  width: 12%;
  position: relative;
  border: none;
  outline: none;
  background: #fff;

  & .chatMenu {
    pointer-events: none;
  }

  &.on .chatMenu {
       opacity: 1;
       pointer-events: auto;
       transition: all 0.2s ease-out;
  }
  & .iconify {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    transition: all 0.3s ease-out;
  }
  & .iconify:hover {
    color: #333;
    transition: all 0.3s ease-out;
  }
`;


export const ChatOption = ({onClick, className, children}) => {
    return (
      <ChatOptionStyled type="button" className={className} onClick={onClick}>
        <Icon icon="mdi:plus-circle" />
        {children}
      </ChatOptionStyled>
    );
};

const ChatMenuWrapper = styled.div`
    width: 15rem;
    height: 3.5rem;
    opacity: 0;
    transition: all 0.2s ease-out;
    position: absolute;
    bottom: 170%;
    left: 20%;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 2%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`

export const ChatMenu = ({onClick, className, children}) => {
    return <ChatMenuWrapper className={className}>
        {children}
        <div onClick={onClick}>약속 잡기</div>
        <div>취소하기</div>
    </ChatMenuWrapper>
}
  

export const ChatButton = ({ type }) => {
  return (
    <ChatButtonStyled type={type}>
      <Icon icon="mdi:paper-airplane" />
    </ChatButtonStyled>
  );
};

export const ChatForm = ({ onSubmit, children }) => {
  return (
    <ChatFormWrap>
      <ChatFormStyled onSubmit={onSubmit}>{children}</ChatFormStyled>
    </ChatFormWrap>
  );
};







export const ChatLogWrap = styled.div`
    width: 100%;
    height: 74%;
    padding-bottom: 8%;
    background-color: #ececec;
    overflow-y: scroll;
`

export const ChatLogs = styled.div``

export const LiveChats = styled.div``



export const CenterMessageWrap = styled.div`
    width: 100%;
    padding: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
`



export const LeftMessageWrap = styled.div`
    width: 100%;
    padding: 2%;
    display: flex;
    justify-content: left;
    align-items: center;
`

export const RightMessageWrap = styled.div`
    width: 100%;
    padding: 2%;
    display: flex;
    justify-content: right;
    align-items: center;
`
const ChatUserImgWrap = styled.div`
  width: 45px;
  height: 45px;
  padding: 1%;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1.5px solid #fff;
  }
`

export const ChatUserImg = ({src}) => {
    return <ChatUserImgWrap><img src={src} alt="" /></ChatUserImgWrap>
}

const ChatMessageStyled = styled.div`
    font-size: 0.9rem;
    color: #fff;
    background: ${({color, theme}) => theme[color]?.color};
    padding: 2%;
    margin: 1.5%;
    border-radius: 6px;
    max-width: 70%;
`


export const ChatMessage = ({ color , content}) => {
    return <ChatMessageStyled color={color}>{content}</ChatMessageStyled>
}


const ChatTimeStyped = styled.div`
    color: #666;
    font-size: 0.7rem;
`

export const ChatTime = ({date}) => {
    return <ChatTimeStyped>{useTimeStamp(date)}</ChatTimeStyped>
}