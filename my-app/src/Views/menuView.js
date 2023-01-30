import Button from '@mui/material/Button'

function MenuView(props) {
    function logout() {
        props.logout();
    }

    return (
        <div className="flexParent bg-container">
            <img className="pokedexPicture zoom" 
            src="https://i.imgur.com/CacqcJ7.png"
            onClick={() => {props.redirect("/pokedex")}}></img>
            <img className="quizPicture zoom" 
            src="https://i.imgur.com/IIYbbbg.png"
            onClick={() => {props.redirect("/quizmenu")}}></img>
            <Button variant="contained" className="logout" onClick={logout}>Logout</Button>
        </div>
    );
}

export default MenuView;