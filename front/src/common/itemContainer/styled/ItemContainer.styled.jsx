import styled from 'styled-components'
import { useTimeStamp } from '../../../hooks'

export const HomeWrapper = styled.div`
    background-color: #fff;
    height: 80%;
    width: 100%;
    overflow-y: scroll;
`

export const List = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 3%;    
`

export const ItemWrapper = styled.li`
    width: 42%;
    height: 42%;
`

const ItemImageWrap = styled.div`
    width: 10rem;
    height: 9rem;
    border-radius: 8px;

    & img {
        object-fit: cover;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`

export const ItemImage = ({ size, src }) => {
    return (
        <ItemImageWrap siez={size}>
            <img src={src} alt="" />
        </ItemImageWrap>
    )
}


const RecommendImageWrap = styled.div`
    width: 12rem;
    height: 10rem;
    border-radius: 8px;

    & img {
        object-fit: cover;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`

export const RecommendItemImage = ({ size, src }) => {
    return (
        <RecommendImageWrap siez={size}>
            <img src={src} alt="" />
        </RecommendImageWrap>
    )
}


export const ItemContent = styled.div`
    width: 85%;
    height: 85%;
`

const TextBoxAStyled = styled.div`
    height: 20%;
    width: 10rem;
    margin-top: 8%;
    margin-bottom: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
        border-radius: 4px;
        font-size: 0.9rem;
        height: 20px;
        line-height: 0.9rem;
        color: #fff;
        padding: 2% 3%;
    }
`
const State = styled.span`
    background-color: ${(props) => props.color};
`

const Subject = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const Date = styled.p`
    min-width: 30%;
    text-align: center;
    font-size: 0.8rem;
    color: #666;
`


export const TextBoxA = ({ state, subject, createdAt }) => {
    return (
        <TextBoxAStyled>
            {state !== 'public' ? <State color="yellow">{state}</State> : <></>}
            <Subject>{subject}</Subject>
            <Date>{useTimeStamp(createdAt)}</Date>
        </TextBoxAStyled>
    )
}

export const PageCounter = styled.button`
    width: 100%;
    height: 10px;
    opacity: 0;

`
