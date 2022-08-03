import React, { useRef, useState, useEffect } from "react";
import './../css/memory.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArrayDecks from "./dummyDataArrayDecks";
import dummyDataArrayCards from "./dummyDataArrayCards";

let moveCounter = 0;
let cardCounter = 0;
const allTurnedCardsArray = [];

const Memory = () => {
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
        console.log(cardArray)
        for(let i = 0; i < cardArray.length; i++) {
            allTurnedCardsArray.push(false);
        }
    }, [cardArray]);

    /*---- compare cards ----*/
    /*useEffect(() => {
        if(moveCounter === 2) {
            //---------compare cards-----------
            const idCard1 = turnedCards[0].getAttribute('id'); //.id ?
            const idCard2 = turnedCards[1].getAttribute('id');
            //--------same cards-------------
            if(idCard1 === idCard2) {
                const idCard1 = turnedCards[0].id - 1;
                const idCard2 = turnedCards[1].id - 1;
                allTurnedCardsArray[idCard1] = true;
                allTurnedCardsArray[idCard2] = true;
                
                setAllOpenedCards((oldArray) => [...oldArray, turnedCards[0], turnedCards[1]]);
                const congrats = document.querySelector('#memoryCongrats');
                congrats.setAttribute('class', 'memoryCongratsShown');
                moveCounter = 0;
                cardCounter += 1;
                setTurnedCards([]);
                setTimeout(() => {
                    congrats.setAttribute('class', 'memoryCongratsHidden');
                }, 1000);
            } else {
                //--------turn back if no match------------
                setTimeout(() => {
                    turnedCards.forEach((turnedCard) => {
                        turnedCard.setAttribute('src', flipSide);
                        setTurnedCards([]);
                    });
                    moveCounter = 0;
                }, 1300);
            }
        }
    }, [turnedCards]);*/

    const handleClick = (wordId, wordWord, wordKey) => {
        /*---- add card to turnedCards ----*/
        if(moveCounter === 0 || moveCounter === 1) {
            //console.log(wordId, wordWord, wordKey);
            allTurnedCardsArray[wordKey] = true;
            const targetCard = document.querySelector(`#${wordId}`);
            console.log(targetCard);

            let card = {'id': wordId, 'word': wordWord, 'key': wordKey};
            setTurnedCards((oldArray) => [...oldArray, card]);
            moveCounter += 1;            
        }
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
                            cardArray.map((word) => {
                                return(
                                    <div className='memoryCard lightBlue' id={word.key} key={word.key} onClick={ !allTurnedCardsArray[word.key] ? () => handleClick(word.id, word.word, word.key) : () => {} } >
                                        {allTurnedCardsArray[word.key] ? word.word : ''}
                                    </div>
                                );
                                })
                            }
                            {/*
                            cardArray.map((pic) => {
                                const thisCardId = pic.id - 1;
                                return(
                                    <div key={pic.id} className='memoryCard' onClick={ !allTurnedCardsArray[thisCardId] ? handleClick : () => {} } >
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
                            <div className="memoryButton lightBlue" id="memoryWrong">wrong</div>
                            <div className="memoryButton lightBlue" id="memoryCorrect">correct</div>
                        </div>

                </div>
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Memory;