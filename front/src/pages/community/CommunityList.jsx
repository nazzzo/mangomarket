import request from '../../utils/request'
import { CommunityWrapper, List, ItemWrapper, ItemContent, TextBoxA } from './styled'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

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

    if (boardList === []) return

    return (
        <CommunityWrapper>
            {boardList.map((board) => (
                <List>
                    <ItemWrapper key={board.id} onClick={(()=>{navigate(`/community/${board.id}`)})}>
                        <ItemContent>
                            <TextBoxA
                                subject={board.subject}
                                content={board.content}
                                date={board.createdAt}
                            />
                        </ItemContent>
                    </ItemWrapper>
                </List>
            ))}
        </CommunityWrapper>
    )
}
