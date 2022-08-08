import { useEffect, useRef, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './../css/registration.css';
import HeaderBlank from "./layout/HeaderBlank";
import { url_credentials_update } from '../services/authentification'
import { useAuthentification } from '../contexts/Authentification.js'


const Registration = () => {
    const refUsername = useRef(null)
    const refPassword = useRef(null)
    const [notificationUsername, setNotificationUsername] = useState("")
    const [notificationPassword, setNotificationPassword] = useState("")
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)
    const { token, handleSetToken } = useAuthentification()
    const location = useLocation();
    const [isAuthentificated, setIsAuthentificated] = useState(false)

    // clear notifcations
    const clearNotifications = () => {
        setNotificationUsername("")
        setNotificationPassword("")
    }

    const validateInput = () => {
        clearNotifications()

        let result = true
        const username = refUsername.current.value
        const password = refPassword.current.value        

        // Username is empty
        if (!username) {
            setNotificationUsername("Username is empty!")
            result = false
        }
        // Password is empty
        if (!password) {
            setNotificationPassword("Password is empty!")
            result = false
        }
        // Password is to short
        if (password.length > 0 && password.length < 6) {
            setNotificationPassword("Password is to short!")
            result = false
        }

        return result
    }

    const handleChange = e => {
        clearNotifications()
    }

    const handleSubmit = e => {
        e.preventDefault();

        //EXIT: Validation not successful
        if (!validateInput()) return

        const username = refUsername.current.value
        const password = refPassword.current.value

        const newRequest = url_credentials_update(username, password)
        setRequest(newRequest)
    }

    useEffect(() => {
        clearNotifications()

        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return

        // EXIT: authentification is not ok
        if (!data.success) {
            if (data.email) setNotificationUsername(data.email)
            if (data.password) setNotificationUsername(data.password)
            return
        }

        // Wurde ein Token vom Server mitgesendet?
        if (data.data?.token) handleSetToken(data.data.token)

        // SUCCESS: authentification is ok        
        setIsAuthentificated(true)
    }, [data, error])

    const renderNotificationUsername = () => !notificationUsername
        ? <br />
        : <div>{notificationUsername}</div>

    const renderNotificationPassword = () => !notificationPassword
        ? <br />
        : <div>{notificationPassword}</div>

    if (isAuthentificated) return <Navigate to="/download" state={{ from: location }} replace />;

    return (
        <div className='ContainerForHeaderBlankAndMain'>
            <HeaderBlank />

            <div className='content'>
                <h2 id="registrationH2">Welcome!</h2>
                <p>Let's expand your knowledge!</p>
                <form onSubmit={handleSubmit} className='registrationForm'>
                    <label for="username">Username / E-mail:</label><br />
                    <input ref={refUsername} onChange={handleChange} type="text" id="username" name="username" className='gray' /><br />
                    {renderNotificationUsername()}
                    <label for="password">Password:</label><br />
                    <input ref={refPassword} onChange={handleChange} type="password" id="password" name="password" className='darkBlue' /><br />
                    {renderNotificationPassword()}
                    <input type="submit" value="Sign up" id="submitRegistration" className='pink' />
                </form>
                <div className='alreadyAMember'>
                    <p>Already a member?</p>
                    <NavLink to="/login">Log in</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Registration;