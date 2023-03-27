import { CommunityWrap, Subject, Content } from './styled'
import { Button } from '../../common/button'
export const CommunityWrite = () => {
    return (
        <CommunityWrap>
            <Subject />
            <Content />
            <Button color="yellow" fontColor="#fff" fontSize="1.1rem" height="3rem" />
        </CommunityWrap>
    )
}
