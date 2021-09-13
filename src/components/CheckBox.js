import React from 'react'

function CheckBox({ className, text, ...rest }) {
    return (
        <label className={ className }>
            <input type="checkbox" { ...rest } />
            <span> { text }</span>
        </label>
    )
}

export default CheckBox
