import { fetchPokemonDetails } from "../pokemonSource";
import QuizView from "../Views/quizView";
import GameOver from "../Views/gameOverView";
import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { lostLives } from "../Redux/livesSlice"
import { incrementScore, resetScore } from "../Redux/scoreSlice"
import MyVerticallyCenteredModal from "../Views/modalView"
import {updateFirebase} from "../Redux/store"
import correctSound from "../Assets/Correct.wav"
import wrongSound from "../Assets/Wrong.wav"
import { useNavigate } from 'react-router-dom'

export default
function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [answer, setAnswer] =  useState();
    const [readyToRender, setReadayRender] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('correct'); // 'correct' or 'incorrect'
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    const navigation = useNavigate();
    const lives = useSelector((state) => state.lives.value);
    const score = useSelector((state) => state.score.value);
    const hearts = [
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
        'https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png',
    ];
    const correctAudio = new Audio(correctSound);
    const wrongAudio = new Audio(wrongSound);

    correctAudio.volume = 0.3
    wrongAudio.volume = 0.3

    async function pokeTemp() {
        let tempData = [];
        for (let i = 0; i < 4; i++) {
            let response = await fetchPokemonDetails(Math.floor(Math.random() * 649)+1);
            tempData[i] = response.data;
        }
        return tempData;
    }

    function anyDups(arr) {
        var valueArr = arr.map(function(item){ return item.name });
        return valueArr.some(function(item, idx){ 
            return valueArr.indexOf(item) !== idx 
        });
    }

    async function generateQuizData() {
        var tempData = await pokeTemp();

        while(anyDups(tempData)) {
            tempData = await pokeTemp();
        }

        setQuizData(tempData);
        setAnswer(tempData[Math.floor(Math.random() * 4)]);
        setReadayRender(true);
    }

    function missingData() {
        function menu() {
            dispatch(resetScore());
            navigation("/menu");
        }

        function quiz() {
            dispatch(resetScore());
            navigation("/quizmenu");
        }

        if (!readyToRender || !answer) {
            return <img className="center" src="https://i.imgur.com/VexuoSc.gif" alt=""/>
        }
        else if (lives === 0) {
            updateFirebase();
            return (
                <div>
                    <div><GameOver score={score} menu={menu} quiz={quiz}/></div>
                </div>
            )
        }
    }

    async function isPokemonCorrect(pokemon) {
        if(pokemon === answer)
            dispatch(incrementScore())
        else {
            dispatch(lostLives())
        }
        generateQuizData()
    }

    function hide(param) {
        if(param === "yes")
            navigation("/Menu")
        else setModalShow(false)
    }

    function typePopup(param) {
        if(param === 'correct')
            setPopupType('correct')
        else
            setPopupType('incorrect')
    }

    function popupShow(param) {
        if(param)
            setShowPopup(true)
        else
            setShowPopup(false)
    }

    function timeout(poke) {
        setTimeout(()=>{
            isPokemonCorrect(poke)
            setLoading(true)
            setIsDisabled(false)
            setShowPopup(false);
      },2000) // 2 seconds
    }

    function checkAnswerACB(poke) {
        if(poke === answer) {
            typePopup('correct')
            setLoading(true)
            correctAudio.play()
        }

        else {
            typePopup('incorrect')
            setLoading(true)
            wrongAudio.play()
        }
        setIsDisabled(true)
        setShowPopup(true)
        timeout(poke)
    }

    useEffect(() => {
        generateQuizData()
    }, [])

    return ( 
        <div>
            {missingData() || <QuizView checkAnswerACB={checkAnswerACB} data={quizData} correct={answer} score={score} checkPokemonCorrect={isPokemonCorrect} 
             resetScore={()=>{dispatch(resetScore())}} setModalShow={setModalShow} lives={lives} isDisabled={isDisabled}
             showPopup={showPopup} setShowPopup={popupShow} popupType={popupType} setPopupType={typePopup} hearts={hearts}
             correctAudio={correctAudio} wrongAudio={wrongAudio} timeout={timeout} loading={loading} setLoading={(param) => setLoading(param)}/>}
             <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={hide}
                    />
        </div>
        
    );
}