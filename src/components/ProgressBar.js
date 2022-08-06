import React from 'react'
import '../css/progressBar.css';

const ProgressBar = (props) => {
    const { amount, total, msg_empty } = props

    // EXIT: no values
    if (amount === 0 && total === 0) return (
        <div className='progressBar'>
            <p>{msg_empty}</p>
        </div >
    )

    const percentage = amount * 100 / total
    const style = { width: percentage + "%" }

    return (
        <div className='progressBar'>
            <p>Progress: {amount} / {total} </p>
            <div className='total'>
                <div className='progress' style={style}></div>
            </div>
        </div>
    )
}

export default ProgressBar