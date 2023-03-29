import styled from "styled-components";
import { Input } from "../../../common/input";
import { useTimeStamp } from "../../../hooks";

export const ViewWrapper = styled.div`
    width: 100%;
    padding: 30px;
`

const LocalTime = styled.ul``

const Nickname = styled.span``

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
  margin-top: 2rem;
`

const CommentInput = styled.div`
  display: flex;
  align-items: center;
`

const ContentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-right: none;
`

const CommentButton = styled.button`
  background-color: #4CF504;
  color: black;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
`

export const Comment = () => {
  return (
    <CommentWrapper>
      <>같이가요</>
      <CommentInput>
        <ContentInput />
        <CommentButton>button</CommentButton>
      </CommentInput>
    </CommentWrapper>
  )
}

export const Buttons = styled.div`
    display: flex;
    justify-content: right;
    margin-bottom: 2rem;
`
