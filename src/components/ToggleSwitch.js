import React from 'react';
import ReactSwitch from 'react-switch';
import styles from './ToggleSwitch.module.css';
import PropTypes from 'prop-types';


const ToggleSwitch = ({toggleChecked, handleToggleChange}) => {
    return (
        <div className={styles.ToggleSwitch}>
            <label className={styles.ToggleSwitchLabel} htmlFor="ReactSwitch">Sort A-Z</label>
            <ReactSwitch
                checked={toggleChecked}
                onChange={handleToggleChange}
                onColor='#415A77'
                offColor="#A9A9A9"
                // height={20}
            />
        </div>
    );
}


ToggleSwitch.propTypes = {
    toggleChecked: PropTypes.bool,
    handleToggleChange: PropTypes.func,
};


export default ToggleSwitch;