import React, { Component } from 'react';
import './displayBooklist.css';
import BookDisplay from './bookDisplay.js';

class DisplayBooklist extends Component {
    constructor(props) {
        super(props);
    }

    //TODO - add filter logic 
    //TODO - add each book's image

    render() {
        const booklist = this.props.books.items
        const filteredBooklist = this.props.filteredBooks.items
        console.log("Inside Display Booklist!")
        console.log("searchTerm: ", this.props.searchTerm)
        console.log("books.items: ", this.props.books)
        console.log("filteredBooks.items: ", this.props.filteredBooks)
        let data = "No books found";
        let filteredData = "No filtered books found";
        
        //TODO - add logic to handle display of filtered books
        //TODO - 

        let failFindBooks = 0;
        let numBooks = 0;
        try {
            let numBooks = this.props.books.length;
        }
        
        catch(err) {
            console.log("Couldn't find books: ", err)
            failFindBooks = 1;
        }

        let failFindFilteredBooks = 0;
        let numFilteredBooks = 0;
        try {
            let numFilteredBooks = this.props.filteredBooks.length;
        }
        
        catch(err) {
            console.log("Couldn't find any filtered books: ", err)
            failFindFilteredBooks = 1;
        }

        console.log("numBooks: ", numBooks);
        console.log("failFindBooks: ", failFindBooks);

        console.log("numFilteredBooks: ", numFilteredBooks);
        console.log("failFindFilteredBooks: ", failFindFilteredBooks);

        //-----------------------------------------------------
        //BOOKS
        //-----------------------------------------------------
        if (failFindBooks === 0) {
            //Loop through each book
            data = this.props.books.map((item, i) => {
                //Get image
                let bookImg = "No image to display";
                let flagBookImgNotFound = 0;
                try {
                    //console.log("Looking for img to display");
                    bookImg = item.volumeInfo.imageLinks.thumbnail;
                    //console.log("bookImg: ", bookImg);
                }
                catch(err) {
                    console.log("Couldn't find an img to display: ", err);
                    flagBookImgNotFound = 1;
                }

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
                        //Print book img if found
                        if (flagBookImgNotFound === 0) {
                            console.log("Printing image");
                            return (
                                <div className='bookContainer' key={i}>
                                    <div className='bookImg' src='bookImg'></div>
                                    <div className='bookInfo'>
                                        <h1>{item.volumeInfo.title}</h1>
                                        <h2>{item.volumeInfo.subtitle}</h2>
                                        <div>Author: {listAuthors}</div>
                                        <hr className="divider"></hr>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={i}>
                                    <h1>{item.volumeInfo.title}</h1>
                                    <h2>{item.volumeInfo.subtitle}</h2>
                                    <div>Author: {listAuthors}</div>
                                    <hr className="divider"></hr>
                                </div>
                            );
                        } //if book image found
                    } else {
                        //Print book img if found
                        if (flagBookImgNotFound === 0) {
                            console.log("Printing image");
                            return (
                                <div className='bookContainer' key={i}>
                                    <div className='bookImg' src='bookImg'></div>
                                    <div className='bookInfo'>
                                        <h1>{item.volumeInfo.title}</h1>
                                        <h2>{item.volumeInfo.subtitle}</h2>
                                        <div>Author: {listAuthors}</div>
                                        <p>{item.volumeInfo.description}</p>
                                        <hr className="divider"></hr>
                                 </div>
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
                        } //if book img found
                    } //if description found
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
                        //Print book img if found
                        if (flagBookImgNotFound === 0) {
                            console.log("Printing image");
                            return (
                                <div className='bookContainer' key={i}>
                                    <div className='bookImg' src='bookImg'></div>
                                    <div className='bookInfo'>
                                        <h1>{item.volumeInfo.title}</h1>
                                        <h2>{item.volumeInfo.subtitle}</h2>
                                        <div>
                                            <div>Author: {listAuthors}</div>
                                            <div>Price: {price}</div>
                                        </div>
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
                                    <hr className="divider"></hr>
                                </div>
                            );
                        }
                    } else {
                        //Print book img if found
                        if (flagBookImgNotFound === 0) {
                            console.log("Printing image");
                            return (
                                <div className='bookContainer' key={i}>
                                    <div className='bookImg' src='bookImg'></div>
                                    <div className='bookInfo'>
                                        <h1>{item.volumeInfo.title}</h1>
                                        <h2>{item.volumeInfo.subtitle}</h2>
                                        <div>
                                            <div>Author: {listAuthors}</div>
                                            <div>Price: {price}</div>
                                        </div>
                                        <p>{item.volumeInfo.description}</p>
                                        <hr className="dividers"></hr>
                                    </div>
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
                                    <hr className="dividers"></hr>
                                </div>
                            );
                        } //if book img found
                    } //if description found
                } //if books
            }); //map



        //-----------------------------------------------------
        //FILTERED BOOKS
        //-----------------------------------------------------
        if (failFindFilteredBooks === 0) {
            //Loop through each book
            data = this.props.books.map((item, i) => {
                //Get image
                let bookImg = "No image to display";
                let flagBookImgNotFound = 0;
                try {
                    //console.log("Looking for img to display");
                    bookImg = item.volumeInfo.imageLinks.thumbnail;
                    //console.log("bookImg: ", bookImg);
                }
                catch(err) {
                    console.log("Couldn't find an img to display: ", err);
                    flagBookImgNotFound = 1;
                }

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
                                <div className='bookImg' src='bookImg'></div>
                                <div>Author: {listAuthors}</div>
                                <hr className="divider"></hr>
                            </div>
                        );
                    } else {
                        return (
                            <div key={i}>
                                <h1>{item.volumeInfo.title}</h1>
                                <h2>{item.volumeInfo.subtitle}</h2>
                                <div className='bookImg' src='bookImg'></div>
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
                                <div className='bookImg' src='bookImg'></div>
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
                                <div className='bookImg' src='bookImg'></div>
                                <div>
                                    <div>Author: {listAuthors}</div>
                                    <div>Price: {price}</div>
                                </div>
                                <p>{item.volumeInfo.description}</p>
                                <hr className="dividers"></hr>
                            </div>
                        );
                    }
                }
            }); //map
        } //if filtered books
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
