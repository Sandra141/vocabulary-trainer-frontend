import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Loading from '../modals/Loading.js';
import { Navigate, useLocation } from 'react-router-dom';
import { createURL_download } from '../../services/vocabulary'
import { useAuthentification } from '../../contexts/Authentification.js'
import { useVocabulary } from '../../contexts/Vocabulary'

const Download = () => {
    const { token } = useAuthentification()
    const { setUser_id, setDecks, setDecks_cards, setCards } = useVocabulary()

    const [showLoading, setShowLoading] = useState(true)
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)
    const location = useLocation();

    useEffect(() => {
        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return

        // EXIT: authentification is not ok
        if (!data.success) return

        // SUCCESS: authentification und download ok
        const { _id: user_id, decks, decks_cards, cards } = data.data[0]
        setUser_id(user_id)
        setDecks(decks)
        setDecks_cards(decks_cards)
        setCards(cards)

        setShowLoading(true)
    }, [data, error, isLoading])

    useEffect(() => {
        setRequest(createURL_download(token))
        // show 1 sek loading-modal
        setTimeout(() => {
            setShowLoading(false)
        }, 1000);
    }, [])

    // Stufe 1: Zeige Loading spinner an
    if (showLoading) return <Loading msg={"Download"} isLoading={isLoading} />

    // Download complete
    return <Navigate to="/decks" state={{ from: location }} replace />;
}

export default Download