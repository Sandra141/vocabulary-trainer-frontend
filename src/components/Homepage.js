import React from "react";
import '../css/homepage.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

const Homepage = () => {
    return (
        <>
        <header className="homepageHeader">
            <div className="logoContainer">
                <img src={logo} alt="logo" />
            </div>
            <nav>
                <NavLink to="/registration">register</NavLink>
                <NavLink to="/login">log in</NavLink>
            </nav>
        </header>
        <div className="HomepageContainer">
            
            <div className="homepageWelcomeContainer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={250}
                    height={200}
                    preserveAspectRatio="none"
                >
                    <g
                    mask='url("#a")'
                    fill="none"
                    stroke="rgba(51,121,194,0.58)"
                    strokeWidth={2}
                    >
                    <path d="M182.15-19.45c-35.06 3.97-44.8 73.18-115.26 81.44-70.45 8.26-79.86 79.7-115.25 84" />
                    <path d="M192.35-28.22C156.47 3.99 170.42 137.06 119 150.15c-51.42 13.09-36.68-25-73.36-25-36.67 0-53.98 24.66-73.35 25" />
                    <path d="M136.5-18.17c-38.95 35.38-26.92 184.94-79.39 194.93-52.46 9.99-55.76-49.75-79.38-52" />
                    <path d="M124.37-10.7C88.63 20.52 93.16 161.28 50.78 164.26c-42.37 2.98-46.04-80.72-73.58-90" />
                    <path d="M88.48-3.89c-11.77.66.39 13.2-41.69 22-42.07 8.8-52.95 86.77-83.37 96" />
                    </g>
                    <defs>
                    <mask id="a">
                        <path fill="#fff" d="M0 0h250v200H0z" />
                    </mask>
                    </defs>
                </svg>
                <div className="homepageWelcomeContainerHeading">
                    <h2>Welcome to</h2>
                    <h1>Professor Cards</h1>
                </div>
            </div>
            <div className="homepageMainContentContainer">
                <p>With Professor Cards you can create your own decks and learn them at your own pace and through different methods.</p>
            </div>

        </div>
        </>
    );
}

export default Homepage;