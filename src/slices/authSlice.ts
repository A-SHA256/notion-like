import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { AuthState } from '../types/index'

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return {
                uid: userCredential.user.uid,
                name: userCredential.user.displayName,
                email: userCredential.user.email,
            };
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return {
                uid: userCredential.user.uid,
                name: userCredential.user.displayName,
                email: userCredential.user.email
            }
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
)

export const logInWithGithub = createAsyncThunk(
    'auth/logInWithGithub',
    async (_, thunkAPI) => {
        const provider = await new GithubAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            return {
                uid: userCredential.user.uid,
                name: userCredential.user.displayName,
                email: userCredential.user.email
            }

        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
)

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
}

const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        setInitialized: (state, action) => {
            state.isInitialized = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // log in cases 
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Sign in failed';
            })
            // sign up cases
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Sign up failed';
            })
            .addCase(logInWithGithub.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logInWithGithub.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(logInWithGithub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Sign in with GitHub failed';
            });
    },
})

export default authSLice.reducer;
export const { logout, setUser, setInitialized } = authSLice.actions;