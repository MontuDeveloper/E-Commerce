import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquirys = createAsyncThunk(
  "enquiry/get-enquriy",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquirys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAEnquirys = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEnquiry = createAsyncThunk(
  "enquiry/get-Aenquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-Aenquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.udpateEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  enquirys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquirys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquirys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquirys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquirys = action.payload;
      })
      .addCase(getEnquirys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEnquirys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquirys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquirys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enqName = action.payload.name;
        state.enqMobile = action.payload.mobile;
        state.enqEmail = action.payload.email;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
