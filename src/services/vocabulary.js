//createURL_download
const API_URL = "http://localhost:9000/api"
const PATH_DOWNLOAD = "/download"

const createURL_download = (token) => {
    const url = API_URL + PATH_DOWNLOAD

    return {
        url: url,
        options: {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
        }
    }
}


export {
    createURL_download,
}