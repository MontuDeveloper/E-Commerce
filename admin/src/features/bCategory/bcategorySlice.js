import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-catagories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewBlogCtrl = createAsyncThunk(
  "blogCategory/create-category",
  async (catData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCtrl = createAsyncThunk(
  "blogCategory/get-AblogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCtrl = createAsyncThunk(
  "blogCategory/update-blogCategory",
  async (blogcat, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(blogcat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCtrl = createAsyncThunk(
  "blogCategory/delete-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bCatagories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bCatagorySlice = createSlice({
  name: "bCatagories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCatagories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewBlogCtrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBlogCtrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createNewBlogCtrl = action.payload;
      })
      .addCase(createNewBlogCtrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCtrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCtrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCtrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCtrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCtrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCat = action.payload;
      })
      .addCase(updateBlogCtrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCtrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCtrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCat = action.payload;
      })
      .addCase(deleteABlogCtrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCatagorySlice.reducer;
