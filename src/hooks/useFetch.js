import { useEffect, useState } from 'react'

const useFetch = (request) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // console.log("FETCH")
            // EXIT: url is empty
            if (request === null) {
                setData(null)
                setError(null)
                setIsLoading(false)
                return
            }

            setError(null)
            setIsLoading(true)

            try {
                const res = await fetch(request.url, request.options)

                //EXIT: 404
                if (!res.ok && res.status === 404) return setError("404: Server not found!")

                const json = await res.json()
                setData(json)
            } catch (err) {
                const json = await err.json()
                setError(json)
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