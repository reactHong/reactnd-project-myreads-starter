import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import Book from './Book';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class SearchBooks extends Component {
  
  static propTypes = {
    onMoveTo: PropTypes.func.isRequired,
    onFindShelf: PropTypes.func.isRequired,
  }

  state = {
    searchedBooks: [],
    isLoading: false,
  }

  onChangeKeyword = (keyword) => {
    if (keyword) {
      this.setState({ isLoading: true });
      BooksAPI.search(keyword)
        .then(books => {
          console.log("[BooksAPI.search] completed!");
          // console.log(books);
          (books.error) ? 
            this.setState({ 
              searchedBooks: [],
              isLoading: false,
            }) :
            this.setState({ 
              searchedBooks: books,
              isLoading: false,
            });
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
          {this.state.isLoading ? 
            (<div className="search-books-loading">
              <Loader 
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={0}
              />
             </div>) :
            (<ol className="books-grid">
              {this.state.searchedBooks && 
              this.state.searchedBooks.map((book, index) => (
                <Book 
                  key={index} 
                  book={book} 
                  onMoveTo={this.props.onMoveTo}
                  onFindShelf={this.props.onFindShelf}
                />
              ))}
            </ol>)
          }
        </div>
      </div>
    );
  }
}

export default SearchBooks;
