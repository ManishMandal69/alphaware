import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async ( prop ) => {
    try {
      const response = await axios.post(`https://alphaware-2.onrender.com/api/users/login`, { email:prop.email, password: prop.password });
      localStorage.setItem('token', response.data.token)
      return response.data.user;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async ( prop ) => {
      try {
        const response = await axios.post(`https://alphaware-2.onrender.com/api/users/register`, { name:prop.name,email:prop.email, password: prop.password });
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );

  export const verifyUser = createAsyncThunk(
    "user/verify",
    async () => {
      try {
        const response = await axios.get(`https://alphaware-2.onrender.com/api/users/verify`, {
          headers:{
            "x-auth-token": localStorage.getItem("token")
          }
        });
        return response.data._doc;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );
  

const userInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    logoutUser: (state, action) => {state.user = null}
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
