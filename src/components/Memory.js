import React, { useRef, useState, useEffect } from "react";
import './../css/memory.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArrayDecks from "./dummyDataArrayDecks";
import dummyDataArrayCards from "./dummyDataArrayCards";

const Memory = () => {
    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [deckSelection, setdeckSelection] = useState(dummyDataArrayCards.cards.sort(() => Math.random() - 0.5).slice(0, 10));
    let [cardArray, setCardArray] = useState([]);

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(deckSelectionPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = (e) => {
        const deckId = e.target.id;
        setdeckSelection(deckId);
        setDeckSelectionPopupIsShown(false);
    }

    /*---- game logic ----*/
    useEffect(() => {
        let array = [];
        deckSelection.map((word) => {
            array.push({'id': word.id, 'word': word.firstSide}, {'id': word.id, 'word': word.secondSide})
        })
        let num = deckSelection.length * 2;
        array = array.slice(0, num).sort(() => Math.random() - 0.5);
        setCardArray(array);
    }, [])

    useEffect(() => {
        console.log(cardArray);
    }, [cardArray]);

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
                                    <p onClick={handleDeckSelection} className="gamesPopupDeckSelectionP" id={deck.id} key={deck.id}>{deck.name}</p>
                                );
                            })
                        }
                    </div>
                </div>

                {/*--- game setup ----*/}
                <div className="gameContainer">

                        <div className='memoryContainer'>
                            {
                            cardArray.map((pic) => {
                                return(
                                    <div className='memoryCard' >
                                        {pic.word}
                                    </div>
                                );
                                })
                            }
                            {/*
                            cardArray.map((pic) => {
                                const thisCardId = pic.id - 1;
                                return(
                                    <div key={pic.id} className='memoryCard' onClick={ !hasCardBeenTurned[thisCardId] ? handleClick : () => {} } >
                                        <Card props={pic} />
                                    </div>
                                );
                            })*/
                            }
                            {/*<p className='memoryCongratsHidden' id='memoryCongrats' >Well done</p>
                            <div className='playAgainHidden' id='memoryPlayAgain'>
                                <p>Would you like to play again?</p>
                                <button onClick={handlePlayAgainClick} id='yes' >yes</button>
                                <button onClick={handlePlayAgainClick} id='no' >no</button>
                            </div>*/}
                        </div>
                        <div className="memoryButtonContainer">
                            <div className="memoryButton" id="memoryCorrect">correct</div>
                            <div className="memoryButton" id="memoryWrong">wrong</div>
                        </div>

                </div>
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Memory;