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
    border-bottom: 1px solid #eee;
`

const ItemImageWrap = styled.div`
    flex-basis:  ${({size})=> size};
    padding-left: 2%;
    height: 85%;
    display: flex;
    border-radius: 8px;

    & img {
      object-fit: cover;
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
`

export const ItemImage = ({ size, src}) => {
    return <ItemImageWrap siez={size}><img src={src} alt="" /></ItemImageWrap>
}

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


export const TextBoxA = ({state, category, subject}) => {
    
    return <TextBoxAStyled>
        {state !=="public" ? <State color="yellow">{state}</State> : <></>}
        <Category color="orange">{category}</Category>
        <h2>{subject}</h2>
    </TextBoxAStyled>
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
    background:  ${({ theme, color }) => theme[color].color};
    padding: 1.5%;
    border-radius: 4px;
    color: #fff;
    font-size: 0.8rem;
`

export const TextBoxC = ({hashtag}) => {
    if (!hashtag) return null;
    const hashtags = hashtag.split(',').map(hashtag => <HashTag color="green" key={hashtag}>{hashtag}</HashTag>);
    
    return <HashTags>{hashtags}</HashTags>;
  };

export const PageCounter = styled.div`
        width: 100%;
        height: 100px;
        /* background-color:red; */
`
