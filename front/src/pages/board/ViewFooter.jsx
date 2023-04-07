import { useState } from 'react'
import { LikeBtn } from "../../common/button"
import { Footer, ChatBtn } from "./styled"
import { Modal } from "../../common/modal"
import { Chat } from "../../pages/chat/Chat"


export const ViewFooter = ({ isLogin, user, writerEmail, writerName, writerImg, size, footerHeight, footerWidth, boardId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const seller = {
        email: writerEmail,
        username: writerName,
        userImg: writerImg,
    }



    return (
        <>
            <Footer footerHeight={footerHeight} footerWidth={footerWidth} >
                <LikeBtn isLogin={isLogin} user={user.email} size={size} />
                <ChatBtn isLogin={isLogin} user={user.email} size={size} color="yellow" fontSize="1rem" onClick={() => {setIsOpen(true)}}>채팅하기</ChatBtn>
            </Footer>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Chat seller={seller} customer={user} boardId={boardId}/>
            </Modal>
        </>
    )
}