import styled from "styled-components";

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
  align-content: ;
  
`

export const Profile = () => {
  return (
    <ProfileWrapper>
      <Img />
      <Nickname>이정민</Nickname>
      <LocalTime>
        <li>논현 고잔동</li>
        <li>3시간 전</li>
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

export const ViewContent = ({children}) => {
  return (
    <ContentWrapper>
      <Subject>
        저녁에 같이 산책하실분?
      </Subject>
      <Content>
        산책 가즈아
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