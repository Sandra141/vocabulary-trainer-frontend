import React, { useContext, useEffect, useState } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { useAuthentification } from '../contexts/Authentification.js'
import useFetch from '../hooks/useFetch.js';
import { createURL_loginCredentials, createURL_loginJWT } from '../services/authentification'
import Loading from './modals/Loading.js';

const RequireAuthentification = ({ children }) => {
    const { token } = useAuthentification()
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)
    const [access, setAccess] = useState(false)
    const [showLoading, setShowLoading] = useState(true)

    useEffect(() => {
        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return

        // EXIT: authentification is not ok
        if (!data.success) return

        // SUCCESS: authentification ok
        setAccess(true)
    }, [data, error, isLoading])

    useEffect(() => {
        setRequest(createURL_loginJWT(token))
        // show 1 sek loading-modal
        setTimeout(() => {
            setShowLoading(false)
        }, 1000);
    }, [])

    // Step 1: show first loading
    if (showLoading) return <Loading isLoading={isLoading} />

    // Step 2: no access
    if (!access) return (
        <div>
            <h1>NO ACCESS</h1>
            <NavLink to="/login">GO back to login</NavLink>
        </div>
    )
    // if (!access) return <Navigate to="/login" state={{ from: location }} replace />;

    // Step 3: access
    return children
}

export default RequireAuthentification