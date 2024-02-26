import React from "react";
import PropTypes from "prop-types";

class BR2JSX extends React.Component {

	static propTypes = {
		text: PropTypes.string.isRequired,
	}

	render() {
		const pattern = /<br\s*\/?>/;
		const words = this.props.text.split(pattern);
		const lines = [];
		for (let i=0; i<words.length; i++) {
			if (i) 
				lines.push(<br key={i}/>)
			lines.push(words[i])
		}
		return (
			<div>
				{lines}
			</div>
		)
	}

}

export default BR2JSX;