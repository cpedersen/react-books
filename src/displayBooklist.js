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
        
        //If books found, then display the books
        if (this.props.books.length) {
            
            //Loop through each book
            data = this.props.books.map((item, i) => {
                //Get list of authors
                const numAuthors = item.volumeInfo.authors.length;
                let listAuthors = []
                if (numAuthors == 2) {
                    for (let i = 1; i <= item.volumeInfo.authors.length; i++) {
                        let author = item.volumeInfo.authors[i];
                        listAuthors.push(author)
                        if (i != 2) {
                            listAuthors.push(" and ")
                        }
                    }
                } else if (numAuthors > 2) {
                    for (let i = 0; i <= item.volumeInfo.authors.length; i++) {
                        let author = item.volumeInfo.authors[i];
                        listAuthors.push(author)
                        if (i < item.volumeInfo.authors.length - 1) {
                            listAuthors.push(", ")
                        } 
                    }
                } else {
                    listAuthors = item.volumeInfo.authors;
                }

                //If book is not for sale, don't display price
                if (item.saleInfo.saleability === "NOT_FOR_SALE") {
                    let foundDescErr = 0;
                    try {
                        let description = item.volumeInfo.description;
                    }
                    catch(err) {
                        console.log("Couldn't find description: ", err);
                        foundDescErr = 1;
                    }
                    if (foundDescErr !== 0) {
                        return (
                            <div key={i}>
                                <h1>{item.volumeInfo.title}</h1>
                                <h2>{item.volumeInfo.subtitle}</h2>
                                <div>Author: {listAuthors}</div>
                                <hr className="divider"></hr>
                            </div>
                        );
                    } else {
                        return (
                            <div key={i}>
                                <h1>{item.volumeInfo.title}</h1>
                                <h2>{item.volumeInfo.subtitle}</h2>
                                <div>Author: {listAuthors}</div>
                                <p>{item.volumeInfo.description}</p>
                                <hr className="divider"></hr>
                            </div>
                        );   
                    }

                } else {
                    //Format price correctly
                    let price = item.saleInfo.listPrice.amount;
                    if (Number.isInteger(price)) {
                        price = "$" + item.saleInfo.listPrice.amount + ".00";
                    } else {
                        price = "$" + item.saleInfo.listPrice.amount;
                    }

                    let foundDescErr = 0;
                    try {
                        let description = item.volumeInfo.description;
                    }
                    catch(err) {
                        console.log("Couldn't find description: ", err);
                        foundDescErr = 1;
                    }
                    if (foundDescErr !== 0) {
                        return (
                            <div key={i}>
                                <h1>{item.volumeInfo.title}</h1>
                                <h2>{item.volumeInfo.subtitle}</h2>
                                <div>
                                    <div>Author: {listAuthors}</div>
                                    <div>Price: {price}</div>
                                </div>
                                <hr className="divider"></hr>
                            </div>
                        );
                    } else {
                        return (
                            <div key={i}>
                                <h1>{item.volumeInfo.title}</h1>
                                <h2>{item.volumeInfo.subtitle}</h2>
                                <div>
                                    <div>Author: {listAuthors}</div>
                                    <div>Price: {price}</div>
                                </div>
                                <p>{item.volumeInfo.description}</p>
                                <hr className="divider"></hr>
                            </div>
                        );
                    }
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
