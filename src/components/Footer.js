import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/footer.css';
import footerProfile from './../images/footerProfile.svg';
import footerSettings from './../images/footerSettings.svg';
import footerHome from './../images/footerHome.svg';


const Footer = () => {   

    return (
        <footer className="appFooter">
            <NavLink to='/profile' ><img src={footerProfile} alt="profile icon" /></NavLink>

            <div className='footerCenter'>
                <div className='footerBackground1'>
                    <div className='footerBackground2'>
                        <NavLink to="/" id="footerMainLink"><img src={footerHome} alt="home icon" id="footerMainImg" /></NavLink>
                    </div>
                </div>
            </div>
            <NavLink to="/settings"><img src={footerSettings} alt="settings icon" /></NavLink>
            
        </footer>
    );
}

export default Footer;