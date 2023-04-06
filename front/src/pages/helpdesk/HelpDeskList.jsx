import { HelpDeskWraaper } from './styled'
import request from '../../utils/request'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const HelpDeskList = () => {
    const { user } = useSelector((state) => state.user)
    // const [isActive, setIsActive] = useState(false)
    // const [isOpen, setIsOpen] = useState()
    // const clickHandler = (e) => {
    //     setIsActive(!isActive)
    //     setIsOpen(true)
    // }

    const textArr = [
        {
            subject: '동일한 게시글을 올려서 내 게시글이 미노출 됐어요',
            content: '게시글을 홈 화면에 노출하고 싶다면 새롭게 게시글을 작성하는 대신 기한을 지켜 끌어올리기 해주시길',
        },
        {
            subject: '동네인증이 안돼요!',
            content: '내 동네가 제대로 설정되어 있는지 확인해보세요.',
        },
        {
            subject: '우리 동네에 모임을 어떻게 홍보하나요?',
            content: '모임의 URL을 복사해서, 함께 하고 싶은 이웃에게 공유할 수 있어요.',
        },
        {
            subject: '분실/실종 관련하여 게시글 작성이 가능한가요?',
            content: '동네생활에서는 분실/실종 게시글을 작성할 수 있어요.',
        },
        {
            subject: '내가 쓴 게시글과 댓글은 어디서 볼 수 있나요?',
            content: '로그인 한 후에 홈페이지 상단에  Profile을 눌러서 나의활동내역등을 볼수있어요',
        },
    ]

    return <HelpDeskWraaper username={user.username} textArr={textArr}></HelpDeskWraaper>
}
