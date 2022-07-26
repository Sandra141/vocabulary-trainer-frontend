import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/footer.css';
import footerProfileGray from './../images/footerProfileGray.svg';
import footerSettingsGray from './../images/footerSettingsGray.svg';
import footerHomeGray from './../images/footerHomeGray.svg';

const Footer = () => {

    return (
        <footer className="appFooter">
            <NavLink to='/' id='home' className='active'><img src={footerHomeGray} alt='home icon' id='footerHomeImage' /></NavLink>
            <NavLink to='/profile' id='profile' ><img src={footerProfileGray} alt='profile icon' id='footerProfileImage' /></NavLink>
            <NavLink to='/settings' id='settings' ><img src={footerSettingsGray} alt='settings icon' id='footerSettingsImage' /></NavLink>
        </footer>
    );
}

export default Footer;