import React, { Component } from 'react';
import './booksearchApp.css';
import SearchBooks from './searchBooks.js';
//import DisplayBooklist from './displayBooklist.js';
import Heading from './heading.js';
import DisplayBooklist from './displayBooklist';
//import FilterBy from './filterBy.js';
//import { findAllByTestId } from '@testing-library/dom';

class BooksearchApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          books: [],
          filteredBooks: [],
          searchTerm: '',
          filterByPrintType: 'all',
          filterByBookType: 'partial',
          err: null
        };
        this.handleSearchtermSubmit = this.handleSearchtermSubmit.bind(this);
        this.handleSearchtermChange = this.handleSearchtermChange.bind(this);
        this.handleFilterByPrintTypeChange = this.handleFilterByPrintTypeChange.bind(this);
        this.handleFilterByBookTypeChange = this.handleFilterByBookTypeChange.bind(this);
      }

    handleSearchtermChange(event) {
      console.log("handleSearchtermChange event value: ", event.target.value);
      this.setState({searchTerm: event.target.value});
    }

    handleSearchtermSubmit() {
      //alert('A search term was submitted: ' + this.state.searchTerm);
      this.fetchData();
      //event.preventDefault();
    }

    handleFilterByPrintTypeChange(event) {
      console.log("handleFilterByPrintTypeChange event value: ", event.target.value);
      this.setState({filterByPrintType: event.target.value});
      //this.updateData();
      this.fetchData();
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      this.setState({filterByBookType: event.target.value});
      //this.updateData();
      this.fetchData();
    }

    fetchData() {
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const searchQuery = '?q=' + this.state.searchTerm;
      const url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + bookTypeQuery + apiKey;
      const options = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json" 
            }
      };
      console.log("url: " + url)
      console.log("printTypeQuery: " + printTypeQuery)
      console.log("bookTypeQuery: " + bookTypeQuery)

      fetch(url)
          .then(response => {
            console.log('About to check for errors');
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
    
    updateData() {
      const apiKey = '&key=AIzaSyBks18TNVfYhV7HAV5HosyBYgGI3e1nV4Q';
      const path = '/books/v1/volumes';
      const printTypeQuery = '&printType=' + this.state.filterByPrintType;
      const bookTypeQuery = '&bookType=' + this.state.filterByBookType; 
      const searchQuery = '?q=' + this.state.searchTerm;
      const url ='https://www.googleapis.com' + path + searchQuery + printTypeQuery + bookTypeQuery + apiKey;
      const options = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json" 
            }
      };
      console.log("url: " + url)
      console.log("printTypeQuery: " + printTypeQuery)
      console.log("bookTypeQuery: " + bookTypeQuery)

      fetch(url)
          .then(response => {
            console.log('About to check for errors');
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
                filteredBooks: data.items,
                err: null
            });
          })
          .catch(err => {
            console.log('Error: ', err.message);
            this.setState({
              error: err.message,
              filteredBooks: []
          });
        });
    }
    
    render() {
        console.log("Inside BooksearchApp!")
        console.log("searchTerm: ", this.state.searchTerm)
        console.log("books: ", this.state.books)
        console.log("filtered books: ", this.state.filteredBooks)
        console.log("filterByPrintType: ", this.state.filterByPrintType)
        console.log("filterByBookType: ", this.state.filterByBookType)
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
                  />
            </div>
        );
    }
}

export default BooksearchApp;


//handleFilterSubmit={this.handleFilterSubmit}