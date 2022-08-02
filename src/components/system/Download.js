import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Loading from '../modals/Loading.js';
import { Navigate, useLocation } from 'react-router-dom';
import { url_sync_read } from '../../services/vocabulary'
import { useAuthentification } from '../../contexts/Authentification.js'
import { useVocabulary } from '../../contexts/Vocabulary'

const Download = () => {
    const { token } = useAuthentification()
    const {
        set_users,
        set_decks,
        set_users_decks,
        set_cards,
        set_decks_cards
    } = useVocabulary()

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
        if (!data.success) return console.log("authentification is not ok")

        // SUCCESS: authentification und download ok
        const { users, decks, users_decks, cards, decks_cards } = data.data[0]
        set_users(users)
        set_decks(decks)
        set_users_decks(users_decks)
        set_cards(cards)
        set_decks_cards(decks_cards)

        setShowLoading(false)
    }, [data, error, isLoading])

    useEffect(() => {
        setRequest(url_sync_read(token))
        // show 1 sek loading-modal
        // setTimeout(() => {
        // setShowLoading(false)
        // }, 1000);
    }, [])

    // Stufe 1: Zeige Loading spinner an
    if (showLoading) return <Loading msg={"Download"} isLoading={isLoading} />

    // Download complete
    return <Navigate to="/decks" state={{ from: location }} replace />;
}

export default Download