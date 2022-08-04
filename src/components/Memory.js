import React, { useRef, useState, useEffect } from "react";
import './../css/memory.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArrayDecks from "./dummyDataArrayDecks";
import dummyDataArrayCards from "./dummyDataArrayCards";
import wrong from './../images/wrong.svg';
import right from './../images/right.svg';
import { useVocabulary } from "../contexts/Vocabulary";

let moveCounter = 0;
const allTurnedCardsArray = [];

const Memory = () => {
    const vocabulary = useVocabulary();
    const decks = vocabulary.decks;
    console.log('decks', decks);
    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [deckSelection, setdeckSelection] = useState(dummyDataArrayCards.cards.sort(() => Math.random() - 0.5).slice(0, 8));
    let [cardArray, setCardArray] = useState([]);

    const [turnedCards, setTurnedCards] = useState([]);
    const [allOpenedCards, setAllOpenedCards] = useState([]);
    const [gameRestart, setGameRestart] = useState(false);

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
    /*---- prepare Array: double the cards and mix them up ----*/
    useEffect(() => {
        let array = [];
        let counter = 0;
        deckSelection.map((word) => {
            array.push({'id': word.id, 'word': word.firstSide, 'key': counter}, {'id': word.id, 'word': word.secondSide, 'key': counter+1})
            counter = counter + 2;
        })
        let num = deckSelection.length * 2;
        array = array.slice(0, num).sort(() => Math.random() - 0.5);
        setCardArray(array);
    }, [])

    useEffect(() => {
        for(let i = 0; i < cardArray.length; i++) {
            allTurnedCardsArray.push(false);
        }
    }, [cardArray]);

    const handleCardClick = (wordId, wordWord, wordKey) => {
        /*---- add card to turnedCards ----*/
        if(moveCounter === 0 || moveCounter === 1) {
            allTurnedCardsArray[wordKey] = true;
            let card = {'id': wordId, 'word': wordWord, 'key': wordKey};
            setTurnedCards((oldArray) => [...oldArray, card]);
            moveCounter += 1;            
        }
    }

    const handleButtonClick = (buttonWrong, buttonRight) => {
        console.log(buttonRight);
        if(moveCounter === 2) {
            //---------compare cards-----------
            const idCard1 = turnedCards[0].id;
            const idCard2 = turnedCards[1].id;
            const keyCard1 = turnedCards[0].key;
            const keyCard2 = turnedCards[1].key;
            console.log(keyCard1, keyCard2)
            //--------same cards-------------
            if(idCard1 === idCard2) {        
                setAllOpenedCards((oldArray) => [...oldArray, turnedCards[0], turnedCards[1]]);
                //const congrats = document.querySelector('#memoryCongrats');
                //congrats.setAttribute('class', 'memoryCongratsShown');
                moveCounter = 0;
                setTurnedCards([]);
                /*setTimeout(() => {
                    congrats.setAttribute('class', 'memoryCongratsHidden');
                }, 1000);*/
            } else {
                //--------turn back if no match------------
                allTurnedCardsArray[keyCard1] = false;
                allTurnedCardsArray[keyCard2] = false;
                setTurnedCards([]);
                moveCounter = 0;
            }
        }
    }

    useEffect(() => {
        console.log('turnedCards', turnedCards)
    }, [turnedCards])

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
                            decks.map((deck) => {
                                return(
                                    <p onClick={handleDeckSelection} className="gamesPopupDeckSelectionP" id={deck._id} key={deck._id}>{deck.name}</p>
                                );
                            })
                        }
                    </div>
                </div>


                {/*--- game setup ----*/}
                <div className="gameContainer">

                        <div className='memoryContainer'>
                            {
                            cardArray.map((word) => {
                                return(
                                    <div className={`${allTurnedCardsArray[word.key] ? 'memoryCard memoryCardWordShown' : 'memoryCard lightBlue'} ${turnedCards[0]?.key === word.key ? 'blueBorder' : ''} ${turnedCards[1]?.key === word.key ? 'blueBorder' : ''}`} id={word.key} key={word.key} onClick={ !allTurnedCardsArray[word.key] ? () => handleCardClick(word.id, word.word, word.key) : () => {} } >
                                        {allTurnedCardsArray[word.key] ? word.word : ''}
                                    </div>
                                );
                                })
                            }
                            {/*
                            cardArray.map((pic) => {
                                const thisCardId = pic.id - 1;
                                return(
                                    <div key={pic.id} className='memoryCard' onClick={ !allTurnedCardsArray[thisCardId] ? handleCardClick : () => {} } >
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
                            <div className={`${moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'}`} id="memoryWrong" onClick={() => handleButtonClick('wrong')}><img src={wrong} /></div>
                            <div className={`${moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'}`} id="memoryCorrect" onClick={() => handleButtonClick('right')}><img src={right} /></div>
                        </div>

                </div>
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Memory;