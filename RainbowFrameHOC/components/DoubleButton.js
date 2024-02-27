import React from "react";
import PropTypes from "prop-types";

class DoubleButton extends React.Component {
	static propTypes = {
		caption1: PropTypes.string,
		caption2: PropTypes.string,
		cbPressed: PropTypes.func
	}
	pressed1 = (eo) => {
		this.props.cbPressed(this.props.caption1)
	}
	pressed2 = (eo) => {
		this.props.cbPressed(this.props.caption2)
	}
	render() {
		
		return(
			<div>
				<button onClick={this.pressed1}>{this.props.caption1}</button>
				{this.props.children}
				<button onClick={this.pressed2}>{this.props.caption2}</button>
			</div>
		)
	}
};

export default DoubleButton;