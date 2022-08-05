import React, { useState, useRef, useEffect } from "react";
import './../css/cards.css';
import './../css/popup.css';
import Header from "./Header";
import Footer from "./Footer";
import Decks from './../images/decks.png';
import SearchIcon from './../images/searchIcon.svg';
import { useLocation, useSearchParams } from "react-router-dom";
import { useVocabulary } from '../contexts/Vocabulary'

const Cards = (props) => {
    const {
        getDeckFromCard,
        getCardsFromDeck,
        getCardsFromDeckId,
        getDeckFromDeckId,
        getCardsByText,
        createCard,
        updateDeck,
    } = useVocabulary()

    //# read url term
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get("_id")

    //# state
    const [decks_id, set_decks_id] = useState(term)
    const [popupIsShown, setPopupIsShown] = useState(false);
    const [front, set_front] = useState('');
    const [back, set_back] = useState('');
    const [filtered_cards, set_filtered_cards] = useState(getCardsFromDeckId(decks_id))
    const [decks, set_decks] = useState(getDeckFromDeckId(decks_id))

    //# ref
    const refPopupBackground = useRef(null);
    const addCardsButton = useRef(null);
    const refInputFront = useRef(null)
    const refInputBack = useRef(null)
    const refInputSearchCards = useRef(null)
    const refInputDeckName = useRef(null)

    /*---- logic for popup ----*/
    const handleOpenCardDetails = (e) => {
        if (e.target !== addCardsButton.current) {
            const idInArray = e.target.parentElement.id;
            const clickedObject = filtered_cards.find(obj => obj._id === idInArray);
            set_front(clickedObject.front);
            set_back(clickedObject.back);
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

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setPopupIsShown(false);
    }

    const saveCard = e => {
        e.preventDefault()

        const inputFront = refInputFront.current
        const inputBack = refInputBack.current

        // EXIT: no values
        if (!inputFront.value || !inputBack.value) return

        const newCard = createCard(decks_id, inputFront.value, inputBack.value)
        set_filtered_cards(prev => [...prev, newCard])

        // reset
        inputFront.placeholder = ""
        inputBack.placeholder = ""
        inputFront.value = ""
        inputBack.value = ""
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
                style={{ backgroundColor: decks.shared ? "gold" : "white" }}
            >
                {decks.shared
                    ? "Deck is shared! Press here to deactivate"
                    : "Deck is private. Press here if you want to share it with others!"}
            </button>
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
                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} >+</div>
            </div>
            /*---- cards were fetched ----*/
            : <>
                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} id='cardAddButton' >+</div>
                <div className="cardsDeckName lightBlue">
                    <input type="text" placeholder={decks.name} onKeyDown={handleRenameDeck} ref={refInputDeckName} className="editableCardDetails" />
                </div>
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

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />
                <div className='mainContent' id='vocabContent'>
                    {renderSharedButton()}

                    {renderCards()}

                    {/*---- popup ----*/}
                    <div className="hidden" ref={refPopupBackground} onClick={closePopup} ></div>
                    <div className="popup" style={{ display: popupIsShown ? 'block' : 'none' }} >
                        <div className="popupDecksContent">
                            <p>Side 1:</p>
                            <input type="text" placeholder={front ? front : ''} ref={refInputFront} className="editableCardDetails" />
                            {/*<ContentEditable
                                ref={refInputFront}
                                className="editableCardDetails"
                                html={front ? front : ''}
                                disabled={false} // use true to disable edition
                            />*/}

                            <p>Side 2:</p>
                            <input type="text" placeholder={back ? back : ''} ref={refInputBack} className="editableCardDetails" />
                            {/*<ContentEditable
                                ref={refInputBack}
                                className="editableCardDetails"
                                html={back ? back : ''}
                                disabled={false}
                            />*/}
                            <div className="cardDetailsPopupBottom">
                                <button onClick={saveCard} >Save this Card</button>
                                <p><a onClick={closePopup} href='https://image.emojisky.com/401/147401-middle.png' target='_blank' rel="noreferrer" >Delete</a> this Card</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cards;