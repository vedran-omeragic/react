import { configureStore } from '@reduxjs/toolkit';

import userListReducer from '../features/user/slice';

export const store = configureStore({
	reducer: {
		userList: userListReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
