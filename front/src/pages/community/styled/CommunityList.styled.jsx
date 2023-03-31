import styled from 'styled-components'
import { useTimeStamp } from '../../../hooks'
// import { motion } from 'framer-motion'
import { motion } from 'framer-motion'

export const CommunityWrapper = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ddd;
`

export const ItemContent = styled.div`
    width: 70%;
    height: 85%;
    display: flex;
    flex-direction: column;
    padding-left: 3%;
`

const TextBoxAStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-around;
    height: 100%;
    width: 100%;
    margin-top: 1%;
`

const TextBoxASubject = styled.h2`
    font-size: 0.9rem;
    height: 2rem;
    line-height: 0.9rem;
    color: gray;
    padding: 2% 3%;
    margin-right: 0.8rem;
`
const TextBoxAContent = styled.div`
    font-size: 1.2rem;
    height: 60%;
    margin-left: 0.8rem;
    margin-top: 0.5rem;
    color: #666;
    width: 100%;
`
const TextBoxADate = styled.div`
    display: flex;
    height: 30%;
    padding-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;
`

const TextBoxASpan = styled.span`
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
    padding-top: 10%;
`

// export const List = styled(motion.ul)`
//     width: 100%;
// `
// export const ItemWrapper = styled(motion.li)`
//     width: 100%;
//     height: 13.75rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-bottom: 1px solid #ececec;
// `

export const List = styled(motion.ul)`
    width: 100%;
`
export const ItemWrapper = styled(motion.li)`
    width: 100%;
    height: 13.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ececec;
`

export const TextBoxA = ({ subject, content, date }) => {
    return (
        <TextBoxAStyled>
            <TextBoxASubject>{subject}</TextBoxASubject>
            <TextBoxAContent>
                <TextBoxASpan>{content}</TextBoxASpan>
            </TextBoxAContent>
            <TextBoxADate>{useTimeStamp(date)}</TextBoxADate>
        </TextBoxAStyled>
    )
}
