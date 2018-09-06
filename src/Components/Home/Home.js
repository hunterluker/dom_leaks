import React, { Component } from 'react';
import Particle from '../Particle/Particle';
import AnimatedTypingComponent from './TypeAnim';

class Home extends Component {
  login() {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
  }

  render() {
    return (
      <div>
        <div className="page-welcome">
          {' '}
          <span className="page-number">01</span> Welcome
        </div>

        <div className="container">
          <div className="secondary-title">
            <span>DOM LEAKS / E0CE08A681F / HACKER NEWS</span>
          </div>

          <h1 className="main-title">DOM LEAKS</h1>

          <div className="border-title" />

          <div className="text-white typing-animation">
            <AnimatedTypingComponent />
          </div>
        </div>
        <Particle />
        <footer>
          <a
            href="https://github.com/hunterluker"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-github-square" />
          </a>
          <a href="mailto:hunterluker33@gmail.com">
            <p className="text-white">hunterluker33@gmail.com</p>
          </a>
        </footer>
      </div>
    );
  }
}

export default Home;
