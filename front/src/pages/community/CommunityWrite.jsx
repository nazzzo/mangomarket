import { useState, useEffect } from 'react'
import { Community, Subject, Content, KakaoMap, CommunityForm } from './styled'
import { Input } from '../../common/input'
import { Button } from '../../common/button'
import { useInput } from '../../hooks'
export const CommunityWrite = () => {
    const [subjectValue, setSubjectValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const subject = useInput('')
    console.log(subject.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('subject:::', subjectValue)
    }

    return (
        <Community>
            <CommunityForm width="100%" height="33rem" onSubmit={handleSubmit}>
                <Subject subjectValue={subjectValue} setSubjectValue={setSubjectValue}>
                    <Input value={subject.value} onChange={subject.onChange} />
                </Subject>
                <Content />
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
