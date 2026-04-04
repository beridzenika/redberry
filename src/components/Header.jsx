import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as Browse } from '../assets/Browse.svg';
import { ReactComponent as Enroll } from '../assets/Enroll.svg';
import { ReactComponent as User } from '../assets/User.svg';
import '../styles/Header.css'

function Header() {
    const isLoggedIn = false;
    const isActive = false;
    return (
        <header className="header-navbar">
            <div className='container'>
                <a className="logo-holder">
                    <Logo width={30} height={30} />
                </a>

                <nav>
                    <ul>
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
                        <span className={`status ${isActive ? 'active' : ''}`} />
                    </div>
                    ) : (
                    <>
                        <button className="btn-secondary">Log in</button>
                        <button className="btn-primary">Sign up</button>
                    </>
                    )}
                    
                </nav>
            </div>
        </header>
    )
}

export default Header