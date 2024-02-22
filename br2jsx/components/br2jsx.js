import React from "react";
import PropTypes from "prop-types";

class BR2JSX extends React.Component {

	static propTypes = {
		text: PropTypes.string.isRequired,
	}

	render() {
		const pattern = /<br\s?\/?>/;
		const textArr = this.props.text.split(pattern);
		const finalText = textArr.map((word,i) => 
		<React.Fragment key={i}>
			{word} <br />
		</React.Fragment>
			);
		return (
			<div>
				{finalText}
			</div>
		)
	}

}

export default BR2JSX;