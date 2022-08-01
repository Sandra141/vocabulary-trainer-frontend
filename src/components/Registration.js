import { useEffect, useRef, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './../css/registration.css';
import HeaderBlank from "./HeaderBlank";
import { url_credentials_update } from '../services/authentification'
import { useAuthentification } from '../contexts/Authentification.js'


const Registration = () => {
    const refUsername = useRef(null)
    const refPassword = useRef(null)
    const [notificationUsername, setNotificationUsername] = useState("")
    const [notificationPassword, setNotificationPassword] = useState("")
    const [url, setUrl] = useState(null)
    const { data, error, isLoading } = useFetch(url)
    const { token, handleSetToken } = useAuthentification()
    const location = useLocation();
    const [isAuthentificated, setIsAuthentificated] = useState(false)

    const validateInput = () => {
        let result = true
        const username = refUsername.current.value
        const password = refPassword.current.value

        setNotificationUsername("")
        setNotificationPassword("")

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
        setNotificationUsername("")
        setNotificationPassword("")
    }

    const handleSubmit = e => {
        e.preventDefault();

        //EXIT: Validation not successful
        if (!validateInput()) return

        const username = refUsername.current.value
        const password = refPassword.current.value

        const newUrl = url_credentials_update(username, password)

        setUrl(newUrl)
    }

    useEffect(() => {
        console.log("err--------------", error)
        if (error) {
            console.log("ERRRRRRRRRRRRRRRRRRRRRRRRR", error)
            setNotificationUsername(!error ? "" : error.status)
            setNotificationPassword(!error ? "" : JSON.stringify(error))
        }
        else if (data && data.success && data.success === true) {
            // authentification ok
            console.log("WOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", data)

            // TOKEN
            if (data.data.token) {
                console.log("save token", data.data.token)
                handleSetToken(data.data.token)
            }
            // handleSetToken()
            setIsAuthentificated(true)

        } else if (data) {
            // authentification not ok
            console.log("FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", data)
            setNotificationUsername(!data.email ? "" : data.email)
            setNotificationPassword(!data.password ? "" : data.password)
        }
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