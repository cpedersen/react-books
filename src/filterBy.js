import React, { Component } from 'react';
import './filterBy.css';

class FilterBy extends Component {
    render() {
        return (
            <div className="FilterBy">
                <label htmlFor="PrintType">Print Type:
                    <select 
                        onChange={(event) => 
                            this.props.handleFilterByPrintTypeChange(event)
                        }
                        value={this.props.filterByPrintType} > 
                        <option defaultValue="all">All</option>
                        <option value="books">Books</option>
                        <option value="magazines">Magazines</option>
                    </select>
                </label>

                <label htmlFor="BookType">Book Type:
                    <select 
                        onChange={(event) => 
                            this.props.handleFilterByBookTypeChange(event)
                        }
                        value={this.props.filterByBookType} >
                        <option defaultValue="noFilter">No Filter</option>
                        <option value="partial">Partial</option>
                        <option value="full">Full</option>
                        <option value="free-ebooks">Free Ebooks</option>
                        <option value="paid-ebooks">Paid Ebooks</option>
                        <option value="ebooks">Ebooks</option>
                    </select> 
                </label>
                
            </div>
        );
    }
}

export default FilterBy;