import styled from "styled-components";
import { Icon } from "@iconify/react";

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
  padding: 2% 0;
`;

const ChatterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  font-size: 0.8rem;
  color: #888;
`;

export const ChatterCard = ({ onClick, chatter }) => {
  return (
    <ChatterCardWrap>
      <ChatterImgWrap>
        <ChatterImg src={chatter.userImg} />
      </ChatterImgWrap>
      <ChatterInfoWrap>
        <ChatterUserName>{chatter.username}</ChatterUserName>
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
  width: 80%;
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
