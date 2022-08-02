import { useRef, useState, useEffect } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import HeaderBlank from "./HeaderBlank";
import { url_credentials_read } from '../services/authentification'
import Loading from './modals/Loading';
import Error from './modals/Error';
import { useAuthentification } from '../contexts/Authentification.js'

const Login = () => {
    const { handleSetToken } = useAuthentification()

    const refUsername = useRef(null)
    const refPassword = useRef(null)

    const [notificationUsername, setNotificationUsername] = useState("")
    const [notificationPassword, setNotificationPassword] = useState("")
    const [isAuthentificated, setIsAuthentificated] = useState(false)
    const [showLoading, setShowLoading] = useState(true)

    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)

    const location = useLocation();


    // clear notifcations
    const clearNotifications = () => {
        setNotificationUsername("")
        setNotificationPassword("")
    }

    // validate user input before communicate with server
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

    // Delete Notifications when user is typing
    const handleChange = e => {
        clearNotifications()
    }

    // Submit
    const handleSubmit = e => {
        e.preventDefault();

        //EXIT: Validation not successful
        if (!validateInput()) return

        const username = refUsername.current.value
        const password = refPassword.current.value

        const newRequest = url_credentials_read(username, password)
        setRequest(newRequest)
    }

    // when token available try to fetch data
    useEffect(() => {
        // zeige erst loading screen an
        // setTimeout(() => {
        setShowLoading(false)
        // }, 3000);
    }, [])

    // handle authentification
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

    const renderLoading = () => !error
        ? null
        : <Error error={error} />

    // Stufe 1: Zeige Loading spinner an
    if (showLoading) return <Loading isLoading={isLoading} />

    // Stufe 2: jwt authentifizierung ok, dann navigiere direkt zu...
    if (isAuthentificated) return <Navigate to="/download" state={{ from: location }} replace />;

    // Stufe 3: Zeige Login-maske an
    return (
        <div className='ContainerForHeaderBlankAndMain'>

            {renderLoading()}

            <HeaderBlank />

            <div className='content'>
                <h2 id="registrationH2">Welcome back!</h2>
                <form onSubmit={handleSubmit} className='registrationForm'>
                    <label for="username">Username / E-mail:</label><br />
                    <input ref={refUsername} onChange={handleChange} type="text" id="username" name="username" className='gray' /><br />
                    {renderNotificationUsername()}
                    <label for="password">Password:</label><br />
                    <input ref={refPassword} onChange={handleChange} type="password" id="password" name="password" className='darkBlue' /><br />
                    {renderNotificationPassword()}
                    <input type="submit" value="Log in" id="submitRegistration" className='pink' />
                </form>
                <div className='alreadyAMember'>
                    <p>No profile yet?</p>
                    <NavLink to="/registration">Register</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Login;