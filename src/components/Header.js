import React from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../home.svg';
import Weather from "./Weather";
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.Header}>
            <Link to="/home" >
                <HomeIcon className={styles.HomeIcon}/>
            </Link>
            <Weather />
        </header>
    )
}

export default Header;
