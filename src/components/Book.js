import React, { Component } from 'react';

class Book extends Component {

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
    const imageURL = `url(${book.imageLinks.thumbnail})`;
    // console.log(book);

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default Book;
