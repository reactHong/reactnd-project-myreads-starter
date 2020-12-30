import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveTo: PropTypes.func.isRequired,
  }
  
  handleChange = (e) => {
    console.log("[Book.handleChange]");
    console.log(e.target.value);
    
    const book = this.props.book;
    const fromShelf = book.shelf;
    const toShelf = e.target.value;
    this.props.onMoveTo(book.id, fromShelf, toShelf);
  }

  render() {
    const book = this.props.book;
    const title = book.title;
    const authors = book.authors ? book.authors.join(", ") : "No Author";
    const bookshelf = book.shelf ? book.shelf : "none";
    let imageURL = "";
    if (book.imageLinks) {
      imageURL = book.imageLinks.thumbnail ? 
                        `url(${book.imageLinks.thumbnail})` :
                        book.imageLinks.smallThumbnail ? 
                          `url(${book.imageLinks.smallThumbnail})` : "";
    }

    // console.log(book);
    // console.log(book.title, book.authors);
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL }}></div>
            <div className="book-shelf-changer">
              <select value={bookshelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
