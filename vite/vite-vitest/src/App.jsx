import { useState } from 'react'
import './App.css'
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import Users from './users/Users';
import UserDetailsPage from './pages/UserDetailsPage';
import ErrorPage from './pages/ErrorPage';

function App() {

  return (
    <>
      <BrowserRouter>
				<h1>Hello world</h1>
				<Link to="/" data-testid="main-link">main</Link>
				<Link to="/about" data-testid="about-link">about</Link>
				<Link to="/users" data-testid="users-link">users</Link>
					<Routes>
						<Route path="/" element={<MainPage/>} />
						<Route path="/about" element={<AboutPage/>} />
						<Route path="/users" element={<Users/>} />
						<Route path="/users/:id" element={<UserDetailsPage/>} />
						<Route path="/*" element={<ErrorPage/>} />
					</Routes>
			</BrowserRouter>
    </>
  )
}

export default App
