import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/footer.css';
import footerProfileGray from '../../images/footerProfileGray.svg';
import footerProfileWhite from '../../images/footerProfileWhite.svg';
import footerGamesGray from '../../images/footerGamesGray.svg';
import footerGamesWhite from '../../images/footerGamesWhite.svg';
import footerHomeGray from '../../images/footerHomeGray.svg';
import footerHomeWhite from '../../images/footerHomeWhite.svg';

const Footer = () => {
    const refHomeImage = useRef(null)
    const refProfileImage = useRef(null)
    const refGamesImage = useRef(null)

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
        handleActiveStatus(refGamesImage, footerGamesWhite, footerGamesGray);
    }, [])

    return (
        <footer className="appFooter">
            <NavLink to='/decks' id='home' ><img ref={refHomeImage} src={footerHomeGray} alt='home icon' /></NavLink>
            <NavLink to='/games' id='games' ><img ref={refGamesImage} src={footerGamesGray} alt='games icon'/></NavLink>
            <NavLink to='/profile' id='profile' ><img ref={refProfileImage} src={footerProfileGray} alt='profile icon' /></NavLink>
        </footer>
    );
}

export default Footer;