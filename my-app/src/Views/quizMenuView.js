import Button from '@mui/material/Button'

function QuizMenuView( {setLivesToEasy, setLivesToHard, highscoreArray, navigate, navigate2} ) {

  function livesEasy() {
      setLivesToEasy()
  }

  function livesHard() {
      setLivesToHard()
  }

  function redirect() {
      navigate()
  }

  function redirect2() {
    navigate2()
  }

  function renderHighscore(usr) {
    return (
           <h3 key = {usr.name} id={usr.displayName} className="centerTxt">
                {usr.name} : {usr.score} 
            </h3> 
    );
  }
    
    return (
      <div className="quizMenu">
          <form className="menu">
              <h1 className="title">POKÉMON QUIZ</h1>
              <h3 className="centerTxt1">Welcome to the ultimate Pokémon quiz!</h3>
              <h3 className="centerTxt1">Your task is to guess the correct Pokémon based on its image</h3>
              <h3 className="centerTxt1">Are you the next Pokémon master?</h3>
              <div className="centerBtn">
                  <h3 className="centerTxt">Please choose difficulty:</h3>
                  <img className="zoomLess menuImg" src="https://i.imgur.com/rF7RRUK.png" onClick = {livesEasy} ></img>
                  <img className="zoomLess menuImg" src="https://i.imgur.com/oQCcTZk.png" onClick = {livesHard}></img>
              </div>

              <div width="100px" className="centerTxt">
                  <Button  sx={{m: 1, p: 1}} variant="contained" className="centerBtns" onClick={redirect}>Go to Pokédex</Button>
                  <Button  sx={{m: 1, p: 1}} variant="contained" className="" onClick={redirect2}>Go to Menu</Button>
              </div>
              </form>
          <form className="menu highscoreScroll">
                <h1 className="centerTxt">SCOREBOARD</h1>
                {highscoreArray.sort((a,b) => {return b.score-a.score}).map(renderHighscore)}
          </form>
      </div>
    );

}

export default QuizMenuView;