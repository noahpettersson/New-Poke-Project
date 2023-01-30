import 'firebase/firestore'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";
import store from "./store"

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