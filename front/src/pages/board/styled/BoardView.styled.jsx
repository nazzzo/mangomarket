import styled from "styled-components";
import { Icon } from "@iconify/react";

const TextBoxWrapper = styled.div`
  padding: 0 2%;
`;

const Subject = styled.h2`
  height: 5rem;
  line-height: 5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const State = styled.span`
  background-color: ${({ theme, color }) => theme[color].color};
  padding: 1.5% 2.5%;
  margin-right: 2%;
  border-radius: 6px;
  font-size: 1.1rem;
  color: #fff;
`

const Category = styled.span`
  color: #999;
  height: 2rem;
  line-height: 2rem;
`;

const Content = styled.div`
  min-height: 10rem;
  padding: 10% 0;
  font-size: 1.1rem;
`;
const Count = styled.div`
  color: #666;
  font-size: 1.1rem;
  height: 3rem;
  margin-bottom: 5rem;
  display: flex;
  & .iconify {
    margin-right: 0.2rem;
  }
`;
const LikeCount = styled.div`
  display: flex;
  margin-right: 0.5rem;
`;
const HitCount = styled.div`
  display: flex;
`;

export const TextBoxA = ({ category, subject, state, date }) => {
    let color;
    if (state === '예약중') {
      color = 'green';
    } else if (state === '교환완료' || state === '숨기기') {
      color = 'grey';
    }
  return (
    <TextBoxWrapper>
      <Subject>{subject}</Subject>
        {(state!=="교환가능") ? <State color={color}>{state}</State> : <></>}
      <Category>
        {category} ᐧ {date}
      </Category>
    </TextBoxWrapper>
  );
};

export const TextBoxB = ({ content, likeCount, hit }) => {
  return (
    <TextBoxWrapper>
      <Content>{content}</Content>
      <Count>
        <LikeCount>
          <Icon icon="mdi:cards-heart" />
          {likeCount}
        </LikeCount>
        <HitCount>
          <Icon icon="ic:outline-remove-red-eye" />
          {hit}
        </HitCount>
      </Count>
    </TextBoxWrapper>
  );
};

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(220, 220, 220, 0.3);
  width: 100%;
`;

const FooterStyled = styled.div`
      height: ${({ footerHeight }) => footerHeight};
      width: ${({ footerWidth }) => footerWidth};
      margin: 0 auto;
      display: flex;
      justify-content:space-between;
      padding-top: 0.7rem;
`

export const Footer = ({ footerHeight, footerWidth, children }) => {
  return (
    <FooterWrap footerHeight={footerHeight}>
      <FooterStyled footerHeight={footerHeight} footerWidth={footerWidth}>
        {children}
      </FooterStyled>
    </FooterWrap>
  );
};


export const ChatBtn = styled.button`
outline: none;
border: none;
margin-left: auto;
padding: 0 3%;
border-radius: 6px;
margin-right: 3%;
height: ${(props) => props.size};
font-size: ${(props) => props.fontSize};
color: #fff;
background:  ${({ theme, color }) => theme[color].color};
cursor: pointer;
transition: all 0.3s ease-out;

&:hover {
  background: ${({ theme, color }) => theme[color].hover};
  transition: all 0.3s ease-out;
}
`