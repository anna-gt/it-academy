import React from "react";
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

	static propTypes = {
		colors: PropTypes.array.isRequired,
	};

	render() {
		let code = this.props.children;
				for (let i=0; i<this.props.colors.length; i++) {
					const color = this.props.colors[i];
					code = <div style={{border: `solid 3px ${color}`, margin: '5px'}}>{code}</div>
				}
				return code;
	}
}

export default RainbowFrame;