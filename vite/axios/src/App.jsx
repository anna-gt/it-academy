import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserData from './components/UserData'
import OnLoadingUserData from './components/OnLoadingUserData'
import './App.css'

function App() {

	const [appState, setAppState] = useState(
		{
      loading: false,
      persons: null,
    }
	);
	const DataLoading =  OnLoadingUserData(UserData);

	useEffect(() => {
		const apiUrl='http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
		axios.get(apiUrl).then((response) => {
			const allPersons = response.data;
			setAppState(
				{
					loading: false,
					persons: allPersons
					 }
			);
		})

	}, [setAppState])

  return (
    <>
			<div className="app">
        <DataLoading isLoading={appState.loading} persons={appState.persons} />
    </div>
    </>
  )
}

export default App
