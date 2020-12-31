import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfSelector from './BookShelfSelector';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveTo: PropTypes.func.isRequired,
    onFindShelf: PropTypes.func,
  }

  changeShelf = (e) => {
    console.log("[Book.changeShelf]");
    console.log(e.target.value);
    
    const copiedBook = JSON.parse(JSON.stringify(this.props.book));
    const fromShelf = copiedBook.shelf;
    const toShelf = e.target.value;
    this.props.onMoveTo(copiedBook, fromShelf, toShelf);
    this.setState({ bookshelf: toShelf });
  }

  render() {
    const book = this.props.book;
    const title = book.title;
    const authors = book.authors ? book.authors.join(", ") : "No Author";
    const shelf = book.shelf ? book.shelf : "none";
    let imageURL = "";
    if (book.imageLinks) {
      imageURL = book.imageLinks.thumbnail ? 
                        `url(${book.imageLinks.thumbnail})` :
                        book.imageLinks.smallThumbnail ? 
                          `url(${book.imageLinks.smallThumbnail})` : "";
    }

    console.log("\n[Book.render] id:", book.id, book.title);
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL }}></div>
            <div className="book-shelf-changer">
              <BookShelfSelector 
                bookid={book.id}
                shelf={shelf} 
                onChangeShelf={this.changeShelf} 
                onFindShelf={this.props.onFindShelf}/>
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
