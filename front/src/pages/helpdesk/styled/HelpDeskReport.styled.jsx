import styled from 'styled-components'
import { useState } from 'react'
import request from '../../../utils/request'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ReportWrapper = styled.div`
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: center;
`

const ReportForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
`

const InputField = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`

const TextAreaField = styled.textarea`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 50%;
    resize: none;
`

const SubmitButton = styled.button`
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0060c0;
    }
`

export const Report = (reportInfo, setReportInfo) => {
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [pageState, setPageState] = useState('신고하기')
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubject(e.target.reportSubject.value)
        setContent(e.target.reportContent.value)

        const response = await request.post('/helpdesk', {
            subject: e.target.reportSubject.value,
            content: e.target.reportContent.value,
            user: user.email,
            pageState,
        })
        console.log(response.data)
        if (response.status === 201) {
            alert('신고접수가 완료되었습니다')
            navigate('/helpdesk')
        }
    }
    return (
        <ReportWrapper>
            <ReportForm onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    placeholder="신고 제목"
                    name="reportSubject"
                    id="reportSubject"
                />
                <TextAreaField placeholder="신고 내용" name="reportContent" id="reportContent" />
                <SubmitButton type="submit">신고하기</SubmitButton>
            </ReportForm>
        </ReportWrapper>
    )
}
