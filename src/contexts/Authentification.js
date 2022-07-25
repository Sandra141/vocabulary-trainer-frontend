import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const Authentification = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const handleSetToken = (token) => {
        localStorage.setItem("token", token) 
        setToken(token)
    }

    return (
        <StateContext.Provider
            value={{
                token, handleSetToken
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useAuthentification = () => useContext(StateContext)