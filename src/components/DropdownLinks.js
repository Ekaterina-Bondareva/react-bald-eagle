import React from 'react';
import PropTypes from 'prop-types';
import styles from './DropdownLinks.module.css';


const DropdownLinks = ({nav}) => {
    const onChange = (e) => nav(`${e.target.value}`);

    return (
        <select onChange={onChange} className={styles.DropdownLinks}>
            <option value="/" id="/">ToDo</option>
            <option value="/travel" id="travel">Travel</option>
            <option value="/education" id="education">Education</option>
            <option value="/family" id="family">Family</option>
            <option value="/chatgpt" id="chatgpt">ChatGPT</option>
        </select>
    )
};


DropdownLinks.propTypes = {
    nav: PropTypes.func,
};


export default DropdownLinks;



