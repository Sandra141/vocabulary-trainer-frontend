import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/publishedDecks.css';
import Header from './Header';
import Footer from './Footer2';
import dummyDataArray from './dummyDataArrayDecks';
import Decks from './../images/decks.png';
import thumbsUp from './../images/thumbsUp.svg';
import thumbsDown from './../images/thumbsDown.svg';
import SearchIcon from './../images/searchIcon.svg';

const PublishedDecks = () => {
    let counter = 0;
    let colourClass;

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />

            <div className='mainContent'>
            
            {
                dummyDataArray.length === 0
                /*---- if the user doesn't have decks ----*/
                ?  <div className='noContentContainer' >
                        <h2>There are currently no public decks</h2>
                        <div className='noContentImgContainer' ><img src={Decks} alt='no decks icon' /></div>
                    </div>

                : 
                <>
                <div className='searchFieldContainer'>
                    <div className="cardSearchField">
                        <input type='text' />
                        <img src={SearchIcon} alt='search icon' />
                    </div>
                </div>
                {dummyDataArray.map((card) => {
                    /*---- defining colour classNames ----*/
                    counter < 4 ? counter++ : counter = 1;
                    switch(counter) {
                        case 1:
                            colourClass = 'lightBlue publicDeck';
                            break;
                        case 2:
                            colourClass = 'darkBlue publicDeck';
                            break;
                        case 3:
                            colourClass = 'gray publicDeck';
                            break;
                        case 4:
                            colourClass = 'pink publicDeck';
                            break;
                        default:
                            colourClass = 'lightBlue publicDeck';
                    }
                    /*---- public decks were able to be fetched ----*/
                    return(
                    <div className='publicDeckContainer'>
                        <NavLink to={'/decks/' + card.id} key={card.id} className={colourClass} >
                            <div className='publicDeckTop'>
                                <h2>{card.name}</h2>
                                <p>{card.vocabNumber + ' words'}</p>
                            </div>
                            <div className='publicDeckBottom'>
                                
                            </div>
                        </NavLink>
                        <div className='thumbsContainer'>
                            <div className='publicDeckThumbs'>
                                <img src={thumbsUp} alt='thumbs up icon' />
                                <p>{card.thumbsUp}</p>
                            </div>
                            <div className='publicDeckThumbs'>
                                <img src={thumbsDown} alt='thumbs down icon' />
                                <p>{card.thumbsDown}</p>
                            </div>
                        </div>
                    </div>
                    );
                })}</>
            }
            </div>

        </div>
        <Footer />
        </>
    );
}

export default PublishedDecks;