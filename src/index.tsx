import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserManagementPage from './pages/UserManagementPage';
import UserFormPage from './pages/UserFormPage';
import UserPermissionsPage from './pages/UserPermissionsPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<div className="navigationWrapper">
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
					<Route
						path="/permissions/:id"
						element={<UserPermissionsPage />}
					/>
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);
