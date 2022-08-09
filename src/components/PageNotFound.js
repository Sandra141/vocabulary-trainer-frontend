import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/pageNotFound.css';
import HeaderBlank from "./layout/HeaderBlank";

const PageNotFound = () => {
    return(
        <>
        <HeaderBlank />
        <div className="pageNotFoundContainer">
            <h2>404</h2>
            <h3>Page not found</h3>
            <p>Would you like to go back to the homepage?</p>
            <div className='lightBlue'><NavLink to="/" >Homepage</NavLink></div>
        </div>
        </>
    );
}

export default PageNotFound;