import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();



const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const loginUserWithGoogle = createAsyncThunk(
  "auth/loginUserWithGoogle",
  async () => {
    const data = await signInWithPopup(auth,googleProvider);
    return data.user.email;
    
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout : (state) =>{
        state.email = "";
    },
    setUser : (state , {payload}) =>{
        state.email = payload;
        state.isLoading = false;
    },
    toggleLoading : (state) =>{
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload;
        state.error = "";
      })

      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = "";
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload;
        state.error = "";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = "";
        state.error = action.error.message;
      })
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload;
        state.error = "";
      })

      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = "";
        state.error = action.error.message;
      });
  },
});

export const {logout , setUser ,toggleLoading} = authSlice.actions;

// export const {logout} = authSlice.actions;

export default authSlice.reducer;
