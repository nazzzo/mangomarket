import request from '../../utils/request'
import { CommunityWrapper, List, ItemWrapper, ItemContent, TextBoxA } from './styled'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
                                <TextBoxA
                                    subject={board.subject}
                                    content={board.content}
                                    date={board.createdAt}
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
