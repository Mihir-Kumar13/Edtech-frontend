import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: null,
    categories: null,
    reviews: null,
  },

  reducers: {
    addCourses: (state, action) => {
      state.courses = action.payload;
    },

    addCategories: (state, action) => {
      state.categories = action.payload;
    },
    addreviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export default courseSlice.reducer;

export const { addCategories, addCourses, addreviews } = courseSlice.actions;
