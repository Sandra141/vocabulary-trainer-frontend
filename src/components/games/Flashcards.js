import React, { useRef, useState, useEffect } from "react";
import './../../css/flashcards.css';
import { useVocabulary } from "../../contexts/Vocabulary";
import Header from "../layout/HeaderBlank";
import Footer from "../layout/Footer";

const SHOWN_SIDE_ENUM = {
    front: "front",
    back: "back"
}

const Flashcards = () => {
    const vocabulary = useVocabulary();
    const decks = vocabulary.decks;
    const [possibleDecks, setPossibleDeck] = useState([])

    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [sideSelectionPopupIsShown, setSideSelectionPopupIsShown] = useState(false);
    const [questionMarkPopupIsShown, setQuestionMarkPopupIsShown] = useState(false);

    const [deckSelection, setdeckSelection] = useState([]);
    const [shownSide, setShownSide] = useState(SHOWN_SIDE_ENUM.front);
    const [hiddenSide, setHiddenSide] = useState(shownSide === SHOWN_SIDE_ENUM.front ? SHOWN_SIDE_ENUM.back : SHOWN_SIDE_ENUM.front);
    const [sortedCards, setSortedCards] = useState([]);
    const [tmpCards, setTmpCards] = useState([]);

    /*---- logic for popup ----*/
    /*const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }*/

    useEffect(() => {
        renderDecks()
    }, [])

    useEffect(() => {
        if (!deckSelection.length) return
        setSortedCards(deckSelection.sort((a, b) => a.rank - b.rank))
    }, [deckSelection])

    useEffect(() => {
        if (!deckSelection.length) return

        if(!tmpCards.length) {
            setTmpCards(sortedCards.slice(0, 7))
        }
    }, [sortedCards])

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if (deckSelectionPopupIsShown || sideSelectionPopupIsShown || questionMarkPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, sideSelectionPopupIsShown, questionMarkPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = (deckId) => {

        const cardFromDeck = vocabulary.getCardsFromDeckId(deckId)
        setdeckSelection(cardFromDeck);

        setDeckSelectionPopupIsShown(false);
        setSideSelectionPopupIsShown(true);
    }

    /*---- logic for selecting hidden side ----*/
    const handleSideSelection = (e) => {
        const clickedshownSide = e.target.id;
        setShownSide(clickedshownSide);
        setSideSelectionPopupIsShown(false);
    }

    useEffect(() => {
        setHiddenSide(shownSide === SHOWN_SIDE_ENUM.front ? SHOWN_SIDE_ENUM.back : SHOWN_SIDE_ENUM.front);
    }, [shownSide])

    /*---- game logic ----*/
    const processCard = (ranking) => {
        const cardsClone = [...tmpCards];
        const cardToUpdateIndex = cardsClone.findIndex(
            (c) => c._id === tmpCards[0]._id
        );
        cardsClone[cardToUpdateIndex].rank += ranking;
        cardsClone.sort((a, b) => a.rank - b.rank);
        // setSortedCards(cardsClone);
        const tmpCardsClone = [...tmpCards];
        tmpCardsClone.shift();
        if (tmpCardsClone.length === 0) {
            // update
            vocabulary.updateCard(cardsClone)
            setTmpCards(sortedCards.sort((a, b) => a.rank - b.rank).slice(0, 7));
        } else {
            setTmpCards(tmpCardsClone);
        }
    };

    const renderDecks = () => {
        const possibleDeck = decks
            .filter(x => vocabulary.getCardsFromDeckId(x._id).length >= 7)

        setPossibleDeck(possibleDeck)
    }

    /*---- question Mark logic ----*/
    const handleQuestionMarkClick = () => {
        setQuestionMarkPopupIsShown(true);
    }

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setQuestionMarkPopupIsShown(false);
    }

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />

                <div className='mainContent'>

                    <div ref={refPopupBackground} onClick={closePopup} ></div>

                    {/*--- popup container for deck selection ----*/}
                    <div className="popup" style={{ display: deckSelectionPopupIsShown ? 'block' : 'none' }} >
                        <div className='popupContentGames'>
                            <h2 className='gamesPopupDeckSelectionH2'>Which Deck would you like to learn?</h2>
                            {
                                possibleDecks.map((deck) => {
                                    return (
                                        <p onClick={() => handleDeckSelection(deck._id)} className="gamesPopupDeckSelectionP" id={deck._id} key={deck._id}>{deck.name}</p>
                                    );
                                })
                            }
                        </div>
                    </div>

                    {/*--- popup container for side selection ----*/}
                    <div className="popup" style={{ display: sideSelectionPopupIsShown ? 'block' : 'none' }} >
                        <div className='popupContentGames'>
                            <h2 className='gamesPopupDeckSelectionH2'>Which side should be shown?</h2>

                            <div className="selectSideContainer">
                                <div className="sides" id="front" onClick={handleSideSelection}>
                                    {deckSelection[0]?.front}
                                </div>
                                <div className="sides" id="back" onClick={handleSideSelection}>
                                    {deckSelection[0]?.back}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/*--- game setup ----*/}
                    <div className="gameContainer">
                        <label className="flashcardCardContainer">
                            <input type="checkbox" id="flashcardsCheckbox" />
                            <div className="flashcardCard" > {/* onClick={handleCardTurn} */}
                                <div class="front">{tmpCards.length && tmpCards[0][shownSide]}</div>
                                <div class="back">Solution:<br /><p>{tmpCards.length && tmpCards[0][hiddenSide]}</p></div>
                            </div>
                        </label>
                        <div className="questionMark" onClick={handleQuestionMarkClick}>?</div>
                        <div className="difficultyContainer">
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryEasy' onClick={() => processCard(3)} >Very Easy</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardEasy' onClick={() => processCard(1)}>Easy</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryMedium' onClick={() => processCard(0)}>Medium</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryHard' onClick={() => processCard(-2)}>Hard</div>
                        </div>
                    </div>

                    {/*--- popup container for game description ----*/}
                    <div className="popup" style={{display: questionMarkPopupIsShown ? 'block' : 'none'}} >
                        <div className='popupQuestionMark'>
                            <h2 className='gamesPopupDeckSelectionH2'>How do flashcards work?</h2>
                            <p className="gamesQuestionMarkP">Flashcards allow you to learn at your own pace. To start, you choose a deck and then you can choose the visible side.</p>
                            <p className="gamesQuestionMarkP">As soon as the game starts, you will see the visible side of the card at the top. Your task is to find the solution. You can check your solution by clicking on the card.</p>
                            <p className="gamesQuestionMarkP">Now you can assess how easy or difficult it was for you to find the solution and click on the corresponding button.</p>
                            <p>Have fun!</p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Flashcards;
