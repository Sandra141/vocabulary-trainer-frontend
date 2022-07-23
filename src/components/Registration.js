import { NavLink } from 'react-router-dom';
import './../css/registration.css';
import HeaderBlank from "./HeaderBlank";

const Registration = () => {
    return(
        <div className='ContainerForHeaderBlankAndMain'>
            <HeaderBlank />

            <div className='content'>
                <h2 id="registrationH2">Welcome!</h2>
                <p>Let's expand your knowledge!</p>
                <form method="POST" action="#" className='registrationForm'>
                    <label for="username">Username:</label><br />
                    <input type="text" id="username" name="username" className='lightBlue' /><br />
                    <label for="email">Email:</label><br />
                    <input type="text" id="email" name="email" className='darkBlue' /><br />
                    <label for="password">Password:</label><br />
                    <input type="password" id="password" name="password" className='gray' /><br />
                    <input type="submit" value="Sign up" id="submitRegistration" className='pink' />
                </form>
                <div className='alreadyAMember'>
                    <p>Already a member?</p>
                    <NavLink to="/login">Log in</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Registration;