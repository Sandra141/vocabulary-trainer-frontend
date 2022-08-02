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

const StateContext = createContext()

export const Vocabulary = ({ children }) => {
    const { token } = useAuthentification()
    // STATES
    const [users, set_users] = useState([])
    const [decks, set_decks] = useState([])
    const [users_decks, set_users_decks] = useState([])
    const [cards, set_cards] = useState([])
    const [decks_cards, set_decks_cards] = useState([])

    // upload db
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

    // override
    const initial_users = data => set_users(data)
    const initial_decks = data => set_decks(data)
    const initial_users_decks = data => set_users_decks(data)
    const initial_cards = data => set_cards(data)
    const initial_decks_cards = data => set_decks_cards(data)

    // create
    const createDeck = (name, shared = false, liked = 0) => {
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

    const createCard = (decks_id, front, back, rank = 0) => {
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

    // update
    const updateDeck = deck => {
        // local
        const index = decks.findIndex(x => x._id === data._id)
        // EXIT: No data found
        if (index === -1) return prev
        // set
        set_decks(prev => {
            const copy = [...prev]
            copy[index] = data
            return copy
        })

        // db

    }

    // get
    const getDeckFromCard = card => {
        const deck = decks_cards.find(x => x.cards_id === card._id)
        return decks.find(x => x._id === deck.decks_id)
    }

    const getCardsFromDeck = deck => {
        const cards = decks_cards.filter(x => x.decks_id === deck._id)
        const card_ids = cards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    return (
        <StateContext.Provider
            value={{
                // SYNC
                initial_users,
                initial_decks,
                initial_users_decks,
                initial_cards,
                initial_decks_cards,

                // CREATE
                createDeck,

                // UPDATE
                users, update_users,
                decks, update_decks,
                users_decks, update_users_decks,
                cards, update_cards,
                decks_cards, update_decks_cards,

                // HELPER
                getDeck: getDeckFromCard,
                getCards: getCardsFromDeck,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useVocabulary = () => useContext(StateContext)