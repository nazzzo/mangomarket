import { CustomerChat, GlobalChat } from "./index"
import { CustomerChatWrap, GlobalChatWrap } from './styled'
// seller={seller} customer={user} boardid={boardId} chatter={chatter} width="27rem" height="37rem"

// seller={!isSeller ? user.email : selectedChatter.seller}
// customer={!isSeller ? selectedChatter.customer : user.email}
// boardid={selectedChatter.boardid}
// chatter={selectedChatter}
// isSeller={isSeller}

export const Chat = ({ boardid }) => {
    return(
        <GlobalChatWrap width="27rem" height="37rem">
            {
                boardid
                ? <CustomerChat boardid={boardid} />
                : <GlobalChat></GlobalChat>
            }
        </GlobalChatWrap>
    )
}