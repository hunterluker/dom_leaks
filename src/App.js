import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { updateUser } from './ducks/users';

// COMPONENTS
import Loader from './Components/Loader/Loader';
import Navbar from './Components/Navbar/Navbar';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({
          loading: true
        });
      }.bind(this),
      2000
    );

    axios.get('/api/user-data').then(resp => {
      this.props.updateUser(resp.data);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.loading === false ? (
            <Loader />
          ) : (
            <div>
              <Navbar nav={this.handleButtonClick} />
              {routes}
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(App);
