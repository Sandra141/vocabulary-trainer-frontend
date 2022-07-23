import { NavLink } from 'react-router-dom';
import HeaderBlank from "./HeaderBlank";

const Login = () => {
    return(
        <div className='ContainerForHeaderBlankAndMain'>
            <HeaderBlank />

            <div className='content'>
                <h2 id="registrationH2">Welcome back!</h2>
                <form method="POST" action="#" className='registrationForm'>
                    <label for="username">Username / E-mail:</label><br />
                    <input type="text" id="username" name="username" className='gray' /><br />
                    <label for="password">Password:</label><br />
                    <input type="password" id="password" name="password" className='darkBlue' /><br />
                    <input type="submit" value="Log in" id="submitRegistration" className='pink' />
                </form>
                <div className='alreadyAMember'>
                    <p>No profile yet?</p>
                    <NavLink to="/registration">Register</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Login;