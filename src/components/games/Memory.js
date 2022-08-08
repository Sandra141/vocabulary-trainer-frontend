import React, { useRef, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import '../../css/memory.css';
import wrong from '../../images/wrong.svg';
import right from '../../images/right.svg';
import { useVocabulary } from "../../contexts/Vocabulary";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import dummyDataArrayCards from "../../mockups/dummyDataArrayCards";

let moveCounter = 0;
let allTurnedCardsArray = [];

const Memory = () => {
    const vocabulary = useVocabulary();
    const decks = vocabulary.decks;
    const refPopupBackground = useRef(null);
    const refMemoryWrongMessage = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [playAgainPupupIsShown, setPlayAgainPupupIsShown] = useState(false);
    const [questionMarkPopupIsShown, setQuestionMarkPopupIsShown] = useState(false);
    const [deckSelection, setdeckSelection] = useState(dummyDataArrayCards.cards.sort(() => Math.random() - 0.5).slice(0, 8));

    let [cardArray, setCardArray] = useState([]);
    const [cardCounter, setCardCounter] = useState(0);
    const [twoTurnedCards, setTwoTurnedCards] = useState([]);
    const [allOpenedCards, setAllOpenedCards] = useState([]);
    const [gameRestart, setGameRestart] = useState(false);

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(deckSelectionPopupIsShown || playAgainPupupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, playAgainPupupIsShown, questionMarkPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = (e) => {
        const deckId = e.target.id;
        //setdeckSelection(deckId);
        setDeckSelectionPopupIsShown(false);
    }

    /*---- game logic ----*/
    /*---- prepare Array: double the cards and mix them up ----*/
    useEffect(() => {
        let array = [];
        let counter = 0;
        deckSelection.map((word) => {
            array.push({ 'id': word.id, 'word': word.firstSide, 'key': counter }, { 'id': word.id, 'word': word.secondSide, 'key': counter + 1 })
            counter = counter + 2;
        })
        let num = deckSelection.length * 2;
        array = array.slice(0, num).sort(() => Math.random() - 0.5);
        setCardArray(array);
    }, [deckSelection])

    useEffect(() => {
        for (let i = 0; i < cardArray.length; i++) {
            allTurnedCardsArray.push(false);
        }
    }, [cardArray]);

    const handleCardClick = (wordId, wordWord, wordKey) => {
        /*---- add card to twoTurnedCards ----*/
        if (moveCounter === 0 || moveCounter === 1) {
            allTurnedCardsArray[wordKey] = true;
            let card = { 'id': wordId, 'word': wordWord, 'key': wordKey };
            setTwoTurnedCards((oldArray) => [...oldArray, card]);
            moveCounter += 1;
        }
    }

    const handleButtonClick = (clickedButton) => {
        if (moveCounter === 2) {
            //---------compare cards-----------
            const idCard1 = twoTurnedCards[0].id;
            const idCard2 = twoTurnedCards[1].id;
            const keyCard1 = twoTurnedCards[0].key;
            const keyCard2 = twoTurnedCards[1].key;
            //--------same cards and user clicked "right button"-------------
            if (idCard1 === idCard2 && clickedButton === 'right') {
                setAllOpenedCards((oldArray) => [...oldArray, twoTurnedCards[0], twoTurnedCards[1]]);
                moveCounter = 0;
                setTwoTurnedCards([]);
                setCardCounter((prev) => prev + 1);
            } else if (idCard1 !== idCard2 && clickedButton === 'right') {
                const memoryWrongMessage = refMemoryWrongMessage.current;
                memoryWrongMessage.setAttribute('class', 'memorywrongMessageShown')
                setTimeout(() => {
                    allTurnedCardsArray[keyCard1] = false;
                    allTurnedCardsArray[keyCard2] = false;
                    setTwoTurnedCards([]);
                    moveCounter = 0;
                    memoryWrongMessage.setAttribute('class', 'memorywrongMessageHidden')
                }, 1300)
            } else {
                //--------turn back if no match------------
                allTurnedCardsArray[keyCard1] = false;
                allTurnedCardsArray[keyCard2] = false;
                setTwoTurnedCards([]);
                moveCounter = 0;
            }
        }
    }

    //--------Play Again Box - Visibility Toggle------------
    useEffect(() => {
        if (cardArray.length > 0 && cardCounter === (cardArray.length / 2)) {
            setPlayAgainPupupIsShown(true);
        }
    }, [cardCounter]);

    const handleMemoryPlayAgainClick = () => {
        //------------turn all cards around after restart------------
        allTurnedCardsArray = [];
        setPlayAgainPupupIsShown(false);
        moveCounter = 0;
        setCardCounter(0);
        setTwoTurnedCards([]);
        setGameRestart(true);
        setAllOpenedCards([]);
    }

    //------------rearrange Cards after restart------------
    useEffect(() => {
        if (gameRestart) {
            setdeckSelection(dummyDataArrayCards.cards.sort(() => Math.random() - 0.5).slice(0, 8));
            setGameRestart(false);
        } else return;
    }, [gameRestart]);

    return(
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
                                decks.map((deck) => {
                                    return (
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
                                    return (
                                        <div className={`${allTurnedCardsArray[word.key] ? 'memoryCard memoryCardWordShown' : 'memoryCard lightBlue'} ${twoTurnedCards[0]?.key === word.key ? 'blueBorder' : ''} ${twoTurnedCards[1]?.key === word.key ? 'blueBorder' : ''}`} id={word.key} key={word.key} onClick={!allTurnedCardsArray[word.key] ? () => handleCardClick(word.id, word.word, word.key) : () => { }} >
                                            {allTurnedCardsArray[word.key] ? word.word : ''}
                                        </div>
                                    );
                                })
                            }
                            
                            
                        </div>
                        <p className='memorywrongMessageHidden' ref={refMemoryWrongMessage} >No match</p>
                        <div className="memoryButtonContainer">
                            <div className={moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'} onClick={() => handleButtonClick('wrong')}><img src={wrong} /></div>
                            <div className={moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'} onClick={() => handleButtonClick('right')}><img src={right} /></div>
                        </div>

                </div>

                {/*--- popup container for playing again ----*/}
                <div className="popup" style={{display: playAgainPupupIsShown ? 'block' : 'none'}} >
                    <div className='popupContentGames playAgainContainerMemory'>
                        <h2 className='gamesPopupDeckSelectionH2'>Would you like to play again?</h2>
                        <div onClick={handleMemoryPlayAgainClick} >yes</div>
                        <NavLink to="/games">
                            <div>no</div>
                        </NavLink>
                    </div>
                </div>
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Memory;