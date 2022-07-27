import React, { useState, useRef, useEffect } from "react";
import './../css/cards.css';
import Header from "./Header";
import Footer from "./Footer";
import dummyDataArrayCards from "./dummyDataArrayCards";
import Decks from './../images/decks.png';
import SearchIcon from './../images/searchIcon.svg';

const Cards = () => {
    const [popupIsShown, setPopupIsShown] = useState(false);
    const [firstSide, setFirstSide] = useState(null);
    const [secondSide, setSecondSide] = useState(null);
    const refPopupBackground = useRef(null);

    const handleOpenCardDetails = (e) => {
        const idInArray = parseInt(e.target.parentElement.id);
        const clickedObject = dummyDataArrayCards.cards.find(obj => obj.id === idInArray);
        setFirstSide(clickedObject.firstSide);
        setSecondSide(clickedObject.secondSide);
        setPopupIsShown(current => !current);
    }

    console.log(firstSide);

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if(popupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [popupIsShown]);

    return (
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent' id='vocabContent'>
            {
                dummyDataArrayCards.cards.length === 0
                ?   <div className='noContentContainer' >
                        <div className="cardsDeckName lightBlue">
                            {dummyDataArrayCards.name}
                        </div>
                        <h2>You don't have any cards yet</h2>
                        <div className='noContentImgContainer' ><img src={Decks} alt='no cards icon' /></div>
                    </div>

                :   <>
                    <div className="cardsDeckName lightBlue">
                        {dummyDataArrayCards.name}
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
                    <div className="hidden" ref={refPopupBackground}></div>
                    <div className="cardsPopup" style={{display: popupIsShown ? 'block' : 'none'}} >
                        <p>Side 1:</p>
                        <input type='text' value={firstSide} disabled />
                        <p>Side 2:</p>
                        <input type='text' value={secondSide} disabled />
                    </div>
                    </>
            }
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Cards;