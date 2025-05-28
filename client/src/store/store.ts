import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/slices/authSlice.ts';
import eventsSlice from '@/store/slices/eventsSlice.ts';
import uiSlice from '@store/slices/uiSlice.ts';
import userSlice from '@store/slices/userSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        events: eventsSlice,
        ui: uiSlice,
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
