import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

// function App() {
// 	const [data, setData] = useState(null);
// 	const [toggle, setToggle] = useState(false);
// 	const [value, setValue] = useState('');

// 	const onClick = () => setToggle(prev => !prev);

// 	useEffect(() => {
// 		setTimeout(() => {
// 			setData({})
// 		}, 100)
// 	}, [])

//   return (
//     <>
// 			<h1 data-testid='value-elem'>{value}</h1>
// 			{toggle === true && <div data-testid='toggle-elem'>toggle</div>}
// 			{data && <div>data</div>}
//       Hello world
// 			<button data-testid='toggle-btn' onClick={onClick}>click me</button>
// 			<input onChange={eo => setValue(eo.target.value)} type='text' placeholder='input value...'></input>
//     </>
//   )
// }


import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar/Navbar';

const App = () => {
	return (
		<div>
			<Navbar />
			<AppRouter />
		</div>
	)
}

export default App
