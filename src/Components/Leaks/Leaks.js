import React, { Component } from 'react';
import Leak from './Leak';
import { Link } from 'react-router-dom';
import axios from 'axios';
import search from '../../images/039-search-2.svg';

export default class Leaks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaks: [],
      docs: [],
      userInput: ''
    };
  }

  componentDidMount() {
    axios.get('/api/leaks').then(resp => {
      this.setState({
        leaks: resp.data
      });
    });

    axios.get('/api/docs').then(resp => {
      this.setState({
        docs: resp.data
      });
    });
  }

  handleInput(val) {
    this.setState({
      userInput: val
    });
  }

  render() {
    let mappedLeaks = this.state.leaks.map((leak, i) => {
      return (
        <Link to={`/leaks/${leak.leak_id}`} key={i}>
          <Leak leak={leak} doc={this.state.docs} />
        </Link>
      );
    });

    return (
      <div className="container">
        <div className="page-welcome leak-welcome">
          {' '}
          <span className="page-number">02</span> Leaks
        </div>

        <div className="leak-search">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Keywords"
            onChange={e => this.handleInput(e.target.value)}
          />
          <img width="23px" className="search-icon" src={search} alt="search" />
        </div>
        <h4 className="text-left my-4 featured">Featured</h4>

        <div className="leak-container">
          <div className="leaks">{mappedLeaks}</div>
        </div>
      </div>
    );
  }
}
