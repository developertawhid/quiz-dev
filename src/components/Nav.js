import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-bg.png';
import Account from '../components/Account';
import classes from '../styles/Nav.module.css';

function Nav() {
    return (
        <div className={ classes.container }>
            <nav className={ classes.nav }>
                <ul>
                    <li>
                        <Link to="/" className={ classes.brand }>
                            <img src={ logo } alt="Brand logo" />
                            <h3>Learn with Sumit</h3>
                        </Link>
                    </li>
                </ul>
                <Account />
            </nav>
        </div>
  
    )
}

export default Nav;
