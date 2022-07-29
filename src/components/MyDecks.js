import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/myDecks.css';
import './../css/popup.css';
import Header from './Header';
import Footer from './Footer';
import dummyDataArray from './dummyDataArrayDecks';
import emptyHeart from './../images/emptyHeart.svg';
import filledHeart from './../images/filledHeart.svg';
import Decks from './../images/decks.png';

const MyDecks = () => {
    let counter = 0;
    let colourClass;
    const [popupIsShown, setPopupIsShown] = useState(false);
    const refPopupBackground = useRef(null);

    /*---- add a deck to favourites ----*/
    const handleHeartClick = (e) => {
        /*---- needs to be reworked ----*/
        const cardId = e.target.id.replace('heartOfCard', '');
        const positionInArray = dummyDataArray.findIndex(dummyDataArray => dummyDataArray.id === cardId);
        if(dummyDataArray[positionInArray].liked) {
            /*---- change: send to database ----*/
            dummyDataArray[positionInArray].liked = false;
        } else if (!dummyDataArray[positionInArray].liked) {
            /*---- change: send to database ----*/
            dummyDataArray[positionInArray].liked = true;
        } else {
            console.log('error when trying to like/unlike a deck');
        }
    }

    /*---- logic for popup ----*/
    const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setPopupIsShown(current => !current);
    }

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(popupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [popupIsShown]);

    /*---- logic for closing the popup ----*/
    const closePopup = (e) => {
        document.body.style.overflow = 'visible';
        setPopupIsShown(false);
    }

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />

            <div className='mainContent'>
                {
                    dummyDataArray.length === 0
                    ?   <>
                     {/*---- if the user doesn't have decks ----*/}
                        <div className='noContentContainer' >
                            <h2>You don't have any decks yet</h2>
                            <div className='noContentImgContainer' ><img src={Decks} alt='no decks icon' /></div>
                            <div className="addButton" onClick={handleAddDecksButton} >+</div>
                        </div>
                        </>
                    : 
                    <>
                    <div className='addButtonContainer'>
                        <div className="addButton" id='addButtonDecks' onClick={handleAddDecksButton} >+</div>
                    </div>
                    {dummyDataArray.map((card) => {
                        /*---- defining colour classNames ----*/
                        counter < 4 ? counter++ : counter = 1;
                        switch(counter) {
                            case 1:
                                colourClass = 'lightBlue card';
                                break;
                            case 2:
                                colourClass = 'darkBlue card';
                                break;
                            case 3:
                                colourClass = 'gray card';
                                break;
                            case 4:
                                colourClass = 'pink card';
                                break;
                            default:
                                colourClass = 'lightBlue card';
                        }
                        /*---- user has some decks ----*/
                        return(
                            <div className='deck' key={card.id}>
                                <NavLink to={'/decks/' + card.id} className='decksNavLinkContainer' >
                                    <div className={colourClass} >
                                        <h2>{card.name}</h2>
                                    </div>
                                </NavLink>
                                <div className='heartContainer' ><img src={card.liked ? filledHeart : emptyHeart} onClick={handleHeartClick} id={'heartOfCard' + card.id} alt="" /></div>
                            </div>
                        );
                    })}
                    </>
                }
                {/*--- popup container ----*/}
                <div ref={refPopupBackground} onClick={closePopup} ></div>
                <div className="popup" style={{display: popupIsShown ? 'block' : 'none'}} >
                    <div className='popupContent'>
                        <h2>Create a new Deck</h2>
                        <input type='text' placeholder='name your deck' id='nameNewDeck' />
                        <input type='submit' value='create' id='submitDeck' onClick={closePopup} />
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </>
    );
}

export default MyDecks;