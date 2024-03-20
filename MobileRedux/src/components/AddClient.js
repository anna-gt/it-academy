import React, { useRef } from 'react';

import { mobileEvents } from "./events";

const AddClient = ({id}) => {
	console.log('AddClient render');

	const newSNameRef = useRef(null);
	const newNameRef = useRef(null);
	const newFNameRef = useRef(null);
	const newBalanceRef = useRef(null);

	function saveClient() {
		mobileEvents.emit('EClientAdded',{
			id: id,
			sName: newSNameRef.current.value,
			name: newNameRef.current.value,
			fName: newFNameRef.current.value,
			balance: parseFloat(newBalanceRef.current.value),
		}
		)
	};

	function deleteClient() {
		mobileEvents.emit('ECancelAdding')
	};

	return(
		<tr>
				<td>
					<input type='text' ref={newSNameRef}></input>
				</td>
				<td>
					<input type='text' ref={newNameRef}></input>
				</td>
				<td>
					<input type='text' ref={newFNameRef}></input>
				</td>
				<td>
					<input type='number' ref={newBalanceRef}></input>
				</td>
				<td></td>
				<td>
					<button onClick={saveClient}>Сохранить</button>
				</td>
				<td>
					<button onClick={()=>mobileEvents.emit('ECancelAdding')}>Удалить</button>
				</td>
			</tr>
	);

};

export default React.memo(AddClient);