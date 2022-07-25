import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import '../../css/loading.css'

const Loading = (props) => {
    const { isLoading } = props
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        // activate Modal
        if (isLoading) return setShowModal(true)

        // deactivate Modal
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }, [isLoading])

    const renderModal = () => !showModal
        ? null
        : (<Modal>
            <div className='loading'>
                <div className="card">
                    Loading...Please wait...
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