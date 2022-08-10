import React from "react";
import '../css/homepage.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

import homepageFlashcardsBackground from '../images/homepageFlashcardsBackground.svg'
import homepageMultipleChoiceBackground from '../images/homepageMultipleChoiceBackground.svg'
import homepageMemoryBackground from '../images/homepageMemoryBackground.svg'

const Homepage = () => {

    const styleFlashcards = {
        style: {
            backgroundImage: `url(${homepageFlashcardsBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 50% bottom -10%',
            backgroundSize: '70%'
        }
    }

    const styleMultipleChoice = {
        style: {
            backgroundImage: `url(${homepageMultipleChoiceBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% 10%',
            backgroundSize: '30%',
            alignItems: 'end'
        }
    }

    const styleMemory = {
        style: {
            backgroundImage: `url(${homepageMemoryBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 90% bottom -13%',
            backgroundSize: '80%',
            alignItems: 'center'
        }
    }

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
                    <h3>Welcome to</h3>
                    <h1>Professor Cards</h1>
                </div>
            </div>
            <div className="homepageMainContentContainer">
                <p>Professor Cards wants to help you improve your knowledge!</p>
                <p>He has many different methods to help you learn, including traditional flashcards, multiple choice, or a memory game.</p><br />
                <div className="homepageGamesContainer">
                    <div style={styleFlashcards.style}>Flash&shy;cards</div>
                    <div style={styleMultipleChoice.style}>Multiple Choice</div>
                    <div style={styleMemory.style}>Memory</div>
                </div><br />
                <p>Of course, you can create your own word decks and if you want, you can share them with others.</p><br />
            </div>
        </div>
        <div className="homepageBottomContentContainer">
            <h3>Try it out!</h3>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={250}
                height={100}
                preserveAspectRatio="none"
            >
                <g
                mask='url("#a")'
                fill="none"
                stroke="rgba(51,121,194,0.58)"
                strokeWidth={2}
                >
                <path d="M51.98 103.74c35.14-2.88 59.43-73.79 120.11-73.88 60.69-.09 88.55 38.52 120.12 39" />
                <path d="M109.35 101.04c22.33-13.49 9.61-89.85 50.9-91.08 41.29-1.23 75.41 27.75 101.8 28" />
                <path d="M31.54 108.04c28.48-10.88 31.3-94.24 73.7-97.18 42.4-2.94 36.85 12.5 73.7 12.5s55.01-12.46 73.7-12.5" />
                <path d="M137.91 105.03c19.18-5.31 12.65-58.62 53.69-58.77 41.05-.15 79.71 26.79 107.39 27" />
                <path d="M60.16 101.54c18.12-1.04 12.4-32.78 64.05-34.15 51.66-1.37 94.41-41.47 128.11-42" />
                </g>
                <defs>
                <mask id="a">
                    <path fill="#fff" d="M0 0h250v100H0z" />
                </mask>
                </defs>
            </svg>
        </div>
        </>
    );
}

export default Homepage;