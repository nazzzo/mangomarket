import styled from 'styled-components'
import { Modal } from "../modal"
import { useState } from 'react'

const ChatBtnStyled = styled.button`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    position: fixed;
    text-align: center;
    bottom: 0;
    right: 2rem;
    background: red;
    display: block;
`

export const ChatBtn = () => {
    const [ isOpen, setIsOpen ] = useState(false)

    return(
        <>
            <ChatBtnStyled onClick={() => {setIsOpen(true)}}>채팅 버튼</ChatBtnStyled>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>가나다라</Modal>
        </>
    )
}