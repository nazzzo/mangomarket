import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import request from '../../../utils/request'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    & > form {
        position: relative;
    }
`

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 6px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-bottom: 16px;
`

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    resize: none;
    height: 150px;
    margin-bottom: 16px;
`

const Button = styled.button`
    width: 20%;
    background-color: #0088cc;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: skyblue;
        color: #fff;
    }
`

export const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [pageState, setPageState] = useState('문의하기')
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await request.post('/helpdesk', {
            name: user.username,
            email: user.email,
            message,
            pageState,
        })

        alert('1:1문의가 접수되었습니다.')
        navigate('/helpdesk')
    }

    return (
        <Wrapper>
            <h2>1:1 문의남기기</h2>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="name">이름:</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={user.username}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="email">Email:</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Label htmlFor="message">문의내용:</Label>
                <TextArea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit">접수하기</Button>
                </div>
            </form>
        </Wrapper>
    )
}
