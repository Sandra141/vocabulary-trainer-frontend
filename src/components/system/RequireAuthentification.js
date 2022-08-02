import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch.js';
import Loading from '../modals/Loading.js';
import { NavLink } from 'react-router-dom';
import { useAuthentification } from '../../contexts/Authentification'
import { url_jwt_read } from '../../services/authentification'

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
        setRequest(url_jwt_read(token))
        // show 1 sek loading-modal
        // setTimeout(() => {
        setShowLoading(false)
        // }, 1000);
    }, [])

    //Step 1: show first loading
    if (showLoading) return <Loading isLoading={isLoading} />

    // Step 2: no access
    if (!access) return (
        <div>
            <h1>NO ACCESS</h1>
            <NavLink to="/login">GO back to login</NavLink>
        </div>
    )

    // Step 3: access
    return children
}

export default RequireAuthentification