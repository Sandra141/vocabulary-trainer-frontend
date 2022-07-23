import { NavLink } from 'react-router-dom';
import HeaderBlank from './HeaderBlank';
import Footer from './Footer';

const Settings = () => {
    return(
        <>
        <HeaderBlank />
        <h2>Settings</h2>
        <NavLink to="/login">Logout</NavLink>
        <Footer />
        </>
    );
}

export default Settings;