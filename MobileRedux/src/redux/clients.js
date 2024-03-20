import { createSlice } from '@reduxjs/toolkit';
import clientsArr from '../clients.json';

const initialState = {
	clients: clientsArr,
}

export const clientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		clientChangedR: (state, action) => {
			state.clients.forEach( (client) => {
				if (client.id === action.payload.id) {
					client.key = action.payload.id;
					client.sName = action.payload.sName;
					client.name = action.payload.name;
					client.fName = action.payload.fName;
					client.balance = action.payload.balance;
				}
			}
			)
		},
		deleteClientR: (state, action) => {
			state.clients = state.clients.filter( (client) => client.id !== action.payload.id );
		},
		addClientR: (state, action) => {
			state.clients.push({
				id: action.payload.id,
				sName: action.payload.sName,
				name: action.payload.name,
				fName: action.payload.fName,
				balance: action.payload.balance
			})
		}
	}
});

export const { clientChangedR, deleteClientR, addClientR } = clientsSlice.actions;

export default clientsSlice.reducer;