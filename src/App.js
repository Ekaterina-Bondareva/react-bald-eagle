import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ChatGPT from './components/ChatGPT';
import styles from './App.module.css';


/* App Component is the main component in React which acts as a container for all other components. 
App. js is the "top component" that contains the logic of Application */

// Fetch and render Background Image from https://unsplash.com/developers
const App = ()  => {
  const [backgroundImage, setBackgroundImage] = useState({});

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const backgroundImageUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=oTTC8RDgHH3UB6TLrQMYu7RVzo9caw6p0jIuj3g2Cz0`;

    fetch(backgroundImageUrl, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then(result => {
      setBackgroundImage({
          "url": result.urls.raw 
        })
        setIsError(false);
    })
    .catch(() => setIsError(true));
  }, []);

  return (
    <div style={{backgroundImage: `url(${backgroundImage.url}&w=${useRef(window.innerWidth).current})`}}>
      {isError && <p className={styles.backgroundImageError}>Something went wrong ...</p>}
      <BrowserRouter>
      <div className={styles.AppBody} >
        <Header />
          <Routes>
            <Route exact path="/" element={<TodoContainer listId='1'/>}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route  path='/travel' element={<TodoContainer listId='2'/>}></Route>
            <Route  path='/education' element={<TodoContainer listId='3'/>}></Route>
            <Route  path='/family' element={<TodoContainer listId='4'/>}></Route>
            <Route  path='/chatgpt' element={<ChatGPT />}></Route>
          </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
};


export default App;


