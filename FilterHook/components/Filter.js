import React, { useState, useEffect } from 'react';
import List from './List';
import Controls from './Controls';

const Filter = props => {

	const [list, setList] = useState(props.words);
	const [isSort, setSort] = useState(false);
	const [filters, setFilters] = useState('');

	useEffect(
		() => {
			let words = props.words;
			if (filters) 
				words = words.filter(word => word.includes(filters));
			if (isSort)
				words = words.slice().sort();
			setList(words);
		},
		[isSort,filters]
	);

	function doFilter(letters) {
		setFilters(letters);
	};

	function doSort(isSort) {
		setSort(isSort);
	};

	function doReset() {
		setSort(false);
		setFilters('');
	};

	return(
		<div>
			<Controls cbSort={doSort} cbFilter={doFilter} cbReset={doReset}/>
			<List list={list} />
		</div>
	)
};

export default Filter;