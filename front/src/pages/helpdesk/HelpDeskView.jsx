import { HelpDeskView } from './styled'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import request from '../../utils/request'

export const HelpView = () => {
    const { user } = useSelector((state) => state.user)
    const { id } = useParams()
    const [view, setView] = useState('')

    useEffect(() => {
        const getListOne = async () => {
            try {
                console.log('으아아아아아아')
                const response = await request.get(`/helpdesk/board/${id}`, { user })
                const getView = response.data
                setView(getView)
            } catch (error) {
                console.log(error)
            }
        }
        getListOne()
    }, [])

    return <HelpDeskView view={view} />
}
