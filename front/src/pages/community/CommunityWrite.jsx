import {
    Community,
    Subject,
    Content,
    CommunityForm,
    CategorySelect,
    ButtonDiv,
    TempWrap,
} from './styled'
import { Input } from '../../common/input'
import { TextArea } from '../../common/textarea'
import { Button } from '../../common/button'
import { useInput, useTextArea } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import request from '../../utils/request'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTimeStamp } from '../../hooks'

export const CommunityWrite = ({ tempContent, tempSubject, updatedAt, tempMode, setTempMode }) => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [categoryState, setCategoryState] = useState('')
    const [isState, setIsState] = useState(false)
    const subject = useInput('')
    const content = useTextArea('')
    const tempDataSubject = useInput(tempSubject)
    const tempDataContent = useTextArea(tempContent)
    const timeTemp = useTimeStamp(updatedAt)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!isState) {
                const response = await request.post('/community', {
                    subject: subject.value,
                    content: content.value,
                    email: user.email,
                    category: categoryState,
                })
            } else {
                const responseTemp = await request.post('/community', {
                    subject: tempDataSubject.value,
                    content: tempDataContent.value,
                    email: user.email,
                    category: categoryState,
                })
            }
            setIsState(false)
            setTempMode(false)
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    const handleCategory = (e) => {
        setCategoryState(e.label)
    }

    const handleSave = async (e) => {
        try {
            const temp = await request.post(`/temp/write?id=${user.email}`, {
                subject: subject.value,
                content: content.value,
            })
            temp ? alert('임시저장이 완료되었습니다.') : console.log('Error')
        } catch (error) {
            console.log(error)
        }
    }
    const timeTempHandler = () => {
        setIsState(true)
    }

    return (
        <Community>
            <CommunityForm width="100%" height="33rem" onSubmit={handleSubmit}>
                <Subject>
                    {!isState ? (
                        <Input
                            value={subject.value}
                            onChange={subject.onChange}
                            placeholder="제목을 입력해주세요"
                            id="subject"
                            name="subject"
                        />
                    ) : (
                        <Input
                            value={tempDataSubject.value}
                            onChange={tempDataSubject.onChange}
                            placeholder="제목을 입력해주세요"
                            id="subject"
                            name="subject"
                        />
                    )}
                </Subject>

                <CategorySelect onChange={handleCategory} level={user.level} />
                <Content>
                    {!isState ? (
                        <TextArea
                            value={content.value}
                            onChange={content.onChange}
                            id="content"
                            name="content"
                            placeholder="하고싶은 얘기를 마음껏 적어주세요"
                        />
                    ) : (
                        <TextArea
                            value={tempDataContent.value}
                            onChange={tempDataContent.onChange}
                            id="content"
                            name="content"
                            placeholder="하고싶은 얘기를 마음껏 적어주세요"
                        />
                    )}
                </Content>

                <TempWrap>
                    {!updatedAt ? (
                        <></>
                    ) : (
                        <span onClick={timeTempHandler} style={{ cursor: 'pointer' }}>
                            {timeTemp}에 임시저장한 글이 있어요! 지금 불러오시겠어요?
                        </span>
                    )}
                </TempWrap>

                <ButtonDiv>
                    <Button
                        color="yellow"
                        fontColor="#fff"
                        fontSize="1.1rem"
                        height="3rem"
                        width="7rem"
                        type="button"
                        onClick={handleSave}
                    >
                        임시저장
                    </Button>
                    <Button
                        color="yellow"
                        fontColor="#fff"
                        fontSize="1.1rem"
                        height="3rem"
                        width="7rem"
                    >
                        글쓰기
                    </Button>
                </ButtonDiv>
            </CommunityForm>
        </Community>
    )
}
