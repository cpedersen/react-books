import React from 'react';
import './heading.css';

function Heading () {
    console.log("Inside Heading!")
    return (
        <div className="Heading">
            <h1 className="HeadingText">Google Book Search</h1>
        </div>
    );
}

export default Heading;
