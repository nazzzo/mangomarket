import { CommentForm, CommentList, CommentInput, ContentInput, CommentButton } from "./styled"
import { useEffect, useState } from "react"
import request from "../../utils/request"
import { useParams } from "react-router-dom"

const CommentTxT = ({content}) => {
  return (
    <>
      <p>{content}</p>
    </>
  )
}

export const Comment = ({comments, setComments}) => {
  
  const {id} = useParams()
  const [commentValue, setCommentValue] = useState()
  // const [commentList, setCommentList] = useState([])
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await request.post(`/community/${id}`, {
      content: commentValue
    })
    console.log(response)
    const newCommmentList = response.data
    setComments(newCommmentList)
  }


  console.log(commentValue)
  return (
    <CommentForm onSubmit={submitHandler}>
      {comments.map((comment) => 
        <CommentTxT key={comment.id} content={comment.content} /> 
      )}
      <CommentInput>
        <ContentInput value={commentValue} onChange={(e)=>{setCommentValue(e.target.value)}}/>
        <CommentButton>button</CommentButton>
      </CommentInput>
    </CommentForm>
  )
}