import { useParams } from "react-router-dom"
import { Button } from "../../common/button"
import request from "../../utils/request"
import { useEffect } from "react"
import { ViewWrapper, Profile, ViewContent, Comment, Buttons } from "./styled/CommunityView.styled"


export const CommunityView = () => {

  const {id} = useParams()
  console.log(id)

  useEffect(()=>{
    const getWriting = async () => {
      try{
        const response = await request.get(`/community/${id}`)
        console.log(response)
      } catch(e){
        throw new Error(e)
      }
      }
    getWriting()
  }, [])


  return (
    <ViewWrapper>
      <Profile />
      <ViewContent>
      <Buttons>
        <Button                     
          color="yellow"
          fontColor="#fff"
          fontSize="1.1rem"
          height="3rem"
          width="7rem">수정</Button>
        <Button
          color="yellow"
          fontColor="#fff"
          fontSize="1.1rem"
          height="3rem"
          width="7rem">삭제</Button>
      </Buttons>
      </ViewContent>
      <Comment />
    </ViewWrapper>
  )
}