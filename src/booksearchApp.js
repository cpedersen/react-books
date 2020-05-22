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
          displayPrevious: false,
          flagFilter: false,
          flag: "next"
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
      //YOUAREHERE
      //this.fetchData("next");
      this.fetchData(this.state.flag)
      this.setState({
          flag: "next"
      });
      console.log("handleSearchtermSubmit flag: ", this.state.flag);
    }

    handleFilterByPrintTypeChange(event) {
      console.log("handleFilterByPrintTypeChange event value: ", event.target.value);
      this.setState({
          filterByPrintType: event.target.value,
          flagFilter: true
      });
      console.log("Within handleFilterByPrintTypeChange: ", this.state.filterByPrintType);
      console.log("Within flagFilter: ", this.state.flagFilter);

      //YOUAREHERE
      this.state.filterByPrintType = event.target.value;
      this.state.flagFilter = true;
      console.log("Within handleFilterByPrintTypeChange: ", this.state.filterByPrintType);
      console.log("Within flagFilter: ", this.state.flagFilter);

      /*if (event.target.value === "") {
      } else {
        this.setState({
          filterByPrintType: event.target.value
        });
      }*/
      this.fetchData();
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      this.setState({
        filterByBookType: event.target.value,
        flagFilter: true
      });
      console.log("Within handleFilterByBookTypeChange: ", this.state.filterByBookType);
      console.log("Within flagFilter: ", this.state.flagFilter);

      //YOUAREHERE
      this.state.filterByBookType = event.target.value;
      this.state.flagFilter = true;
      console.log("Within handleFilterByBookTypeChange: ", this.state.filterByBookType);
      console.log("Within flagFilter: ", this.state.flagFilter);

      this.fetchData();
    }

    handlePaginationNext() {
      this.setState({
          flag: "next"
      });
      this.state.flag = "next";
      console.log("handlePaginationNext flag: ", this.state.flag);
      this.fetchData(this.state.flag);
    }

    handlePaginationPrevious() {
      this.setState({
          flag: "previous"
      });
      this.state.flag = "previous";
      console.log("handlePaginationPrevious flag: ", this.state.flag);
      this.fetchData(this.state.flag);
    }

    fetchData(flag) {
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const startIndexQuery = '&startIndex=' + this.state.startIndex;
      const maxResultsQuery = '&maxResults=' + this.state.defaultCount;
      const searchQuery = '?q=' + this.state.searchTerm;
      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + bookTypeQuery + startIndexQuery + maxResultsQuery + apiKey;
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
      console.log("bookType: ", this.state.filterByBookType);
      console.log("printType: ", this.state.filterByPrintType);
      console.log("flag: ", flag);
      console.log("url: " + url)

      //Don't fetch anything if out of bounds
      if (((this.state.startIndex + 10) > this.state.totalCount) && (this.state.startIndex !== 0)) {
        return;
      } 

      //Fetch #1: Get totalCount to start
      fetch(url)
          .then(response => {
            if(!response.ok) {
              console.log('Got a GET error :-( ');
              throw new Error('Could not do a GET of totalItems'); 
            }
            console.log('Successfully did a GET of totalItems!');
            return response.json(); 
          })
          .then(data => {
            console.log("totalItems data:")
            console.log(data);
            this.setState({
                totalCount: data.totalItems,
                err: null
            });
            console.log("fetchData #1 totalCount: ", this.state.totalCount);
          })
          .catch(err => {
            console.log('totalItems Error: ', err.message);
            this.setState({
              error: err.message
            });
          });
          
      //Fetch #2: Get the rest of the data using totalCount if/then
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

            if (!data.hasOwnProperty('items')) {
              console.log("**** ITEM NOT AVAILABLE ****");
              return this.setState({
                books: [],
                displayNext: false,
                displayPrevious: true,
                startIndex: this.state.startIndex - this.state.defaultCount,
                endIndex: this.state.endIndex - this.state.defaultCount
              });
            } 

            //Option #1: Next 
            if (this.state.flag === "next") {
              console.log("Made it inside Option #1 (next)");
              //Option #1a: Positive case
              if ((this.state.startIndex + this.state.defaultCount) < this.state.totalCount) {
                //This is the positive case: haven't yet reached the upper boundary
                console.log("Reached positive case under Option #1");
                console.log("flagFilter: ", this.state.flagFilter);

                //If filtering not selected, then counts change
                if (this.state.flagFilter === false) {
                  console.log("Made it inside flagFilter false");

                  

                  this.setState({
                    books: data.items,
                    endIndex: this.state.endIndex + this.state.defaultCount,
                    totalCount: data.totalItems,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                } else {
                  console.log("Made it inside flagFilter true");
                  this.setState({
                    books: data.items,
                    endIndex: this.state.endIndex,
                    totalCount: data.totalItems,
                    displayNext: true,
                    displayPrevious: true,
                    err: null
                  });
                }

                //Don't want to incr startIndex until we're past the first page
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
                  totalCount: data.totalItems,
                  displayNext: false,
                  displayPrevious: true,
                  err: null
                });
              }

            //Option 2: Previous
            } else if (this.state.flag === "previous") {
              console.log("Made it inside Option #2 (previous)");
              //Option #2a: This is the positive case: haven't yet reached the lower boundary
              if ((this.state.startIndex - this.state.defaultCount) > 0) {
                console.log("Reached positive case under Option #2");
                //If filtering is selected, then counts should not change
                if (this.state.flagFilter === false) {
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
                  this.setState({
                    books: data.items,
                    startIndex: this.state.startIndex,
                    endIndex: this.state.endIndex,
                    totalCount: data.totalItems,
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
                  startIndex: this.state.startIndex,
                  endIndex: this.state.endIndex,
                  totalCount: data.totalItems,
                  displayPrevious: false,
                  displayNext: true,
                  err: null
                });
              }
            //Option #3: This is what is set after the Search button is selected (initial state)
            } else {
              console.log("Made it inside Option #3 (first page)");
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
            //console.log("fetchData #2 defaultCount: ", this.state.defaultCount);
            //console.log("fetchData #2 startIndex: ", this.state.startIndex);
            //console.log("fetchData #2 endIndex: ", this.state.endIndex);
            //console.log("fetchData #2 totalCount: ", this.state.totalCount);
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