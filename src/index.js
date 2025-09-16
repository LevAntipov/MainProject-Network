import React from 'react';
import ReactDOM from "react-dom/client"
import reportWebVitals from './reportWebVitals';
import './index.css';
import SocialNetwork from './App';





const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
       <SocialNetwork/>
    );

/*

Было до внедрения react-redux, функция connect в container сама обновляет часть дерева, которую нужно


//redux сам не передает state, нужно делать так
store.subscribe(() => {
    let state = store.getState();
    rerenderTree(state);
});
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
