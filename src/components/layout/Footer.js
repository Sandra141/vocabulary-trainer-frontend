import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/footer.css';
import footerProfileGray from '../../images/footerProfileGray.svg';
import footerProfileWhite from '../../images/footerProfileWhite.svg';
import footerSettingsGray from '../../images/footerSettingsGray.svg';
import footerSettingsWhite from '../../images/footerSettingsWhite.svg';
import footerHomeGray from '../../images/footerHomeGray.svg';
import footerHomeWhite from '../../images/footerHomeWhite.svg';

const Footer = () => {
    const refHomeImage = useRef(null)
    const refProfileImage = useRef(null)
    const refSettingsImage = useRef(null)

    const handleActiveStatus = (ref, imgActive, imgDeactive) => {
        const element = ref.current
        const isActive = element?.parentElement?.classList.contains('active')

        if (isActive) {
            element.setAttribute('src', imgActive)
        } else {
            element.setAttribute('src', imgDeactive)
        }
    }

    useEffect(() => {
        handleActiveStatus(refHomeImage, footerHomeWhite, footerHomeGray);
        handleActiveStatus(refProfileImage, footerProfileWhite, footerProfileGray);
        handleActiveStatus(refSettingsImage, footerSettingsWhite, footerSettingsGray);
    }, [])

    return (
        <footer className="appFooter">
            <NavLink to='/decks' id='home' ><img ref={refHomeImage} src={footerHomeGray} alt='home icon' id='footerHomeImage' /></NavLink>
            <NavLink to='/profile' id='profile' ><img ref={refProfileImage} src={footerProfileGray} alt='profile icon' id='footerProfileImage' /></NavLink>
            <NavLink to='/settings' id='settings' ><img ref={refSettingsImage} src={footerSettingsGray} alt='settings icon' id='footerSettingsImage' /></NavLink>
        </footer>
    );
}

export default Footer;