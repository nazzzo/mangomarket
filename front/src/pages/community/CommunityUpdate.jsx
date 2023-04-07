import { UpdateWrapper, UpdateContent, UpdateSubject, UpdateForm } from './styled'
import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import request from '../../utils/request'
import { Button } from '../../common/button'
import { useInput, useTextArea } from '../../hooks'
import { TextArea } from '../../common/textarea'
import { useNavigate } from 'react-router-dom'
export const CommunityUpdate = ({ view, setView, setEditMode }) => {
    const { id } = useParams()
    const [communityInfo, setCommunityInfo] = useState()
    const navigate = useNavigate()
    const subjectInput = useInput(view.subject)
    const contentTextArea = useTextArea(view.content)

    console.log(`view3333:::`, view, setEditMode)

    const handleUpdate = async (e) => {
        e.preventDefault()
        const response = await request.put(`/community/${id}`, {
            subject: subjectInput.value,
            content: contentTextArea.value,
        })
        console.log(response.data)
        if (response.data === 1) {
            setView((rest) => ({
                ...rest,
                subject: subjectInput.value,
                content: contentTextArea.value,
            }))
            setEditMode(false)
        }
    }

    return (
        <UpdateWrapper>
            <form onSubmit={handleUpdate}>
                <UpdateContent>
                    <UpdateSubject
                        value={subjectInput.value}
                        onChange={subjectInput.onChange}
                        id="subject"
                        name="subject"
                    />
                    <TextArea
                        value={contentTextArea.value}
                        onChange={contentTextArea.onChange}
                        id="content"
                        name="content"
                        type="text-area"
                    />
                </UpdateContent>
                <Button
                    color="yellow"
                    fontColor="#fff"
                    fontSize="1.1rem"
                    height="3rem"
                    width="7rem"
                >
                    수정
                </Button>
            </form>
        </UpdateWrapper>
    )
}
