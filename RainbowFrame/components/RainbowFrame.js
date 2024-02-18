import React from "react";
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

	static propTypes = {
		colors: PropTypes.array.isRequired,
	};

	render() {
		const reduceColors = (previousValue, currentItem) => {
			return(
				<div style={{border:"solid 3px " + currentItem, padding:"10px"}}>
					{previousValue}
				</div>
			)
		}
		const rainbowFrame = this.props.colors.reduce(reduceColors,this.props.children)
		return (
			<div style={{ width: 400, textAlign: 'center', margin: '0 auto' }}>
				{rainbowFrame}
			</div>
		)
	}
}

export default RainbowFrame;