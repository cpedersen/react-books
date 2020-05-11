import React, { Component } from 'react';
import './displayBooklist.css';
import BookDisplay from './bookDisplay.js';

class DisplayBooklist extends Component {
    constructor(props) {
        super(props);
        /*const booklist = [];*/
        //let boolistLength = this.props.books.length;
        //console.log("boolistLength: ", booklistLength);
        /*console.log("TESTING: ", this.props.books);
        for (let i = 0; i < this.props.books.length; i++) {
            console.log("item: ", i)
            booklist.push({*/
                //title: this.props.books.items[i]
                //author: 
                //price: 
                //description: this.props.books.items[i].searchInfo
                /*description: "testing123"
            });
        }
        this.state = { booklist };*/
    }

    //TODO - add logic for multiple authors
    //TODO - add logic for price (saleability)
    //TODO - add filter logic 

    //   <p>{item.saleInfo.saleability}</p>
    //<p>{item.saleInfo.listPrice}</p>

    render() {
        const booklist = this.props.books.items
        console.log("Inside Display Booklist!")
        console.log("searchTerm: ", this.props.searchTerm)
        console.log("books.items: ", this.props.books)
        let data = "No books found";
        
        ////Print title, author, price, description, image
        //<p>{item.searchInfo.textSnippet}</p>

        //If books found, then display the books
        if (this.props.books.length) {
            //Loop through each book
            data = this.props.books.map((item, i) => {
                //If book is for sale then display price
                if (item.saleInfo.saleability === "NOT_FOR_SALE") {
                    return (
                        <div key={i}>
                            <h1>{item.volumeInfo.title}</h1>
                            <p>{item.volumeInfo.authors}</p>
                        </div>
                    );
                }
            }); //map
        
        } //if books found

        return (
            <div>
            { data }
            </div>
        ); //return data
    } //render
}

//DisplayBooklist.defaultProps = {
//    books: []
//};

export default DisplayBooklist;
