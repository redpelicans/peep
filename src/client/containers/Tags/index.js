import React from 'react';
import { Link } from 'react-router-dom';

const Tags = ({}) => {
  return (
    <div> 
      <span> Tags: </span>
      <ul>
        <li>
          <Link to='/tags/edit/1'>Tag 1</Link>
          <Link to='/tags/edit/2'>Tag 2</Link>
          <Link to='/tags/edit/3'>Tag 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Tags;
