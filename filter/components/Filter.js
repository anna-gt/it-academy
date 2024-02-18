import React from "react";
import './filter.css';

class Filter extends React.Component {
	state = {
		list: this.props.words,
		isSort: false,
		filters: "",
	}
	sortChanged = (eo) => {
		this.setState({isSort: eo.target.checked},this.recalcList);
	}
	filterChanged = (eo) => {
		this.setState({filters: eo.target.value},this.recalcList);
	}
	reset = () => {
		this.setState({isSort:false,filters:""},this.recalcList)
	};

	recalcList() {
		let words = this.props.words;
		if (this.state.filters)
			words = words.filter(word => word.includes(this.state.filters))
		if (this.state.isSort)
			words = words.slice().sort();
		this.setState({list:words})
	}
	render() {
		const wordsCode = this.state.list.map(word=>
			<div>{word}</div>)
		return (
			<div>
			<input type="checkbox" checked={this.state.isSort} onChange={this.sortChanged}></input>
			<input type="text" value = {this.state.filters} onChange={this.filterChanged}></input>
			<button onClick={this.reset}>Сброс</button>
			<br />
			<div className="list">
				{wordsCode}
			</div>
			</div>
		)
	}
}

export default Filter;