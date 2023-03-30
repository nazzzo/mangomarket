import styled from "styled-components";
import { useTimeStamp } from "../../../hooks";

const LocalTime = styled.ul``

const Nickname = styled.span``

const Img = styled.img`
    width: 5rem;
    height: 5rem;
`

const ProfileWrapper = styled.div`

  display: flex;
  
  
`

const Content = styled.div`
    margin-top: 2rem;
    margin-bottom: 3rem;
    min-height: 10rem;
    word-break: break-all;
`

const Subject = styled.h3`
    margin-top: 4rem;
    word-break:break-all;
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

// export const ViewWrapper = styled.div`
//     width: 100%;
//     padding: 30px;
// `

export const Profile = ({username, date}) => {
  console.log(`date:::`, username,date)
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

export const Buttons = styled.div`
    display: flex;
    justify-content: right;
    margin-bottom: 2rem;
`


