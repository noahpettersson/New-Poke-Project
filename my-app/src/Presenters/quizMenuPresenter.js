import QuizMenuView from "../Views/quizMenuView"
import { useDispatch } from 'react-redux'
import { livesSet } from "../Redux/livesSlice"
import { getFirestore } from "firebase/firestore"
import {React, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { firebaseArray } from "../Redux/firebaseModel"

function QuizMenu() {
    const [hsArray, setHSArray] = useState([]);

    const dispatch = useDispatch()
    const navigation = useNavigate()
    var database = getFirestore();
    
    async function getTopTen() {
        var array = await firebaseArray();
        setHSArray(array)
    }
    
    function setLivesToEasy() {
        dispatch(livesSet(3))
        navigation("/quiz");
    }

    function setLivesToHard() {
        dispatch(livesSet(1))
        navigation("/quiz");
    }

    function navigate() {
        navigation("/pokedex");
    }

    function navigate2() {
        navigation("/menu")
    }

    useEffect(() => {
        getTopTen()
    }, [])

    return (
            <QuizMenuView setLivesToEasy={setLivesToEasy} setLivesToHard={setLivesToHard} 
            navigate={navigate} highscoreArray = {hsArray} navigate2={navigate2}/>
        );
}

export default QuizMenu;