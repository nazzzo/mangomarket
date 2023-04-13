import { useState } from 'react'
import { LikeBtn } from "../../common/button"
import { Footer, ChatBtn } from "./styled"
import { Modal } from "../../common/modal"
import { CustomerChat, Chat } from "../../pages/chat"


export const ViewFooter = ({ isLogin, user, seller, state, size, footerHeight, footerWidth, boardId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const isSold = state === "sold"

    return (
        <>
            <Footer footerHeight={footerHeight} footerWidth={footerWidth} >
                <LikeBtn isLogin={isLogin} user={user.email} size={size} />
                <ChatBtn isLogin={isLogin} user={user.email} size={size} color={isSold ? "grey" : "yellow"}fontSize="1rem" onClick={isSold ? undefined : () => {setIsOpen(true)}}>채팅하기</ChatBtn>            
            </Footer>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Chat boardid={boardId} seller={seller} />
            </Modal>
        </>
    )
}