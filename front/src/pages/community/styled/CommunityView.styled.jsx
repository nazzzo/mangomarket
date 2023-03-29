import styled from "styled-components";
import { useTimeStamp } from "../../../hooks";

export const ViewWrapper = styled.div`
  width: 100%;
  padding: 30px;
`

const LocalTime = styled.ul`
`

const Nickname = styled.span`

`

const Img = styled.img`
  width: 5rem;
  height: 5rem;
`

const ProfileWrapper = styled.div`
  display: flex;
  
  
`

export const Profile = ({username, date}) => {
  return (
    <ProfileWrapper>
      <Img />
      <Nickname>{username}</Nickname>
      <LocalTime>
        <li>논현 고잔동</li>
        <li>{useTimeStamp(date)}</li>
      </LocalTime>
    </ProfileWrapper>
  )
}

const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  min-height: 10rem;
`

const Subject = styled.h3`
  margin-top: 4rem;
`

const ContentWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid;
`

export const ViewContent = ({children, subject, content}) => {
  return (
    <ContentWrapper>
      <Subject>
        {subject}
      </Subject>
      <Content>
        {content}
      </Content>
      {children}
    </ContentWrapper>
  )
}

const CommentWrapper = styled.div`
  margin-top: 3rem;
`

export const Comment = () => {
  return (
    <CommentWrapper>
      같이가요
    </CommentWrapper>
  )
}

export const Buttons = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 2rem;
`