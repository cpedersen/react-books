import React, { Component } from 'react';
import './searchBooks.css';
import './displayBooklist.css';
import SearchInput from './searchInput.js';
//import FilterBy from './filterBy.js';
import DisplayBooklist from './displayBooklist.js';

class SearchBooks extends Component {
    render() {
        console.log("Inside SearchBooks!: ", this.props.searchTerm)


        return (
            <div className="SearchBooks">
                I'm SearchBooks!
                <SearchInput 
                    searchTerm={this.props.searchTerm}
                    books={this.props.books}

                    handleSearchtermChange ={this.props.handleSearchtermChange}
                    handleSearchtermSubmit={this.props.handleSearchtermSubmit}

                    filterByBookType={this.props.filterByBookType}
                    filterByPrintType={this.props.filterByPrintType}
                    handleFilterByPrintTypeChange ={this.props.handleFilterByPrintTypeChange}
                    handleFilterByBookTypeChange={this.props.handleFilterByBookTypeChange}
                    />
                <DisplayBooklist/>
            </div>
        );
    }
}

export default SearchBooks;


//handleFilterSubmit={this.props.handleFilterSubmit}