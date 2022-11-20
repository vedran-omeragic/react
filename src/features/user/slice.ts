import { createSlice } from '@reduxjs/toolkit';

interface UserListState {
	page: number;
	column: string;
	direction: string;
	search: string;
}

const initialState: UserListState = {
	page: 0,
	column: 'created_at',
	direction: 'desc',
	search: '',
};

const userListSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		pageDecrease(state) {
			if (state.page > 0) {
				state.page -= 1;
			}
		},
		pageIncrease(state) {
			state.page += 1;
		},
		setOrderColumn(state, actions) {
			state.column = actions.payload;
		},
		setOrderDirection(state, actions) {
			state.direction = actions.payload;
		},
		setSearchValue(state, actions) {
			state.search = actions.payload;
		},
	},
});

export const { pageIncrease, pageDecrease, setOrderColumn, setOrderDirection, setSearchValue } = userListSlice.actions;
export default userListSlice.reducer;
