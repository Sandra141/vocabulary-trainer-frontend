import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { ObjectID } from 'bson';
//new ObjectID();

const StateContext = createContext()

//////////
////////// HINT:
////////// Without "__v" we create a new data 
////////// With "__v" we update an existing data
//////////

// TODO v20: lokal speichern wir synchron und in die DB asynchron. Dadurch kann es passieren, das der User auf sienem Gerät schon die neusten Daten sieht, diese aber noch ncith auf dem Server bekannt sind. Das muss zukünftig behoben werden.

export const Vocabulary = ({ children }) => {
    // STATES
    const [users, set_users] = useState([])
    const [decks, set_decks] = useState([])
    const [users_decks, set_users_decks] = useState([])
    const [cards, set_cards] = useState([])
    const [decks_cards, set_decks_cards] = useState([])

    const [users_request, set_users_request] = useState(null)
    const { data: users_data, error: users_error, isLoading: users_isLoading } = useFetch(users_request)

    const [decks_request, set_decks_request] = useState(null)
    const { data: decks_data, error: decks_error, isLoading: decks_isLoading } = useFetch(decks_request)

    const [users_decks_request, set_users_decks_request] = useState(null)
    const { data: users_decks_data, error: users_decks_error, isLoading: users_decks_isLoading } = useFetch(users_decks_request)

    const [cards_request, set_cards_request] = useState(null)
    const { data: cards_data, error: cards_error, isLoading: cards_isLoading } = useFetch(cards_request)

    const [decks_cards_request, set_decks_cards_request] = useState(null)
    const { data: decks_cards_data, error: decks_cards_error, isLoading: decks_cards_isLoading } = useFetch(decks_cards_request)

    // SYNC
    // read
    const initial_users = data => set_users(data)
    const initial_decks = data => set_decks(data)
    const initial_users_decks = data => set_users_decks(data)
    const initial_cards = data => set_cards(data)
    const initial_decks_cards = data => set_decks_cards(data)

    // UPDATE
    const save_local = (data, setState) => setState(prev => {
        console.log("save_local_" + setState)
        // Mit dem Flag, weis ich das ich synchronisieren muss
        data = {
            ...data,
            update_flag: true
        }

        // EXIT: Create new data
        if (!data._id) {
            // new
            return [
                ...prev,
                {
                    ...data,
                    _id: new ObjectID()
                }
            ]
        }

        const index = prev.findIndex(x => x._id === data._id)

        // EXIT: No Data found
        if (index === -1) return prev

        // EXIT: Update existing data
        const copy = [...prev]
        copy[index] = data
    })

    const update_users = data => save_local(data, set_users)
    const update_decks = data => save_local(data, set_decks)
    const update_users_decks = data => save_local(data, set_users_decks)
    const update_cards = data => save_local(data, set_cards)
    const update_decks_cards = data => save_local(data, set_decks_cards)

    // HELPER
    const getDeck = card => {
        const deck = decks_cards.find(x => x.cards_id === card._id)
        return decks.find(x => x._id === deck.decks_id)
    }

    const getCards = deck => {
        const cards = decks_cards.filter(x => x.decks_id === deck._id)
        console.log(1111, cards)
        const card_ids = cards.map(x => x.cards_id)
        console.log(222222, card_ids)
        return cards.filter(x => card_ids.includes(x._id))
    }

    // // Update mit DB
    // useEffect(() => {
    //     // TODO: alle suchen die das flag haben, dann das flag wieder entfernen und alles hochladen
    //     // const update = users.filter(x => x.update_flag).map(x => )
    // }, [users])


    return (
        <StateContext.Provider
            value={{
                // SYNC
                initial_users,
                initial_decks,
                initial_users_decks,
                initial_cards,
                initial_decks_cards,

                // UPDATE
                users, update_users,
                decks, update_decks,
                users_decks, update_users_decks,
                cards, update_cards,
                decks_cards, update_decks_cards,

                // HELPER
                getDeck,
                getCards,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useVocabulary = () => useContext(StateContext)