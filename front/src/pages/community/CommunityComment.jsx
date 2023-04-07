import { CommentForm, CommentInput, ContentInput, CommentButton, CommentWrapper, Txt, TotalComments, ButtonMD, Img, MDButtons, ModifyInput, ReplyButton } from './styled'
import { useParams,NavLink } from 'react-router-dom'
import { useTimeStamp, useInput } from '../../hooks'
import { useEffect, useState } from 'react'
import request from '../../utils/request'
import { Icon } from '@iconify/react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'


const CommentTxT = ({ idx, content, createdAt, comments, setComments, email, username, img, parentId, isDeleted}) => {
    const [isInput, setIsInput] = useState(false)
    const [modified, setModified] = useState()
    const [reply, setReply] = useState(false)
    const [replyComment, setReplyComment] = useState()
    const timeAgo = useTimeStamp(createdAt)
    const comment = useInput(content)
    const { id } = useParams()
    const {user} = useSelector(state => state.user)
    const isAuthor = (user.email === email)
    const [deleteRender, setDeleteRender] = useState(0)

    const submitReply = async () => {
        let parentIdx;
        if (parentId === 0) parentIdx = idx
        else parentIdx = parentId

        let toUser;
        if (parentId === 0) toUser = ''
        else toUser = `@${username}`

        const toReply = `${toUser} ${replyComment}`

        if(!replyComment){
            return alert('내용을입력해주세요')
        }

        try {
            const response = await request.post(`/community/${id}`, {
                // content: toUser + " " + replyComment,
                // content: `${toUser.outerHTML} ${replyComment}`
                content: toReply,
                email:user.email,
                parentId: parentIdx                                                                            
            })
            console.log(response.data)
            if (response.status >= 400 || response.data.isError) {
                alert(response.data.message)
            } else {
                setComments(response.data)
                setReply(!reply)
                setReplyComment('') // 2번째 답글을 달때 첫번째 답글에 대한 내용을 input박스에 불러오는 문제발생.. 이걸로 해결
            }
        } catch(error){
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('정말 삭제하시겠습니까?')
            if(confirmed){
                if(!parentId){
                    const response = await request.put(`/community/comment/${id}/${idx}`, {
                        isDeleted: 1,
                        content
                    })
                    const bool = response.data
                    setDeleteRender(bool)
                } else {
                const response = await request.delete(`/community/comment/${id}/${idx}`)
                setComments(comments.filter(comment => comment.id !== idx))}
                }
        } catch (error) {
            console.error(error)
        }
    }

    const handleModify = async () => {
        if (content === comment.value) setIsInput(false)
        try {
            const response = await request.put(`/community/comment/${id}/${idx}`, {
                content: comment.value,
            })
            if (response.data === 1) {
                setModified(comment.value)
                setIsInput(false) // 글을 수정후에 2번쨰 글을 수정할때 내용변화가 없었으면 db에서 수정했다고는 했으나 화면으로는 그려주질못했음 이걸로해결..
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
        <CommentWrapper parentId={parentId} isDeleted={isDeleted} deleteRender={deleteRender}>
            {createdAt && !isInput ? (
                <>
                <Txt idx={idx}>
                    <Img src={img}/>
                    <div>{username}</div>
                    <div>{timeAgo}</div>
                    <div>
                        {!comment.value.indexOf('@') ? 
                            <span>
                                <NavLink to='/community'>{comment.value.split(" ")[0]}</NavLink> {comment.value.split(" ")[1]}
                                {/* {comment.value.replace(/@.+?\s/, '')}                                 */}
                            </span> 
                            : 
                            <span>{comment.value}</span>
                        }
                    </div>
                </Txt>
                    {!reply ? <ReplyButton type="button" onClick={()=>{setReply(!reply)}}>답글</ReplyButton> : 
                        <>  
                            <ReplyButton type='button' onClick={()=>{setReply(!reply)}}>답글</ReplyButton>
                            <Txt idx={idx}>
                                <Img src={user.userImg}/>
                                <div>{user.username}</div>
                            </Txt>
                            {!parentId ? 
                                <CommentInput>
                                    <ContentInput 
                                        placeholder='답글을 입력해주세요'
                                        value={replyComment}
                                        onChange={(e)=>{setReplyComment(e.target.value)}}
                                        data-depth="true"
                                    />
                                    <CommentButton type='button' onClick={submitReply}>
                                        <Icon icon="material-symbols:arrow-circle-up" width="3rem" border="none" />
                                    </CommentButton>
                                </CommentInput> 
                                : 
                                <CommentInput>
                                    <ContentInput 
                                        placeholder={`${username}님에게 답글쓰기`}
                                        value={replyComment}
                                        onChange={(e)=>{setReplyComment(e.target.value)}}
                                        />
                                    <CommentButton type='button' onClick={submitReply}>
                                        <Icon icon="material-symbols:arrow-circle-up" width="3rem" border="none" />
                                    </CommentButton>
                                </CommentInput>
                            }
                        </>
                    }
                </>
            ) : (
                <>
                    <Txt idx={idx}>
                        <Img src={img}/>
                        <div>{username}</div>
                        <div>{timeAgo}</div>
                    </Txt>
                    <ModifyInput idx={idx} value={comment.value} onChange={comment.onChange} />
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
        </CommentWrapper>
    )
}

export const Comment = ({ comments, setComments}) => {
    const { id } = useParams()
    const [commentValue, setCommentValue] = useState()
    const inputRef = useRef()
    const {user} = useSelector(state => state.user)
    console.log('user', user)

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await request.post(`/community/${id}`, {
            content: commentValue,
            email: user.email,
        })
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
                        parentId={comment.parentId}
                        isDeleted={comment.isDeleted}
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

