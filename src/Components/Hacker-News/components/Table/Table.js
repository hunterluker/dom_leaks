import React from 'react';

import SORTS from '../../helpers/sorts';

import Sort from '../Sort/Sort';

import './Table.css';

const _renderList = list =>
  list.map(item => (
    <tr key={item.objectID}>
      <td>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
        <div className="w-100 points-author m-0">
          <span className="float-left pr-1">{item.points} points by</span>
          <p className="float-left">
            {item.author} {' | '}
          </p>

          <span className="float-left pl-2">{item.num_comments} comments</span>
        </div>
      </td>
    </tr>
  ));

const Table = ({ list, sortKey, onSort, isSortReverse }) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
              Hacker News
            </Sort>
          </th>
        </tr>
      </thead>
      <tbody>{_renderList(reverseSortedList)}</tbody>
    </table>
  );
};

export default Table;
