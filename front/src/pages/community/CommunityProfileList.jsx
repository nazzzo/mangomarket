import {
    CommunityWrapper,
    List,
    ItemWrapper,
    ItemContent,
    TextBoxAMyProfile2,
    TextBoxSpaceDiv,
    TextBoxSpaceH2,
} from './styled'
import { Button } from '../../common/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import request from '../../utils/request'

export const CommunnityProfileList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        const getData = async () => {
            try {
                const userEmail = user.email
                const response = await request.get(`/community/profile?email=${userEmail}`)
                if (!response.data.isError) {
                    const newBoardList = response.data
                    console.log(response.data)
                    setBoardList(newBoardList)
                }
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
                <TextBoxSpaceH2>여기서는 제가 작성한 글만 확인할 수 있습니다.</TextBoxSpaceH2>
                <TextBoxSpaceH2>
                    {' '}
                    이곳에서는 예의를 지켜 즐거운 커뮤니티 활동을 함께 해보세요! :)
                </TextBoxSpaceH2>
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
                                    <TextBoxAMyProfile2
                                        subject={board.subject}
                                        content={board.content}
                                        date={board.createdAt}
                                        category={board.category}
                                    />
                                ) : (
                                    <></>
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
