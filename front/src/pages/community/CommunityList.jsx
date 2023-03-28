import request from '../../utils/request'
import { CommunityWrapper, List, ItemWrapper, ItemContent, TextBoxA } from './styled'
import { useState, useEffect } from 'react'

export const CommunityList = () => {
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
                    <ItemWrapper>
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
