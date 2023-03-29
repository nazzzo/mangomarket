import { useParams } from "react-router-dom"
import { Button } from "../../common/button"
import request from "../../utils/request"
import { useEffect, useState } from "react"
import { ViewWrapper, Profile, ViewContent, Comment, Buttons } from "./styled/CommunityView.styled"


export const CommunityView = () => {

  const {id} = useParams()
  const [view, setView] = useState()
  console.log(id)

  useEffect(()=>{
    const getWriting = async () => {
      try{
        const response = await request.get(`/community/${id}`)
        console.log(response)
        setView(response.data)
      } catch(e){
        throw new Error(e)
      }
      }
    getWriting()
  }, [])
  console.log(view)
  return (
  
    <ViewWrapper>
      { view ? (<><Profile username={view.username} date={view.createdAt}/>
      <ViewContent subject={view.subject} content={view.content} >
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
      </>): (<></>)
      }
      <Comment />
    </ViewWrapper>
  )
}

