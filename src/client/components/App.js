import React from 'react';
import Companies from './companies/board';

export const companies = [
  { name: 'AMD Consulting', tags: ['React', 'Node'] },
  { name: 'Acensi', tags: [] },
  { name: 'Conix', tags: ['Mongo'] },
  { name: 'Groupagora', tags: [] },
  { name: 'Ametix', tags: ['Mongo', 'React'] },
  { name: 'infocubed', tags: ['noTags'] },
  { name: 'HIGHTEAM', tags: [] },
  { name: 'Easy Partner', tags: ['Test', 'Node', 'React', 'MongoDB', 'C++'] },
  { name: 'Adonys', tags: [] },
];

const App = () =>
  <Companies companies={companies} />
  ;

export default App;
