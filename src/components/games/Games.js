import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/games.css';
//import gamesArray from '../../mockups/gamesArray';
import emptyHeart from '../../images/emptyHeart.svg';
import filledHeart from '../../images/filledHeart.svg';

import FlashcardsIcon from '../../images/FlashcardsIcon.svg';
import MemoryIcon from '../../images/MemoryIcon.svg';
import MultipleChoiceIcon from '../../images/MultipleChoiceIcon.svg';
import CharsIcon from '../../images/CharsIcon.svg';
import ConnectIcon from '../../images/ConnectIcon.svg';
import Header from '../layout/HeaderBlank';
import Footer from '../layout/Footer';
import { getColorClassName } from '../../utils/className.js'

const Games = () => {

    const games_data = [
        {
            name: 'Flascards',
            style: {
                backgroundImage: `url(${FlashcardsIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left 90% bottom 0%',
                backgroundSize: '40%'
            }
        },
        {
            name: 'Memory',
            style: {
                backgroundImage: `url(${MemoryIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left 90% bottom 0%',
                backgroundSize: '60%'
            }
        },
        {
            name: 'Multiple-Choice',
            style: {
                backgroundImage: `url(${MultipleChoiceIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '90% 50%'
            }
        }/*,
        {
            name: 'Chars',
            style: {
                backgroundImage: `url(${CharsIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '90% 50%'
            }
        },
        {
            name: 'Connect',
            style: {
                backgroundImage: `url(${ConnectIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '90% 50%',
                backgroundSize: '40%'
            }
        }*/
    ]

    const renderGames = () => !games_data.length
        ? null
        : (games_data.map((x, i) =>
            <div className={`decksForGames ${getColorClassName(i)}`} key={i} >
                <NavLink to={'/games/' + x.name} className='decksNavLinkContainerGames' >
                    <div className='cardGames' style={x.style} >
                        <h2>{x.name}</h2>
                    </div>
                </NavLink>
                <div className='heartContainerGames' ><img src={x.liked ? filledHeart : emptyHeart} id={'heartOfCard' + i} alt="" /></div>
            </div>
        ))

    return (
        <>
            <div className='ContainerForHeaderAndMain'>
                <Header />
                <div className='mainContent'>

                    {renderGames()}

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Games;