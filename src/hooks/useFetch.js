import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => async () => {
        setIsError(null)
        setIsLoading(true)

        try {
            const res = await fetch(url)
            const json = await res.json()

            setData(json)
        } catch (err) {
            setIsError(err)
        } finally {
            setIsLoading(false)
        }
    }, [url])

    return { data, isLoading, isError }
}

export default useFetch