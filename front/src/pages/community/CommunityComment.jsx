import { CommentForm, CommentList, CommentInput, ContentInput, CommentButton, Txt } from './styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useTimeStamp, useInput } from '../../hooks'
import { useEffect, useState } from 'react'
import request from '../../utils/request'
import { Icon } from '@iconify/react'

const CommentTxT = ({ idx, content, createdAt, setDeleteComment, deleteComment }) => {
    const [isInput, setIsInput] = useState(false)
    const [modified, setModified] = useState()
    const timeAgo = useTimeStamp(createdAt)
    const modify = useInput(content)
    const { id } = useParams()

    const handleDelete = async () => {
        try {
            const response = await request.delete(`/community/comment/${id}/${idx}`)
            console.log(response)
            setDeleteComment(true)
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
            console.log('response :::', response.data)
            if (response.data === 1) {
                setModified(modify.value)
            }
            console.log(modified)
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
                    {modify.value},{timeAgo}
                </Txt>
            ) : (
                <input idx={idx} value={modify.value} onChange={modify.onChange} />
            )}
            {!isInput ? (
                <button
                    type="button"
                    onClick={() => {
                        setIsInput(true)
                    }}
                >
                    수정
                </button>
            ) : (
                <button type="button" onClick={handleModify}>
                    수정완료
                </button>
            )}
            <button type="button" onClick={handleDelete}>
                삭제
            </button>
        </>
    )
}

export const Comment = ({ comments, setComments }) => {
    const { id } = useParams()
    const [commentValue, setCommentValue] = useState()
    const [deleteComment, setDeleteComment] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await request.post(`/community/${id}`, {
            content: commentValue,
        })

        if (response.status >= 400 || response.data.isError) {
            alert(response.data.message)
        } else {
            const newCommmentList = response.data
            setComments(newCommmentList)
        }
    }

    return (
        <CommentForm onSubmit={submitHandler}>
            {comments ? (
                comments.map((comment) => (
                    <CommentTxT
                        key={comment.id}
                        idx={comment.id}
                        content={comment.content}
                        createdAt={comment.createdAt}
                        setDeleteComment={setDeleteComment}
                        deleteComment={deleteComment}
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
                />
                <CommentButton>
                    <Icon icon="material-symbols:arrow-circle-up" width="3rem" border="none" />
                </CommentButton>
            </CommentInput>
        </CommentForm>
    )
}
