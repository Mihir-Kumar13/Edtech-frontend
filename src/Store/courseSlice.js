import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: null,
    categories: null,
  },

  reducers: {
    addCourses: (state, action) => {
      state.courses = action.payload;
    },

    addCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default courseSlice.reducer;

export const { addCategories, addCourses } = courseSlice.actions;
