import React from 'react';
import { Link } from 'react-router-dom';
import Quote from './Quote';
import styles from './Footer.module.css';


const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <Quote />
            <Link to="/">
                <p className={styles.ToDoLink}>ToDo</p>
            </Link>
        </footer>
    )
}


export default Footer;
