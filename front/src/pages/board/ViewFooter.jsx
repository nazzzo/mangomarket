import { LikeBtn } from "../../common/button"
import { Footer, ChatBtn } from "./styled"


export const ViewFooter = ({ isLogin, user, size, footerHeight, footerWidth }) => {
    
    return (
        <Footer footerHeight={footerHeight} footerWidth={footerWidth} >
            <LikeBtn isLogin={isLogin} user={user} size={size} />
            <ChatBtn isLogin={isLogin} user={user} size={size} color="yellow" fontSize="1rem">채팅하기</ChatBtn>
        </Footer>
    )
}