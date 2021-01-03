import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Util from '../util/Util';

const TEST_DEBOUNCE = true;
const TEST_THROTTLE = false;

let debounceSearching;
let throttleSearching;

class SearchBar extends Component {
  
  static propTypes = {
    onChangeKeyword: PropTypes.func.isRequired,
  }

  state = {
    value: "",
  }

  componentDidMount() {
    debounceSearching = Util.debounce((keyword) => {
      this.props.onChangeKeyword(keyword);
    }, 500);

    throttleSearching = Util.throttle((keyword) => {
      this.props.onChangeKeyword(keyword);
    }, 1000);
  }

  componentWillUnmount() {
    debounceSearching = null;
    throttleSearching = null;
  }

  handleChange = (e) => {
    const keyword = e.target.value;
    this.setState({ value: keyword });

    if (TEST_THROTTLE) {
      throttleSearching(keyword);
      return;
    }
    debounceSearching(keyword).then(result => {
      if (TEST_DEBOUNCE) {
        (result) ? 
          console.log("[debounceSearching] The function is invoked! - keyword:", keyword) :
          console.log("[debounceSearching] The function is ignored! - keyword:", keyword);
      } 
    });
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
