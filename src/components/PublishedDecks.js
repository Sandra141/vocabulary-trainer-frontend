import React, { useState, useEffect } from "react";
import './../css/cards.css';
import './../css/popup.css';
import Decks from './../images/decks.png';
import SearchIcon from './../images/searchIcon.svg';
import { useLocation, useSearchParams } from "react-router-dom";
import { useAuthentification } from '../contexts/Authentification.js'
import { useVocabulary } from '../contexts/Vocabulary'
import { url_shared } from '../services/vocabulary'
import useFetch from "../hooks/useFetch";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const PublishedDecks = (props) => {
    const { token } = useAuthentification()

    const {
        copyDeck
    } = useVocabulary()

    //# read url term
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get("_id")

    //# state
    const [decks_id, set_decks_id] = useState(term)
    const [decks, set_decks] = useState([])
    const [decks_cards, set_decks_cards] = useState([])
    const [cards, set_cards] = useState([])

    //# request
    const [request, setRequest] = useState(null)
    const { data, error, isLoading } = useFetch(request)

    //# initial
    useEffect(() => {
        const newRequest = url_shared(token, decks_id)
        setRequest(newRequest)
    }, [])

    //# handle result from db
    useEffect(() => {
        // EXIT: error
        if (error) return console.log(error)

        // EXIT: no data
        if (!data) return console.log("no data", data)

        // EXIT: authentification is not ok
        if (!data.success) return console.log("authentification is not ok")


        // SUCCESS: authentification und download ok
        const { decks, cards, decks_cards } = data.data[0]
        set_decks(decks)
        set_cards(cards)
        set_decks_cards(decks_cards)

    }, [data, error, isLoading])

    const renderCards = () => !cards
        ? null
        : (cards.map(x => {
            return (
                <div className='cards' key={x._id} id={x._id} >
                    <p>{x.front}</p>
                    <p>{x.back}</p>
                </div>
            );
        }))

    const handleCopyDeck = e => {
        // copy
        copyDeck(decks, decks_cards, cards)
    }

    const renderCopyButton = () => <button onClick={handleCopyDeck}>COPY ME</button>

    const renderDeckName = () => !decks
        ? null
        :
        <div className="cardsDeckName lightBlue">
            <input type="text" value={decks.name} className="editableCardDetails" />
        </div>

    const renderDeckId = () => !decks
        ? null
        : <div>
            share your deck with others :)
            <br />
            id: {decks._id}
        </div>

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />
                <div className='mainContent'>

                    {renderDeckId()}

                    {renderDeckName()}

                    {renderCopyButton()}

                    <div className='mainContent' id='vocabContent'>
                        {renderCards()}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default PublishedDecks;