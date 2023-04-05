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
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: ${({ backgroundColor }) => backgroundColor};
        border-radius: 8px;
    }

    & img {
        object-fit: cover;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`

export const ItemImage = ({ size, src, state }) => {
    let color;
    let backgroundColor;
    if (state === 'reserved') {
        state = '예약중';
        color = 'green';
    } else if (state === 'sold') {
        state = '교환완료';
        color = 'grey';
        backgroundColor = 'rgba(0,0,0,0.4)'
    }

    return (
        <ItemImageWrap siez={size} backgroundColor={backgroundColor}>
            {state !== 'public' ? <State color={color}>{state}</State> : <></>}
            <img src={src} alt="" />
        </ItemImageWrap>
    )
}


const RecommendImageWrap = styled.div`
    width: 12rem;
    height: 10rem;
    border-radius: 8px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: ${({ backgroundColor }) => backgroundColor};
        border-radius: 8px;
    }

    & img {
        object-fit: cover;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`
const State = styled.span`
    background: ${({ theme, color }) => theme[color].color};
    color: #fff;
    position: absolute;
    top: 5%;
    left: 5%;
    padding: 4% 6%;
    font-size: 0.9rem;
    border-radius: 6px;
`

export const RecommendItemImage = ({ size, src, state }) => {
    let color;
    let backgroundColor;
    if (state === 'reserved') {
        state = '예약중';
        color = 'green';
    } else if (state === 'sold') {
        state = '교환완료';
        color = 'grey';
        backgroundColor = 'rgba(0,0,0,0.4)'
    }

    return (
        <RecommendImageWrap siez={size} backgroundColor={backgroundColor}>
            {state !== 'public' ? <State color={color}>{state}</State> : <></>}
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


export const TextBoxA = ({ subject, createdAt }) => {
    return (
        <TextBoxAStyled>
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
