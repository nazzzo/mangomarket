import { TextAreaStyled } from './styled'

export const TextArea = ({ value, onChange, placeholder }) => {
    return (
        <>
            <TextAreaStyled value={value} onChange={onChange} placeholder={placeholder} />
        </>
    )
}
