import { useState } from 'react'

export const useTextArea = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange,
    }
}
