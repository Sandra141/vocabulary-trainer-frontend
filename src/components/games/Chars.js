import React, { useRef, useState, useEffect } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/HeaderBlank";
import dummyDataArrayDecks from "../../mockups/dummyDataArrayDecks";
import dummyDataArrayCards from "../../mockups/dummyDataArrayCards";

const Chars = () => {
    const refPopupBackground = useRef(null);
    const [deckSelectionPopupIsShown, setDeckSelectionPopupIsShown] = useState(true);
    const [sideSelectionPopupIsShown, setSideSelectionPopupIsShown] = useState(false);
    //const [deckSelection, setdeckSelection] = useState('');
    //const [hiddenSide, setHiddenSide] = useState('firstSide');

    /*---- logic for popup ----*/
    /*const handleAddDecksButton = (e) => {
        document.body.style.overflow = 'hidden';
        setDeckSelectionPopupIsShown(current => !current);
    }*/

    useEffect(() => {
        const popupBackground = refPopupBackground.current;
        if (deckSelectionPopupIsShown || sideSelectionPopupIsShown) {
            popupBackground?.setAttribute('class', 'darkBackground');
        } else {
            popupBackground?.setAttribute('class', 'hidden');
        }
    }, [deckSelectionPopupIsShown, sideSelectionPopupIsShown]);

    /*---- logic for selecting Decks ----*/
    const handleDeckSelection = (e) => {
        const deckId = e.target.id;
        setdeckSelection(deckId);
        setDeckSelectionPopupIsShown(false);
        setSideSelectionPopupIsShown(true);
    }

    /*---- logic for selecting hidden side ----*/
    const handleSideSelection = (e) => {
        const clickedHiddenSide = e.target.id;
        setHiddenSide(clickedHiddenSide);
        setSideSelectionPopupIsShown(false);
    }


    return (
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
                                dummyDataArrayDecks.map((deck) => {
                                    return (
                                        <p onClick={handleDeckSelection} className="gamesPopupDeckSelectionP" id={deck.id} key={deck.id}>{deck.name}</p>
                                    );
                                })
                            }
                        </div>
                    </div>

                    {/*--- popup container for side selection ----*/}
                    <div className="popup" style={{ display: sideSelectionPopupIsShown ? 'block' : 'none' }} >
                        <div className='popupContentGames'>
                            <h2 className='gamesPopupDeckSelectionH2'>Which side should be hidden?</h2>

                            <div className="selectSideContainer">
                                <div className="sides" id="firstSide" onClick={handleSideSelection}>
                                    {dummyDataArrayCards.cards[0].front}
                                </div>
                                <div className="sides" id="secondSide" onClick={handleSideSelection}>
                                    {dummyDataArrayCards.cards[0].back}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/*--- game setup ----*/}
                    <div className="gameContainer">
                        content
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default Chars;