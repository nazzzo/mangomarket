import styled from 'styled-components'
import { TextArea } from '../../../common/textarea'

export const UpdateWrapper = styled.div`
    width: 100%;
    padding: 30px;
    & > form > button {
        margin-left: 80%;
        margin-top: 2%;
    }
`
export const UpdateForm = styled.form``

export const UpdateSubject = styled.input`
    margin-top: 4rem;
    margin-right: 0.8rem;
    width: 100%;
    border: none;
    word-break: break-all;
    font-size: 0.9rem;
    height: 2rem;
    line-height: 0.9rem;
    color: gray;
    padding: 2% 3%;
    border-bottom: 0.1rem solid #0e0e0e;
`

const ContentWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid;
`
export const UpdateContent = ({ children }) => {
    return <ContentWrapper>{children}</ContentWrapper>
}

// export const UpdateButtons = styled.button`
//     display: flex;
//     justify-content: right;
//     align-items: center;
//     height: 3rem;
//     margin-bottom: 2rem;
//     & > button {
//         margin-left: 2rem;
//         padding: 2% 3%;
//         cursor: pointer;
//     }
// `

// const LocalTime = styled.ul``

// const Nickname = styled.span``

// const Img = styled.img`
//     width: 5rem;
//     height: 5rem;
// `

// const ProfileWrapper = styled.div`
//     display: flex;
// `

// export const UpdateProfile = ({ username, date }) => {
//     return (
//         <ProfileWrapper>
//             <Img />
//             <Nickname>{username}</Nickname>
//             <LocalTime>
//                 <li>논현 고잔동</li>
//                 <li>{useTimeStamp(date)}</li>
//             </LocalTime>
//         </ProfileWrapper>
//     )
// }

// const CommentWrapper = styled.div`
//     margin-top: 2rem;
// `

// const CommentInput = styled.div`
//     display: flex;
//     align-items: center;
// `

// const ContentInput = styled.input`
//     flex: 1;
//     padding: 0.5rem;
//     border: 1px solid #ccc;
//     border-right: none;
// `

// const CommentButton = styled.button`
//     background-color: #4cf504;
//     color: black;
//     border: none;
//     border-radius: 0 5px 5px 0;
//     padding: 0.5rem 1rem;
//     cursor: pointer;
// `

// export const UpdateComment = () => {
//     return (
//         <CommentWrapper>
//             <>같이가요</>
//             <CommentInput>
//                 <ContentInput />
//                 <CommentButton>button</CommentButton>
//             </CommentInput>
//         </CommentWrapper>
//     )
// }
