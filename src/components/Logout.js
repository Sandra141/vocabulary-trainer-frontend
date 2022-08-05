import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentification } from '../contexts/Authentification.js'

const Logout = () => {
    const { clear_localstorage } = useAuthentification()
    const location = useLocation();

    useEffect(() => {
        // clear computer
        clear_localstorage()
    }, [])


    return <Navigate to="/login" state={{ from: location }} replace />;
}

export default Logout