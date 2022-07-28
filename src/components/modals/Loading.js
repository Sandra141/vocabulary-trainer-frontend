import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import '../../css/loading.css'

const Loading = (props) => {
    const { isLoading, msg } = props
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        // activate Modal
        if (isLoading) return setShowModal(true)
    }, [isLoading])

    const renderModal = () => !showModal
        ? null
        : (<Modal>
            <div className='loading'>
                <div className="card">
                    <h1>{!msg ? "Loading..." : msg}</h1>
                    <p>Please wait...</p>
                </div>
            </div>
        </Modal >)

    return (
        <>
            {renderModal()}
        </>
    )
}

export default Loading