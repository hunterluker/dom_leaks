import React from 'react';
import search from '../../../../images/039-search-2.svg';
import './Search.css';

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="Search-input form-control"
          />
          <img
            width="23px"
            children={children}
            className="Search-icon"
            src={search}
            alt="search"
          />
          {/* <button type="submit" className="Search-button btn">
            {children}
          </button> */}
          {children}
        </form>
      </div>
    </div>
  );
};

export default Search;
