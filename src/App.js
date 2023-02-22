import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
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
      style={{backgroundImage: `url(${backgroundImage.url}&w=${useRef(window.innerWidth).current})`}}
    >
      {isError && <p>Something went wrong ...</p>}
      <BrowserRouter>
      <div className={styles.AppBody} >
        <Header />
          <Routes>
            <Route exact path="/" element={<TodoContainer listId='1'/>}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route  path='/travel' element={<TodoContainer listId='2'/>}></Route>
            <Route  path='/education' element={<TodoContainer listId='3'/>}></Route>
            <Route  path='/family' element={<TodoContainer listId='4'/>}></Route>
          </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
};


export default App;


