import React from 'react';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './components/SearchBook';
import BookShelf from './components/BookShelf';
import './App.css';

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        //console.log("[BooksApp.componentDidMount]");
        //console.log(books);
        this.setState({
          currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
          wantToRead: books.filter(book => book.shelf === "wantToRead"),
          read: books.filter(book => book.shelf === "read"),
        });
      });
  }

  //TODO: Move To Util codes
  isSameArray = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    for (let i=0, len=array1.length; i<len; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }

  moveTo = (bookid, fromShelf, toShelf) => {
    console.log(bookid, fromShelf, toShelf);

    if (fromShelf !== toShelf) {
      const books = this.state[fromShelf].filter(book => book.id === bookid);
      if (books.length !== 1) {
        //TODO: Error handling
        alert("[App.moveTo] Error: Books data is not normal!! - Duplicated books exist");
        return;
      }
      
      const targetBook = books[0];
      targetBook.shelf = toShelf;
      this.setState((prevState) => {
        const fromBooks = prevState[fromShelf].filter(book => book.id !== bookid);
        const toBooks = prevState[toShelf].concat(targetBook);
        const result = {};
        result[fromShelf] = fromBooks;
        result[toShelf] = toBooks;
        return result;
      }, () => {
        BooksAPI.update(targetBook, toShelf)
        .then(result => {
          console.log("update");
          console.log(result);
          
          //TODO: Check if client and server are synchronized. If they are not same, rollback?
          const currentlyReadingIds = this.state.currentlyReading.map(book => book.id);
          const wantoReadIds = this.state.wantToRead.map(book => book.id);
          const readIds = this.state.read.map(book => book.id);
          // currentlyReadingIds[0] = "1111";
          console.log(currentlyReadingIds);
          console.log(wantoReadIds);
          console.log(readIds);

          if (!this.isSameArray(result.currentlyReading, currentlyReadingIds)
            || !this.isSameArray(result.wantToRead, wantoReadIds)
            || !this.isSameArray(result.read, readIds)) {
            alert("[App.moveTo] Error: Need to rollback!!");
            return;
          }
        });
      });
    }
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks onMoveTo={this.moveTo}/>
          )} />
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.state.currentlyReading} onMoveTo={this.moveTo} />
                  <BookShelf title="Want to Read" books={this.state.wantToRead} onMoveTo={this.moveTo} />
                  <BookShelf title="Read" books={this.state.read} onMoveTo={this.moveTo} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
