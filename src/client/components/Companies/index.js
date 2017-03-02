import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <div> 
    <div> Companies </div>
    <div> 
      <Link to='/companies/add'>
        Add A company
      </Link>
    </div>
  </div>
);

export default App;
