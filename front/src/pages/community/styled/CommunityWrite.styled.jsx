import styled from 'styled-components'

const ContentWrap = styled.div`
    width: 100%;
    background: red;
    margin-top: 1rem;

    & > textarea {
        width: 100%;
        height: 30rem;
        border: none;
    }
`

export const Content = () => {
    return (
        <ContentWrap>
            <textarea placeholder="내용을 입력해주세요" />
        </ContentWrap>
    )
}

const SubjectWrap = styled.div`
    width: 100%;

    & > input {
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: 0.1rem solid #000000;
    }
`

export const Subject = () => {
    return (
        <SubjectWrap>
            <input type="text" placeholder="제목을 입력해주세요" />
        </SubjectWrap>
    )
}

export const CommunityWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
