import styled from "styled-components"

export const TotalComments = styled.div`
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  font-size:1.5rem;
  padding: 0.5rem;
  align-items: center;
`

export const CommentForm = styled.form`
  /* margin-top: 2rem; */
  
`

export const CommentInput = styled.div`
  /* margin-top: 1rem; */
  display: flex;
  /* align-items: center; */
`

export const ContentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;
  background: #D9D9D9;
`

export const CommentButton = styled.button`
  border: none;
  background: #D9D9D9;
  cursor: pointer;
`

export const CommentList = styled.div`
  width: 100%;
`

const CommentWrapStyled = styled.div`
  border-bottom: 0.5px solid #c8c8c8;
`

const DeleteInfo = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
`

const ReplyWrapStyled = styled.div`
  padding-left: 10%;
  border-bottom: 0.5px solid #c8c8c8;
  background-color: #fffaf2;
  padding-top: 1px;
  position: relative;
`

const ReplyPoint = styled.span`
  border-width: 0 0 1px 1px;
  border-style: solid;
  width: 10px;
  height: 10px;
  left: 0;
  display: inline-block;
  position: absolute;
  top:0.6rem;
  left: 2.5rem;
  opacity: 0.4;
`

export const CommentWrapper = ({parentId, children, isDeleted, deleteRender}) => {

  return (
    <>
      { !parentId ? 
        <CommentWrapStyled>{!deleteRender && !isDeleted ? children : <DeleteInfo>삭제된 댓글입니다.</DeleteInfo>}</CommentWrapStyled>
        : <ReplyWrapStyled><ReplyPoint></ReplyPoint>{children}</ReplyWrapStyled>
      }
    </>
  ) 
}

export const Txt = styled.div`
    margin-top:0.5rem;
    word-break: break-all;
    position: relative;
    div:nth-child(2){
      display: inline-block;
      position: absolute;
    }
    div:nth-child(3) {
    display: inline-block;
    font-size: 0.8rem; 
    font-weight:bold;
    color: gray;
  }
    div:nth-child(4){
      margin-top:0.3rem;
      margin-left:3rem;
    }
`

export const Img = styled.img`
  width:2.5rem;
  height:2.5rem;
  border-radius: 50%;
  border: 1px solid;
  margin-right: 0.5rem;
`

export const MDButtons = styled.div`
  text-align: end;
`

export const ButtonMD = styled.button`
  outline: none;
  border: none;
  background: #fffaf2;
  cursor: pointer;
  padding: 0.3rem;
`

export const ModifyInput = styled.input`
  padding: 0.5rem;
  width:100%;
  outline: none;

`
export const ReplyButton = styled.button`
  margin-left: 3rem;
  margin-top:0.2rem;
  cursor: pointer;
  background: white;
  border:1px solid;
  padding:0.2rem;
`