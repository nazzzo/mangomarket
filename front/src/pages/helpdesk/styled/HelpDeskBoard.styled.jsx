import styled from 'styled-components'
import { useEffect, useState } from 'react'
import request from '../../../utils/request'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const Wrapper = styled.div`
    padding: 1rem;
`
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,
    td {
        padding: 0.5rem;
        text-align: center;
        border: 1px solid black;
        font-size: 0.7rem;
    }

    th {
        font-weight: bold;
    }
    & > tbody > tr > .hoverEvnet:hover {
        color: darkgrey;
    }
`

export const HelpDeskBoard = ({ user }) => {
    const [boardList, setBoardList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await request.get('/helpdesk/board', { user })
                console.log(response.data)
                setBoardList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const clickHandler = (e, boardId) => {
        console.log(e.target)
        console.log(boardId)
        navigate(`/helpdesk/board/${boardId}`)
    }

    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <span>ID</span>
                        </th>
                        <th>
                            <span>문의제목</span>
                        </th>
                        <th>
                            <span>문의내용</span>
                        </th>
                        <th>
                            <span>문의종류</span>
                        </th>
                        <th>
                            <span>날짜</span>
                        </th>
                        <th>
                            <span>처리상태</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {boardList &&
                        boardList.map((board) => (
                            <tr onClick={(e) => clickHandler(e, board.id)} key={board.id}>
                                <td style={{ width: '5%' }}>{board.id}</td>
                                <td
                                    style={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        width: '15%',
                                        cursor: 'pointer',
                                    }}
                                    className="hoverEvnet"
                                >
                                    {board.subject}
                                </td>
                                <td
                                    style={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        width: '20%',
                                        cursor: 'pointer',
                                    }}
                                    className="hoverEvnet"
                                >
                                    {board.content}
                                </td>
                                <td style={{ width: '15%' }}>{board.pageState}</td>
                                <td style={{ width: '15%' }}>
                                    {moment(board.createdAt).format('YYYY-MM-DD')}
                                </td>
                                <td style={{ width: '15%' }}>
                                    {board.answerBoolean ? '처리완료' : '미처리'}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Wrapper>
    )
}
