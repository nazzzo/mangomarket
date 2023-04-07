import styled from 'styled-components'
import { TextArea } from '../../../common/textarea'
import { useTextArea } from '../../../hooks'
import request from '../../../utils/request'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const ReportWrapper = styled.div`
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: center;
    & > div > textArea {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 1rem;
    }
`

const ReportDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;

    & > div > div {
        pointer-events: none;
    }
`

const InputField = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    pointer-events: none;
`

const TextAreaField = styled.textarea`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 50%;
    resize: none;
    pointer-events: none;
`

const SubmitButton = styled.button`
    width: 5.5rem;
    height: 2.5rem;
    margin: 1rem 0;
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

const AdminAnswer = styled.div`
    width: 100%;
    height: 3rem;
    text-align: center;
    margin-top: 1rem;
    background-color: #f5f5f5;
    color: #333;
    font-weight: bold;
    padding: 2.5% 0;
    box-sizing: border-box;
`

export const HelpDeskView = ({ view }) => {
    const answer = useTextArea('')
    const navigate = useNavigate()
    const { id } = useParams()
    const submitHandler = async (e) => {
        e.preventDefault()
        const answerValue = answer.value
        const response = await request.post(`/helpdesk/board/${id}`, {
            answer: answerValue,
        })

        if (response.status >= 400 || response.data.isError) {
            alert(response.data.message)
        }
        navigate('/Community')
    }

    return (
        <form onSubmit={submitHandler}>
            <ReportWrapper>
                <ReportDiv>
                    <InputField
                        type="text"
                        name="subject"
                        id="subject"
                        value={view.subject}
                        readOnly
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: 'calc(50% - 4rem)',
                        }}
                    >
                        <TextAreaField
                            name="content"
                            id="content"
                            rows="10"
                            cols="50"
                            value={view.content}
                            readOnly
                        />
                        <AdminAnswer> [관리자 답변] </AdminAnswer>
                    </div>
                    {!view.answerBoolean ? (
                        <TextArea
                            value={answer.value}
                            onChange={answer.onChange}
                            id="answer"
                            name="answer"
                        />
                    ) : (
                        <TextArea value={view.answer} id="answer" name="answer" />
                    )}
                    <SubmitButton>답글작성</SubmitButton>
                </ReportDiv>
            </ReportWrapper>
        </form>
    )
}
