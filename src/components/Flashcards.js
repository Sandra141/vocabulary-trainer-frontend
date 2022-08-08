import React, { useRef, useState, useEffect } from "react";
import './../css/flashcards.css';
import Header from './Header';
import Footer from './Footer2';
import { useVocabulary } from "../contexts/Vocabulary";

const SHOWN_SIDE_ENUM = {
    front:"front",
    back:"back"
}

const Flashcards = () => {
    const vocabulary = useVocabulary();
    const allDecks = vocabulary.decks;
    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [sideSelectionPopupIsShown, setSideSelectionPopupIsShown] = useState(false);
    const [questionMarkPopupIsShown, setQuestionMarkPopupIsShown] = useState(false);
    const [chosenDiv, setChosenDiv] = useState('');

    const [shownSide, setShownSide] = useState(SHOWN_SIDE_ENUM.front);
    const [hiddenSide, setHiddenSide] = useState(shownSide === SHOWN_SIDE_ENUM.front ? SHOWN_SIDE_ENUM.back : SHOWN_SIDE_ENUM.front);
    const [sortedCards, setSortedCards] = useState([]);
    const [tmpCards, setTmpCards] = useState(sortedCards.slice(0, 7));

    /*---- logic for popup background ----*/
    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(deckSelectionPopupIsShown || sideSelectionPopupIsShown || questionMarkPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, sideSelectionPopupIsShown, questionMarkPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = async(deckId) => {
        const cards = await vocabulary.getCardsFromDeckId(deckId);
        console.log('deckId', deckId, 'chosenDiv', cards)
        setChosenDiv(cards);
        setDeckSelectionPopupIsShown(false);
        setSideSelectionPopupIsShown(true);
    }

    useEffect(() => {
        if(chosenDiv.length > 0) {
            setSortedCards(chosenDiv.sort((a, b) => a.rank - b.rank));
        }
    }, [chosenDiv])

    useEffect(() => {
        setTmpCards(sortedCards.slice(0, 7));
    }, [sortedCards])

    /*---- logic for selecting hidden side ----*/
    const handleSideSelection = (e) => {
        const clickedshownSide = e.target.id;
        setShownSide(clickedshownSide);
        setSideSelectionPopupIsShown(false);
    }

    /*---- turning cards ----*/
    useEffect(() => {
        setHiddenSide(shownSide === SHOWN_SIDE_ENUM.front ? SHOWN_SIDE_ENUM.back : SHOWN_SIDE_ENUM.front);
    }, [shownSide])

    /*---- game logic ----*/
    const processCard = (ranking) => {
        const cardsClone = [...sortedCards];
        const cardToUpdateIndex = cardsClone.findIndex(
          (c) => c.id === tmpCards[0].id
        );
        cardsClone[cardToUpdateIndex].ranking += ranking;
        cardsClone.sort((a, b) => a.ranking - b.ranking);
        setSortedCards(cardsClone);
        const tmpCardsClone = [...tmpCards];
        tmpCardsClone.shift();
        if (tmpCardsClone.length === 0) {
          setTmpCards(cardsClone.slice(0, 7));
        } else {
          setTmpCards(tmpCardsClone);
        }
    };

    /*---- question Mark logic ----*/
    const handleQuestionMarkClick = () => {
        setQuestionMarkPopupIsShown(true);
    }

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setQuestionMarkPopupIsShown(false);
    }

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent'>
                
                <div ref={refPopupBackground} onClick={closePopup} ></div>

                {/*--- popup container for deck selection ----*/}
                <div className="popup" style={{display: deckSelectionPopupIsShown ? 'block' : 'none'}} >
                    <div className='popupContentGames'>
                        <h2 className='gamesPopupDeckSelectionH2'>Which Deck would you like to learn?</h2>
                        {
                            allDecks.map((deck) => {
                                return(
                                    <p onClick={()=>handleDeckSelection(deck._id)} className="gamesPopupDeckSelectionP" id={deck._id} key={deck._id}>{deck.name}</p>
                                );
                            })
                        }
                    </div>
                </div>

                {/*--- popup container for side selection ----*/}
                <div className="popup" style={{display: sideSelectionPopupIsShown ? 'block' : 'none'}} >
                    <div className='popupContentGames'>
                        <h2 className='gamesPopupDeckSelectionH2'>Which side should be shown?</h2>

                        <div className="selectSideContainer">
                            <div className="sides" id="front" onClick={handleSideSelection}>
                                {chosenDiv[0]?.front}
                            </div>
                            <div className="sides" id="back" onClick={handleSideSelection}>
                                {chosenDiv[0]?.back}
                            </div>
                        </div>

                    </div>
                </div>

                {/*--- game setup ----*/}
                <div className="gameContainer">
                    <label className="flashcardCardContainer">
                        <input type="checkbox" id="flashcardsCheckbox" />
                        <div className="flashcardCard" >
                            <div class="front">{tmpCards.length && tmpCards[0][shownSide]}</div>
                            <div class="back">Solution:<br/><p>{tmpCards.length && tmpCards[0][hiddenSide]}</p></div>
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
