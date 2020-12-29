import React from 'react'
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf';
import './App.css'

class BooksApp extends React.Component {

  state = {
    curBooks: [],
    wantBooks: [],
    readBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        //console.log("[BooksApp.componentDidMount]");
        //console.log(books);
        this.setState({
          curBooks: books.filter(book => book.shelf === "currentlyReading"),
          wantBooks: books.filter(book => book.shelf === "wantToRead"),
          readBooks: books.filter(book => book.shelf === "read"),
        });
      });
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <div className="search-books">
              Search
            </div>
          )} />
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.state.curBooks} />
                  <BookShelf title="Want to Read" books={this.state.wantBooks} />
                  <BookShelf title="Read" books={this.state.readBooks} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
                {/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
