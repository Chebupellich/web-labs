import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToLocalStorage,
} from '@utils/localStorageUtils';
import {
    loginUser as apiLogin,
    registerUser as apiRegister,
} from '@api/authService.ts';
import { User, UserReq } from '@myTypes/user.ts';
import { appConfig } from '@/config.ts';
import { checkAxiosError } from '@api/axios.ts';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (data: Omit<UserReq, 'name'>) => {
        try {
            const { accessToken, user } = await apiLogin(data);

            saveToLocalStorage(appConfig.lsAccessToken, accessToken);
            saveToLocalStorage(appConfig.lsUser, JSON.stringify(user));

            return { accessToken, user };
        } catch (e) {
            checkAxiosError(e as AxiosError);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: UserReq) => {
        try {
            const user = await apiRegister(data);
            if (user) toast.success('User created');
        } catch (e) {
            checkAxiosError(e as AxiosError);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            removeFromLocalStorage(appConfig.lsAccessToken);
            removeFromLocalStorage(appConfig.lsUser);
            state.user = null;
            state.error = null;
        },
        checkTokenValidity(state) {
            const token = getFromLocalStorage(appConfig.lsAccessToken);
            const userDataStr = getFromLocalStorage(appConfig.lsUser);

            if (token && userDataStr) {
                try {
                    const decoded: { exp: number } = jwtDecode(token);
                    const currentTime = Math.floor(Date.now() / 1000);

                    if (decoded.exp > currentTime) {
                        state.user = JSON.parse(userDataStr);
                    } else {
                        authSlice.caseReducers.logout(state);
                    }
                } catch (error) {
                    checkAxiosError(error as AxiosError);
                    authSlice.caseReducers.logout(state);
                }
            } else {
                authSlice.caseReducers.logout(state);
            }
        },
        updateAuthUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                saveToLocalStorage(
                    appConfig.lsUser,
                    JSON.stringify(state.user)
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action?.payload?.user || null;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, checkTokenValidity, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;
