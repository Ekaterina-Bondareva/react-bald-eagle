import React from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownLinks.module.css';


const DropdownLinks = ({nav}) => {
    const onChange = (e) => {
        if (e.target.value === 'ToDo') {
            nav('/');
        } else {
            nav(`/${e.target.value}`);
        }
    }

    return (
        <select onChange={onChange} className={styles.DropdownLinks}>
            <option>
                ToDo
            </option>
            <option>
                Travel
            </option>
            <option>
                Education
            </option>
            <option>
                Family
            </option>
            <option>
                ChatGPT
            </option>
        </select>
    )
}


DropdownLinks.propTypes = {
    nav: PropTypes.func,
};


export default DropdownLinks;



