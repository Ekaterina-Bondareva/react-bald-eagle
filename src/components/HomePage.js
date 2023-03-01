import React, { useState, useEffect } from "react";
import styles from './HomePage.module.css';


//Create App HomePage with Current Time, Date and Greeting on it
const HomePage = () => {
    const options = {weekday: 'long', month: 'long', day: 'numeric'};

    const [date, setDate] = useState(new Date());

    //Update Time every second
    useEffect(() => {
        const currentTime = setInterval(() => setDate(new Date()), 1000);

        return function cleanup() {
            clearInterval(currentTime);
        }
    });

    const getTimeOfDay = () => date.getHours() < 12 ? 'Morning' : date.getHours() < 18 ? 'Afternoon' : 'Evening';

    return (
        <div className={styles.HomePage}>
            <p className={styles.Time}>{date.toLocaleTimeString()}</p>
            <p className={styles.Date}>{date.toLocaleDateString('en-US', options)}</p>
            <p className={styles.Greeting}>{`Good ${getTimeOfDay()}!`}</p>
        </div>
    );
};


export default HomePage;


