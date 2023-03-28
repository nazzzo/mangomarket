import styled from 'styled-components'
import { useTimeStamp } from '../../../hooks'

export const CommunityWrapper = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ddd;
`

export const List = styled.ul`
    width: 100%;
`
export const ItemWrapper = styled.li`
    width: 100%;
    height: 13.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ececec;
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
const TextBoxAContent = styled.span`
    font-size: 1.2rem;
    height: 60%;
    margin-left: 0.8rem;
    margin-top: 0.5rem;
    color: #666;
`
const TextBoxADate = styled.div`
    display: flex;
    height: 30%;
    padding-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;
`

export const TextBoxA = ({ subject, content, date }) => {
    return (
        <TextBoxAStyled>
            <TextBoxASubject>{subject}</TextBoxASubject>
            <TextBoxAContent>{content}</TextBoxAContent>
            <TextBoxADate>{useTimeStamp(date)}</TextBoxADate>
        </TextBoxAStyled>
    )
}
