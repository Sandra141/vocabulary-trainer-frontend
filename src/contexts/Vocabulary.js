import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { ObjectID } from 'bson';
import {
    url_sync_read,
    url_decks_update,
    url_users_decks_update,
    url_cards_update,
    url_decks_cards_update,
} from '../services/vocabulary.js'

import { useAuthentification } from './Authentification.js'

const VocabularyContext = createContext()

export const Vocabulary = ({ children }) => {
    //# context
    const { token } = useAuthentification()

    //# load initial from localstorage
    const get_storage_users = () => {
        try {
            return JSON.parse(localStorage.getItem("users"))
        } catch (error) {
            return []
        }
    }

    const get_storage_decks = () => {
        try {
            return JSON.parse(localStorage.getItem("decks"))
        } catch (error) {
            return []
        }
    }

    const get_storage_users_decks = () => {
        try {
            return JSON.parse(localStorage.getItem("users_decks"))
        } catch (error) {
            return []
        }
    }

    const get_storage_cards = () => {
        try {
            return JSON.parse(localStorage.getItem("cards"))
        } catch (error) {
            return []
        }
    }

    const get_storage_decks_cards = () => {
        try {
            return JSON.parse(localStorage.getItem("decks_cards"))
        } catch (error) {
            return []
        }
    }

    //# states
    const [users, set_users] = useState(get_storage_users())
    const [decks, set_decks] = useState(get_storage_decks())
    const [users_decks, set_users_decks] = useState(get_storage_users_decks())
    const [cards, set_cards] = useState(get_storage_cards())
    const [decks_cards, set_decks_cards] = useState(get_storage_decks_cards())

    //# localstorage save
    useEffect(() => {
        // EXIT: empty
        if (!users) return

        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    useEffect(() => {
        // EXIT: empty
        if (!decks) return

        localStorage.setItem("decks", JSON.stringify(decks))
    }, [decks])

    useEffect(() => {
        // EXIT: empty
        if (!users_decks) return

        localStorage.setItem("users_decks", JSON.stringify(users_decks))
    }, [users_decks])

    useEffect(() => {
        // EXIT: empty
        if (!cards) return

        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards])

    useEffect(() => {
        // EXIT: empty
        if (!decks_cards) return

        localStorage.setItem("decks_cards", JSON.stringify(decks_cards))
    }, [decks_cards])

    //# request to db
    const [users_request, set_users_request] = useState(null)
    const { } = useFetch(users_request)

    const [decks_request, set_decks_request] = useState(null)
    const { } = useFetch(decks_request)

    const [users_decks_request, set_users_decks_request] = useState(null)
    const { } = useFetch(users_decks_request)

    const [cards_request, set_cards_request] = useState(null)
    const { } = useFetch(cards_request)

    const [decks_cards_request, set_decks_cards_request] = useState(null)
    const { } = useFetch(decks_cards_request)



    //# create
    //## create new deck
    const createDeck = (name, shared = false, liked = 0) => {
        // EXIT: required forgetten
        if (!name) return

        // decks
        const decks_id = new ObjectID().toString()
        const new_decks = {
            _id: decks_id,
            name,
            shared
        }

        // users_decks
        const users_decks_id = new ObjectID().toString()
        const new_users_decks = {
            _id: users_decks_id,
            users_id: users._id,
            author: users._id,
            decks_id,
            liked
        }

        // local
        set_decks(prev => [...prev, new_decks])
        set_users_decks(prev => [...prev, new_users_decks])

        // db
        set_decks_request(url_decks_update(token, [new_decks]))
        set_users_decks_request(url_users_decks_update(token, [new_users_decks]))
    }

    //## create ne card
    const createCard = (decks_id, front, back, rank = 0) => {
        // EXIT: required forgetten
        if (!decks_id) return
        if (!front) return
        if (!back) return

        // cards
        const cards_id = new ObjectID().toString()
        const new_cards = {
            _id: cards_id,
            front,
            back,
            rank
        }

        // decks_cards
        const decks_cards_id = new ObjectID().toString()
        const new_decks_cards = {
            _id: decks_cards_id,
            decks_id,
            cards_id
        }

        // local
        set_cards(prev => [...prev, new_cards])
        set_decks_cards(prev => [...prev, new_decks_cards])

        // db
        set_cards_request(url_cards_update(token, [new_cards]))
        set_decks_cards_request(url_decks_cards_update(token, [new_decks_cards]))
    }

    //# update
    //## update existing deck
    const updateDeck = deck => {
        // EXIT: required forgetten
        if (!deck) return

        // local
        const index = decks.findIndex(x => x._id === deck._id)
        // EXIT: No deck found
        if (index === -1) return
        // set
        set_decks(prev => {
            const copy = [...prev]
            copy[index] = deck
            return copy
        })

        // db
        set_decks_request(url_decks_update(token, [deck]))
    }

    //## update existing card
    const updateCard = card => {
        // EXIT: required forgetten
        if (!card) return

        // local
        const index = decks.findIndex(x => x._id === card._id)
        // EXIT: No card found
        if (index === -1) return
        // set
        set_cards(prev => {
            const copy = [...prev]
            copy[index] = card
            return copy
        })

        // db
        set_cards_request(url_cards_update(token, [card]))
    }

    //# get
    const getDeckFromCard = card => {
        // EXIT: required forgetten
        if (!card) return

        const deck = decks_cards.find(x => x.cards_id === card._id)
        return decks.find(x => x._id === deck.decks_id)
    }

    const getCardsFromDeck = deck => {
        // EXIT: required forgetten
        if (!deck) return

        const cards = decks_cards.filter(x => x.decks_id === deck._id)
        const card_ids = cards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    const getDeckFromDeckId = _id => {
        // EXIT: required forgetten
        if (!_id) return

        const index = decks.findIndex(x => x._id === _id)

        // EXIT: no deck found
        if(index === -1) return

        return decks[index]
    }

    const getCardsFromDeckId = _id => {
        // EXIT: required forgetten
        if (!_id) return

        const cards = decks_cards.filter(x => x.decks_id === _id)
        const card_ids = cards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    return (
        <VocabularyContext.Provider
            value={{
                // states
                users,
                decks,
                cards,

                // override
                set_users,
                set_decks,
                set_users_decks,
                set_cards,
                set_decks_cards,

                // create
                createDeck,
                createCard,

                // update
                updateDeck,
                updateCard,

                // get
                getDeckFromCard,
                getCardsFromDeck,
                getCardsFromDeckId,
                getDeckFromDeckId,
            }}
        >
            {children}
        </VocabularyContext.Provider>
    )
}

export const useVocabulary = () => useContext(VocabularyContext)