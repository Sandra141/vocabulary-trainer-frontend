import React, { useEffect, useState } from 'react'
import HeaderBlank from "../layout/HeaderBlank";
import useFetch from '../../hooks/useFetch.js';
import Loading from '../modals/Loading.js';
import { NavLink } from 'react-router-dom';
import { useAuthentification } from '../../contexts/Authentification'
import { useVocabulary } from '../../contexts/Vocabulary'
import { url_jwt_read } from '../../services/authentification'
import { url_sync_read } from '../../services/vocabulary'

const RequireAuthentification = ({ children }) => {
    const { token } = useAuthentification()
    const {
        set_users,
        set_decks,
        set_users_decks,
        set_cards,
        set_decks_cards
    } = useVocabulary()
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)
    const [access, setAccess] = useState(false)
    const [showLoading, setShowLoading] = useState(true)

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

        setAccess(true)
    }, [data, error, isLoading])

    useEffect(() => {
        setRequest(url_sync_read(token))
        // show 1 sek loading-modal
        // setTimeout(() => {
        setShowLoading(false)
        // }, 1000);
    }, [])

    //Step 1: show first loading
    if (showLoading) return <Loading isLoading={isLoading} />

    // Step 2: no access
    if (!access) return (
        <>
        <HeaderBlank />
        <div className="pageNotFoundContainer">
            <h2>NO ACCESS</h2>
            <p>Would you like to log in?</p>
            <div className='lightBlue'><NavLink to="/login" >Go back to login</NavLink></div>
        </div>
        </>
    )

    // Step 3: access
    return children
}

export default RequireAuthentification