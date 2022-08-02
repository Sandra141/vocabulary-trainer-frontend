import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/games.css';
import Header from './Header';
import Footer from './Footer2';
import gamesArray from './gamesArray';
import emptyHeart from './../images/emptyHeart.svg';
import filledHeart from './../images/filledHeart.svg';

import FlashcardsIcon from './../images/FlashcardsIcon.svg';
import MemoryIcon from './../images/MemoryIcon.svg';
import MultipleChoiceIcon from './../images/MultipleChoiceIcon.svg';
import CharsIcon from './../images/CharsIcon.svg';
import ConnectIcon from './../images/ConnectIcon.svg';

const Games = () => {
    let counter = 0;
    let counterBackground = 0;
    let colourClass;
    let gamesBackground;
    let backgroundSize;
    let backgroundPosition;

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent'>

                {gamesArray.map((card) => {
                    /*---- defining colour classNames ----*/
                    counter < 4 ? counter++ : counter = 1;
                    switch(counter) {
                        case 1:
                            colourClass = 'lightBlue';
                            break;
                        case 2:
                            colourClass = 'darkBlue';
                            break;
                        case 3:
                            colourClass = 'gray';
                            break;
                        case 4:
                            colourClass = 'pink';
                            break;
                        default:
                            colourClass = 'lightBlue';
                    }

                    /*---- defining background sources ----*/
                    counterBackground = counterBackground + 1;

                    if(card.id === 1) {
                        gamesBackground = FlashcardsIcon;
                        backgroundSize = '40%';
                        backgroundPosition = 'left 90% bottom 0%';
                    } else if (card.id === 2) {
                        gamesBackground = MemoryIcon;
                        backgroundSize = '60%';
                        backgroundPosition = 'left 90% bottom 0%';
                    } else if (card.id === 3) {
                        gamesBackground = MultipleChoiceIcon;
                        backgroundSize = '';
                        backgroundPosition = '90% 50%';
                    } else if (card.id === 4) {
                        gamesBackground = CharsIcon;
                        backgroundSize = '';
                        backgroundPosition = '90% 50%';
                    } else if (card.id === 5) {
                        gamesBackground = ConnectIcon;
                        backgroundSize = '40%';
                        backgroundPosition = '90% 50%';
                    } else {
                        console.log('error');
                    }

                    return(
                        <div className={`decksForGames ${colourClass}`} key={card.id} >
                            <NavLink to={'/games/' + card.id} className='decksNavLinkContainerGames' >
                                <div className='cardGames' style={{backgroundImage: `url(${gamesBackground})`,  backgroundRepeat: 'no-repeat', backgroundPosition: backgroundPosition, backgroundSize: backgroundSize}} >
                                    <h2>{card.name}</h2>
                                </div>
                            </NavLink>
                            <div className='heartContainerGames' ><img src={card.liked ? filledHeart : emptyHeart} id={'heartOfCard' + card.id} alt="" /></div>
                        </div>
                    );
                })
                }
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Games;