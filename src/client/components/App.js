import React from 'react';
import Companies from './companies/companies';

const companies = [
  { name: 'AMD Consulting' },
  { name: 'Acensi' },
  { name: 'Conix' },
  { name: 'Groupagora' },
  { name: 'Ametix' },
  { name: 'infocubed' },
  { name: 'HIGHTEAM' },
  { name: 'Easy Partner' },
  { name: 'Adonys' },
];

const App = () =>
  <Companies companies={companies} />
  ;

export default App;

/*

chercher widget antd

box || card || ..

github: if ticket issue
  -> in commit: #resolve + numIssue

*/
