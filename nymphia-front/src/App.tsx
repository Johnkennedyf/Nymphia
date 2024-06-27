import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { Error404 } from './pages/Error404.tsx';
import { Home } from './pages/Home.tsx';

function App() {
  return (
		<Routes>
			<Route path="/dashboard" element={(
				<AuthGuard>
					<Dashboard />
				</AuthGuard>
			)} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Home />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
  );
}

export default App;
