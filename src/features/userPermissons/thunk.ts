import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERMISSIONS_API_URI } from '../utils';

export const fetchAllPermissions = createAsyncThunk('permissions/fetchAllPermissions', async () => {
	const response = await fetch(PERMISSIONS_API_URI, { method: 'GET' });
	const data = await response.json();
	return data;
});
