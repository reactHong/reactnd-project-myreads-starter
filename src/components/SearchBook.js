import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import Book from './Book';

class SearchBooks extends Component {
  
  static propTypes = {
    onMoveTo: PropTypes.func.isRequired,
    onFindShelf: PropTypes.func.isRequired,
  }

  state = {
    searchedBooks: []
  }

  onChangeKeyword = (keyword) => {
    if (keyword) {
      BooksAPI.search(keyword)
        .then(books => {
          console.log("[BooksAPI.search] completed!");
          // console.log(books);
          (books.error) ? 
            this.setState({ searchedBooks: [] }) :
            this.setState({ searchedBooks: books });
        });
    } else {
      this.setState({ searchedBooks: [] });
    }
  }

  render() {
    console.log("[SearchBook.render]", this.state.searchedBooks);
    return(
      <div className="search-books">
        <SearchBar onChangeKeyword={this.onChangeKeyword}/>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks && 
             this.state.searchedBooks.map((book, index) => (
              <Book 
                key={index} 
                book={book} 
                onMoveTo={this.props.onMoveTo}
                onFindShelf={this.props.onFindShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
