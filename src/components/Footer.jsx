
import { ReactComponent as Logo } from '../assets/icons/Logo.svg';
import { ReactComponent as Envelope } from '../assets/icons/Envelope.svg';
import { ReactComponent as Phone } from '../assets/icons/Phone.svg';
import { ReactComponent as Location } from '../assets/icons/Location.svg';
import { ReactComponent as Facebook } from '../assets/icons/social-media/Facebook.svg';
import { ReactComponent as Twitter } from '../assets/icons/social-media/Twitter.svg';
import { ReactComponent as Instagram } from '../assets/icons/social-media/Instagram.svg';
import { ReactComponent as LinkdIn } from '../assets/icons/social-media/LinkedIn.svg';
import { ReactComponent as YouTube } from '../assets/icons/social-media/YouTube.svg';

import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer({user, onLoginClick, onSigninClick, onProfileClick, onEnrollClick}) {
  return (
    <footer>
        <div className="container">
            <div className="footer-row">
                <div className="menu">
                    <div className="logo">
                        <Link to={'/'} className="logo-holder">
                            <Logo width={19} height={19} />
                        </Link>
                        <span>Bootcamp</span>
                    </div>
                    <p className="subtitle">
                        Your learning journey starts here! Browse courses to get started.
                    </p>
                    <div className="social-medias">
                        <Facebook/>
                        <Twitter/>
                        <Instagram/>
                        <LinkdIn/>
                        <YouTube/>
                    </div>
                </div>
                <nav className='footer-nav'>
                    <div className='nav-column'>
                        <h4>Explore</h4>
                        <ul>
                            <li onClick={onEnrollClick}>Enrolled Curses</li>
                            <li> 
                                <Link to={'/browse'} className='nav-item'>
                                    Browse Curses
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-column'>
                        <h4>Account</h4>
                        <ul>
                            <li onClick={user ? onProfileClick : undefined}>My Profile</li>
                        </ul>
                    </div>
                    <div className='nav-column'>
                        <h4>Contact</h4>
                        <ul>
                            <li><Envelope/><span>contact@company.com</span></li>
                            <li><Phone/><span>(+995) 555 111 222</span></li>
                            <li><Location/><span>Aghmashenebeli St.115</span></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className='footer-row'>
                <small className='legit'>
                    Copyright © 2026 Redberry International
                </small>
                <span className='legit'>
                    All Rights Reserved | 
                    <a href="/terms"> Terms and Conditions </a>|
                    <a href="/privacy"> Privacy Policy </a>
                </span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;