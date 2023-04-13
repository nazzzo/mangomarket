import { useParams } from 'react-router-dom'
import { Button } from '../../common/button'
import request from '../../utils/request'
import { useEffect, useState } from 'react'
import { ViewWrapper, Profile, ViewContent, Buttons } from './styled/CommunityView.styled'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommunityUpdate } from './CommunityUpdate'
import { Comment } from './CommunityComment'

export const CommunityView = () => {
    const { user } = useSelector((state) => state.user)
    const { id } = useParams()
    const [view, setView] = useState()
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const [totalComments, setTotalComments] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageNumbers, setPageNumbers] = useState([])
    
    useEffect(() => {
        const getWriting = async () => {
            try {
                const response = await request.get(`/community/${id}?page=${currentPage}`)
                console.log('response::', response.data)
                if(response.data.isError === true){
                    alert('잘못된 요청입니다.')
                    navigate('/')
                }
                setView(response.data.boardView)
                setComments(response.data.commentList)
                setTotalComments(response.data.boardView.CommentCount)
                setComments(response.data.commentList)
                if(response.data.boardView.CommentCount === 0){
                    return
                } else {
                    const datasize = 10
                    const limitnum = 5
                    let stnum = totalComments/datasize - (totalComments/datasize % limitnum) + 1 
                    let endnum = totalComments/datasize - (totalComments/datasize % limitnum) + limitnum 
                    const maxPage = Math.ceil(response.data.boardView.CommentCount / datasize)
                    setCurrentPage(maxPage)
                    if(endnum > maxPage) endnum = maxPage
                    const pages = Array.from({length: endnum - stnum + 1},(v, i) => stnum + i )
                    setPageNumbers(pages)
                }                                 
            } catch (e) {
                throw new Error(e)
            }
        }
        getWriting()
    }, [])

    useEffect(() => {
        if(totalComments % 10 === 1 && totalComments !== 1){
            setCurrentPage(currentPage+1)
        }
    },[totalComments])

    const getDelete = async () => {
        const responseDelete = await request.delete(`/community/${id}`)
        if (responseDelete.data === 1) {
            setDeleteMode(false)
            alert('삭제되었습니다.')
            navigate('/community')
        }
    }

    return (
        <ViewWrapper>
            {view && !editMode ? (
                <>
                    <Profile username={view.username} date={view.createdAt} img={view.userImg} address={view.address}/>
                    <ViewContent subject={view.subject} content={view.content}>
                        {user.email === view.email ? (
                            <Buttons>
                                <Button
                                    color="yellow"
                                    fontColor="#fff"
                                    fontSize="1.1rem"
                                    height="3rem"
                                    width="7rem"
                                    onClick={() => {
                                        setEditMode(true)
                                    }}
                                >
                                    수정
                                </Button>
                                <Button
                                    color="yellow"
                                    fontColor="#fff"
                                    fontSize="1.1rem"
                                    height="3rem"
                                    width="7rem"
                                    onClick={() => {
                                        setDeleteMode(true)
                                        getDelete()
                                    }}
                                >
                                    삭제
                                </Button>
                            </Buttons>
                        ) : (
                            <></>
                        )}
                    </ViewContent>
                </>
            ) : (
                <></>
            )}
            {view && editMode ? (
                <CommunityUpdate view={view} setView={setView} setEditMode={setEditMode} />
            ) : (
                <></>
            )}
            <Comment totalComments={totalComments} setTotalComments={setTotalComments}
            comments={comments} setComments={setComments} 
            currentPage={currentPage} setCurrentPage={setCurrentPage}
                pageNumbers={pageNumbers}  
                setPageNumbers={setPageNumbers}
            />
        </ViewWrapper>
    )
}
