import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../css/footer.css';
import footerProfileGray from './../../images/footerProfileGray.svg';
import footerHomeWhite from './../../images/footerHomeWhite.svg';
import footerGamesGray from './../../images/footerGamesGray.svg';

const Footer = () => {

    return (
        <footer className="appFooter">
            <NavLink to='/decks' id='home' className='active'><img  src={footerHomeWhite} alt='home icon' /></NavLink>
            <NavLink to='/games' id='games'><img src={footerGamesGray} alt='games icon'/></NavLink>
            <NavLink to='/profile' id='profile' ><img src={footerProfileGray} alt='profile icon' /></NavLink>
        </footer>
    );
}

export default Footer;