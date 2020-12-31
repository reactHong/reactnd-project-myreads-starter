import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onMoveTo: PropTypes.func.isRequired,
  }
  
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => (
              <Book 
                key={index} 
                book={book} 
                onMoveTo={this.props.onMoveTo}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
