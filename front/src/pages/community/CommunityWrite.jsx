import styled from "styled-components"

const Button = () => {
  return (
    <button>button</button>
  )
}

const ContentWrap = styled.div`
  width: 100%;
`

const Content = () => {
  return (
    <ContentWrap>
      <textarea placeholder="내용을 입력해주세요"/>
    </ContentWrap>
  )
}

const SubjectWrap = styled.div`
  width: 100%;
`

const Subject = ({width}) => {
  return (
    <SubjectWrap>
      <input type='text' placeholder="제목을 입력해주세요" />
    </SubjectWrap>
  )
}

const CommunityWrap = styled.div`
  width: 100%;
  align-items: center;
`

export const CommunityWrite = () => {
  return (
    <CommunityWrap>
      <Subject width="500px"/>
      <Content />
      <Button />
    </CommunityWrap>
  )
}