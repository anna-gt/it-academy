import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';


import words from './words.json';

ReactDOM.render(
  <Filter
	words = {words}
  />
  , document.getElementById('container') 
);
