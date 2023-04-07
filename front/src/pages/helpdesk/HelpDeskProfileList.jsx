import {
    CommunityWrapper,
    List,
    ItemWrapper,
    ItemContent,
    TextBoxAMyProfile,
    TextBoxSpaceDiv,
    TextBoxSpaceH2,
} from '../community/styled'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import request from '../../utils/request'

export const HelpDeskProfileList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        const getData = async () => {
            try {
                const userEmail = user.email
                const response = await request.get(`/helpdesk/profile?email=${userEmail}`)
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
                <TextBoxSpaceH2>여기서는 제가 1:1문의하신 글만 확인할 수 있습니다.</TextBoxSpaceH2>
                <TextBoxSpaceH2>
                    {' '}
                    이곳에서는 예의를 지켜 즐거운 커뮤니티 활동을 함께 해보세요! :)
                </TextBoxSpaceH2>
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
                                <TextBoxAMyProfile
                                    subject={board.subject}
                                    content={board.content}
                                    date={board.createdAt}
                                    answer={board.answer}
                                />
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
