import React from 'react';
import { User } from '../../features/user/models';
import './style.css';

function TableRow(props: User) {
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
			<td>⚙️</td>
			<td>#</td>
		</tr>
	);
}

export default TableRow;
