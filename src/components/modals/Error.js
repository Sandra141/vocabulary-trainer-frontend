import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import '../../css/error.css'

const Error = (props) => {
    const { error } = props
    const [showModal, setShowModal] = useState(false)

    const deeactivateModal = () => setShowModal(false)

    useEffect(() => {
        // activate Modal
        if (error) return setShowModal(true)

        // deactivate Modal
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }, [error])

    const renderError = () => !error
        ? null
        : (<div>{error}</div>)

    const renderModal = () => !showModal
        ? null
        : (<Modal>
            <div className='error'>
                <div className="card">
                    <h1>ERROR</h1>
                    {renderError()}
                    <button onClick={deeactivateModal}>OK</button>
                </div>
            </div>
        </Modal >)

    return (
        <>
            {renderModal()}
        </>
    )
}

export default Error