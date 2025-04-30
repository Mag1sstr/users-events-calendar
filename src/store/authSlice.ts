import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";

export interface IUser {
  username: string;
  password: string;
}

interface AuthState {
  auth: boolean;
  user: IUser | null;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  auth: false,
  user: null,
  error: "",
  isLoading: false,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.auth = false;
      localStorage.removeItem("user");
    },
  },
});

export function login(username: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(setLoading(true));
    setTimeout(() => {
      axios.get<IUser[]>("./users.json").then((resp) => {
        const mockUser = resp.data.find(
          (user) => user.username === username && user.password === password
        );
        console.log(!!mockUser);

        if (mockUser) {
          localStorage.setItem("user", JSON.stringify(mockUser));
          dispatch(setUser(mockUser));
          dispatch(setAuth(true));
        } else {
          dispatch(setError("Неправильный логин или пароль"));
        }
        dispatch(setLoading(false));
      });
    }, 1000);
  };
}

export const { setAuth, setUser, setError, setLoading, logout } =
  authSlice.actions;

export default authSlice.reducer;
