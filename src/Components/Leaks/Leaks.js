import React, { Component } from 'react';
import Leak from './Leak';
import { Link } from 'react-router-dom';
import axios from 'axios';
import search from '../../images/039-search-2.svg';

export default class Leaks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaks: []
    };
  }

  componentDidMount() {
    axios.get('/api/leaks').then(resp => {
      this.setState({
        leaks: resp.data
      });
    });
  }

  render() {
    let mappedLeaks = this.state.leaks.map((leak, i) => {
      return (
        <Link to={`/leaks/${leak.leak_id}`} key={i}>
          <Leak leak={leak} />
        </Link>
      );
    });

    return (
      <div className="container">
        <div className="page-welcome">
          {' '}
          <span className="page-number">02</span> Leaks
        </div>

        <div className="leak-search">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Keywords"
          />
          <img width="23px" className="search-icon" src={search} alt="search" />
        </div>

        <div className="leak-container">
          <div className="leaks">{mappedLeaks}</div>
        </div>
      </div>
    );
  }
}
