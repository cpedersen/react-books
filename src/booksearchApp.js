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
          itemCount: 0
        };
        this.handleSearchtermSubmit = this.handleSearchtermSubmit.bind(this);
        this.handleSearchtermChange = this.handleSearchtermChange.bind(this);
        this.handleFilterByPrintTypeChange = this.handleFilterByPrintTypeChange.bind(this);
        this.handleFilterByBookTypeChange = this.handleFilterByBookTypeChange.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
      }

    handleSearchtermChange(event) {
      //TODO - create variable previousSearchterm
      //Somewhere: Does current value in state = previousSearchterm?
      //    Reset startIndex to 0
      //    Reset itemCount to 0

      //TODO - activate/deactivate Next/Previous buttons when appropriate

      this.setState({searchTerm: event.target.value});
    }

    handleSearchtermSubmit() {
      this.fetchData();
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

    handlePagination() {
      //Adding pagination default of 10
      console.log("Hey, made it to handlePagination: ", this.state.startIndex); 
      this.handleSearchtermSubmit();
      //console.log("handlePagination startIndex: ", this.state.startIndex);
      this.setState({startIndex: (this.state.startIndex + 10)});
    }

    fetchData() {
      console.log("fetchData startIndex: ", this.state.startIndex);
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const startIndexQuery = '&startIndex=' + this.state.startIndex;
      const searchQuery = '?q=' + this.state.searchTerm;
      let url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + startIndexQuery + apiKey;
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

      fetch(url)
          .then(response => {
            if(!response.ok) {
              console.log('Got a GET error :-( ');
              throw new Error('Could not do a GET'); 
            }
            console.log('Successfully did a GET!');
            return response.json(); 
          })
          //.then(response => response.json())
          .then(data => {
            console.log("data:")
            console.log(data);
            this.setState({
                books: data.items,
                err: null
            });
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
      console.log("render startIndex: ", this.state.startIndex);
        return (
            <div className="BooksearchApp">
                <Heading/>
                <SearchBooks 
                    searchTerm={this.state.searchTerm}
                    books={this.state.books}
                    handleSearchtermChange ={this.handleSearchtermChange}
                    handleSearchtermSubmit={this.handleSearchtermSubmit}
                    filterByPrintType={this.state.filterByPrintType}
                    filterByBookType={this.state.filterByBookType}
                    handleFilterByPrintTypeChange ={this.handleFilterByPrintTypeChange}
                    handleFilterByBookTypeChange={this.handleFilterByBookTypeChange}
                    filteredBooks={this.state.books}
                    handlePagination={this.handlePagination}
                  />
            </div>
        );
    }
}

export default BooksearchApp;