import React, {useState} from 'react';
import styles from './ChatGPT.module.css';
import { ReactComponent as SearchIconBlack } from '../icons/search-black.svg';

const ChatGPT = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);

    //https://www.codeproject.com/Articles/5350454/Chat-GPT-in-JavaScript
    const queryChatgpt = (e) => {
        e.preventDefault()
        if (query.length === 0) {
            return;
        }
        setLoading(true);
        setResults([]);
        let body = JSON.stringify(
            {
                model: "text-davinci-003",
                prompt: query,
                max_tokens: 2048,
                user: "1",
                temperature:  0.5,
                frequency_penalty: 0.0, //Number between -2.0 and 2.0  
                                //Positive values decrease the model's likelihood 
                                //to repeat the same line verbatim.
                presence_penalty: 0.0,  //Number between -2.0 and 2.0. 
                                //Positive values increase the model's likelihood 
                                //to talk about new topics.
                stop: ["#", ";"] 
            }
        );

        //Fetch ChatGPT
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_CHATGPT_API_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then((response) => response.json())
        .then(result => {
            setLoading(false);
            let data = result.choices[0].text;
            // console.log(data);
            //Convert response from chatGPT to list
            data = data.split("\n").map(item => item.replace("\n", "").trim()).filter(e => e.length > 0);
            setResults(data);
        })
        .catch((e) => {
            setLoading(false);
            // console.log(e)
        });
    };

    return (
        <div className={styles.ChatGPT}>
            <form onSubmit={queryChatgpt} className={styles.ChatGPTForm}>
                <div className={styles.ChatGPTInputForm}>
                    <input 
                        type="text" 
                        className = {styles.ChatGPTInput} 
                        placeholder="Ask ChatGPT"
                        defaultValue={query} onChange={(e) => {setQuery(e.target.value)}}
                    />
                    <button type='submit' className = {styles.ChatGPTBtn}>
                        <SearchIconBlack  className={styles.SearchIconBlack}/>
                    </button>
                </div>
                <div>
                    {isLoading ? (<p className={styles.ChatGPTLoading}>Waiting for ChatGPT</p>) : (null)}
                    {
                    results.length > 0 ? (
                    <ul>
                        {results.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                    </ul>) 
                    : (null)
                    }
                </div>
            </form>
        </div>
    );
}

export default ChatGPT;