const API_URL = process.env.REACT_APP_API_URL + "/api"
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

// TODO: upload data from context.Vocabulary to mongoDB


export {
    createURL_download,
}