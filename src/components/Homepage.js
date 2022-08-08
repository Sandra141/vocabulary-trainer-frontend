import React from "react";
import { NavLink } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <h1>Willkommen</h1>
            <br />

            <h4>Ich bin neu</h4>
            <br />
            <NavLink to="/registration">Registrieren</NavLink>
            <br />
            <br />
            <br />
            <br />

            <h4>Bist du bereits ein Mitglied</h4>
            <br />
            <NavLink to="/login">Direkt zum Login</NavLink>
            <br />
            <br />
            <br />
            <br />

        </div>
    );
}

export default Homepage;