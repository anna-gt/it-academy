import React from 'react';
import './list.css';

const List = ({list}) => {

	return(
		<div className="list">
			{	list.map((word,i) => <div key={i}>{word}</div>)}
		</div>
	)
};

export default List;