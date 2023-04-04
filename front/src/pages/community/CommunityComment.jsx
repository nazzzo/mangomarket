import { CommentForm, CommentInput, ContentInput, CommentButton, Txt, TotalComments, ButtonMD, Img, MDButtons, ModifyInput } from './styled'
import { useParams } from 'react-router-dom'
import { useTimeStamp, useInput } from '../../hooks'
import { useEffect, useState } from 'react'
import request from '../../utils/request'
import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

const CommentTxT = ({ idx, content, createdAt, comments, setComments, email, username, img}) => {
    const [isInput, setIsInput] = useState(false)
    const [modified, setModified] = useState()
    const timeAgo = useTimeStamp(createdAt)
    const modify = useInput(content)
    const { id } = useParams()
    const {user} = useSelector(state => state.user)
    const isAuthor = (user.email === email)

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('정말 삭제하시겠습니까?')
            if(confirmed){
                const response = await request.delete(`/community/comment/${id}/${idx}`)
                setComments(comments.filter(comment => comment.id !== idx))}
        } catch (error) {
            console.error(error)
        }
    }

    const handleModify = async () => {
        if (content === modify.value) setIsInput(false)
        try {
            const response = await request.put(`/community/comment/${id}/${idx}`, {
                content: modify.value,
            })
            if (response.data === 1) {
                setModified(modify.value)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (modified) {
            setIsInput(false)
        }
    }, [modified])

    return (
        <>
            {createdAt && !isInput ? (
                <Txt idx={idx}>
                    <Img src={img}/>
                    <div>{username}</div>
                    <div>{timeAgo}</div>
                    <div>{modify.value}</div>
                </Txt>
            ) : (
                <>
                    <Txt idx={idx}>
                        <Img />
                        <div>{username}</div>
                        <div>{timeAgo}</div>
                    </Txt>
                    <ModifyInput idx={idx} value={modify.value} onChange={modify.onChange} />
                </>
            )}
            {isAuthor && (
                <MDButtons>
                {!isInput ? (
                    <>
                        <ButtonMD
                            type="button"
                            onClick={() => {
                                setIsInput(true)
                            }}
                        >
                            수정
                        </ButtonMD>
                        <ButtonMD type="button" onClick={handleDelete}>
                            삭제
                        </ButtonMD>
                    </>
                ) : (
                    <>
                        <ButtonMD type="button" onClick={handleModify}>
                            댓글입력
                        </ButtonMD>
                    </>
                )}
                </MDButtons>
            )}
        </>
    )
}

export const Comment = ({ comments, setComments}) => {
    const { id } = useParams()
    const [commentValue, setCommentValue] = useState()
    const inputRef = useRef()
    const {user} = useSelector(state => state.user)


    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await request.post(`/community/${id}`, {
            content: commentValue,
            email: user.email
        })
        console.log(response)
        if (response.status >= 400 || response.data.isError) {
            alert(response.data.message)
        } else {
            const newCommmentList = response.data
            setComments(newCommmentList)
            setCommentValue("")
        }
    }

    return (
        <CommentForm onSubmit={submitHandler}>
            {comments ? <TotalComments><Icon icon="mdi:comment-outline" /> 댓글 {comments.length}</TotalComments> : 
            <TotalComments><Icon icon="mdi:comment-outline" /> 댓글 </TotalComments>}
            {comments ? (
                comments.map((comment) => (
                    <CommentTxT
                        key={comment.id}
                        idx={comment.id}
                        content={comment.content}
                        createdAt={comment.createdAt}
                        comments={comments}
                        setComments={setComments}
                        email={comment.email}
                        username={comment.username}
                        img={comment.userImg}
                    />
                ))
            ) : (
                <></>
            )}
            <CommentInput>
                <ContentInput
                    value={commentValue}
                    onChange={(e) => {
                        setCommentValue(e.target.value)
                    }}
                    placeholder="댓글을 입력해주세요."
                    ref={inputRef}
                />
                <CommentButton onClick={()=>{inputRef.current.focus();}}>
                    <Icon icon="material-symbols:arrow-circle-up" width="3rem" border="none" />
                </CommentButton>
            </CommentInput>
        </CommentForm>
    )
}
