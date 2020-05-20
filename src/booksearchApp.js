import React, { Component } from 'react';
import './booksearchApp.css';
import SearchBooks from './searchBooks.js';
import Heading from './heading.js';
//import DisplayBooklist from './displayBooklist';

class BooksearchApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          books: [],
          filteredBooks: [],
          searchTerm: '',
          filterByPrintType: 'all',
          filterByBookType: '',
          err: null,
          startIndex: 0,
          defaultCount: 40,
          endIndex: 0,
          totalCount: 0,
          displayNext: true,
          displayPrevious: false
        };
        this.handleSearchtermSubmit = this.handleSearchtermSubmit.bind(this);
        this.handleSearchtermChange = this.handleSearchtermChange.bind(this);
        this.handleFilterByPrintTypeChange = this.handleFilterByPrintTypeChange.bind(this);
        this.handleFilterByBookTypeChange = this.handleFilterByBookTypeChange.bind(this);
        this.handlePaginationNext = this.handlePaginationNext.bind(this);
        this.handlePaginationPrevious = this.handlePaginationPrevious.bind(this);
      }

    handleSearchtermChange(event) {
      this.setState({searchTerm: event.target.value});
    }

    handleSearchtermSubmit(flag) {
      this.fetchData(flag);
    }

    handleFilterByPrintTypeChange(event) {
      console.log("handleFilterByPrintTypeChange event value: ", event.target.value);
      if (event.target.value === "") {
      } else {
        this.setState({filterByPrintType: event.target.value});
      }
      this.fetchData();
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      this.setState({filterByBookType: event.target.value});
      this.fetchData();
    }

    handlePaginationNext() {
      //Don't change startIndex if totalCount is reached
      this.handleSearchtermSubmit("next");

      /*if ((this.state.startIndex + this.state.defaultCount) > this.state.totalCount) {
        console.log("Found handlePaginationNext problem");
        this.setState({
          startIndex: this.state.startIndex,
          endIndex: (this.state.endIndex - this.state.defaultCount),
        });
      } else {
        this.handleSearchtermSubmit();
        this.setState({
          startIndex: (this.state.startIndex + this.state.defaultCount),
          endIndex: (this.state.endIndex + this.state.defaultCount),
        });
      }*/
    }

    handlePaginationPrevious() {
      //Reset startIndex and endIndex if less than 0

      this.handleSearchtermSubmit("previous");

      /*if ((this.state.startIndex - this.state.defaultCount) < 0) {
        console.log("Found hanglePaginationPrevious problem");
        this.setState({
          startIndex: 0,
          endIndex: this.state.defaultCount,
        });
      } else {
        this.handleSearchtermSubmit("previous");
        this.setState({
          startIndex: (this.state.startIndex - this.state.defaultCount),
          endIndex: (this.state.endIndex - this.state.defaultCount),
        });
      }*/
    }

    fetchData(flag) {
      console.log("fetchData startIndex: ", this.state.startIndex);
      console.log("fetchData endIndex: ", this.state.startIndex + this.state.defaultCount);
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const startIndexQuery = '&startIndex=' + this.state.startIndex;
      const maxResultsQuery = '&maxResults=' + this.state.defaultCount;
      const searchQuery = '?q=' + this.state.searchTerm;
      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + startIndexQuery + maxResultsQuery + apiKey;
      console.log("noFilter: ", this.state.noFilter);
      if (this.state.noFilter === 0) {
        url += bookTypeQuery;
      } 
      /*const options = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json" 
            }
      };*/
      console.log("url: " + url)
      console.log("printTypeQuery: " + printTypeQuery)
      console.log("bookTypeQuery: " + bookTypeQuery)

      if (((this.state.startIndex + 10) > this.state.totalCount) && (this.state.startIndex !== 0)) {
        return;
      } 

      fetch(url)
          .then(response => {
            if(!response.ok) {
              console.log('Got a GET error :-( ');
              throw new Error('Could not do a GET'); 
            }
            console.log('Successfully did a GET!');
            return response.json(); 
          })
          .then(data => {
            console.log("data:")
            console.log(data);
            
            if (flag === "next") {
            //if ((this.state.startIndex + this.state.defaultCount) > this.state.totalCount) {
              //If the startIndex is greater than the total, then keep the same values as before
              console.log("Made it inside Option #1 (next)");
              if ((this.state.startIndex + this.state.defaultCount) < this.state.totalCount) {
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex,
                  endIndex: (this.state.endIndex + this.state.defaultCount),
                  totalCount: data.totalItems,
                  err: null
                });
              } else {
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex,
                  endIndex: this.state.endIndex,
                  totalCount: data.totalItems,
                  displayNext: false,
                  err: null
                });
              }
            //} else if (this.state.startIndex - this.state.defaultCount < 0) {
            } else if (flag === "previous") {
              //If the startIndex is less than 0, then reset it
              console.log("Made it inside Option #2 (previous)");
              this.setState({
                books: data.items,
                startIndex: 0,
                endIndex: this.state.defaultCount,
                totalCount: data.totalItems,
                err: null
              });
            } else {
              console.log("Made it inside Option #3 (default)");
              this.setState({
                books: data.items,
                startIndex: (this.state.startIndex + this.state.defaultCount),
                endIndex: (this.state.endIndex + this.state.defaultCount),
                totalCount: data.totalItems,
                err: null
              });
            }

          })
          .catch(err => {
            console.log('Error: ', err.message);
            this.setState({
              error: err.message,
              books: []
          });
        });
    }
    
    render() {
      console.log("BookSearch startIndex: ", this.state.startIndex);
      console.log("BookSearch endIndex: ", this.state.endIndex);
        return (
            <div className="BooksearchApp">
                <Heading/>
                <SearchBooks 
                    searchTerm={this.state.searchTerm}
                    books={this.state.books}
                    startIndex={this.state.startIndex}
                    endIndex={this.state.endIndex}
                    totalCount={this.state.totalCount}
                    defaultCount={this.state.defaultCount}
                    handleSearchtermChange ={this.handleSearchtermChange}
                    handleSearchtermSubmit={this.handleSearchtermSubmit}
                    filterByPrintType={this.state.filterByPrintType}
                    filterByBookType={this.state.filterByBookType}
                    handleFilterByPrintTypeChange ={this.handleFilterByPrintTypeChange}
                    handleFilterByBookTypeChange={this.handleFilterByBookTypeChange}
                    filteredBooks={this.state.books}
                    handlePaginationNext={this.handlePaginationNext}
                    handlePaginationPrevious={this.handlePaginationPrevious}
                  />
            </div>
        );
    }
}

export default BooksearchApp;