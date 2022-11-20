import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserFormData, UserFormUpdateData } from './models';

export const BASE_URI = 'http://localhost:5000/users/';

export interface UserListQuery {
	page: number;
	sortColumn: string;
	sortDirection: string;
	searchValue: string;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params: UserListQuery) => {
	const { page, sortColumn, sortDirection, searchValue } = params;
	const formattedUrl = `${BASE_URI}?page=${page}&order_by=${sortColumn}&sort=${sortDirection}&search=${searchValue}`;
	const response = await fetch(formattedUrl, { method: 'GET' });
	const data = await response.json();
	return data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
	const formattedUrl = `${BASE_URI}${id}`;
	const response = await fetch(formattedUrl, { method: 'DELETE' });
	const data = await response.json();
	return data;
});

export const createUser = createAsyncThunk('users/createUser', async (params: UserFormData) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const response = await fetch(BASE_URI, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(params),
	});
	const data = await response.json();
	return data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (params: UserFormUpdateData) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	const formattedUrl = `${BASE_URI}${params.id}`;
	const response = await fetch(formattedUrl, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify(params),
	});
	const data = await response.json();
	return data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (id: number) => {
	const formattedUrl = `${BASE_URI}${id}`;
	const response = await fetch(formattedUrl, { method: 'GET' });
	const data = await response.json();
	return data;
});
