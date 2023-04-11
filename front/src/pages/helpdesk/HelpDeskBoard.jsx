import { HelpDeskBoard } from './styled'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const HelpBoard = () => {
    const { user } = useSelector((state) => state.user)
    const [boardList, setBoardList] = useState([])
    const navigate = useNavigate()

    const successAccess = () => {
        alert('잘못된 접근입니다.')
        navigate('/')
    }

    useEffect(() => {
        user.level === 'user' ? successAccess() : <></>
    }, [])

    return <HelpDeskBoard user={user} />
}
