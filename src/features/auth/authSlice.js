import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();

const initialState = {
  user: {
    email: "",
    role: "",
  },
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
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const url = `${process.env.REACT_APP_DEV_URL}user/${email}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  if (data.status) {
    return data;
  }
  return email;
});
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
    const data = await signInWithPopup(auth, googleProvider);
    return data.user.email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.email = "";
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
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
        state.user.email = payload;
        state.error = "";
      })

      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
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
        state.user.email = payload;
        state.error = "";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
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
        state.user.email = payload;
        state.error = "";
      })

      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        if (payload.status) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
        state.error = "";
      })

      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true; 
        state.user = {};
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
