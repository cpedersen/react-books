import React, { Component } from 'react';
import './displayBooklist.css';
import BookDisplay from './bookDisplay.js';

class DisplayBooklist extends Component {
    render() {
        console.log("Inside Display Booklist!")
        /*const books = this
            .props
            .data
            .map((item, i) => <DisplayBooklist { ...item } key={i}/>);*/

        return (
            <div className="displayBooklist">
                I'm DisplayBooklist!
                <BookDisplay/>
            </div>
        );
    }
}

//DisplayBooklist.defaultProps = {
//    books: []
//};

export default DisplayBooklist;
