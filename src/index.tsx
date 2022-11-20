import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './index.css';
import UserManagementPage from './pages/UserManagementPage';
import UserFormPage from './pages/UserFormPage';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<div>
					<nav>
						<Link to="/">User Management</Link>
						<Link to="/form">Create user</Link>
					</nav>
				</div>
				<Routes>
					<Route
						path="/"
						element={<UserManagementPage />}
					/>
					<Route
						path="/form/"
						element={<UserFormPage />}
					/>
					<Route
						path="/form/:id"
						element={<UserFormPage />}
					/>
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);
