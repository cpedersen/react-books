import React, { Component } from 'react';
import './booksearchApp.css';
import SearchBooks from './searchBooks.js';
//import DisplayBooklist from './displayBooklist.js';
import Heading from './heading.js';
import DisplayBooklist from './displayBooklist';
//import FilterBy from './filterBy.js';
//import { findAllByTestId } from '@testing-library/dom';

class BooksearchApp extends Component {

    //Key:
    //$2a$10$n9ZRGiTTSxqXaBQyNLgRvuBb3.oaj0hjjYHtt.CpdVxLzPB6bY1d6
    //https://www.googleapis.com/books/v1/volumes?q=search+terms
    
    //PrintType:
    //all, books, magazines
    //GET https://www.googleapis.com/books/v1/volumes?q=time&printType=magazines&key=yourAPIKey

    //BookType:
    //partial, full, free-ebooks, paid-ebooks, ebooks
    //GET https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey


    constructor(props) {
        super(props);
        this.state = {
          books: [],
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

    /*handleSubmit(event) {
        this.setState({value: event.target.value});
    }*/

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
    }

    handleFilterByBookTypeChange(event) {
      console.log("handleFilterByBookTypeChange event value: ", event.target.value);
      this.setState({filterByBookType: event.target.value});
    }

    /*handleFilterSubmit(event) {
      this.fetchData();
    }*/



    componentDidMount() {
    }

    /*componentDidUpdate() {
      console.log("********************** Made it inside componentDidUpdate **********")
      console.log("searchTerm: ", this.state.searchTerm)
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

      fetch(url, options)
          .then(response => {
            console.log('About to check for errors');
            if(!response.ok) {
              console.log('Got a GET error :-( ');
              throw new Error('Could not do a GET'); 
            }
            console.log('Successfully did a GET!');
            return response; 
          })
          .then(response => response.json())
          .then(data => {
            console.log("data:")
            console.log(data);
            this.setState({
                books: data,
                err: null
            });
          })
          .catch(err => {
            console.log('Error: ', err.message);
            this.setState({
              error: err.message,
              searchTerm: '',
              books: []
          });
        }); 
        console.log("print out contents of books:")
        console.log(this.state.books)
        return this.state.books;
    }*/

    fetchData() {
      console.log("searchTerm: ", this.state.searchTerm)
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
    
    render() {
        console.log("Inside BooksearchApp!")
        console.log("searchTerm: ", this.state.searchTerm)
        console.log("books: ", this.state.books)
        return (
            <div className="BooksearchApp">
                I'm BooksearchApp!
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
                  />
            </div>
        );
    }
}

export default BooksearchApp;


//handleFilterSubmit={this.handleFilterSubmit}