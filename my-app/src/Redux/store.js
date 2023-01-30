import { configureStore } from '@reduxjs/toolkit';
import livesReducer from "./livesSlice"
import scoreReducer from "./scoreSlice"
import userReducer from "./userSlice"
import 'firebase/firestore'
import displayNameSlice from './displayNameSlice';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

const store = configureStore({
  reducer: {
    lives: livesReducer,
    score: scoreReducer,
    user: userReducer,
    displayName: displayNameSlice,
  },
});

export default store;
