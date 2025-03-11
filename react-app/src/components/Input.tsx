import React from 'react'

export const Input = (props) => {
    let { placeholder, handleInput, name } = props
    return (
        <div>
            <input className='input-field' type="text" name={name} onChange={handleInput} placeholder={placeholder} />
        </div>
    )
}
