import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfSelector extends Component {
  static propTypes = {
    bookid: PropTypes.string.isRequired, 
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onFindShelf: PropTypes.func,
  }

  constructor(props) {
    super(props);
    // console.log("[BookShelfSelector.constructor] this.props.shelf:", this.props.shelf, this.props.bookid);
    
    this.state = { shelf: this.props.shelf };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("[BookShelfSelector.getDerivedStateFromProps] nextProps.shelf", nextProps.shelf, nextProps.bookid);

    let shelf = nextProps.shelf;
    if (nextProps.onFindShelf && shelf === "none") {
      shelf = nextProps.onFindShelf(nextProps.bookid);
    }
    return {
      shelf: shelf,
    };
  }

  render() {
    // console.log("[BookShelfSelector.render] this.state.shelf:", this.state.shelf, this.props.bookid);
    return(
      <select value={this.state.shelf} onChange={this.props.onChangeShelf}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default BookShelfSelector;
