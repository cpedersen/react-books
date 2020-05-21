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

    handleSearchtermSubmit() {
      this.fetchData("next");
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
      this.fetchData("next");
    }

    handlePaginationPrevious() {
      this.fetchData("previous");
    }

    fetchData(flag) {
      //console.log("fetchData startIndex: ", this.state.startIndex);
      //console.log("fetchData endIndex: ", this.state.startIndex + this.state.defaultCount);
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const startIndexQuery = '&startIndex=' + this.state.startIndex;
      const maxResultsQuery = '&maxResults=' + this.state.defaultCount;
      const searchQuery = '?q=' + this.state.searchTerm;
      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + startIndexQuery + maxResultsQuery + apiKey;
      //console.log("noFilter: ", this.state.noFilter);
      /*if (this.state.noFilter === 0) {
        url += bookTypeQuery;
      } */
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
        //Do nothing if out of bounds
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
              console.log("Made it inside Option #1 (next)");
              if ((this.state.startIndex + this.state.defaultCount) < this.state.totalCount) {
                //This is the positive case: haven't yet reached the upper boundary
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex + this.state.defaultCount,
                  endIndex: this.state.endIndex + this.state.defaultCount,
                  totalCount: data.totalItems,
                  displayNext: true,
                  displayPrevious: true,
                  err: null
                });
              } else {
                //This is the negative case: we reached the upper boundary
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex,
                  endIndex: this.state.endIndex,
                  totalCount: data.totalItems,
                  displayNext: false,
                  displayPrevious: true,
                  err: null
                });
              }
            } else if (flag === "previous") {
              console.log("Made it inside Option #2 (previous)");
              if ((this.state.startIndex - this.state.defaultCount) > 0) {
                //This is the positive case: haven't yet reached the lower boundary
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex - this.state.defaultCount,
                  endIndex: this.state.endIndex - this.state.defaultCount,
                  totalCount: data.totalItems,
                  displayPrevious: true,
                  displayNext: true,
                  err: null
                });
              } else {
                //This is the negative case: we reached the lower boundary
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex,
                  endIndex: this.state.endIndex,
                  totalCount: data.totalItems,
                  displayPrevious: false,
                  displayNext: true,
                  err: null
                });
              }
            } else {
              console.log("Made it inside Option #3 (default)");
              //This is what is set after the Search button is selected (initial state)
              this.setState({
                books: data.items,
                startIndex: (this.state.startIndex + this.state.defaultCount),
                endIndex: (this.state.endIndex + this.state.defaultCount),
                totalCount: data.totalItems,
                displayPrevious: false,
                displayNext: true,
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
                    displayNext={this.state.displayNext}
                    displayPrevious={this.state.displayPrevious}
                  />
            </div>
        );
    }
}

export default BooksearchApp;