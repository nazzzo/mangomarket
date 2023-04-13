import styled from 'styled-components'
import Select from 'react-select'

const ContentWrap = styled.div`
    width: 100%;
    margin-top: 1rem;

    & > textarea::placeholder {
        color: #999;
        font-size: 1.2rem;
    }
`

export const Content = ({ children }) => {
    return <ContentWrap>{children}</ContentWrap>
}

const SubjectWrap = styled.div`
    width: 100%;

    & .input-style {
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: 1px solid #ddd;
    }
`

const StyledSelect = styled(Select)`
    width: 15rem;
    margin-left: 0.9rem;
`

const selectOptions = [
    { value: 'talking', label: '잡담' },
    { value: 'question', label: '질문' },
    { value: 'infomation', label: '정보공유' },
    { value: 'request', label: '요청' },
]

export const CategorySelect = ({ onChange, level }) => {
    level === 'admin' && selectOptions.push({ value: 'notice', label: '공지사항' })
    return (
        <StyledSelect
            placeholder="카테고리 선택"
            options={selectOptions}
            onChange={onChange}
        ></StyledSelect>
    )
}

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

export const TempWrap = styled.div`
    width: 100%;
    height: 2rem;
    margin: 3rem 0;
`

export const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
`

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

    & > div > button {
        margin-top: 1.3rem;
        border-radius: 4px;
    }
`
