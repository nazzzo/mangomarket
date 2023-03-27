import { Community, Subject, Content, KakaoMap } from './styled'
import { Button } from '../../common/button'
export const CommunityWrite = () => {
    return (
        <Community>
            <Subject />
            <Content />
            <KakaoMap />
            <Button color="yellow" fontColor="#fff" fontSize="1.1rem" height="3rem" width="7rem">
                글쓰기
            </Button>
        </Community>
    )
}
