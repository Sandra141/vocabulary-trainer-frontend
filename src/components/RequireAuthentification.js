import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentification } from '../contexts/Authentification.js'
import useFetch from '../hooks/useFetch.js';
import { createURL_loginCredentials, createURL_loginJWT } from '../services/authentification'


const RequireAuthentification = ({ children }) => {
    const { token } = useAuthentification()
    const location = useLocation()
    const [url, setUrl] = useState(null)
    const { data, error, isLoading } = useFetch(url)
    const [access, setAccess] = useState(false)

    useEffect(() => {
        if (error) {
            console.log("ERRRRRRRRRRRRRRRRRRRRRRRRR", error)
        }
        else if (data && data.success && data.success === true) {
            // authentification ok
            console.log("WOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", data)
            setAccess(true)
        } else if (data) {
            // authentification not ok
            console.log("FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", data)

        }
    }, [data, error, isLoading])

    useEffect(() => {
        setUrl(createURL_loginJWT(token))
    }, [])

    // Step 1: show first loading
    if (isLoading) return <h1>Loading</h1>

    if (!access) return <h1>NO ACCESS. Maxybe if you have created an account pleaxe try in a few minutes again.</h1>
    // Step 2: no access
    // if (!access) return <Navigate to="/login" state={{ from: location }} replace />;

    // Step 3: access
    return children
}

export default RequireAuthentification