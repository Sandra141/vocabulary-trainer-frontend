import React from 'react'
import '../../css/modal.css'

const Modal = (props) => {
    const { children } = props

    return (
        <div className='modal'>
            {children}
        </div>
    )
}

export default Modal