import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const Vocabulary = ({ children }) => {
    const [decks, setDecks] = useState([])
    const [decks_cards, setDecks_cards] = useState([])
    const [cards, setCards] = useState([])

    const getDeck = card => {
        const deck = decks_cards.find(x => x.cards_id === card._id)
        return decks.find(x => x._id === deck.decks_id)
    }

    const getCards = deck => {
        const cards = decks_cards.filter(x => x.decks_id === deck._id)
        const card_ids = cards.map(x => x.cards_id)
        return cards.filter(x => card_ids.includes(x._id))
    }

    // TODO: build synchronisation

    return (
        <StateContext.Provider
            value={{
                decks, setDecks,
                decks_cards, setDecks_cards,
                cards, setCards,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useVocabulary = () => useContext(StateContext)