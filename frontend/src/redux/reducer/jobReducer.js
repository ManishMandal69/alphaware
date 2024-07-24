import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJob = createAsyncThunk(
  "admin/joblist",
  async () => {
    try {
      const response = await axios.get(`https://alphaware-2.onrender.com/api/jobs`,{
        headers:{
            'x-auth-token': localStorage.getItem('token')
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

export const createJob = createAsyncThunk(
    "admin/jobform",
    async ( prop ) => {
      try {
        const response = await axios.post(`https://alphaware-2.onrender.com/api/jobs/create`,{
            company:prop.company,
            position:prop.position,
            contract:prop.contract,
            location:prop.location

          },{
          headers:{
              'x-auth-token': localStorage.getItem('token')
          }
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );

  export const editJob = createAsyncThunk(
    "admin/jobedit",
    async (prop) => {
      try {
        const response = await axios.put(`https://alphaware-2.onrender.com/api/jobs/${prop.id}`, {
          company: prop.company,
          position: prop.position,
          contract: prop.contract,
          location: prop.location
        }, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );

  export const deleteJob = createAsyncThunk(
    "admin/jobdelete",
    async (id) => {
      try {
        const response = await axios.delete(`https://alphaware-2.onrender.com/api/jobs/${id}`,{
          headers:{
              'x-auth-token': localStorage.getItem('token')
          }
        });
        return id;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }
  );

const jobInitialState = {
    jobList: [],
    appliedJobList:[]
};

const jobSlice = createSlice({
  name: "jobList",
  initialState: jobInitialState,
  reducers: {
    applyJobList: (state, action) => {state.appliedJobList.push(action.payload)}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJob.pending, (state) => {
        state.jobList = [];
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobList = state.jobList.filter((job)=>job._id !== action.payload);
      })
      .addCase(getJob.rejected, (state, action) => {
        state.jobList = [];
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.jobList = state.jobList.map(job => job._id === action.payload._id ? action.payload : job);
      });;
  },
});

export const { applyJobList } = jobSlice.actions;
export default jobSlice.reducer;
