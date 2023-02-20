import React from 'react';
import ReactSwitch from 'react-switch';
import styles from './ToggleSwitch.module.css';
import PropTypes from 'prop-types';


const ToggleSwitch = ({toggleChecked, handleToggleChange}) => {
    return (
        <div className={styles.ToggleSwitch}>
            <label className={styles.ToggleSwitchLabel} htmlFor="ReactSwitch">Sort: </label>
            <ReactSwitch
                checked={toggleChecked}
                onChange={handleToggleChange}
            />
        </div>
    );
}


ToggleSwitch.propTypes = {
    handleToggleChange: PropTypes.func,
    toggleChecked: PropTypes.bool
};


export default ToggleSwitch;