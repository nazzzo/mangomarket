import { useEffect, useState } from 'react'
import { HelpDeskHistoryWrap, HelpDeskMenu, HelpDeskMyWrite, HelpDeskMyService } from './styled'
import request from '../../utils/request'
import { useNavigate } from 'react-router-dom'

export const HelpDeskHistory = ({ email, width, height, color }) => {
    const [listLength, setListLength] = useState([])
    const [serviceLength, setServiceLength] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await request.get(`/community/profile?email=${email}`)

                if (!response.data.isError) {
                    setListLength(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getService = async () => {
            try {
                const response = await request.get(`/helpdesk/profile?email=${email}`)
                console.log(response.data)
                if (!response.data.isError) setServiceLength(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        getData()
        getService()
    }, [])

    const clickHandleCommnunity = () => {
        navigate('/community/writeList')
    }

    const clickHandleHelpDesk = () => {
        navigate('/helpdesk/writeList')
    }

    return (
        <HelpDeskHistoryWrap height={height}>
            문의 내역
            <HelpDeskMenu>
                {listLength.length ? (
                    <HelpDeskMyWrite>
                        커뮤니티 쓴글 : &nbsp;
                        <span onClick={clickHandleCommnunity}>{listLength.length}</span>
                    </HelpDeskMyWrite>
                ) : (
                    <HelpDeskMyWrite>커뮤니티 쓴글 : 0</HelpDeskMyWrite>
                )}
                {serviceLength.length ? (
                    <HelpDeskMyService>
                        문의 내역 : &nbsp;
                        <span onClick={clickHandleHelpDesk}>{serviceLength.length}</span>
                    </HelpDeskMyService>
                ) : (
                    <HelpDeskMyService>문의 내역 : 0</HelpDeskMyService>
                )}
            </HelpDeskMenu>
        </HelpDeskHistoryWrap>
    )
}
