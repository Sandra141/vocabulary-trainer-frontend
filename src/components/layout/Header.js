import { NavLink } from 'react-router-dom';
import '../../css/header.css';

const Header = () => {
    return (
        <header className="appHeader">
            <h1>Heading</h1>
            <nav>
                <NavLink to="/decks" style={({ isActive }) => ({
                    color: isActive ? '#06062F' : '#9FACC7'
                })}>Decks</NavLink>

                <NavLink to="/find-Decks" className='headerActive' style={({ isActive }) => ({
                    color: isActive ? '#06062F' : '#9FACC7'
                })}>Find Decks</NavLink>

                <NavLink to="/games" className='headerActive' style={({ isActive }) => ({
                    color: isActive ? '#06062F' : '#9FACC7'
                })}>Games</NavLink>
            </nav>
        </header>
    );
}

export default Header;