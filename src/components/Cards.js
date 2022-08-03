import React, { useState, useRef, useEffect } from "react";
import ContentEditable from 'react-contenteditable';
import './../css/cards.css';
import './../css/popup.css';
import Header from "./Header";
import Footer from "./Footer";
import dummyDataArrayCards from "./dummyDataArrayCards";
import Decks from './../images/decks.png';
import SearchIcon from './../images/searchIcon.svg';
import { useLocation, useSearchParams } from "react-router-dom";
import { useVocabulary } from '../contexts/Vocabulary'

const Cards = (props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const term = queryParams.get("_id")
    // console.log("read parameter from url",term)
    const [decks_id, set_decks_id] = useState(term)

    const {
        getDeckFromCard,
        getCardsFromDeck,
        getCardsFromDeckId,
        getDeckFromDeckId
    } = useVocabulary()

    console.log("get deck from deck_id", getDeckFromDeckId(decks_id))


    const [popupIsShown, setPopupIsShown] = useState(false);
    const [firstSide, setFirstSide] = useState('');
    const [secondSide, setSecondSide] = useState('');
    const refPopupBackground = useRef(null);
    const addCardsButton = useRef(null);

    /*---- logic for popup ----*/
    const handleOpenCardDetails = (e) => {
        if (e.target !== addCardsButton.current) {
            const idInArray = parseInt(e.target.parentElement.id);
            const clickedObject = dummyDataArrayCards.cards.find(obj => obj.id === idInArray);
            setFirstSide(clickedObject.firstSide);
            setSecondSide(clickedObject.secondSide);
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
        this.setState({ html: e.target.value });
    };

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setPopupIsShown(false);
    }

    return (
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent' id='vocabContent'>
            {
                dummyDataArrayCards.cards.length === 0
                /*---- there were no cards to be fetched ----*/
                ?       <div className='noContentContainer' >
                        <div className="cardsDeckName lightBlue">
                            <ContentEditable
                                className="editableCardDetails"
                                html={dummyDataArrayCards.name}
                                disabled={false} // use true to disable edition
                                onChange={handleChange}
                            />
                        </div>
                        <h2>You don't have any cards yet</h2>
                        <div className='noContentImgContainer' ><img src={Decks} alt='no cards icon' /></div>
                        <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} >+</div>
                    </div>
                /*---- cards were fetched ----*/
                :   <>
                <div className="addButton" ref={addCardsButton} onClick={handleOpenCardDetails} id='cardAddButton' >+</div>
                    <div className="cardsDeckName lightBlue">
                        <ContentEditable
                            className="editableCardDetails"
                            html={dummyDataArrayCards.name}
                            disabled={false} // use true to disable edition
                            onChange={handleChange}
                        />
                    </div>
                    <div className="cardSearchField">
                        <input type='text' />
                        <img src={SearchIcon} alt='search icon' />
                    </div>
                    {
                    dummyDataArrayCards.cards.map((card) => {
                        return(
                            <div className='cards' key={card.id} onClick={handleOpenCardDetails} id={card.id} >
                                <p>{card.firstSide}</p>
                                <p>{card.secondSide}</p>
                            </div>
                        );
                    })
                    }
                    </>
            }
                {/*---- popup ----*/}
                <div className="hidden" ref={refPopupBackground} onClick={closePopup} ></div>
                <div className="popup" style={{display: popupIsShown ? 'block' : 'none'}} >
                    <div className="popupDecksContent">
                        <p>Side 1:</p>
                        <ContentEditable
                            className="editableCardDetails"
                            html={firstSide ? firstSide : ''}
                            disabled={false} // use true to disable edition
                            onChange={handleChange}
                        />
                        <p>Side 2:</p>
                        <ContentEditable
                            className="editableCardDetails"
                            html={secondSide ? secondSide : ''}
                            disabled={false}
                            onChange={handleChange}
                        />
                        <div className="cardDetailsPopupBottom">
                            <button onClick={closePopup} >Save this Card</button>
                            <p><a onClick={closePopup} href='https://tenor.com/view/jeff-goldblum-crazy-son-of-a-bitch-you-did-it-jurrasic-park-gif-19484615' target='_blank' rel="noreferrer" >Delete</a> this Card</p>
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