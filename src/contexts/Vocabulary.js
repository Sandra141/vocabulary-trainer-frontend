import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { ObjectID } from 'bson';
import {
    url_sync_read,
    url_decks_update,
    url_users_decks_update,
    url_cards_update,
    url_decks_cards_update,
    url_search_public_decks,
} from '../services/vocabulary.js'

import { useAuthentification } from './Authentification.js'

const VocabularyContext = createContext()

export const Vocabulary = ({ children }) => {
    //# context
    const { token } = useAuthentification()

    //# states
    const [users, set_users] = useState([])
    const [decks, set_decks] = useState([])
    const [users_decks, set_users_decks] = useState([])
    const [cards, set_cards] = useState([])
    const [decks_cards, set_decks_cards] = useState([])
    const [shared_decks, set_shared_decks] = useState([])

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
        // EXIT: required forgotten
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

        return new_cards
    }

    //# copy
    //## copy shared deck
    const copyDeck = (decks, decks_cards, cards) => {
        // EXIT: required forgotten
        if (!decks) return
        if (!decks_cards) return
        if (!cards) return

        // decks
        const decks_id = new ObjectID().toString()
        const new_decks = {
            ...decks,
            id: decks_id
        }

        // decks_cards
        const decks_cards_id = new ObjectID().toString()
        const new_decks_cards = {
            ...decks_cards,
            id: decks_cards_id
        }

        // cards
        const cards_id = new ObjectID().toString()
        const new_cards = {
            ...cards,
            id: cards_id            
        }

        // local
        set_cards(prev => [...prev, new_cards])
        set_decks_cards(prev => [...prev, new_decks_cards])
        set_decks(prev => [...prev, new_decks])

        // db
        set_cards_request(url_cards_update(token, [new_cards]))
        set_decks_cards_request(url_decks_cards_update(token, [new_decks_cards]))
        set_decks_request(url_decks_update(token, [new_decks]))

    }

    //# update
    //## update existing deck
    const updateDeck = deck => {
        // EXIT: required forgotten
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
        // EXIT: required forgotten
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
        // EXIT: required forgotten
        if (!card) return

        const deck = decks_cards.find(x => x.cards_id === card._id)
        return decks.find(x => x._id === deck.decks_id)
    }

    const getCardsFromDeck = deck => {
        // EXIT: required forgotten
        if (!deck) return

        const filteredcards = decks_cards.filter(x => x.decks_id === deck._id)
        const card_ids = filteredcards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    const getDeckFromDeckId = _id => {
        // EXIT: required forgotten
        if (!_id) return

        const index = decks.findIndex(x => x._id === _id)

        // EXIT: no deck found
        if (index === -1) return

        return decks[index]
    }

    const getCardsFromDeckId = _id => {
        // EXIT: required forgotten
        if (!_id) return

        const filteredcards = decks_cards.filter(x => x.decks_id === _id)
        const card_ids = filteredcards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    const getCardsByText = (decks_id, searchCardTerm) => {
        // EXIT: required forgotten
        if (!decks_id) return
        if (!searchCardTerm) return

        const currentDeck = getDeckFromDeckId(decks_id)
        const searchingCards = getCardsFromDeck(currentDeck)
        return searchingCards.filter(x => x.front.includes(searchCardTerm) || x.back.includes(searchCardTerm))
    }

    const copySharedDecks = () => { }

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

                // copy
                copyDeck,

                // update
                updateDeck,
                updateCard,

                // get
                getDeckFromCard,
                getCardsFromDeck,
                getCardsFromDeckId,
                getDeckFromDeckId,
                getCardsByText,
            }}
        >
            {children}
        </VocabularyContext.Provider>
    )
}

export const useVocabulary = () => useContext(VocabularyContext)