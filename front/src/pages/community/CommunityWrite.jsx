import { useState, useEffect } from 'react'
import { Community, Subject, Content, KakaoMap, CommunityForm } from './styled'
import { Input } from '../../common/input'
import { TextArea } from '../../common/textarea'
import { Button } from '../../common/button'
import { useInput, useTextArea } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import request from '../../utils/request'
import { useSelector } from 'react-redux'

export const CommunityWrite = () => {
    const { user } = useSelector((state) => state.user)
    const subject = useInput('')
    const content = useTextArea('')
    const navigate = useNavigate()
    console.log('user::', user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await request.post('/community', {
            subject: subject.value,
            content: content.value,
            email: user.email,
        })

        console.log(response.data)

        if (response.status >= 400 || response.data.isError) {
            alert(response.data.message)
        }
        navigate('/Community')
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
                <Content>
                    <TextArea
                        value={content.value}
                        onChange={content.onChange}
                        placeholder="내용을 입력해주세요"
                        id="content"
                        name="content"
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
