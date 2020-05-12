import React, { Component } from 'react';
import './bookDisplay.css';

class BookDisplay extends Component {
    render() {
        console.log("Inside BookDisplay!")

        return (
            <div className="BookDisplay">
                I'm BookDisplay!: 
                Title, Author, Price, Description
            </div>
        );
    }
}


export default BookDisplay;
