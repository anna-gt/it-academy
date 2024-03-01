import React from "react";
import PropTypes from "prop-types";
import MobileClient from "./MobileClient";
import AddClient from "./AddClient";
import "./MobileCompany.css";
import { mobileEvents } from "./events";

class MobileCompany extends React.PureComponent {

	static propTypes = {
		clients: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				sName: PropTypes.string,
				name: PropTypes.string,
				fName: PropTypes.string,
				balance: PropTypes.number
			})
		)
	};

	state = {
		clients: this.props.clients,
		shownClients: 1, // 1 - все клиенты, 2 - активные, 3 - заблокированные(баланс<0)
		nextId: 105,
		addingClient: false
	};

	componentDidMount = () => {
		mobileEvents.addListener('EClientChanged',this.clientChanged);
		mobileEvents.addListener('EDeleteClient',this.deleteClient);
		mobileEvents.addListener('EClientAdded',this.addClient);
		mobileEvents.addListener('ECancelAdding',this.cancelClient);
	};
	
	componentWillUnmount = () => {
		mobileEvents.removeListener('EClientChanged',this.clientChanged);
		mobileEvents.removeListener('EDeleteClient',this.deleteClient);
		mobileEvents.removeListener('EClientAdded',this.addClient);
		mobileEvents.removeListener('ECancelAdding',this.cancelClient);
	};

	clientChanged = ({id,sName,name,fName,balance}) => {
		let newClients = [...this.state.clients]; // копия самого массива клиентов
		newClients.forEach( (client,i) => {
			if (client.id == id) {
				let newClient = {...client}; // копия объекта изменившегося клиента
				newClient.key = id;
				newClient.sName = sName;
				newClient.name = name;
				newClient.fName = fName;
				newClient.balance = balance;
				newClients[i] = newClient;
			}
		}
		);
		this.setState({clients: newClients});
	};

	addClient = ({id,sName,name,fName,balance}) => {
		let newClients = [...this.state.clients];
		newClients.push({
			id: id,
			sName: sName,
			name: name,
			fName: fName,
			balance: balance
		});
		this.setState({clients: newClients, addingClient: false, nextId: this.state.nextId+1});
	};

	deleteClient = (id) => {
		const del = confirm('Удалить клиента?');
		if (del) {
			let newClients = [...this.state.clients];
			newClients = newClients.filter( (client) => client.id !== id);
			this.setState({clients: newClients});
		} 
	};

	addClientInput = (eo) => {
		this.setState({addingClient: true});
	};

	cancelClient = () => {
		this.setState({addingClient: false});
	};

	showAll = (eo) => {
		this.setState({shownClients: 1});
	};
	showActive = (eo) => {
		this.setState({shownClients: 2});
	};
	showBlocked = (eo) => {
		this.setState({shownClients: 3});
	};

	render() {
		console.log("MobileCompany render");

		let clientCode;

		let newClientCode;
		if (this.state.addingClient) {
			newClientCode = <AddClient id={this.state.nextId} />;
		}

		if (this.state.shownClients == 1) {
			clientCode = this.state.clients.map(client =>
				<MobileClient key={client.id} info={client} />
			);
		}		

		if (this.state.shownClients == 2) {
			const clients = this.state.clients.filter((client) => client.balance>0)
			clientCode = clients.map(client =>
				<MobileClient key={client.id} info={client} />
			);
		};

		if (this.state.shownClients == 3) {
			const clients = this.state.clients.filter((client) => client.balance<0)
			clientCode = clients.map(client =>
				<MobileClient key={client.id} info={client} />
			);
		};
		
			return(
				<div>
					<button onClick={this.showAll}>Все</button>
					<button onClick={this.showActive}>Активные</button>
					<button onClick={this.showBlocked}>Заблокированные</button>
					<table>
						<thead>
						<tr>
							<td>Фамилия</td>
							<td>Имя</td>
							<td>Отчество</td>
							<td>Баланс</td>
							<td>Статус</td>
							<td>Редактировать</td>
							<td>Удалить</td>
						</tr>
						</thead>
						<tbody>
							{clientCode}
							{newClientCode}
						</tbody>
						<tfoot>
							<tr>
								<td>
									<button onClick={this.addClientInput}>Добавить клиента</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			)
	};


}

export default MobileCompany;