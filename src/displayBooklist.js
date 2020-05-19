import React, { Component } from 'react';
import './displayBooklist.css';

class DisplayBooklist extends Component {

    findNumBooks() {
        let numBooks = 0;
        try {
            numBooks = this.props.books.length;
        }
        catch(err) {
            console.log("Couldn't find books: ", err)
        } 
        return numBooks;
    }

    displayImg(item) {
        if (item.volumeInfo.hasOwnProperty('imageLinks') && item.volumeInfo.imageLinks.hasOwnProperty('thumbnail'))  {
            return (<img alt='Book cover' className='bookImg' src={item.volumeInfo.imageLinks.thumbnail}/>);
        } else {
            console.log("No image to display");
            return (<img alt='Book cover' className='bookNoImg'/>);
        }
    }

    displayTitle(item) {
        if (item.volumeInfo.title && item.volumeInfo.title.length > 0) {
            return (<h1 className='title'>{item.volumeInfo.title}</h1>);
        } else {
            console.log("No title to display");
            return (<h1 className='titleMissing'>Title missing</h1>);
        }
    }

    displaySubtitle(item) {
        if (item.volumeInfo.subtitle) {
            return (<h2 className="subtitle">{item.volumeInfo.subtitle}</h2>);
        } 
    }

    displayAuthors(item) {
        let authorList = [];
        //If authors found, then display them.
        if (item.volumeInfo.authors) {
            //If more than one author found, then use ',' to separate them.
            if (item.volumeInfo.authors.length > 1) {
                for (let i = 0; i <= item.volumeInfo.authors.length; i++) {
                    let author = item.volumeInfo.authors[i];
                    authorList.push(author)
                    if (i < item.volumeInfo.authors.length - 1) {
                        authorList.push(", ")
                    } 
                }
                return (<div>Authors: {authorList}</div>);
            } else {
                //Otherwise, just print the single author.
                return (<div>Author: {item.volumeInfo.authors}</div>);
            }
        } 
    }

    displayDescription(item) {
        if (item.volumeInfo.description) {
            return (<p>{item.volumeInfo.description}</p>);
        } 
    }

    displayPrice(item) {
        //If the time is for sale, then display the price.
        if (item.saleInfo.saleability && item.saleInfo.saleability !== "NOT_FOR_SALE") {
            let price = item.saleInfo.listPrice.amount;
            if (Number.isInteger(price)) {
                price = "$" + item.saleInfo.listPrice.amount + ".00";
            } else {
                price = "$" + item.saleInfo.listPrice.amount;
            } 
            return (<div>Price: {price}</div>);
        }  
    }

    render() {
        let numBooks = this.findNumBooks();
        console.log("numBooks: ", numBooks);
        let displayData = '';
        if (numBooks > 0) {
            displayData = this.props.books.map((item, i) => {
                return (
                    <div className='bookContainer' key={i}>
                        {this.displayImg(item)}
                        {this.displayTitle(item)}
                        {this.displaySubtitle(item)}
                        {this.displayAuthors(item)}
                        {this.displayPrice(item)}
                        {this.displayDescription(item)}
                        <hr className="divider"></hr>
                    </div>
                );
            }); 
        }

        return (
            <div>
            { displayData }
            <a href="#top" className="previous">&laquo; Previous</a>
            <a 
                onClick={(event) => this.props.handlePaginationNext()}
                href="#top" className="next">Next &raquo;</a>
            </div>
        );
        
    }
}

export default DisplayBooklist;
