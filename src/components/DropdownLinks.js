import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DropdownLinks.module.css';
import PropTypes from 'prop-types';


//Create the Dropdown with Links to todo lists
const DropdownLinks = ({selected, setSelected}) => {
    const nav = useNavigate();

    const onChange = (e) => {     
        setSelected(e.target.value)
        nav(e.target.value);
    }

    return (
        <select onChange={onChange} className={styles.DropdownLinks} value={selected}>
            <option value="/" id="todo"  >ToDo</option>
            <option value="/travel" id="travel">Travel</option>
            <option value="/education" id="education">Education</option>
            <option value="/family" id="family">Family</option>
            <option value="/chatgpt" id="chatgpt">ChatGPT</option>
        </select>
    )
};


DropdownLinks.propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func
};


export default DropdownLinks;



