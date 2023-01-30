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

async function updateFirebase() {
  const state = store.getState();
  var database = getFirestore();

  const docRef = doc(database, "highscore", state.user.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      if(docSnap.data().score < state.score.value) {
          await setDoc(doc(database, "highscore", state.user.value), {
              "name": state.displayName.value,
              "score": state.score.value,
          });
      }

    } else {
      await setDoc(doc(database, "highscore", state.user.value), {
          "name": state.displayName.value,
          "score": state.score.value,
      });
    }
}

async function firebaseArray() {
    var array = [];
    var database = getFirestore();
    var i = 0;

    const querySnapshot = await getDocs(collection(database, "highscore"));
    querySnapshot.forEach((doc) => {
        array[i++] = doc.data();
    });

    return array;
}

export {updateFirebase, firebaseArray};

export default store;
