import React from 'react';
import './heading.css';

function Heading () {
    console.log("Inside Heading!")
    return (
        <div className="Heading">
            <h2 className="HeadingText">Google Book Search</h2>
        </div>
    );
}

export default Heading;
