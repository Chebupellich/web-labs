import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUser, getUsers, updateUser } from '@api/userService.ts';
import { User } from '@myTypes/user.ts';
import { checkAxiosError } from '@api/axios.ts';
import { AxiosError } from 'axios';
interface UserState {
    user: User | null;
    users: User[];
    loading: boolean;
    usersLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    usersLoading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk<
    User[],
    void,
    { rejectValue: string }
>('user/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        return await getUsers();
    } catch (e: unknown) {
        checkAxiosError(e as AxiosError);
        return rejectWithValue('Error when fetching users');
    }
});

export const fetchUserProfile = createAsyncThunk<
    User,
    number,
    { rejectValue: string }
>('user/fetchProfile', async (id: number, { rejectWithValue }) => {
    try {
        return await getUser(id);
    } catch (e: unknown) {
        checkAxiosError(e as AxiosError);
        return rejectWithValue('Error when fetch user profile');
    }
});

export const updateUserProfile = createAsyncThunk<
    User,
    User,
    { rejectValue: string }
>('user/update', async (user, { rejectWithValue }) => {
    try {
        return await updateUser(user);
    } catch (e: unknown) {
        checkAxiosError(e as AxiosError);
        return rejectWithValue('Error when update user profile');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
                state.error = null;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.usersLoading = false;
                    state.users = action.payload;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.error =
                    action.payload ??
                    'Ошибка при загрузке списка пользователей';
            });

        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUserProfile.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.user = action.payload;
                }
            )
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ?? 'Ошибка при загрузке пользователя';
            });

        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateUserProfile.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.user = { ...state.user, ...action.payload };
                }
            )
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ?? 'Ошибка при обновлении пользователя';
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
