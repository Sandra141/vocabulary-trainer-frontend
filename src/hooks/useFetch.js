import { useEffect, useState } from 'react'

// asynchron fetch
const useFetch = (request) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // EXIT: url is empty
            if (request === null) {
                setData(null)
                setError(null)
                setIsLoading(false)
                return
            }

            setError(null)
            setIsLoading(true)

            console.log("fetch", request)

            try {
                const res = await fetch(request.url, request.options)
                //EXIT: 404
                if (!res.ok && res.status === 404) return setError("404: Server not found!")

                const json = await res.json()
                setData(json)
            } catch (err) {
                console.log("Error", err)
                try {
                    const json = await err.json()
                    setError(json)
                } catch (err2) {
                    setError(err + err2)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [request])

    return {
        data,
        error,
        isLoading,
    }
}

export default useFetch