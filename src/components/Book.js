import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveTo: PropTypes.func.isRequired,
    onFindShelf: PropTypes.func,
  }

  state = {
    shelf: "none"
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let shelf = nextProps.book.shelf;
    if (!shelf && nextProps.onFindShelf) {
      shelf = nextProps.onFindShelf(nextProps.book.id);
    }
    return {
      shelf: shelf,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.book.id === nextProps.book.id 
      && this.state.shelf === nextState.shelf) {
      return false;
    }
    return true;
  }

  changeShelf = (e) => {
    const copiedBook = JSON.parse(JSON.stringify(this.props.book));
    const fromShelf = this.state.shelf;
    const toShelf = e.target.value;

    this.props.onMoveTo(copiedBook, fromShelf, toShelf);
    this.setState({ shelf: toShelf });
  }

  render() {
    const book = this.props.book;
    const title = book.title;
    const authors = book.authors ? book.authors.join(", ") : "No Author";
    let imageURL = "";
    if (book.imageLinks) {
      imageURL = book.imageLinks.thumbnail ? 
                        `url(${book.imageLinks.thumbnail})` :
                        book.imageLinks.smallThumbnail ? 
                          `url(${book.imageLinks.smallThumbnail})` : "";
    }
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.changeShelf}>
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
