import React from 'react';
import classNames from 'classnames';

import Button from '../Button/Button';

import './Sort.css';

const Sort = ({ sortKey, onSort, activeSortKey, children }) => {
  const sortClass = classNames('Sort--button-inline', {
    'Sort--button-active': sortKey === activeSortKey
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

export default Sort;
