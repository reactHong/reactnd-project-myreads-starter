import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function BookShelf(props) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        {props.isLoading ? 
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
            {props.books.map((book, index) => (
              <Book 
                key={index} 
                book={book} 
                onMoveTo={props.onMoveTo}
              />
            ))}
          </ol>)}
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onMoveTo: PropTypes.func.isRequired,
}

export default BookShelf;
