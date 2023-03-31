// import styled from 'styled-components'
// import { TextArea } from '../../../common/textarea'

// export const UpdateWrapper = styled.div`
//     width: 100%;
//     padding: 30px;
//     & > form > button {
//         margin-left: 80%;
//         margin-top: 2%;
//     }
// `
// export const UpdateForm = styled.form``

// export const UpdateSubject = styled.input`
//     margin-top: 4rem;
//     margin-right: 0.8rem;
//     width: 100%;
//     border: none;
//     word-break: break-all;
//     font-size: 0.9rem;
//     height: 2rem;
//     line-height: 0.9rem;
//     color: gray;
//     padding: 2% 3%;
//     border-bottom: 0.1rem solid #0e0e0e;
// `

// const ContentWrapper = styled.div`
//     width: 100%;
//     border-bottom: 1px solid;
// `
// export const UpdateContent = ({ children }) => {
//     return <ContentWrapper>{children}</ContentWrapper>
// }

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
