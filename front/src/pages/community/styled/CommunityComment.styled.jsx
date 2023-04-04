import styled from "styled-components"

export const TotalComments = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  font-size:1.5rem;
  padding: 0.5rem;
`

export const CommentForm = styled.form`
  /* margin-top: 2rem; */
`

export const CommentInput = styled.div`
  display: flex;
  align-items: center;
  background: #D9D9D9;

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
  text-align: right;
`

export const ButtonMD = styled.button`
  outline: none;
  border: none;
  background: white;
  cursor: pointer;
  padding: 0.3rem;
`

export const ModifyInput = styled.input`
  padding: 0.5rem;
  width:100%;
  outline: none;

`