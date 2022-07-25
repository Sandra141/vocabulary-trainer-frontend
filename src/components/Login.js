import { useRef, useState, useEffect } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import HeaderBlank from "./HeaderBlank";
import { createURL_loginCredentials, createURL_loginJWT } from '../services/authentification'
import Loading from './modals/Loading';
import Error from './modals/Error';
import { useAuthentification } from '../contexts/Authentification.js'

const Login = () => {
    const refUsername = useRef(null)
    const refPassword = useRef(null)
    const [notificationUsername, setNotificationUsername] = useState("")
    const [notificationPassword, setNotificationPassword] = useState("")
    const [url, setUrl] = useState(null)
    const { data, error, isLoading } = useFetch(url)
    const { token, handleSetToken } = useAuthentification()
    const location = useLocation();
    const [isAuthentificated, setIsAuthentificated] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

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

        const newUrl = createURL_loginCredentials(username, password)

        setUrl(newUrl)
    }

    // handle authentification with credentials
    // TRUE: Fetch jwt
    // FALSE: Delete everything
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

    // can we authentification with JWT
    useEffect(() => {
        // zeige erst loading screen an
        setTimeout(() => {
            // EXIT: kein token gefunden
            console.log("token", token)
            if (token) {
                const newUrl = createURL_loginJWT(token)
                setUrl(newUrl)
                
            } 
            
            setShowLogin(true)
        }, 3000);
    }, [])

    const renderNotificationUsername = () => !notificationUsername
        ? <br />
        : <div>{notificationUsername}</div>

    const renderNotificationPassword = () => !notificationPassword
        ? <br />
        : <div>{notificationPassword}</div>

    const renderLoading = () => error
        ? <Error error={error} />
        : <Loading isLoading={isLoading} />

    // Stufe 1: Zeige Loading spinner an
    if (!showLogin) return <Loading isLoading={isLoading} />

    // Stufe 2: jwt authentifizierung ok, dann navigiere direkt zu...
    if (isAuthentificated) return <Navigate to="/" state={{ from: location }} replace />;

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