import React, { Component } from 'react';
import './searchBooks.css';
import './displayBooklist.css';
import SearchInput from './searchInput.js';
import DisplayBooklist from './displayBooklist.js';

class SearchBooks extends Component {

    render() {
        return (
            <div className="SearchBooks">
                <SearchInput 
                    searchTerm={this.props.searchTerm}
                    books={this.props.books}
                    handleSearchtermChange ={this.props.handleSearchtermChange}
                    handleSearchtermSubmit={this.props.handleSearchtermSubmit}
                    filterByBookType={this.props.filterByBookType}
                    filterByPrintType={this.props.filterByPrintType}
                    handleFilterByPrintTypeChange ={this.props.handleFilterByPrintTypeChange}
                    handleFilterByBookTypeChange={this.props.handleFilterByBookTypeChange}
                    filteredBooks={this.props.books}
                    />
                <DisplayBooklist                    
                    searchTerm={this.props.searchTerm}
                    books={this.props.books}
                    filteredBooks={this.props.books}
                    handlePaginationNext={this.props.handlePaginationNext}
                    handlePaginationPrevious={this.props.handlePaginationPrevious}
                    startIndex={this.props.startIndex}
                    endIndex={this.props.endIndex}
                    totalCount={this.props.totalCount}
                    defaultCount={this.props.defaultCount}
                />
            </div>
        );
    }
}

export default SearchBooks;


//handleFilterSubmit={this.props.handleFilterSubmit}