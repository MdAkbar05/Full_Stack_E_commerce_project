import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      quantity: 2,
      description: "Book 1 description",
      price: 19.99,
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author 1",
      quantity: 2,
      description: "Book 2 description",
      price: 19.99,
    },
    {
      id: 3,
      title: "Book 3",
      author: "Author 1",
      quantity: 2,
      description: "Book 3 description",
      price: 19.99,
    },
  ],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    deleteBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { deleteBook, addBook } = bookSlice.actions;
export default bookSlice.reducer;
