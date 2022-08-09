import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/myDecks.css';
import './../css/popup.css';
//import emptyHeart from './../images/emptyHeart.svg';
//import filledHeart from './../images/filledHeart.svg';
//import dotMenu from './../images/dotMenu.svg';
import Decks from './../images/decks.png';
import { useVocabulary } from '../contexts/Vocabulary.js'
import Header from './layout/Header';
import Footer from './layout/Footer';
import { getColorClassName } from '../utils/className.js'
import ProgressBar from './ProgressBar';

const MyDecks = () => {
    const vocabulary = useVocabulary()
    const [popupIsShown, setPopupIsShown] = useState(false);
    const refPopupBackground = useRef(null);
    const refNewDeckName = useRef(null)

    const decks = vocabulary.decks

    //const cardsFromDeck = vocabulary.getCardsFromDeck(decks[0])

    /*---- add a deck to favourites ----
    const handleHeartClick = (e) => {
        /*---- needs to be reworked ----
        const cardId = e.target.id.replace('heartOfCard', '');
        const positionInArray = decks.findIndex(decks => decks._id === cardId);

        if (decks[positionInArray].liked) {
            /*---- change: send to database ----
            decks[positionInArray].liked = false;
        } else if (!decks[positionInArray].liked) {
            /*---- change: send to database ----
            decks[positionInArray].liked = true;
        } else {
            console.log('error when trying to like/unlike a deck');
        }
    }*/

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
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

    const closePopup = (e) => {
        // Create new Deck
        const newDeckName = refNewDeckName.current
        vocabulary.createDeck(newDeckName.value, false)

        // clear value
        newDeckName.value = ""

        document.body.style.overflow = 'visible';
        setPopupIsShown(false);
    }

    /*---- logic for dot menu ----*/
    const handleShowDotMenu = (e) => {
        const dotMenuContainer = e.target.parentElement.parentElement.querySelector('.dotMenuContainer');
        if (dotMenuContainer) {
            dotMenuContainer.style.display = 'block';
        }
    }

    let dotMenuDetailsToggle = false;

    const handleShowDotMenuDetails = (e) => {
        const dotMenuDetailsElement = e.target.parentElement.parentElement.querySelector('.dotMenuDetailsContainer');
        dotMenuDetailsToggle = !dotMenuDetailsToggle;
        if (dotMenuDetailsToggle) {
            dotMenuDetailsElement.style.display = 'block';
        } else {
            dotMenuDetailsElement.style.display = 'none';
        }
    }

    const handleHideDotMenu = (e) => {
        const dotMenuContainer = e.target.parentElement.parentElement.querySelector('.dotMenuContainer');
        if (dotMenuContainer) {
            dotMenuContainer.style.display = 'none';
        }
    }

    const renderDecks = () => decks.sort().map((deck, i) =>
        <div className='deck' key={deck._id}>

            <NavLink to={'/decks/search?_id=' + deck._id} className='decksNavLinkContainer' >

                <div className={getColorClassName(i) + " card"}>

                    <div className='top'>
                        {/* <div className='heartContainer' ><img src={deck.liked ? filledHeart : emptyHeart} onClick={handleHeartClick} id={'heartOfCard' + deck._id} alt="" /></div> */}

                        <h2>{deck.name}</h2>
                    </div>

                    <div className='bottom'>

                        {/* <div className='heartContainer' ><img src={deck.liked ? filledHeart : emptyHeart} onClick={handleHeartClick} id={'heartOfCard' + deck._id} alt="" /></div> */}

                        <ProgressBar {...vocabulary.getProgressFromDeck(deck._id)} msg_empty={"Deck is empty"} />
                    </div>

                </div>

            </NavLink>


        </div>



        // <div className='deck' key={deck._id} onMouseEnter={handleShowDotMenu} onMouseLeave={handleHideDotMenu} >

        //     <NavLink to={'/decks/search?_id=' + deck._id} className='decksNavLinkContainer' >
        //         <div className={getColorClassName(i) + " card"} >
        //             <h2>{deck.name}</h2>
        //         </div>
        //     </NavLink>

        //     <div className='heartContainer' ><img src={deck.liked ? filledHeart : emptyHeart} onClick={handleHeartClick} id={'heartOfCard' + deck._id} alt="" /></div>

        //     <div className='dotMenuContainer'>
        //         <img src={dotMenu} alt="" onClick={handleShowDotMenuDetails} />
        //     </div>

        //     <div className='dotMenuDetailsContainer' >
        //         <div className='dotMenuDetails'>
        //             <p>Delete</p>
        //         </div>
        //     </div>

        //     (shared:{JSON.stringify(deck.shared)})


        //     <ProgressBar {...vocabulary.getProgressFromDeck(deck._id)} />

        // </div>
    )

    const renderEmpty = () =>
        <div className='noContentContainer' >
            <h2>You don't have any decks yet</h2>
            <div className='noContentImgContainer' ><img src={Decks} alt='no decks icon' /></div>
            <div className="addButton" onClick={handleAddDecksButton} >+</div>
        </div>

    const renderCreateNewDeck = () => <>
        <div ref={refPopupBackground} onClick={closePopup} ></div>
        <div className="popup" style={{ display: popupIsShown ? 'block' : 'none' }} >
            <div className='popupContent'>
                <h2>Create a new Deck</h2>
                <input ref={refNewDeckName} type='text' placeholder='name your deck' id='nameNewDeck' />
                <input type='submit' value='create' id='submitDeck' onClick={closePopup} />
            </div>
        </div>
    </>

    return (
        <div className='ContainerForHeaderAndMain'>

            <Header />

            <div className='mainContent' >

                {
                    !decks.length
                        ? renderEmpty()
                        : <>
                            <div className='addButtonContainer'>
                                <div className="addButton" id='addButtonDecks' onClick={handleAddDecksButton} >+</div>
                            </div>

                            {renderDecks()}

                        </>
                }

                {renderCreateNewDeck()}

            </div>

            <Footer />

        </div>
    );
}

export default MyDecks;