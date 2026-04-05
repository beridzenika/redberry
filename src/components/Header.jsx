import { ReactComponent as Logo } from '../assets/icons/Logo.svg';
import { ReactComponent as Browse } from '../assets/icons/Browse.svg';
import { ReactComponent as Enroll } from '../assets/icons/Enroll.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';
import '../styles/Header.css'

function Header( {isLoggedIn, onLoginClick, onSigninClick} ) {
    return (
        <header className="header-navbar">
            <div className='container header-menu'>
                <a className="logo-holder">
                    <Logo width={30} height={30} />
                </a>

                <nav className='header-nav'>
                    <ul className='header-ul'>
                        <li className='nav-item'>
                            <Browse/>
                            <span>Browse Curses</span>
                        </li>
                        {isLoggedIn && (
                        <li className='nav-item'>
                            <Enroll/>
                            <span>Enrolled Curses</span>
                        </li>
                        )}
                    </ul>
                    {isLoggedIn ? (
                    <div className='avatar'>
                        <User width={38} height={38} />
                        <span className={`status ${isLoggedIn ? 'active' : ''}`} />
                    </div>
                    ) : (
                    <>
                        <button className="btn-secondary" onClick={onLoginClick}>Log in</button>
                        <button className="btn-primary" onClick={onSigninClick}>Sign up</button>
                    </>
                    )}
                    
                </nav>
            </div>
        </header>
    )
}

export default Header