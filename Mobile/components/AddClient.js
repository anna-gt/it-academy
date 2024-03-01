import React from "react";
import PropTypes from "prop-types";
import {mobileEvents} from "./events";

class AddClient extends React.PureComponent {
	static propTypes = {
		id: PropTypes.number.isRequired
	};

	newSNameRef = React.createRef();
	newNameRef = React.createRef();
	newFNameRef = React.createRef();
	newBalanceRef = React.createRef();

	saveClient = () => {
		mobileEvents.emit('EClientAdded',{
			id: this.props.id,
			sName: this.newSNameRef.current.value,
			name: this.newNameRef.current.value,
			fName: this.newFNameRef.current.value,
			balance: parseFloat(this.newBalanceRef.current.value),
		}
		)
	};

	deleteClient = () => {
		mobileEvents.emit('ECancelAdding')
	};

	render() {
		console.log('AddClient render');
		return(
			<tr>
				<td>
					<input type='text' ref={this.newSNameRef}></input>
				</td>
				<td>
					<input type='text' ref={this.newNameRef}></input>
				</td>
				<td>
					<input type='text' ref={this.newFNameRef}></input>
				</td>
				<td>
					<input type='number' ref={this.newBalanceRef}></input>
				</td>
				<td></td>
				<td>
					<button onClick={this.saveClient}>Сохранить</button>
				</td>
				<td>
					<button onClick={this.deleteClient}>Удалить</button>
				</td>
			</tr>
		)
	}
}

export default AddClient;