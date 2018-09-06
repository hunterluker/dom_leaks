import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="four0four">
      <h1 className="display-4">404</h1>
      <h2 className="lead">Sorry this page does not exist.</h2>
      <Link to="/">
        <button className="btn mt-5">BACK TO HOME</button>
      </Link>
    </div>
  );
};
