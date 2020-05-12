import React, { Component } from 'react';
import './filterBy.css';
//import SearchInput from './searchInput.js';
//import FilterByBookType from './filterByBookType.js';
//import FilterByPrintType from './filterByPrintType.js';

class FilterBy extends Component {
    render() {
        console.log("Inside FilterBy!: ", this.props)
        return (
            <div className="FilterBy">
                <label htmlFor="PrintType">Print Type:
                    <select 
                        onChange={(event) => 
                            this.props.handleFilterByPrintTypeChange(event)
                        }
                        /*onChange={(event) => 
                            this.props.handleSearchtermSubmit(event)
                        }*/
  
                        value={this.props.filterByPrintType} > 
                        <option defaultValue="all">all</option>
                        <option value="books">books</option>
                        <option value="magazines">magazines</option>
                    </select>
                </label>

                <label htmlFor="BookType">Book Type:
                    <select 
                        onChange={(event) => 
                            this.props.handleFilterByBookTypeChange(event)
                        }
                        /*onChange={(event) => 
                            this.props.handleSearchtermSubmit(event)
                        }*/
  
                        value={this.props.filterByBookType} >
                        <option defaultValue="partial">partial</option>
                        <option value="full">full</option>
                        <option value="free-ebooks">free ebooks</option>
                        <option value="paid-ebooks">paid ebooks</option>
                        <option value="ebooks">ebooks</option>
                    </select> 
                </label>
                
            </div>
        );
    }
}

export default FilterBy;



//<input type="submit" value="Submit"/>
/*<button type="submit" > Search</button>*/
//onChange={(event) => this.props.handleFilterByPrintTypeChange(event)}
//onChange={(event) => this.props.handleFilterByBookTypeChange(event)}
//onChange={this.props.handleSearchtermChange}
//onChange={this.props.handleFilterByPrintTypeChange}
//onChange={(event) => this.props.handleSearchtermChange(event)}
//<input type="submit" value="Submit"/>
