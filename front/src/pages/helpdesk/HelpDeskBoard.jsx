import { HelpDeskBoard } from './styled'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const HelpBoard = () => {
    const { user } = useSelector((state) => state.user)
    const [boardList, setBoardList] = useState([])

    return <HelpDeskBoard user={user} />
}
