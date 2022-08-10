import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useVocabulary } from "../contexts/Vocabulary";
import './../css/profile.css';
import HeaderBlank from './layout/HeaderBlank';
import Footer from './layout/Footer';
import footerProfileWhite from '../images/footerProfileWhite.svg';

//other Ideas:
// Last game, how many words does the user know well / not well (donut chart), how many of how many words were learned (percentage)

const Profile = () => {
    const vocabulary = useVocabulary();
    const decks = vocabulary.decks;
    const user = vocabulary.users;
    let cardNumber = 0;

    const [passwordShown, setPasswordShown] = useState(false);

    const handleTogglePassword = () => {
        setPasswordShown(current => !current);
    }

    const countCards = () => {
        decks.map(deck => {
            //console.log(deck._id)
            let cardFromDeck = vocabulary.getCardsFromDeckId(deck._id).length;
            cardNumber += cardFromDeck;
        })
    }
    countCards();

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <HeaderBlank />
            <div className='mainContent profileMainContent'>
                <img src={footerProfileWhite} className="lightBlue" alt="profile icon" />
                <h2>Hi there!</h2>
                <div className='profileAchievementsContainer'>
                    <div className='ProfileAchievements'>
                        <p>Decks created:</p>
                        <div className='darkBlue'>
                            {decks.length}
                        </div>
                    </div>
                    <div className='ProfileAchievements'>
                        <p>Cards created:</p>
                        <div className='gray'>
                            {cardNumber}
                        </div>
                    </div>
                </div>
                <div className='profileDetails'>
                    <div className='profileDetailsInnerContainer'>
                        <p>Username:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className='profileDetailsInnerContainer' onClick={handleTogglePassword} id='profilePassword'>
                        <p>Password:</p>
                        <p>{passwordShown ? 'haha, gotcha :D' : '**********'}</p>
                    </div>
                    <div className='profileLogout'>
                        <NavLink to="/logout" id='profileLogout'>Logout</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Profile;