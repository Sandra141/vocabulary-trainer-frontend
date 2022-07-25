const API_URL = "http://localhost:9000/api/auth"
const PATH_LOGIN = "/login"
const PATH_REGISTER = "/register"

const createURL_loginCredentials = (email, password) => {
    const url = API_URL + PATH_LOGIN

    return {
        url: url,
        options: {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        }
    }
}

const createURL_loginJWT = (token) => {
    const url = API_URL + PATH_LOGIN

    return {
        url: url,
        options: {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
        }
    }
}

const createURL_register = (email, password) => { 
    const url = API_URL + PATH_REGISTER

    return {
        url: url,
        options: {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        }
    }
}

export {
    createURL_loginCredentials,
    createURL_loginJWT,
    createURL_register,
}