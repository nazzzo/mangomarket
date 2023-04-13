import styled from 'styled-components'
import { useTimeStamp } from '../../../hooks'

const Info = styled.div`
    margin-left: 1rem;
`

const LocalTime = styled.ul`
    display: flex;
    transform: translateY(200%);
    & > li {margin-right: 10px;};
    &:nth-child(2){color: grey;} 
`

const Nickname = styled.span``

const Img = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
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

const Subject = styled.h2`
    margin-top: 4rem;
    word-break: break-all;
`

const ContentWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid;
`

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
    background-color: #4cf504;
    color: black;
    border: none;
    border-radius: 0 5px 5px 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
`
export const ViewWrapper = styled.div`
    width: 100%;
`

export const ViewContent = ({ children, subject, content }) => {
    return (
        <ContentWrapper>
            <Subject>{subject}</Subject>
            <Content>{content}</Content>
            {children}
        </ContentWrapper>
    )
}

export const Profile = ({ username, date, img, address }) => {
    console.log(`date:::`, username, date)
    return (
        <ProfileWrapper>
            <Img src={img}/>
            <Info>
                <Nickname>{username}</Nickname>
                <LocalTime>
                    <li>{address}</li>
                    <li>{useTimeStamp(date)}</li>
                </LocalTime>
            </Info>
        </ProfileWrapper>
    )
}

export const Buttons = styled.div`
    display: flex;
    justify-content: right;
    margin-bottom: 2rem;
    & > button {
        margin-left: 2rem;
    }
`
