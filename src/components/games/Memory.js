import React, { useRef, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import '../../css/memory.css';
import wrong from '../../images/wrong.svg';
import right from '../../images/right.svg';
import { useVocabulary } from "../../contexts/Vocabulary";
import Header from "../layout/HeaderBlank";
import Footer from "../layout/Footer";

let moveCounter = 0;
let allTurnedCardsArray = [];

const Memory = () => {
    const vocabulary = useVocabulary();
    const decks = vocabulary.decks;
    const [possibleDecks, setPossibleDeck] = useState([])

    const refPopupBackground = useRef(null);
    const refMemoryWrongMessage = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [playAgainPupupIsShown, setPlayAgainPupupIsShown] = useState(false);
    const [questionMarkPopupIsShown, setQuestionMarkPopupIsShown] = useState(false);
    const [deckSelection, setdeckSelection] = useState([]);
    const [cardsInDeckSelection, setCardsInDeckSelection] = useState([]);

    let [cardArray, setCardArray] = useState([]);
    const [cardCounter, setCardCounter] = useState(0);
    const [twoTurnedCards, setTwoTurnedCards] = useState([]);
    const [gameRestart, setGameRestart] = useState(false);

    /*---- logic for popup ----*/
    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(deckSelectionPopupIsShown || playAgainPupupIsShown || questionMarkPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, playAgainPupupIsShown, questionMarkPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const renderDecks = () => {
        const possibleDeck = decks.filter(x => vocabulary.getCardsFromDeckId(x._id).length >= 8)
        setPossibleDeck(possibleDeck)
    }

    useEffect(() => {
        renderDecks();
    }, [])

    const handleDeckSelection = (deckId) => {
        const cardFromDeck = vocabulary.getCardsFromDeckId(deckId)
        setdeckSelection(cardFromDeck);
        setDeckSelectionPopupIsShown(false);
    }

    useEffect(() => {
        setCardsInDeckSelection(deckSelection.sort(() => Math.random() - 0.5).slice(0, 8))
    }, [deckSelection])

    /*---- game logic ----*/
    /*---- prepare Array: double the cards and mix them up ----*/
    useEffect(() => {
        let array = [];
        let counter = 0;
        cardsInDeckSelection.map((word) => {
            array.push({ 'id': word._id, 'word': word.front, 'key': counter }, { 'id': word._id, 'word': word.back, 'key': counter + 1 })
            return counter = counter + 2;
        })
        let num = cardsInDeckSelection.length * 2;
        array = array.slice(0, num).sort(() => Math.random() - 0.5);
        setCardArray(array);
    }, [cardsInDeckSelection])

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
        console.log('twoTurnedCards', twoTurnedCards)
        if (moveCounter === 2) {
            //---------compare cards-----------
            const idCard1 = twoTurnedCards[0].id;
            const idCard2 = twoTurnedCards[1].id;
            const keyCard1 = twoTurnedCards[0].key;
            const keyCard2 = twoTurnedCards[1].key;
            console.log(twoTurnedCards)
            console.log('idCard1', idCard1, 'idCard2', idCard2)
            //--------same cards and user clicked "right button"-------------
            if (idCard1 === idCard2 && clickedButton === 'right') {
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
    }

    //------------rearrange Cards after restart------------
    useEffect(() => {
        if (gameRestart) {
            const cardFromDeck = deckSelection.sort(() => Math.random() - 0.5).slice(0, 8)
            setCardsInDeckSelection(cardFromDeck);
            setGameRestart(false);
        } else return;
    }, [gameRestart]);

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
                            <div className={moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'} onClick={() => handleButtonClick('wrong')}><img src={wrong} alt="wrong icon" /></div>
                            <div className={moveCounter === 2 ? 'memoryButton lightBlue' : 'memoryButtonGray lightBlue'} onClick={() => handleButtonClick('right')}><img src={right} alt="right icon" /></div>
                        </div>
                        <div className="questionMarkMemory" onClick={handleQuestionMarkClick}>?</div>
                    </div>

                    {/*--- popup container for game description ----*/}
                    <div className="popup" style={{display: questionMarkPopupIsShown ? 'block' : 'none'}} >
                        <div className='popupQuestionMark'>
                            <h2 className='gamesPopupDeckSelectionH2'>How does memory work?</h2>
                            <p className="gamesQuestionMarkP">It is a very simple game. First you choose a deck to play with. Then you turn over two cards and decide whether the contents of the cards match.</p>
                            <p className="gamesQuestionMarkP">If the cards match, click on the button with the tick and choose two new cards, if not, click on the cross so that the cards turn over again. The whole thing repeats until all the cards are turned over.</p>
                            <p>Have fun!</p>
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