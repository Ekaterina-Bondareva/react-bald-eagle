import React, { useEffect, useState } from "react";
import styles from './Quote.module.css';


// Fetch Random Motivating Quote from https://type.fit/api/quotes
const Quote = () => {
    const [quote, setQuote] = useState({});

    const getRandomNumber = (num) => Math.floor(Math.random() * num);

    useEffect(() => {
        fetch("https://type.fit/api/quotes", {
            method: 'GET',
        })
        .then((response) => response.json())
        .then(result => {
            const randomIndex = getRandomNumber(result.length);
            setQuote({
                "text": result[randomIndex].text, 
                "author": result[randomIndex].author
            })
        })
        .catch((e) => console.log(e));
    }, []);

    return (
        <>
            <div className={styles.QuoteContainer}>
                <p className={styles.Quote}>{`"${quote.text}"`}</p>
                <p>{quote.author}</p>
            </div>
        </>
    );
};


export default Quote;