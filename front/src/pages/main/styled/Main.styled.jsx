import styled, {css} from 'styled-components'
import { useTimeStamp } from '../../../hooks'
import { motion } from 'framer-motion'


export const HomeWrapper = styled.div`
    padding-top: 5%;
    background-color: #f3f3f3;
    /* border-bottom: 1px solid #ddd; */
`

export const BtnBox = styled.div`
    display: flex;
    width: 500px;
    height: ${({ height }) => height};
    align-items: center;
    margin: 5% 0;
    padding-left: 3%;

    & button {
        margin-right: 1rem;
    }
`

export const List = styled(motion.ul)`
    width: 100%;
`

export const ItemWrapper = styled(motion.li)`
    width: 95%;
    margin: 0 auto;
    height: ${({ height }) => height};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    margin-bottom: 3%;
`

const ItemImageWrap = styled.div`
    /* flex-basis: ${({ size }) => size}; */
    width: 200px;
    height: 200px;
    padding-left: 2%;
    height: 85%;
    display: flex;
    border-radius: 8px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 95%;
        height: 100%;
        margin-left: 5%;
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
    left: 10%;
    padding: 4% 6%;
    font-size: 0.9rem;
    border-radius: 6px;
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
        <ItemImageWrap siez={size} backgroundColor={backgroundColor} >
            {state !== 'public' ? <State color={color}>{state}</State> : <></>}
            <img src={src} alt="" />
        </ItemImageWrap>
    )
}

export const ItemContent = styled.div`
    width: 60%;
    height: 85%;
    display: flex;
    flex-direction: column;
    padding-left: 3%;
`

const TextBoxAStyled = styled.div`
    display: flex;
    justify-content: left;
    height: 20%;
    width: 95%;
    margin-top: 1%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    & > span {
        border-radius: 4px;
        font-size: 0.9rem;
        height: 30px;
        line-height: 1.2rem;
        color: #fff;
        padding: 2% 3%;
        margin-right: 10px;
    }

    & h2 {
        text-overflow: ellipsis;
        overflow: hidden;
    }
`

const Category = styled.span`
    background-color: ${(props) => props.color};
`

const TextBoxBStyled = styled.span`
    height: 20%;
    font-size: 0.9rem;
    color: #999;
`

export const TextBoxD = styled.div`
    display: flex;
    padding-right: 5%;
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

export const TextBoxA = ({ category, subject }) => {
    let color;
    if (category === '생활가전') color = '#AEB6BF';
    else if (category === '가구/인테리어') color = '#D2B48C';
    else if (category === '디지털기기') color = '#5c8390'; 
    else if (category === '스포츠/레저') color = '#32CD32'; 
    else if (category === '게임/음반') color = '#7944ab';
    else if (category === '주방용품') color = '#FF69B4';
    else if (category === '유아용품') color = '#e0a88d';
    else if (category === '남성패션') color = '#4169E1';
    else if (category === '여성패션') color = '#ec3f5c';
    else if (category === '음식') color = '#FFA500';
    else if (category === '반려동물') color = '#8FBC8F';
    else color = 'orange';

    return (
        <TextBoxAStyled>
            <Category color={color}>{category}</Category>
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

const HashTags = styled.ul`
    display: flex;
`
const HashTag = styled.li`
    margin-right: 10px;
    background: ${({ theme, color }) => theme[color].color};
    padding: 1.5%;
    border-radius: 4px;
    color: #fff;
    font-size: 0.8rem;
`

export const TextBoxC = ({ hashtag }) => {
    if (!hashtag) return null
    const hashtags = hashtag.split(',').map((hashtag) => (
        <HashTag color="green" key={hashtag}>
            {hashtag}
        </HashTag>
    ))

    return <HashTags>{hashtags}</HashTags>
}

export const PageCounter = styled.button`
    width: 100%;
    height: 100px;
    opacity: 0;
`
