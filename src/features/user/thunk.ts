import { createAsyncThunk } from '@reduxjs/toolkit';

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
