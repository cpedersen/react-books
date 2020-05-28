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
          foundData: false, /* No data found to start */
          flagPagination: "",  /* User did not select 'next' or 'previous' to start */
          displayNext: true,  /* User is allowed to go forward by default */
          displayPrevious: false,  /* User is not allowed to go back by default */
          flagFilter: false  /* No filtering applied to start */
        };
        this.handleSearchtermSubmit = this.handleSearchtermSubmit.bind(this);
        this.handleSearchtermChange = this.handleSearchtermChange.bind(this);
        this.handleFilterByPrintTypeChange = this.handleFilterByPrintTypeChange.bind(this);
        this.handleFilterByBookTypeChange = this.handleFilterByBookTypeChange.bind(this);
        this.handlePaginationNext = this.handlePaginationNext.bind(this);
        this.handlePaginationPrevious = this.handlePaginationPrevious.bind(this);
      }

    handleSearchtermChange(event) {
      this.setState({
        searchTerm: event.target.value
      });
    }

    handleSearchtermSubmit() {
      this.fetchData();
    }

    handleFilterByPrintTypeChange(event) {
      //YOUAREHERE - setState not working here
      console.log("handleFilterByPrintTypeChange event value: ", event.target.value);
      this.setState({
          filterByPrintType: event.target.value,
          flagFilter: true
      }, this.fetchData());

      /*this.setState({
          filterByPrintType: event.target.value,
          flagFilter: true
      }, () => {
        console.log(event.target.value);
      });
      this.fetchData());*/
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      this.setState({
        filterByBookType: event.target.value,
        flagFilter: true
      }, this.fetchData());
    }

    handlePaginationNext() {
      console.log("Inside handlePaginationNext");
      this.setState({
          flagPagination: "next",
      }, this.fetchData()); 
    }

    handlePaginationPrevious() {
      this.setState({
          flagPagination: "previous"
      }, this.fetchData()); 
    }


    fetchData() {
      //Get book data 
      console.log("Made it inside fetchData");
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const startIndexQuery = '&startIndex=' + this.state.startIndex;
      const maxResultsQuery = '&maxResults=' + this.state.defaultCount;
      const searchQuery = '?q=' + encodeURI(this.state.searchTerm);
      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + bookTypeQuery + startIndexQuery + maxResultsQuery + apiKey;

      //Don't fetch anything if out of bounds
      //if (((this.state.startIndex + 10) > 0) && (this.state.startIndex !== 0)) {
      //BUG: If not data found, we should still display previous data
      if ((!this.state.foundData && (this.state.startIndex + 10) > 0) && (this.state.startIndex !== 0)) {
        console.log("Fetch is out of bounds");
        return;
      } 

      console.log("filterByBookType: ", this.state.filterByBookType);
      console.log("filterByPrintType: ", this.state.filterByPrintType);
      console.log("url: " + url)

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

            //If no more data after doing fetch above, then only activate Previous button
            if (!data.hasOwnProperty('items')) {
              console.log("**** NO DATA TO DISPLAY ****");
              return this.setState({
                books: [],
                displayNext: false,
                displayPrevious: true,
                startIndex: this.state.startIndex - this.state.defaultCount,
                endIndex: this.state.endIndex - this.state.defaultCount,
                foundData: false
              });
            } 

            console.log("flagPagination: ", this.state.flagPagination);
            console.log("flagFilter: ", this.state.flagFilter);

            //Option #1: User selected Next 
            if (this.state.flagPagination === "next") {
              console.log("Made it inside Option #1 (next):", this.state.flagPagination);
              //Option #1a: Positive case
              
              //if ((this.state.startIndex + this.state.defaultCount) < this.state.totalCount) {
                if (this.state.foundData) {
                //This is the positive case: haven't yet reached the upper boundary
                console.log("Reached positive case under Option #1");

                //If filtering not selected, then counts change
                if (this.state.flagFilter === false) {
                  console.log("Made it inside flagFilter false");
                  this.setState({
                    books: data.items,
                    endIndex: this.state.endIndex + this.state.defaultCount,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                } else {
                  console.log("Made it inside flagFilter true");
                  this.setState({
                    books: data.items,
                    endIndex: this.state.endIndex,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                }

                //Don't incr startIndex until we're past the first page
                if (this.state.endIndex === this.state.defaultCount) {
                  this.setState({
                    startIndex: 0
                  });
                } else if (!this.state.flagFilter) {
                  this.setState({
                    startIndex: this.state.startIndex + this.state.defaultCount
                  });
                } else {
                  this.setState({
                    startIndex: this.state.startIndex
                  }); 
                }

              //Option #1b: Negative case
              } else {
                //This is the negative case: we reached the upper boundary
                console.log("Reached negative case under Option #1");
                this.setState({
                  books: data.items,
                  startIndex: this.state.startIndex,
                  endIndex: this.state.endIndex,
                  displayNext: false,
                  displayPrevious: true,
                  err: null
                });
              }

            //Option 2: User selected Previous
            } else if (this.state.flagPagination === "previous") {
              console.log("Made it inside Option #2 (previous)");
              //Option #2a: This is the positive case: haven't yet reached the lower boundary
              console.log("startIndex & defaultCount", this.state.startIndex, this.state.defaultCount);
              if ((this.state.startIndex - this.state.defaultCount) > 0) {
                console.log("Reached positive case under Option #2");
                //If filtering is not selected
                if (this.state.flagFilter === false) {
                  this.setState({
                    books: data.items,
                    startIndex: this.state.startIndex - this.state.defaultCount,
                    endIndex: this.state.endIndex - this.state.defaultCount,
                    displayPrevious: true,
                    displayNext: true,
                    err: null
                  });
                } else {
                  this.setState({
                    books: data.items,
                    startIndex: this.state.startIndex,
                    endIndex: this.state.endIndex,
                    flagPagination: "previous",
                    displayPrevious: true,
                    displayNext: true,
                    err: null
                  });
                }
              //Option #2b: This is the negative case: we reached the lower boundary
              } else {
                console.log("Reached negative case under Option #2");
                this.setState({
                  books: data.items,
                  startIndex: 0,
                  endIndex: this.state.defaultCount,
                  displayPrevious: false,
                  displayNext: true,
                  err: null
                });
              }
            //Option #3: This is what is set after the Search button is selected (initial state)
            } else {
              console.log("Made it inside Option #3 (first page by default)");
              this.setState({
                books: data.items,
                endIndex: (this.state.endIndex + this.state.defaultCount),
                flagPagination: "next",
                displayPrevious: false,
                displayNext: true,
                foundData: true,
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
        return (
            <div className="BooksearchApp">
                <Heading/>
                <SearchBooks 
                    searchTerm={this.state.searchTerm}
                    books={this.state.books}
                    startIndex={this.state.startIndex}
                    endIndex={this.state.endIndex}
                    defaultCount={this.state.defaultCount}
                    foundData={this.state.foundData}
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