import Button from '@mui/material/Button'
import {ButtonGroup} from "@mui/material";

export default
function QuizView(props) {

    function imageLoaded() {
        props.setLoading(false)
    }

    return (
        <div className="container">
            <form className="game">
                <Button className="giveUpBtn" variant="contained" onClick={() => props.setModalShow(true)}>Menu!</Button>
                <div id="game" className="justify-center flex-column">
                    <h2 className="center" id="question">What is the name of this pokemon?</h2>
                    <div className="centerTxt">
                        <div style={{display: props.showPopup ? "block" : "none"}}>
                            <img
                                className="centerImg"
                                src={props.popupType === 'correct' ? 'https://media1.giphy.com/media/13G7hmmFr9yuxG/giphy.gif' : 'https://media0.giphy.com/media/uWPGqy4rkgllS/giphy.gif'}
                                height="200"
                                width="200"
                            ></img>
                        </div>
                        
                        <div style={{display: props.showPopup ? "none" : "block"}}>
                             <div 
                                style={{display: props.loading ? "block" : "none"}} 
                                className="forAni loadingQuiz centerImg">    
                            </div>

                            <img id="answerImage" style={{display: props.loading ? "none" : "block"}}
                                className="center"
                                onLoad={imageLoaded}
                                src={props.correct.sprites.other.dream_world.front_default}
                                height="200"
                                width="200"
                            ></img> 
                        </div>  
                        
                    </div>
                    <div className="centerBtnsQuiz">{props.data.map(renderChoice)}</div>
                </div>
                <div id="score" >Score: {props.score}</div>
                <div className="livesImg">
                    LIVES:
                    {props.hearts.slice(0, props.lives).map(heart => (
                        <img key={"id" + Math.random().toString(16).slice(2)} height="30" width="30" src={heart} alt="Heart" />
                    ))}
                </div>
            </form>
            
        </div>
    )

    function renderChoice(poke) {
        return (
            <div key={poke.id} className="choice-container">
                <ButtonGroup>
                    <Button variant="contained" sx={{m: 2, p: 4}} id = {poke.id}
                            onClick={() => props.checkAnswerACB(poke)}
                            className="choice-text"
                            disabled={props.isDisabled}
                    >{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}