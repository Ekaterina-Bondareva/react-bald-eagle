import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './HomePage';
import styles from './App.module.css';


const App = ()  => {
  const [backgroundImage, setBackgroundImage] = useState({});

  const [isError, setIsError] = useState(false);

  //Fetch Background Image from https://unsplash.com/developers
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
    <div 
      className={styles.App} 
      style={{backgroundImage: `url(${backgroundImage.url}&w=${useRef(window.innerWidth).current})`}}
    >
      {isError && <p>Something went wrong ...</p>}
      <BrowserRouter>
        <Header />
          <Routes>
            <Route exact path="/" element={<TodoContainer />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route  path='/new' element={<><h1>New Todo List</h1></>}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};


export default App;


