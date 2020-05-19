import React, { Component } from 'react';
import './searchInput.css';
import FilterBy from './filterBy.js';

class SearchInput extends Component {
    render() {
        return (
            <div className="SearchAndFilter" > 
                <div className="SearchInput">
                    <label>
                        Search: 
                        <input 
                            type="text" 
                            value={this.props.searchTerm} 
                            onChange={(event) => this.props.handleSearchtermChange(event)}/>
                        </label>
                    <button onClick={this.props.handleSearchtermSubmit}>Search</button>
                </div>

                <FilterBy
                    searchTerm={this.props.searchTerm}
                    books={this.props.books}
                    filteredBooks={this.props.books}
                    filterByBookType={this.props.filterByBookType}
                    filterByPrintType={this.props.filterByPrintType}
                    handleFilterByPrintTypeChange ={this.props.handleFilterByPrintTypeChange}
                    handleFilterByBookTypeChange={this.props.handleFilterByBookTypeChange}
                    handleSearchtermSubmit={this.props.handleSearchtermSubmit}
                />
            </div>

        ); 
    } 
} 

export default SearchInput;


