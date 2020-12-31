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
    isSelectedFromSearch: false,
    isLoading: true,
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        console.log("[BooksApp.getAll] completed!");
        //console.log(books);
        this.setState({
          currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
          wantToRead: books.filter(book => book.shelf === "wantToRead"),
          read: books.filter(book => book.shelf === "read"),
          isLoading: false,
        });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.shouldComponentUpdate] selectedFromSearch:", nextState.isSelectedFromSearch);
    if (nextState.isSelectedFromSearch) {
      console.log("[App.shouldComponentUpdate] No rendering!!");
      return false;
    }
    return true;
  }

  //TODO: Move To Util codes
  isSameArray = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    for (let i=0, len=array1.length; i<len; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }

  moveTo = (book, fromShelf, toShelf) => {
    const bookid = book.id;
    console.log(bookid, fromShelf, toShelf);

    if (fromShelf !== toShelf) {
      let isSelectedFromSearch = false;
      
      //NOTE: Searched books doesn't have the key of object, "shelf"
      if (!book.shelf) {
        isSelectedFromSearch = true;
      }
      book.shelf = toShelf;

      this.setState((prevState) => {
        const result = {};
        if (fromShelf && fromShelf !== "none") {
          const fromBooks = prevState[fromShelf].filter(book => book.id !== bookid);
          result[fromShelf] = fromBooks;
        }
        if (toShelf !== "none") {
          const toBooks = prevState[toShelf].concat(book);
          result[toShelf] = toBooks;
        }
        result.isSelectedFromSearch = isSelectedFromSearch;
        return result;
      }, () => {
        BooksAPI.update(book, toShelf)
        .then(result => {
          console.log("update");
          console.log(result);
          
          //TODO: Check if client and server are synchronized. If they are not same, rollback?
          const currentlyReadingIds = this.state.currentlyReading.map(book => book.id);
          const wantoReadIds = this.state.wantToRead.map(book => book.id);
          const readIds = this.state.read.map(book => book.id);
          // currentlyReadingIds[0] = "1111";
          const debugObject = {
            currentlyReading: currentlyReadingIds,
            read: readIds,
            wantoRead: wantoReadIds,
          };
          console.log(debugObject);

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

  findShelf = (bookid) => {
    const books = [...this.state.currentlyReading, 
                   ...this.state.wantToRead, 
                   ...this.state.read];
    const found = books.find(book => book.id === bookid);
    if (found) {
      return found.shelf;
    }
    return "none";
  }

  render() {
    console.log("[App.render] isSelectedFromSearch", this.state.isSelectedFromSearch);
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks 
              onMoveTo={this.moveTo}
              onFindShelf={this.findShelf}
            />)}
          />
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf 
                    title="Currently Reading" 
                    books={this.state.currentlyReading}
                    isLoading={this.state.isLoading}
                    onMoveTo={this.moveTo} />
                  <BookShelf 
                    title="Want to Read" 
                    books={this.state.wantToRead} 
                    isLoading={this.state.isLoading}
                    onMoveTo={this.moveTo} />
                  <BookShelf 
                    title="Read" 
                    books={this.state.read} 
                    isLoading={this.state.isLoading}
                    onMoveTo={this.moveTo} />
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
