import React, { Component } from 'react';
import './displayBooklist.css';
import DisplayBookDetails from './displayBookDetails.js';

class DisplayBooklist extends Component {

    displayImg(item) {
        if (item.volumeInfo.hasOwnProperty('imageLinks') && item.volumeInfo.imageLinks.hasOwnProperty('thumbnail')) {
            return (<img alt='Book cover' className='bookImg' src={item.volumeInfo.imageLinks.thumbnail} />);
        } else {
            return (<img alt='Book cover' className='bookNoImg' />);
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
        //If authors found, then display them
        if (item.volumeInfo.authors) {
            //If more than one author found, then use ',' to separate them
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
        //If the item is for sale, then display the price
        if (item.saleInfo.saleability && item.saleInfo.saleability !== "NOT_FOR_SALE" && item.saleInfo.saleability !== "FREE") {
            let price = '0';
            try {
                price = "$" + item.saleInfo.retailPrice.amount.toFixed(2);
            }
            catch (err) {
                console.log("err: ", err);
            }
            if (price !== '0') {
                return (<div>Price: {price}</div>);
            }
        }
    }

    render() {
        let displayData = [];
        console.log("********** Inside DisplayBooklist ********** ")
        if (this.props.foundData && this.props.books.length > 0 ) {
            //Option #1: If books found, then save info to displayData
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
        //} else if (!this.props.foundData || this.props.books.length < this.props.defaultCount) {
        } else if (!this.props.foundData ) {
            //Option #2: If no books found, then append msg 
            let books = [];
            displayData = books.map((item, i) => {
                if (i === 1) {
                    return (
                        <div key={i}>
                            <div className="noData">There are no items to display.</div>
                        </div>
                    ); 
                }
            }); 

        } 
            
        //Option #3: Otherwise, display user info
        return (
            <div> 
                {this.props.foundData && 
                    <div className='displayCount'>{this.props.startIndex - this.props.defaultCount}-{this.props.endIndex- this.props.defaultCount}</div>}

                <a
                    onClick={(event) => this.props.handlePaginationPrevious()}
                    href="#top" className={(this.props.displayPrevious && this.props.startIndex > 0) ? "previous": "previousDisabled"}>&laquo; Previous
                </a>

                <a
                    onClick={(event) => this.props.handlePaginationNext()}
                    href="#top" className={(this.props.displayNext && this.props.foundData) ? "next": "nextDisabled"}>Next &raquo;
                </a>

                {displayData}

                <DisplayBookDetails
                    books={this.props.books}
                />
            </div>
        ); 
    }
}

export default DisplayBooklist;
