import request from '../../utils/request'
import {
    CommunityWrapper,
    List,
    ItemWrapper,
    ItemContent,
    TextBoxA,
    TextBoxB,
    TextBoxSpaceDiv,
    TextBoxSpaceH2,
} from './styled'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/button'

export const CommunityList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await request.get('/community')
                const newBoardList = response.data
                setBoardList(newBoardList)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const TextList = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 1,
            },
        },
    }

    const TextItem = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <CommunityWrapper>
            <TextBoxSpaceDiv>
                <TextBoxSpaceH2>
                    커뮤니티 게시판에서는 상대방을 배려하는 예의 있는 대화를 부탁드립니다.
                </TextBoxSpaceH2>
                <TextBoxSpaceH2>함께 즐겁게 활동합시다 :)</TextBoxSpaceH2>
                <Button
                    color="yellow"
                    fontColor="#fff"
                    fontSize="1.1rem"
                    height="3rem"
                    width="7rem"
                    onClick={() => {
                        navigate('/community/write')
                    }}
                >
                    글작성
                </Button>
            </TextBoxSpaceDiv>
            {boardList.length ? (
                boardList.map((board) => (
                    <List variants={TextList} initial="hidden" animate="visible">
                        <ItemWrapper
                            onClick={() => {
                                navigate(`/community/${board.id}`)
                            }}
                            variants={TextItem}
                        >
                            <ItemContent key={board.id}>
                                {board.category !== '공지사항' ? (
                                    <TextBoxA
                                        subject={board.subject}
                                        content={board.content}
                                        username={board.username}
                                        userImg={board.userImg}
                                        date={board.createdAt}
                                        commentCount={board.CommentCount}
                                        category={board.category}
                                    ></TextBoxA>
                                ) : (
                                    <TextBoxB
                                        subject={board.subject}
                                        content={board.content}
                                        date={board.createdAt}
                                        commentCount={board.CommentCount}
                                        category={board.category}
                                    ></TextBoxB>
                                )}
                            </ItemContent>
                        </ItemWrapper>
                    </List>
                ))
            ) : (
                <></>
            )}
        </CommunityWrapper>
    )
}
