import React from "react";
import PropTypes from "prop-types";
import {mobileEvents} from "./events";

import "./MobileClient.css";

class MobileClient extends React.PureComponent {

	static propTypes = {
		info: PropTypes.shape({
			id: PropTypes.number,
			sName: PropTypes.string,
			name: PropTypes.string,
			fName: PropTypes.string,
			balance: PropTypes.number
		}),
	};

	state = {
		isEditing: false,
	}

	newSNameRef = React.createRef();
	newNameRef = React.createRef();
	newFNameRef = React.createRef();
	newBalanceRef = React.createRef();

	editClient = (eo) => {
		this.setState({isEditing: true})
	};

	saveClient = (eo) => {
		mobileEvents.emit('EClientChanged',
		{id: this.props.info.id, 
		sName: this.newSNameRef.current.value,
		name: this.newNameRef.current.value,
		fName: this.newFNameRef.current.value,
		balance: parseFloat(this.newBalanceRef.current.value),
	});
	this.setState({isEditing: false});
	};

	deleteClient = (eo) => {
		mobileEvents.emit('EDeleteClient',this.props.info.id)
	};

	render() {
		console.log("MobileClient id="+this.props.info.id+" render");

		return(
			<tr>
				<td>
					{this.state.isEditing ? 
					<input type='text' defaultValue={this.props.info.sName} ref={this.newSNameRef}></input> :
					this.props.info.sName}
				</td>
				<td>
					{this.state.isEditing ?
					<input type='text' defaultValue={this.props.info.name} ref={this.newNameRef}></input> :
					this.props.info.name}
				</td>
				<td>
					{this.state.isEditing ?
					<input type='text' defaultValue={this.props.info.fName} ref={this.newFNameRef}></input> :
					this.props.info.fName}
					</td>
				<td>
					{this.state.isEditing ?
					<input type='number' defaultValue={this.props.info.balance} ref={this.newBalanceRef}></input> :
					this.props.info.balance}
					</td>
				<td>{this.props.info.balance>0 ? "active" : "blocked"}</td>
				<td>
				{this.state.isEditing ?
					<button onClick={this.saveClient}>Сохранить</button> :
					<button onClick={this.editClient}>Редактировать</button>}
					</td>
				<td><button onClick={this.deleteClient}>Удалить</button></td>
			</tr>
		)
	}
};

export default MobileClient;