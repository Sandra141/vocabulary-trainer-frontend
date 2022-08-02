import React, { useRef, useState, useEffect } from "react";
import './../css/flashcards.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArrayDecks from "./dummyDataArrayDecks";
import dummyDataArrayCards from "./dummyDataArrayCards";
import { useVocabulary } from "../contexts/Vocabulary";


const SHOWN_SIDE_ENUM = {
    firstSide:"firstSide",
    secondSide:"secondSide"
}

const Flashcards = () => {
    //const {getDeck} = useVocabulary()
    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [sideSelectionPopupIsShown, setSideSelectionPopupIsShown] = useState(false);

    const [deckSelection, setdeckSelection] = useState('');
    const [shownSide, setShownSide] = useState(SHOWN_SIDE_ENUM.firstSide);
    const [sortedCards, setSortedCards] = useState(dummyDataArrayCards.cards.sort((a, b) => a.ranking - b.ranking));
    const [tmpCards, setTmpCards] = useState(sortedCards.slice(0, 7));

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(deckSelectionPopupIsShown || sideSelectionPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, sideSelectionPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = (deckId) => {
        setdeckSelection(deckId);
        setDeckSelectionPopupIsShown(false);
        setSideSelectionPopupIsShown(true);
    }

    /*---- logic for selecting hidden side ----*/
    const handleSideSelection = (e) => {
        const clickedshownSide = e.target.id;
        setShownSide(clickedshownSide);
        setSideSelectionPopupIsShown(false);
    }

    /*---- game logic ----*/
    const processCard = (ranking) => {
        const cardsClone = [...sortedCards];
        const cardToUpdateIndex = cardsClone.findIndex(
          (c) => c.id === tmpCards[0].id
        );
        cardsClone[cardToUpdateIndex].ranking += ranking;
        cardsClone.sort((a, b) => a.ranking - b.ranking);
        console.log(cardsClone.map((e) => e.ranking));
        setSortedCards(cardsClone);
        const tmpCardsClone = [...tmpCards];
        tmpCardsClone.shift();
        if (tmpCardsClone.length === 0) {
          console.log("repopulating buffer");
          setTmpCards(cardsClone.slice(0, 7));
        } else {
          setTmpCards(tmpCardsClone);
        }
    };

    const handleCardTurn = () => {
        setShownSide(shownSide === SHOWN_SIDE_ENUM.firstSide ? SHOWN_SIDE_ENUM.secondSide : SHOWN_SIDE_ENUM.firstSide);
    }

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent'>
                
                <div ref={refPopupBackground} ></div>

                {/*--- popup container for deck selection ----*/}
                <div className="popup" style={{display: deckSelectionPopupIsShown ? 'block' : 'none'}} >
                    <div className='popupContentGames'>
                        <h2 className='gamesPopupDeckSelectionH2'>Which Deck would you like to learn?</h2>
                        {
                            dummyDataArrayDecks.map((deck) => {
                                return(
                                    <p onClick={()=>handleDeckSelection(deck.id)} className="gamesPopupDeckSelectionP" id={deck.id} key={deck.id}>{deck.name}</p>
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
                            <div className="sides" id="firstSide" onClick={handleSideSelection}>
                                {dummyDataArrayCards.cards[0].firstSide}
                            </div>
                            <div className="sides" id="secondSide" onClick={handleSideSelection}>
                                {dummyDataArrayCards.cards[0].secondSide}
                            </div>
                        </div>

                    </div>
                </div>

                {/*--- game setup ----*/}
                <div className="gameContainer">
                    <div className="flashcardCard" onClick={handleCardTurn}>
                        {tmpCards.length && tmpCards[0][shownSide]}
                    </div>
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
