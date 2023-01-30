import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

function SearchView(props) {
    function navigate() {
        props.navigation();
    }

    function navQuiz() {
        props.nav();
    }

    function setSearchTextACB(txt) {
        props.searchPokemon(txt.target.value);
    }

    function nextPage() {
        props.nextPokemon(1);
    }

    function previousPage() {
        props.previousPokemon(0);
    }

    function handleKeypress(event) {
        props.handlePress(event)
    }

  return (
    <div>
        <TextField  className=""
                    margin="normal"
                    placeholder="e.g. Blastoise"
                    label="Search" onChange={setSearchTextACB}
                    onKeyPress={handleKeypress}
                    InputProps={{
                        style: { backgroundColor: '#ffffff' },
                    }}></TextField>
       <div>
           <ButtonGroup>
               <Button sx={{m: 1, p: 1}} variant="contained" className="centerBtns" onClick ={previousPage} 
                       disabled={props.prev === null} >Previous page</Button>
               <Button sx={{m: 1, p: 1}} variant="contained" className="" onClick ={nextPage} 
                       disabled={props.next === null} >Next page</Button>
           </ButtonGroup>
           <Button sx={{m: 1, p: 1}} variant="contained" className="menuBtnSearch" onClick = {navigate}>Menu!</Button>
           <Button sx={{m: 1, p: 1}} variant="contained" className="menuBtnSearch" onClick = {navQuiz}>Quiz!</Button>
       </div>
    </div>
  )
}

export default SearchView;

