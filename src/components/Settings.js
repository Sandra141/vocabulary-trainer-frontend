import { NavLink } from 'react-router-dom';
import HeaderBlank from './layout/HeaderBlank';
import Footer from './layout/Footer';

const Settings = () => {
    return(
        <>
        <HeaderBlank />
        <h2>Settings</h2>
        <NavLink to="/logout">Logout</NavLink>
        <Footer />
        </>
    );
}

export default Settings;