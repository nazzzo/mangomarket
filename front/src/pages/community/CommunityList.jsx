import request from '../../utils/request'
import { CommunityWrapper, List, ItemWrapper, ItemContent, TextBoxA } from './styled'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const CommunityList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])
    const navigate = useNavigate()
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

    return (
        <CommunityWrapper>
            {boardList.length ? (
                boardList.map((board) => (
                    <List>
                        <ItemWrapper
                            onClick={() => {
                                navigate(`/community/${board.id}`)
                            }}
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
