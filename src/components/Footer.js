import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/footer.css';
import footerProfileGray from './../images/footerProfileGray.svg';
import footerProfileWhite from './../images/footerProfileWhite.svg';
import footerSettingsGray from './../images/footerSettingsGray.svg';
import footerSettingsWhite from './../images/footerSettingsWhite.svg';
import footerHomeGray from './../images/footerHomeGray.svg';
import footerHomeWhite from './../images/footerHomeWhite.svg';

const Footer = () => {

    const changeSrc = () => {
        setTimeout(() => {
            /*---- home: check for active class and change src accordingly ----*/
            const homeImage = document.getElementById('footerHomeImage');
            const homeNavLinkContainsClass = homeImage?.parentElement?.classList.contains('active');
            if(homeNavLinkContainsClass) {
                homeImage.setAttribute('src', `${footerHomeWhite}`);
            } else {
                homeImage.setAttribute('src', `${footerHomeGray}`);
            }

            /*---- profile: check for active class and change src accordingly ----*/
            const profileImage = document.getElementById('footerProfileImage');
            const profileNavLinkContainsClass = profileImage?.parentElement?.classList.contains('active');
            if(profileNavLinkContainsClass) {
                profileImage.setAttribute('src', `${footerProfileWhite}`);
            } else {
                profileImage.setAttribute('src', `${footerProfileGray}`);
            }

            /*---- settings: check for active class and change src accordingly ----*/
            const settingsImage = document.getElementById('footerSettingsImage');
            const settingsNavLinkContainsClass = settingsImage?.parentElement?.classList.contains('active');
            if(settingsNavLinkContainsClass) {
                settingsImage.setAttribute('src', `${footerSettingsWhite}`);
            } else {
                settingsImage.setAttribute('src', `${footerSettingsGray}`);
            }
        }, 50);
    }

    changeSrc();

    return (
        <footer className="appFooter2">
            <NavLink to='/' id='home' ><img src={footerHomeGray} alt='home icon' id='footerHomeImage' /></NavLink>
            <NavLink to='/profile' id='profile' ><img src={footerProfileGray} alt='profile icon' id='footerProfileImage' /></NavLink>
            <NavLink to='/settings' id='settings' ><img src={footerSettingsGray} alt='settings icon' id='footerSettingsImage' /></NavLink>
        </footer>
    );
}

export default Footer;