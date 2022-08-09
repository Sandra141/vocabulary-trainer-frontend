import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../css/profile.css';
import HeaderBlank from './layout/HeaderBlank';
import Footer from './layout/Footer';
import footerProfileWhite from '../images/footerProfileWhite.svg';

//other Ideas:
// Last game, how many words does the user know well / not well (donut chart), how many of how many words were learned (percentage)

const Profile = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const handleTogglePassword = () => {
        setPasswordShown(current => !current);
    }

    return(
        <>
        <div className='ContainerForHeaderAndMain'>
            <HeaderBlank />
            <div className='mainContent profileMainContent'>
                <img src={footerProfileWhite} className="lightBlue" />
                <h2>Hi, [name]</h2>
                <div className='profileAchievementsContainer'>
                    <div className='ProfileAchievements'>
                        <p>Decks created:</p>
                        <div className='darkBlue'>
                            [3]
                        </div>
                    </div>
                    <div className='ProfileAchievements'>
                        <p>Cards learned:</p>
                        <div className='gray'>
                            [122]
                        </div>
                    </div>
                </div>
                <div className='profileDetails'>
                    <div className='profileDetailsInnerContainer'>
                        <p>Username:</p>
                        <p>[username]</p>
                    </div>
                    <div className='profileDetailsInnerContainer' onClick={handleTogglePassword} id='profilePassword'>
                        <p>Password:</p>
                        <p>{passwordShown ? '[password]' : '**********'}</p>
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