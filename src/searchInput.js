import React, { Component } from 'react';
import './searchInput.css';
import FilterBy from './filterBy.js';

class SearchInput extends Component {

    /*constructor(props) {
        super(props);
        //this.state = {searchTerm: ''};
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }*/
    

    /*handleChange(event) {
        console.log(event.target.value);
        this.setState({searchTerm: event.target.value});
    }


    handleSubmit(event) {
        alert('A search term was submitted: ' + this.state.searchTerm);
        event.preventDefault();
    }*/


    render() {
        console.log("Inside SearchInput!: ", this.props)
        /*const data = this
            .props
            .data
            .map((item, i) => <DisplayBooklist { ...item } key={i}/>);*/
            
        return (
            /*<div className="SearchInput">
                <label htmlFor="title">Search:</label>
                <input 
                    id="search" 
                    type="text" 
                    name="search" 
                    placeholder="Search"
                />
                <button type="submit" > Search</button>
            </div>*/
            <div className="SearchInput" > 
                <label>
                    Search: 
                    <input 
                        type="text" 
                        value={this.props.searchTerm} 
                        onChange={(event) => this.props.handleSearchtermChange(event)}/>
                </label>
                <button onClick={this.props.handleSearchtermSubmit}>Search</button>

                <FilterBy
                    books={this.props.books}
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


/*SearchInput.defaultProps = {
    searchTerm: []
}*/

export default SearchInput;


//<textarea name="description" id="description" placeholder="description"/>
//<input type="text" value={this.state.data} onChange={this.handleChange} />


/*<FilterBy
filterByBookType={this.props.filterByBookType}
filterByPrintType={this.props.filterByPrintType}
handleFilterByPrintTypeChange ={this.props.handleFilterByPrintTypeChange}
handleFilterByBookTypeChange={this.props.handleFilterByBookTypeChange}
handleFilterSubmit={this.props.handleFilterSubmit}
/>*/