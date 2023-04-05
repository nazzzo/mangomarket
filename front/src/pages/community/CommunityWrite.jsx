import { Community, Subject, Content, KakaoMap, CommunityForm, CategorySelect } from './styled'
import { Input } from '../../common/input'
import { TextArea } from '../../common/textarea'
import { Button } from '../../common/button'
import { useInput, useTextArea } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import request from '../../utils/request'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export const CommunityWrite = () => {
    const { user } = useSelector((state) => state.user)
    const subject = useInput('')
    const content = useTextArea('')
    const navigate = useNavigate()
    const [categoryState, setCategoryState] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await request.post('/community', {
            subject: subject.value,
            content: content.value,
            email: user.email,
            category: categoryState,
        })

        if (response.status >= 400 || response.data.isError) {
            alert(response.data.message)
        }
        navigate('/Community')
    }

    const handleCategory = (e) => {
        console.log('category ::: ', e.label)
        setCategoryState(e.label)
    }

    return (
        <Community>
            <CommunityForm width="100%" height="33rem" onSubmit={handleSubmit}>
                <Subject>
                    <Input
                        value={subject.value}
                        onChange={subject.onChange}
                        placeholder="제목을 입력해주세요"
                        id="subject"
                        name="subject"
                    />
                </Subject>
                <CategorySelect onChange={handleCategory} />
                <Content>
                    <TextArea
                        value={content.value}
                        onChange={content.onChange}
                        id="content"
                        name="content"
                        placeholder="하고싶은 얘기를 마음껏 적어주세요"
                    />
                </Content>
                <KakaoMap />
                <Button
                    color="yellow"
                    fontColor="#fff"
                    fontSize="1.1rem"
                    height="3rem"
                    width="7rem"
                >
                    글쓰기
                </Button>
            </CommunityForm>
        </Community>
    )
}
