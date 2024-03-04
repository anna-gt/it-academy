import React, { useState } from 'react';

const Controls = ({cbSort,cbFilter,cbReset}) => {
	const [isSort, setSort] = useState(false);
	const [filters, setFilters] = useState('');

	function changeSort(eo) {
		setSort(eo.target.checked);
		cbSort(eo.target.checked);
	};

	function changeFilter(eo) {
		setFilters(eo.target.value);
		cbFilter(eo.target.value);
	};

	function reset() {
		setSort(false);
		setFilters('');
		cbReset();
	};

	return(
		<div>
			<input type="checkbox" checked={isSort} onChange={changeSort}></input>
			<input type="text" value = {filters} onChange={changeFilter}></input>
			<button onClick={reset}>Сброс</button>
		</div>
	)
};

export default Controls;