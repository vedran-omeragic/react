import React from 'react';

import './UserManagementPage.css';
import Table from '../components/table/Table';

function UserManagement() {
	return (
		<div className="page">
			<h1>USER MANAGEMENT</h1>
			<Table />
		</div>
	);
}

export default UserManagement;
