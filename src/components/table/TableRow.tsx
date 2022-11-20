import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';

import { User } from '../../features/user/models';
import UserFormPage from '../../pages/UserFormPage';
import Button from '../Button';
import './style.css';

interface UserRow extends User {
	deleteFn: any;
}

function TableRow(props: UserRow) {
	const {
		id,
		username,
		email,
		first_name,
		last_name,
		date_of_birth,
		status,
		created_at,
		updated_at,
		user_permissions,
		deleteFn,
	} = props;

	return (
		<tr className="tableRow">
			<td>{id}</td>
			<td>{username}</td>
			<td>{email}</td>
			<td>{first_name}</td>
			<td>{last_name}</td>
			<td>{date_of_birth ? new Date(date_of_birth).toLocaleDateString() : '-'}</td>
			<td>{status}</td>
			<td>{new Date(created_at).toLocaleString()}</td>
			<td>{updated_at ? new Date(updated_at).toLocaleString() : '-'}</td>
			<td className="permissionRow">
				{user_permissions.map((permission) => {
					return (
						<span
							className="permission"
							key={permission.permission_code}
						>
							{' '}
							{permission.permission_code}{' '}
						</span>
					);
				})}
			</td>
			<td>
				<Link to={`/form/${id}`}>Edit</Link>
				<Routes>
					<Route
						path="/form/:id"
						element={<UserFormPage />}
					/>
				</Routes>
			</td>
			<td>
				<Button onClick={deleteFn}>Delete</Button>
			</td>
			<td>#</td>
		</tr>
	);
}

export default TableRow;
