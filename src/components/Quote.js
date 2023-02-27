import React, { useEffect, useState } from "react";
import styles from './Quote.module.css';


const Quote = () => {
    const [quote, setQuote] = useState({});

    const getRandomNumber = (num) => Math.floor(Math.random() * num);

    //Fetch Random Quote from https://type.fit/api/quotes
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
                <div className={styles.Quote}>{`"${quote.text}"`}</div>
                <div className={styles.Author}>{quote.author}</div>
            </div>
        </>
    );
};


export default Quote;