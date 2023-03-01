import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


/* This is the javascript file corresponding to index.html. This file has the following line of code which is very significant. ReactDOM.render(<App />, document.getElementById(‘root’).
index. js is the "entry point" for your server and contains the logic of the server.*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);