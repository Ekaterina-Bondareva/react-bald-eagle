import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';
import PropTypes from 'prop-types';


//Creating Dropdown reusable component (https://www.robinwieruch.de/react-dropdown/)
const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (listening) {
            return;
        }
        if (!menuRef.current) {
            return;
        }
        setListening(true);
        ['click', 'touchstart'].forEach((type) => {
                document.addEventListener('click', (evt) => {
                    const cur = menuRef.current;
                    const node = evt.target;
                    if (cur !== null && cur.contains(node)) {
                        return;
                    } 
                    setOpen(false);
                })
        })
    }, [listening, setListening, menuRef, setOpen])

    return (
        <div className={styles.Dropdown} ref={menuRef}>
            {React.cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
                <ul className={styles.Menu}>
                    {menu.map((menuItem, index) => (
                        <li key={index} className={styles.MenuItem}>
                            {React.cloneElement(menuItem, {
                                onClick: () => {
                                    menuItem.props.onClick();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};


Dropdown.propTypes = {
    trigger: PropTypes.element,
    menu: PropTypes.array
};


export default Dropdown;