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
          numItemsDisplayed: 0, 
          totalItems: 0,
          //filteredBooks: [],
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
          flagFilter: false,  /* No filtering applied to start */          
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
      this.fetchData("selected SearchtermSubmit");
    }

    handleFilterByPrintTypeChange(event) {
      let filterVal = event.target.value;
      console.log("handleFilterByPrintTypeChange event value: ", filterVal);

      this.setState({
          filterByPrintType: filterVal,
          flagFilter: true
      }, () => {
        console.log("filterVal: ", filterVal, this.state.flagPagination);
        this.fetchData("changed filter for PrintType");
      });
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      let filterVal = event.target.value;

      this.setState({
          filterByBookType: filterVal,
          flagFilter: true
      }, () => {
        console.log("filterVal: ", filterVal, this.state.flagPagination);
        this.fetchData("changed filter for BookType");
      });
    }

    handlePaginationNext() {
      console.log("Inside handlePaginationNext");
      this.setState({
          flagPagination: "next",
      }, this.fetchData("next")); 
      console.log("handlePaginationNext startIndex, endIndex: ", this.state.startIndex, this.state.endIndex);
    }

    handlePaginationPrevious() {
      console.log("Inside handlePaginationPrevious");
      this.setState({
          flagPagination: "previous",
      }, this.fetchData("previous")); 
      this.state.flagPagination = "previous";
    }


    fetchData(arg) {
      //Get book data 
      console.log("Made it inside fetchData: ", arg);
      console.log("flagPagination: ", this.state.flagPagination);
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      let printTypeQuery = '&printType=' + this.state.filterByPrintType;
      let bookTypeQuery = '&bookType=' + this.state.filterByBookType;                 
      let maxResultsQuery = '&maxResults=' + this.state.defaultCount;
      let searchQuery = '?q=' + encodeURI(this.state.searchTerm);
      let startIndexQuery = '&startIndex=' + this.state.startIndex;
      
      //Don't fetch anything if out of bounds
      //BUG: If no data found, we should still display previous data 
      //if (this.state.flagPagination && this.state.flagPagination !== "previous") {
      console.log("flagPagination: ", this.state.flagPagination);

      if (arg === "next") {
        startIndexQuery = '&startIndex=' + this.state.startIndex;
        if (!this.state.foundData && (this.state.startIndex + 10 !== 0)) {
          console.log("displayNext, displayPrevious: ", this.state.displayNext, this.state.displayPrevious);
          /*if (this.state.flagPagination !== "previous") {
            console.log("Fetch is out of bounds");
            return;
          }*/
        } 
      } else if (arg === "previous") {
        console.log("flagPagination is set to previous");
        let valStart = this.state.startIndex;
        let valEnd = this.state.endIndex;
        let valDefault = this.state.defaultCount;
        startIndexQuery = '&startIndex=' + (valStart- (valDefault * 2));
      } else {
        startIndexQuery = '&startIndex=' + this.state.startIndex;
      }

      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + bookTypeQuery + startIndexQuery + maxResultsQuery + apiKey;
      console.log("filterByBookType: ", this.state.filterByBookType);
      console.log("filterByPrintType: ", this.state.filterByPrintType);
      console.log("url: " + url);
      console.log("flagFilter: ", this.state.flagFilter);

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
            console.log("Inside fetch data")
            if (this.state.books && this.state.books.length) {
              if (this.state.books.length < this.state.defaultCount ) {
                console.log("Setting foundData to false");
                this.setState({
                  books: [],
                  displayNext: false,
                  displayPrevious: true,
                  foundData: false
                });
              } else {
                console.log("Setting foundData to true");
                this.setState({
                  foundData: true,
                  startIndex: (this.state.flagPagination === "previous") ? this.state.startIndex - (this.state.defaultCount): this.state.startIndex,
                  endIndex: (this.state.flagPagination === "previous") ? this.state.endIndex - (this.state.defaultCount): this.state.endIndex,
                }); 
              }
            } 

            console.log("flagPagination: ", this.state.flagPagination);
            console.log("flagFilter: ", this.state.flagFilter);
            console.log("foundData: ", this.state.foundData);

            //Option #1: User selected Next 
            if (this.state.flagPagination === "next") {
              console.log("Made it inside Option #1 (next):", this.state.flagPagination);
              //Option #1a: Positive case
                if (this.state.foundData) {
                //This is the positive case: haven't yet reached the upper boundary
                console.log("Reached positive case under Option #1");

                //If filtering not selected, then counts change
                if (this.state.flagFilter === false) {
                  console.log("Made it inside flagFilter false");
                  this.setState({
                    books: data.items,
                    //startIndex: (data.items.length && data.items.length < this.state.defaultCount) ? this.state.startIndex + this.state.defaultCount: this.state.startIndex + this.state.defaultCount, 
                    //endIndex: (data.items.length && data.items.length < this.state.defaultCount) ? this.state.endIndex + this.state.defaultCount: this.state.endIndex + this.state.defaultCount,
                    startIndex: (!data.items.length) ? this.state.startIndex: this.state.startIndex + this.state.defaultCount, 
                    endIndex: (!data.items.length) ? this.state.endIndex: this.state.endIndex + this.state.defaultCount,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                } else {
                  console.log("Made it inside flagFilter true");
                  console.log("filterByBookType: ", this.state.filterByBookType);
                  console.log("filterByPrintType: ", this.state.filterByPrintType);
                  this.setState({
                    books: data.items,
                    endIndex: this.state.endIndex,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                }

                //Don't incr startIndex until we're past the first page
                /*if (this.state.endIndex === this.state.defaultCount) {
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
                }*/

                if ((this.state.endIndex - this.state.defaultCount === this.state.defaultCount) && !this.state.flagFilter) {
                  console.log("endIndex is equal to defaultCount, so we can incr startIndex: ", this.state.endIndex);
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
                console.log("Reached negative case under Option #1 (reached upper boundary)");
                let numItems = this.state.books.length;
                console.log("numItems: ", numItems);
                this.setState({
                  books: data.items,
                  //displayNext: false,
                  displayPrevious: true,
                  displayNext: (numItems < this.state.defaultCount) ? false: true,
                  //displayPrevious: (data.items.length < this.state.defaultCount) ? true: false,
                  //displayPrevious: (data.items.length === undefined) ? true: true,
                  //startIndex: (!data.items.length) ? this.state.startIndex: this.state.startIndex + this.state.defaultCount, 
                  //endIndex: (!data.items.length) ? this.state.endIndex: this.state.endIndex + this.state.defaultCount,
                  err: null
                });
              }

            //Option 2: User selected Previous
            } else if (this.state.flagPagination === "previous") {
              console.log("Made it inside Option #2 (previous)");
              //Option #2a: This is the positive case: haven't yet reached the lower boundary
              //console.log("startIndex & endIndex", this.state.startIndex, this.state.endIndex);
              //if ((this.state.startIndex - this.state.defaultCount) > 0) {
              if ((this.state.startIndex - this.state.defaultCount) > 0) {
                //If filtering is not selected
                console.log("startIndex is greater than 0: ", (this.state.startIndex - this.state.defaultCount));
                if (this.state.flagFilter === false) {
                  console.log("Reached positive case under Option #2 (filter false)");
                  this.setState({
                    books: data.items,
                    startIndex: (this.state.startIndex <= 0) ? 0: this.state.startIndex, 
                    endIndex: (this.state.startIndex <= 0) ? this.state.defaultCount: this.state.endIndex,
                    displayPrevious: true,
                    displayNext: true,
                    err: null
                  });
                } else {
                  console.log("Reached positive case under Option #2 (filter true)");
                  this.setState({
                    books: data.items,
                    displayPrevious: (data.items.length < this.state.defaultCount) ? false: true,
                    displayNext: (data.items.length < this.state.defaultCount) ? false: true,
                    err: null
                  });
                }
              //Option #2b: This is the negative case: we reached the lower boundary
              } else {
                console.log("Reached negative case under Option #2 (lower boundary reached)");
                this.setState({
                  books: data.items,
                  displayPrevious: false,
                  displayNext: (data.items.length < this.state.defaultCount) ? false: true,
                  err: null
                });
              }
            //Option #3: This is what is set after the Search button is first selected (initial state)
            } else {
              console.log("Made it inside Option #3 (first page by default)");
              console.log("Number items: ", data.items.length);
              this.setState({
                books: data.items,
                startIndex: (data.items.length < this.state.defaultCount) ? this.state.startIndex: this.state.startIndex  + this.state.defaultCount,
                endIndex: (data.items.length < this.state.defaultCount) ? this.state.endIndex: this.state.endIndex  + this.state.defaultCount + this.state.defaultCount,
                displayPrevious: false,
                displayNext: (data.items.length < this.state.defaultCount) ? false: true,
                foundData: true,
                err: null
              });
            }

            console.log("startIndex & endIndex: ", this.state.startIndex, this.state.endIndex);
            console.log("Current startIndex & endIndex: ", this.state.startIndex - this.state.defaultCount, this.state.endIndex - this.state.defaultCount);
            //console.log("Number items displayed & totalItems: ", data.items.length, data.totalItems);

            //if (data.items.length < this.state.defaultCount) {

            //}

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