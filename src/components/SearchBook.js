import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  
  static propTypes = {
    onMoveTo: PropTypes.func.isRequired,
  }

  state = {
    value: "",
    searchedBooks: [],
  }

  handleChange = (e) => {
    const keyword = e.target.value;
    if (keyword) {
      BooksAPI.search(keyword)
        .then(books => {
          //console.log("BooksAPI.search");
          console.log(books);
          this.setState({ searchedBooks: books });
        });
    }
    this.setState({ value: keyword });
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book, index) => (
              <Book key={index} book={book} onMoveTo={this.props.onMoveTo}></Book>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
