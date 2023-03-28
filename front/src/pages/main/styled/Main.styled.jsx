import styled from 'styled-components'
import { useTimeStamp } from '../../../hooks'

export const HomeWrapper = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ddd;
`

export const List = styled.ul`
    width: 100%;
`

export const ItemWrapper = styled.li`
    width: 100%;
    height: ${({ height }) => height};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ItemImage = styled.img`
    min-width: 30%;
    margin-left: 2%;
    height: 85%;
    display: flex;
    border-radius: 8px;
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
    justify-content: left;
    height: 20%;
    width: 100%;
    margin-top: 1%;

    & > span {
        border-radius: 4px;
        font-size: 0.9rem;
        height: 30px;
        line-height: 0.9rem;
        color: #fff;
        padding: 2% 3%;
        margin-right: 10px;
    }
`
const State = styled.span`
    background-color: ${(props) => props.color};
`

const Category = styled.span`
    background-color: ${(props) => props.color};
`

const TextBoxBStyled = styled.span`
    height: 20%;
    font-size: 1.1rem;
    color: #999;
`

export const TextBoxC = styled.div`
    display: flex;
    height: 60%;
    padding-right: 2%;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: auto;
`

export const Count = styled.span`
    display: flex;
    font-size: 1.2rem;
    margin-left: 0.5rem;
    color: #666;
    & .iconify {
        margin-right: 0.2rem;
    }
`

export const TextBoxA = ({ state, category, subject }) => {
    return (
        <TextBoxAStyled>
            <State color="gray">{state}</State>
            <Category color="orange">{category}</Category>
            <h2>{subject}</h2>
        </TextBoxAStyled>
    )
}

export const TextBoxB = ({ address, date }) => {
    return (
        <TextBoxBStyled>
            {address} ᐧ {useTimeStamp(date)}
        </TextBoxBStyled>
    )
}

export const PageCounter = styled.div`
    width: 100%;
    height: 100px;
    background-color: red;
`
