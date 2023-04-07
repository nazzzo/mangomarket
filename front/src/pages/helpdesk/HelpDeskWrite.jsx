import React from 'react'
import styled from 'styled-components'
import { ContactForm } from './styled'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
export const HelpDeskWrite = () => {
    return (
        <Wrapper>
            <ContactForm />
        </Wrapper>
    )
}
