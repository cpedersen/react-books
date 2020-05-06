import React, { Component } from 'react';
import './App.css';
import BooksearchApp from './booksearchApp.js';

class App extends Component {

    render() {
        console.log("App!")
        return (
            <div className="App">
                <BooksearchApp/>
            </div>
        );
    }
}

export default App;
