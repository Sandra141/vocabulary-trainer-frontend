import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const Authentification = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const handleSetToken = (token) => {
        localStorage.setItem("token", token) 
        setToken(token)
    }

    const clear_localstorage = () => {
        localStorage.clear();
    }

    return (
        <StateContext.Provider
            value={{
                token, 
                handleSetToken,
                clear_localstorage
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useAuthentification = () => useContext(StateContext)