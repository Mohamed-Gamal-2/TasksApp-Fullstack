import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export let addTask = createAsyncThunk(
  "AddTasks/addTask",
  async (values, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(
        "https://task-app-nkax.onrender.com/tasks/add",
        {
          ...values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

let AddTaskSlice = createSlice({
  name: "AddTasks",
  initialState: { message: "", change: false },
  reducers: {
    changeMsg(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.message = action.payload?.Message;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.message = action.payload?.Message;
    });
  },
});

export let addTaskreducer = AddTaskSlice.reducer;
export let { changeMsg } = AddTaskSlice.actions;
