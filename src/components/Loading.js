import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'

const Loading = (props) => {
    const { url, children, cb_success, cb_failure } = props
    const { data, error, isLoading } = useFetch(url)
    const [showModal, setShowModal] = useState(false)

    const renderError = () => !error
        ? null
        : (<div>
            FEHLER WURDE FESTGETSELLT:
            <br />
            <br />
            {JSON.stringify(error)}
        </div>)

    const renderLoading = () => !isLoading
        ? null
        : (<div>LOADING...</div>)

    const renderModal = () => !showModal
        ? null
        : (<div
            style={{
                background: "#fffc",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                width: "100vw",
                flex: "1",
                height: "100vh",
                top: "0px",
                left: "0px",
                zIndex: 100,
                margin: "center",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    border: "2px solid black",
                    borderRadius: "14px",
                    padding: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    flex: "1",
                    margin: "center",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {renderError()}
                {renderLoading()}
                <br />
                <br />
                <button onClick={() => setShowModal(false)}>KLICK MICH: Ich habe verstanden</button>
            </div>
        </div>)

    // de-/actived modal
    useEffect(() => {
        console.log("useEffect", error, isLoading)
        if (error || isLoading) {
            console.log("useEffect 11111")
            setShowModal(true)
        } else {
            console.log("useEffect 2222")
            setShowModal(false)
        }

    }, [data, error, isLoading, url])

    return (
        <>
            {renderModal()}
            {children}
        </>
    )
}

export default Loading