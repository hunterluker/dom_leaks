import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h2 className="mt-5 pt-5">Leak Submitted Successfully!</h2>
      <Link to="/submit">
        <button className="btn mt-3">BACK</button>
      </Link>
    </div>
  );
};
