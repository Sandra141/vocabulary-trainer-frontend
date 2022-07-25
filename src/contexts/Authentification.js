import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const Authentification = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const handleSetToken = async (token) => await localStorage.setItem("token", token) 

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