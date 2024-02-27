import React from "react";

function withRainbowFrame(colors) {
	return function(Comp) {
		class NewComp extends React.Component {
			render() {
				let code = <Comp {...this.props} />
				for (let i=0; i<colors.length; i++) {
					const color = colors[i];
					code = <div style={{border: `solid 3px ${color}`, margin: '3px'}}>{code}</div>
				}
				return code;
			}
		}
		return NewComp;
	}
}

export { withRainbowFrame };