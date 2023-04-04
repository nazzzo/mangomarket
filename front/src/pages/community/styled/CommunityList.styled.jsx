import styled, { css } from 'styled-components'
import { useTimeStamp } from '../../../hooks'
// import { motion } from 'framer-motion'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

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
    & > span {
        width: 1rem;
        height: 1rem;
        font-size: 1.5rem;
    }
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
    margin-top: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
    & > div {
        display: flex;
        width: 70px;
        height: 60px;
        font-size: 22px;
        justify-content: center;
        align-items: flex-end;
        margin-left: 1rem;
    }
`

const TextBoxASpan = styled.span`
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
    padding-top: 5%;
`

const TextBoxACategory = styled.span`
    width: 4.7rem;
    height: 1.8rem;
    color: #fff;
    font-size: 0.9rem;
    line-height: 1rem;
    border-radius: 4px;
    text-align: center;
    padding: 1.5% 0;
    margin: 1rem;

    ${({ category }) =>
        category === '잡담'
            ? css`
                  background-color: red;
              `
            : category === '질문'
            ? css`
                  background-color: blue;
              `
            : category === '정보공유'
            ? css`
                  background-color: green;
              `
            : category === '요청'
            ? css`
                  background-color: gray;
              `
            : css`
                  background-color: orange;
              `};
`
const TextBoxProfile = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div {
        display: flex;
        align-items: center;
        width: 12.5rem;
    }
    & > div > img,
    h2 {
        margin: 0 0.5rem;
    }

    @media screen and (min-width: 360px) and (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`

const TextBoxAUserImg = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
`

const TextBoxAUserName = styled.h2`
    font-size: 0.85rem;
`
export const List = styled(motion.ul)`
    width: 100%;
    margin-bottom: 0.5rem;
`
export const ItemWrapper = styled(motion.li)`
    width: 100%;
    height: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ececec;
`

export const TextBoxA = ({ subject, content, date, commentCount, category, username, userImg }) => {
    return (
        <TextBoxAStyled>
            <TextBoxASubject>{subject}</TextBoxASubject>
            <TextBoxProfile>
                <TextBoxACategory category={category}>{category}</TextBoxACategory>
                <div>
                    <TextBoxAUserImg src={userImg}></TextBoxAUserImg>
                    <TextBoxAUserName>{username}</TextBoxAUserName>
                </div>
            </TextBoxProfile>

            <TextBoxAContent>
                <TextBoxASpan>{content}</TextBoxASpan>

                <TextBoxADate>
                    {useTimeStamp(date)}
                    <div>
                        <Icon icon="uil:comment-dots" />
                        {commentCount}
                    </div>
                </TextBoxADate>
            </TextBoxAContent>
        </TextBoxAStyled>
    )
}
