const API_URL = process.env.REACT_APP_API_URL + "/authentification"
const PATH_CREDENTIALS = "/credentials"
const PATH_JWT = "/jwt"

// ### credentials registrieren
// PUT http://localhost:9000/authentification/credentials
// Content-Type: application/json

// {
//     "email":"japanese", 
//     "password":"123456"
// }
const url_credentials_update = (email, password) => {
    const url = API_URL + PATH_CREDENTIALS

    return {
        url: url,
        options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    }
}

// ### credentials auth
// POST http://localhost:9000/authentification/credentials
// Content-Type: application/json

// {
//     "email":"english", 
//     "password":"123456"
// }
const url_credentials_read = (email, password) => {
    const url = API_URL + PATH_CREDENTIALS

    return {
        url: url,
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    }
}

// ### jwt auth
// POST http://localhost:9000/authentification/jwt
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU1Nzk1OWNiYWVkM2EyOWIzNjRiZjciLCJlbWFpbCI6ImFhYWEuZW1haWwiLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNDQ5NjAsImV4cCI6MTY2Mjk0NDk2MH0.ZnxDF7yf0It7NKQTiiIzvGgs3XPmlLCYm4nGFCJx2C0"
// }
const url_jwt_read = (token) => {
    const url = API_URL + PATH_JWT

    return {
        url: url,
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'authorization': 'Bearer ' + token
            })
        }
    }
}

export {
    url_credentials_update,
    url_credentials_read,
    url_jwt_read,
}