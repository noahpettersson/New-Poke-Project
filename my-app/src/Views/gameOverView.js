import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

function GameOver({score, menu, quiz}) {

    return (
    <div>
      <form className="gameOver">
          <img className="gameOverImg" src="https://i.imgur.com/CUD9gTi.png"/>
          <ButtonGroup className="centerBtns">
              <Button variant="contained" sx={{m: 2, p: 4}} onClick = {menu}>Back to menu</Button>
              <Button variant="contained" sx={{m: 2, p: 4}} onClick = {quiz} >Play Again!</Button>
          </ButtonGroup>
          <h2 className="centerTxt">Score: {score}</h2>
      </form>
    </div>
    )
}

export default GameOver;