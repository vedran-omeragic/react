import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermission } from '../userPermissons/models';
import { USER_API_URI } from '../utils';
import { UserFormData, UserFormUpdateData } from './models';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export interface UserListQuery {
	page: number;
	sortColumn: string;
	sortDirection: string;
	searchValue: string;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params: UserListQuery) => {
	const { page, sortColumn, sortDirection, searchValue } = params;
	const formattedUrl = `${USER_API_URI}?page=${page}&order_by=${sortColumn}&sort=${sortDirection}&search=${searchValue}`;
	const response = await fetch(formattedUrl, { method: 'GET' });
	const data = await response.json();
	return data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
	const formattedUrl = `${USER_API_URI}${id}`;
	const response = await fetch(formattedUrl, { method: 'DELETE' });
	const data = await response.json();
	return data;
});

export const createUser = createAsyncThunk('users/createUser', async (params: UserFormData) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const response = await fetch(USER_API_URI, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(params),
	});
	const data = await response.json();
	return data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (params: UserFormUpdateData) => {
	const formattedUrl = `${USER_API_URI}${params.id}`;
	const response = await fetch(formattedUrl, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify(params),
	});
	const data = await response.json();
	return data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (id: number) => {
	const formattedUrl = `${USER_API_URI}${id}`;
	const response = await fetch(formattedUrl, { method: 'GET' });
	const data = await response.json();
	return data;
});

export const fetchUserPermissions = createAsyncThunk('users/fetchUserPermissions', async (id: number) => {
	const formattedUrl = `${USER_API_URI}${id}/perms`;
	const response = await fetch(formattedUrl, { method: 'GET' });
	const data = await response.json();
	return data;
});

export const createUserPermission = createAsyncThunk(
	'users/createUserPermission',
	async (userPermission: UserPermission) => {
		const formattedUrl = `${USER_API_URI}${userPermission.user_id}/perms`;
		const response = await fetch(formattedUrl, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ code: userPermission.permission_code }),
		});
		const data = await response.json();
		return data;
	}
);

export const deleteUserPermission = createAsyncThunk(
	'users/deleteUserPermission',
	async (userPermission: UserPermission) => {
		const formattedUrl = `${USER_API_URI}${userPermission.user_id}/perms`;
		const response = await fetch(formattedUrl, {
			method: 'DELETE',
			headers: headers,
			body: JSON.stringify({ code: userPermission.permission_code }),
		});
		const data = await response.json();
		return data;
	}
);
