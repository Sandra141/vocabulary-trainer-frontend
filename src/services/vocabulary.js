const API_URL = process.env.REACT_APP_API_URL + "/vocabulary"
const PATH_Cards = "/cards"
const PATH_DECKS_CARDS = "/decks_cards"
const PATH_DECKS = "/decks"
const PATH_SYNC = "/sync"
const PATH_USERS_DECKS = "/users_decks"

//////////
////////// HINT:
////////// Without "_id" we create a new data 
////////// With "_id" we update an existing data
//////////

// ### download
// POST http://localhost:9000/vocabulary/sync
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU3YWVkZmY0ZWZhMmJjOGEwNzNmMmQiLCJlbWFpbCI6ImVuZ2xpc2giLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNTY1NTMsImV4cCI6MTY2Mjk1NjU1M30.SvWRO5TQBhGQR40NaaOAXTmAK8Pr1AqG4UjY0bfgYEI"
// }
const url_sync_read = (token) => {
    const url = API_URL + PATH_SYNC

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

// ### create/update decks
// PUT http://localhost:9000/vocabulary/decks
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU3YWVkZmY0ZWZhMmJjOGEwNzNmMmQiLCJlbWFpbCI6ImVuZ2xpc2giLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNTY1NTMsImV4cCI6MTY2Mjk1NjU1M30.SvWRO5TQBhGQR40NaaOAXTmAK8Pr1AqG4UjY0bfgYEI",
//     "decks": [
//          {"name": "English 5", "shared": false },
//          {"name": "English 6", "shared": false }
//     ]
// }
const url_decks_update = (token, decks) => {
    const url = API_URL + PATH_DECKS

    return {
        url: url,
        options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'authorization': 'Bearer ' + token,
                decks
            })
        }
    }
}

// ### create/update users_decks
// PUT http://localhost:9000/vocabulary/users_decks
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU3YWVkZmY0ZWZhMmJjOGEwNzNmMmQiLCJlbWFpbCI6ImVuZ2xpc2giLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNTY1NTMsImV4cCI6MTY2Mjk1NjU1M30.SvWRO5TQBhGQR40NaaOAXTmAK8Pr1AqG4UjY0bfgYEI",
//     "users_decks": [
//        {
//         "users_id": "62e7aedff4efa2bc8a073f2d", 
//         "decks_id": "62e7bd2dbf5f958cd09d508a", 
//         "author": "62e7aedff4efa2bc8a073f2d",
//         "liked": 0
//         }
//     ]
// }
const url_users_decks_update = (token, users_decks) => {
    const url = API_URL + PATH_USERS_DECKS

    return {
        url: url,
        options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'authorization': 'Bearer ' + token,
                users_decks
            })
        }
    }
}

// ### create/update cards
// PUT http://localhost:9000/vocabulary/cards
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU3YWVkZmY0ZWZhMmJjOGEwNzNmMmQiLCJlbWFpbCI6ImVuZ2xpc2giLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNTY1NTMsImV4cCI6MTY2Mjk1NjU1M30.SvWRO5TQBhGQR40NaaOAXTmAK8Pr1AqG4UjY0bfgYEI",
//     "cards": [
//        {
//         "front": "Guten Tag",
//         },
//         {
//         "front": "Good morning",
//         }
//     ]
// }
const url_cards_update = (token, cards) => {
    const url = API_URL + PATH_Cards

    return {
        url: url,
        options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'authorization': 'Bearer ' + token,
                cards
            })
        }
    }
}

// ### create/update decks_cards
// PUT http://localhost:9000/vocabulary/decks_cards
// Content-Type: application/json

// {
//     "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU3YWVkZmY0ZWZhMmJjOGEwNzNmMmQiLCJlbWFpbCI6ImVuZ2xpc2giLCJpc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTkzNTY1NTMsImV4cCI6MTY2Mjk1NjU1M30.SvWRO5TQBhGQR40NaaOAXTmAK8Pr1AqG4UjY0bfgYEI",
//     "decks_cards": [
//        {
//         "decks_id": "62e7bd2dbf5f958cd09d508a", 
//         "cards_id": "62e7cbaeb9c6207a9da701f4"
//         }
//     ]
// }
const url_decks_cards_update = (token, decks_cards) => {
    const url = API_URL + PATH_DECKS_CARDS

    return {
        url: url,
        options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'authorization': 'Bearer ' + token,
                decks_cards
            })
        }
    }
}

export {
    url_sync_read,
    url_decks_update,
    url_users_decks_update,
    url_cards_update,
    url_decks_cards_update,
}

// TODO: SEARCH
// db['students'].find().skip(skips).limit(page_size)
// const createURL_download_public = (token, page_size, page_num) => {
//     const url = API_URL + PATH_DOWNLOAD_PUBLIC
//     const skips = page_size * page_num

//     return {
//         url: url,
//         options: {
//             method: 'POST',
//             headers: { 'Authorization': 'Bearer ' + token },
//             body: JSON.stringify({
//                 skip: skips,
//                 limit: page_num
//             })
//         }
//     }
// }


// TODO: upload data from context.Vocabulary to mongoDB