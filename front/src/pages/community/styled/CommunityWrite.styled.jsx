import styled from 'styled-components'

const ContentWrap = styled.div`
    width: 100%;
    margin-top: 1rem;

    & > textarea {
        width: 100%;
        height: 30rem;
        border: none;
    }
`

export const Content = ({value, onChange}) => {
    return (
        <ContentWrap>
            <textarea value={value} onChange={onChange} placeholder="내용을 입력해주세요" />
        </ContentWrap>
    )
}

const SubjectWrap = styled.div`
    width: 100%;

    & .input-style {
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: 0.1rem solid #000000;
    }
`

export const Subject = ({ children }) => {
    return <SubjectWrap>{children}</SubjectWrap>
}

const CommunityWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > button {
        display: block;
        margin-left: 79%;
    }
`

export const Community = ({ children }) => {
    return <CommunityWrap>{children}</CommunityWrap>
}

const KakaoMapWrap = styled.div`
    width: 100%;
    height: 10rem;
    background: grey;
    margin: 3rem 0;
`

export const KakaoMap = () => {
    return <KakaoMapWrap>KakaoMap</KakaoMapWrap>
}

export const CommunityForm = styled.form`
    width: ${({ width }) => width};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1.8rem;

    & > * {
        margin-bottom: 1rem;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 4px #00337c;
        }
        50% {
            box-shadow: 0 0 8px #00337c;
        }
        100% {
            box-shadow: 0 0 4px #00337c;
        }
    }

    & > button {
        margin-top: 1.3rem;
        border-radius: 4px;
        margin-left: 79%;
    }
`
