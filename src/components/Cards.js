import React, { useState, useRef, useEffect } from "react";
import ContentEditable from 'react-contenteditable';
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
            const idInArray = parseInt(e.target.parentElement.id);
            const clickedObject = filtered_cards.find(obj => obj.id === idInArray);
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

    /*---- logic for editing the popup ----*/
    const handleChange = e => {
        // this.setState({ html: e.target.value });
    };

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
        if (!inputFront.lastHtml || !inputBack.lastHtml) return

        createCard(decks_id, inputFront.lastHtml, inputBack.lastHtml)
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
        if (!inputDeckName.lastHtml) return

        const newDeck = {
            ...decks,
            name: inputDeckName.lastHtml
        }

        updateDeck(newDeck)
        set_decks(newDeck)
    }

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />
                <div className='mainContent' id='vocabContent'>
                    {
                        filtered_cards.length === 0
                            /*---- there were no cards to be fetched ----*/
                            ? <div className='noContentContainer' >
                                <div className="cardsDeckName lightBlue">
                                    <ContentEditable
                                        onKeyDown={handleRenameDeck}
                                        ref={refInputDeckName}
                                        className="editableCardDetails"
                                        html={decks.name}
                                        disabled={false} // use true to disable edition
                                        onChange={handleChange}
                                    />
                                </div>
                                <h2>You don't have any cards yet</h2>
                                <div className='noContentImgContainer' ><img src={Decks} alt='no cards icon' /></div>
                                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} >+</div>
                            </div>
                            /*---- cards were fetched ----*/
                            : <>
                                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} id='cardAddButton' >+</div>
                                <div className="cardsDeckName lightBlue">
                                    <ContentEditable
                                        onKeyDown={handleRenameDeck}
                                        ref={refInputDeckName}
                                        className="editableCardDetails"
                                        html={decks.name}
                                        disabled={false} // use true to disable edition
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="cardSearchField">
                                    <input ref={refInputSearchCards} type='text' onKeyDown={handleSearchOnKeyDown} />
                                    <img src={SearchIcon} alt='search icon' />
                                </div>
                                {
                                    filtered_cards.map((card) => {
                                        return (
                                            <div className='cards' key={card.id} onClick={handleOpenCardDetails} id={card.id} >
                                                <p>{card.front}</p>
                                                <p>{card.back}</p>
                                            </div>
                                        );
                                    })
                                }
                            </>
                    }
                    {/*---- popup ----*/}
                    <div className="hidden" ref={refPopupBackground} onClick={closePopup} ></div>
                    <div className="popup" style={{ display: popupIsShown ? 'block' : 'none' }} >
                        <div className="popupDecksContent">
                            <p>Side 1:</p>
                            <ContentEditable
                                ref={refInputFront}
                                className="editableCardDetails"
                                html={front ? front : ''}
                                disabled={false} // use true to disable edition
                                onChange={handleChange}
                            />
                            <p>Side 2:</p>
                            <ContentEditable
                                ref={refInputBack}
                                className="editableCardDetails"
                                html={back ? back : ''}
                                disabled={false}
                                onChange={handleChange}
                            />
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