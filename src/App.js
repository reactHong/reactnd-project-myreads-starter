import React from 'react'
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf';
import './App.css'

class BooksApp extends React.Component {
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
                  <BookShelf title="Currently Reading" />
                  <BookShelf title="Want to Read" />
                  <BookShelf title="Read" />
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
