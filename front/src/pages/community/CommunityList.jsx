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
    PageCounter,
} from './styled'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/button'

export const CommunityList = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [boardList, setBoardList] = useState([])
    const pageCountRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get(`/community/?count=${count}`)
                if (!response.data.isError) {
                    const newBoardList = response.data
                    if (count === 0) {
                        setBoardList(newBoardList)
                    } else {
                        setBoardList((preList) => [...preList, ...newBoardList])
                    }
                    setIsLoading(false)
                    if (newBoardList.length === 0) setIsLoading(true)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [count])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading) {
                    setIsLoading(true)
                    setCount((preCount) => preCount + 1)
                }
            })
        }, options)

        if (pageCountRef.current) observer.observe(pageCountRef.current)
        return () => {
            if (pageCountRef.current) observer.unobserve(pageCountRef.current)
        }
    }, [isLoading])

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
                <TextBoxSpaceH2>함께 즐겁게 활동합시다 :</TextBoxSpaceH2>
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
            <PageCounter ref={pageCountRef} />
        </CommunityWrapper>
    )
}
