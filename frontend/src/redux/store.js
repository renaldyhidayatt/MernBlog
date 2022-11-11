import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlices';
import post from './slices/postSlices';
import comment from './slices/commentSlices';
import sendMail from './slices/emailSlices';
import accountVerification from './slices/accVerification';
import categoriesReducer from './slices/categorySlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
    comment,
    sendMail,
    accountVerification,
  },
});

export default store;
