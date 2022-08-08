import React, { useRef, useState, useEffect } from "react";
import './../../css/flashcards.css';
import { useVocabulary } from "../../contexts/Vocabulary";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
// import dummyDataArrayCards from "../../mockups/dummyDataArrayCards";
import dummyDataArrayDecks from "../../mockups/dummyDataArrayDecks";

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

    const [deckSelection, setdeckSelection] = useState([]);
    const [shownSide, setShownSide] = useState(SHOWN_SIDE_ENUM.front);
    const [hiddenSide, setHiddenSide] = useState(shownSide === SHOWN_SIDE_ENUM.front ? SHOWN_SIDE_ENUM.back : SHOWN_SIDE_ENUM.front);
    const [sortedCards, setSortedCards] = useState([]);
    const [tmpCards, setTmpCards] = useState([]);

    console.log(shownSide, hiddenSide)

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }

    useEffect(() => {
        renderDecks()
    }, [])

    useEffect(() => {
        if (!deckSelection.length) return

        setSortedCards(deckSelection.sort((a, b) => a.ranking - b.ranking))
    }, [deckSelection])

    useEffect(() => {
        if (!deckSelection.length) return

        if(!tmpCards.length) {
            setTmpCards(sortedCards.slice(0, 7))
        }
    }, [sortedCards])

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if (deckSelectionPopupIsShown || sideSelectionPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, sideSelectionPopupIsShown]);

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

        console.log(6666666, tmpCardsClone)

        if (tmpCardsClone.length === 0) {
            console.log("repopulating buffer", cardsClone);
            // update
            vocabulary.updateCard(cardsClone)
            setTmpCards(sortedCards.slice(0, 7));
        } else {
            setTmpCards(tmpCardsClone);
        }
    };

    /*const handleCardTurn = () => {
        setShownSide(shownSide === SHOWN_SIDE_ENUM.firstSide ? SHOWN_SIDE_ENUM.secondSide : SHOWN_SIDE_ENUM.firstSide);
    }*/


    const renderDecks = () => {
        const minNumberCards = 7
        const possibleDeck = decks
            .filter(x => vocabulary.getCardsFromDeckId(x._id).length >= 7)

        setPossibleDeck(possibleDeck)

    }

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />

                <div className='mainContent'>

                    <div ref={refPopupBackground} ></div>

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
                        <div className="questionMark"></div>
                        <div className="difficultyContainer">
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryEasy' onClick={() => processCard(3)} >Very Easy</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardEasy' onClick={() => processCard(1)}>Easy</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryMedium' onClick={() => processCard(0)}>Medium</div>
                            <div className="difficultyCard lightBlue" id='difficultyCardVeryHard' onClick={() => processCard(-2)}>Hard</div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Flashcards;
