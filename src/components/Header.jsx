import { ReactComponent as Logo } from '../assets/icons/Logo.svg';
import { ReactComponent as Browse } from '../assets/icons/Browse.svg';
import { ReactComponent as Enroll } from '../assets/icons/Enroll.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';
import '../styles/Header.css'
import { Link } from 'react-router-dom';

function Header( {user, onLoginClick, onSigninClick, onProfileClick, onEnrollClick} ) {
    return (
        <header className="header-navbar">
            <div className='container header-menu'>
                <Link to={'/'} className="logo-holder">
                    <Logo width={30} height={30} />
                </Link>

                <nav className='header-nav'>
                    <ul className='header-ul'>
                        <li >
                            <Link to={'/browse'} className='nav-item'>
                                <Browse/>
                                <span>Browse Curses</span>
                            </Link>
                        </li>
                        {user && (
                        <li>
                            <div className='nav-item' onClick={onEnrollClick}>
                                <Enroll/>
                                <span>Enrolled Curses</span>
                            </div>
                        </li>
                        )}
                    </ul>
                    {user ? (
                    <div className='avatar icon-holder' onClick={onProfileClick} style={{ backgroundImage: `url(${user.avatar})` }}>
                        {user.avatar ? '' : (
                            <User width={38} height={38} />
                        )}
                        <span className={`status ${user.profileComplete ? 'complete' : ''}`} />
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