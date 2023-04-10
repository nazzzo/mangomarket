import styled from 'styled-components'
import { Modal } from "../modal"
import { useState } from 'react'
import { GlobalChat } from "../../pages/chat"
import { Icon } from '@iconify/react';


const ChatBtnStyled = styled.button`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    position: fixed;
    text-align: center;
    bottom: 5%;
    right: 5%;
    background: ${({ theme, color }) => theme[color].color};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-out;

    & .iconify {
        font-size: 2.3rem;
        color: #fff;
    }

    &:hover {
        background: ${({ theme, color }) => theme[color].hover}; 
        transition: all 0.3s ease-out;  
    }
`

export const ChatBtn = () => {
    const [ isOpen, setIsOpen ] = useState(false)

    return(
        <>
            <ChatBtnStyled onClick={() => {setIsOpen(true)}} color="green"><Icon icon="mdi:chat-processing" /></ChatBtnStyled>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="85%">{<GlobalChat />}</Modal>
        </>
    )
}