import React, { useState, useRef, useEffect } from "react";
import './../css/cards.css';
import './../css/popup.css';
import Decks from './../images/decks.png';
import SearchIcon from './../images/searchIcon.svg';
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useVocabulary } from '../contexts/Vocabulary'
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Cards = (props) => {
    const {
        getDeckFromCard,
        getCardsFromDeck,
        getCardsFromDeckId,
        getDeckFromDeckId,
        getCardsByText,
        createCard,
        updateCard,
        updateDeck,
        delete_cards,
        delete_decks,
    } = useVocabulary()

    //# read url term
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get("_id")

    //# state
    const [decks_id, set_decks_id] = useState(term)
    const [popupIsShown, setPopupIsShown] = useState(false);
    const [filtered_cards, set_filtered_cards] = useState(getCardsFromDeckId(decks_id))
    const [decks, set_decks] = useState(getDeckFromDeckId(decks_id))
    const [selected_card, set_selected_card] = useState(null)
    const [navigate_back, set_navigate_back] = useState(false)

    //# ref
    const refPopupBackground = useRef(null);
    const addCardsButton = useRef(null);
    const refInputFront = useRef(null)
    const refInputBack = useRef(null)
    const refInputSearchCards = useRef(null)
    const refInputDeckName = useRef(null)

    /*---- logic for popup ----*/
    const handleOpenCardDetails = (e) => {
        const inputFront = refInputFront.current
        const inputBack = refInputBack.current

        if (e.target !== addCardsButton.current) {
            const idInArray = e.target.parentElement.id;
            const found_card = filtered_cards.find(obj => obj._id === idInArray);

            inputFront.value = found_card.front
            inputBack.value = found_card.back

            set_selected_card(found_card)
        } else {
            inputFront.value = ""
            inputBack.value = ""

            set_selected_card(null)
        }
        document.body.style.overflow = 'hidden';
        setPopupIsShown(current => !current);
    }

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if (popupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [popupIsShown]);


    useEffect(() => {
        refInputDeckName.current.value = decks.name
    }, [decks])

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setPopupIsShown(false);
    }

    const saveCard = e => {
        e.preventDefault()

        const inputFront = refInputFront.current
        const inputBack = refInputBack.current

        // create or update card
        if (!selected_card) {
            // create
            // EXIT: no sense to create
            if (!inputFront.value || !inputBack.value) return

            const newCard = createCard(decks_id, inputFront.value, inputBack.value)
            set_filtered_cards(prev => [...prev, newCard])
        } else {
            // update

            const newCard = {
                ...selected_card,
                front: inputFront.value,
                back: inputBack.value
            }
            updateCard(newCard)

            const index = filtered_cards.findIndex(x => x._id === selected_card._id)
            set_filtered_cards(prev => {
                const copy = [...prev]
                copy[index] = newCard

                return copy
            })
        }
    }

    const handle_delete_card = e => {
        // EXIT: no card
        if (!selected_card) return

        const index = filtered_cards.findIndex(x => x._id === selected_card._id)
        set_filtered_cards(prev => {
            const copy = [...prev]
            copy.splice(index, 1)

            return copy
        })
        delete_cards(selected_card._id)
    }

    const handle_delete_deck = e => {
        console.log(111111111111111)
        // EXIT:
        if (!decks_id) return

        delete_decks(decks_id)


        set_navigate_back(true)
    }

    const handleSearchOnKeyDown = e => {
        // EXIT: not enter pressed
        if (e.key !== 'Enter') return

        e.preventDefault()

        const searchTerm = refInputSearchCards.current.value

        // no searchTerm so show everything
        if (!searchTerm) return set_filtered_cards(getCardsFromDeckId(decks_id))

        const filteredCards = getCardsByText(decks_id, searchTerm)
        set_filtered_cards(filteredCards)
    }

    const handleRenameDeck = e => {
        // EXIT: not enter pressed
        if (e.key !== 'Enter') return

        e.preventDefault()

        const inputDeckName = refInputDeckName.current

        // EXIT: no values
        if (!inputDeckName.value) return

        const newDeck = {
            ...decks,
            name: inputDeckName.value
        }

        updateDeck(newDeck)
        set_decks(newDeck)
    }

    const handleToggleShared = e => {
        const newSharedStatus = !decks.shared

        const newDeck = {
            ...decks,
            shared: newSharedStatus
        }

        updateDeck(newDeck)
        set_decks(newDeck)
    }


    const renderSharedButton = () => !decks
        ? null
        : (
            <button
                onClick={handleToggleShared}
                className="button"
                style={{ backgroundColor: decks.shared ? "gold" : "white" }}
            >
                
                {decks.shared
                    ? "Shared"
                    : "Private"}
            </button>
        )

    const renderDeleteDeckButton = () => (
        <button className="button" onClick={handle_delete_deck}>
            Delete Deck
        </button>
    )

    const renderAddButton = () => (
        <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} >+</div>
    )

    const renderDeckName = () => (
        <div className="name">
            <input type="text" placeholder={decks.name} onKeyDown={handleRenameDeck} ref={refInputDeckName} className="editableCardDetails" />
        </div>
    )


    const renderCards = () => !filtered_cards || !decks
        ? <div>Du hast kein Deck</div>
        : (filtered_cards.length === 0
            /*---- there were no cards to be fetched ----*/
            ? <div className='noContentContainer' >
                <div className="cardsDeckName lightBlue">
                    <input type="text" placeholder={decks.name} onKeyDown={handleRenameDeck} ref={refInputDeckName} className="editableCardDetails" />
                </div>
                <h2>You don't have any cards yet</h2>
                <div className='noContentImgContainer' ><img src={Decks} alt='no cards icon' /></div>

            </div>
            /*---- cards were fetched ----*/
            : <>
                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} id='cardAddButton' >+</div>

                <div className="cardSearchField">
                    <input ref={refInputSearchCards} type='text' onKeyDown={handleSearchOnKeyDown} />
                    <img src={SearchIcon} alt='search icon' />
                </div>
                {
                    filtered_cards.map((card) => {
                        return (
                            <div className='cards' key={card._id} onClick={handleOpenCardDetails} id={card._id} >
                                <p>{card.front}</p>
                                <p>{card.back}</p>
                            </div>
                        );
                    })
                }
            </>)


    // EXIT: Navigate back
    if (navigate_back) return <Navigate to="/decks" state={{ from: location }} replace />;

    return (
        <div className='ContainerForHeaderAndMain'>

            <Header />

            <div className='mainContent' id='vocabContent'>

                <div className="cardssssssss">

                    <div className="top">
                        {renderDeleteDeckButton()}

                        {renderSharedButton()}
                    </div>

                    {renderDeckName()}



                </div>



                {renderCards()}

                {/*---- popup ----*/}
                <div className="hidden" ref={refPopupBackground} onClick={closePopup} ></div>
                <div className="popup" style={{ display: popupIsShown ? 'block' : 'none' }} >
                    <div className="popupDecksContent">

                        <p>Side 1:</p>
                        <input type="text" ref={refInputFront} className="editableCardDetails" />

                        <p>Side 2:</p>
                        <input type="text" ref={refInputBack} className="editableCardDetails" />

                        <div className="cardDetailsPopupBottom">
                            <button onClick={saveCard} >Save this Card</button>
                            <p onClick={handle_delete_card} id='cardDetailsPopupBottomP'>Delete this Card</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>

    );
}

export default Cards;