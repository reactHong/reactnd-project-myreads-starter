import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onMoveTo: PropTypes.func.isRequired,
  }
  
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          {this.props.isLoading ? 
            (<div>
              <Loader 
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={0}
              />
             </div>) : 
            (<ol className="books-grid">
              {this.props.books.map((book, index) => (
                <Book 
                  key={index} 
                  book={book} 
                  onMoveTo={this.props.onMoveTo}
                />
              ))}
            </ol>)}
        </div>
      </div>
    );
  }
}

export default BookShelf;
