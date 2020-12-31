import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  
  static propTypes = {
    onChangeKeyword: PropTypes.func.isRequired,
  }

  state = {
    value: "",
  }

  handleChange = (e) => {
    const keyword = e.target.value;
    if (keyword) {
      this.props.onChangeKeyword(keyword);
    }
    this.setState({ value: keyword });
  }

  render() {
    return(
      <div className="search-books-bar">
        <Link to="/"><button className="close-search">Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default SearchBar;
