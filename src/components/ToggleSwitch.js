import React from 'react';
import ReactSwitch from 'react-switch';
import styles from './ToggleSwitch.module.css';
import PropTypes from 'prop-types';


// Switch sort direction using react-switch
const ToggleSwitch = ({toggleChecked, handleToggleChange}) => {
    return (
        <div className={styles.ToggleSwitch}>
            <label className={styles.ToggleSwitchLabel} htmlFor="ReactSwitch">
                {toggleChecked ? "Sort DESC" : "Sort ASC"}
            </label>
            <ReactSwitch
                checked={toggleChecked}
                onChange={handleToggleChange}
                onColor='#415A77'
                offColor="#858585"
            />
        </div>
    );
}


ToggleSwitch.propTypes = {
    toggleChecked: PropTypes.bool,
    handleToggleChange: PropTypes.func,
};


export default ToggleSwitch;