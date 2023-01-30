import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {GoogleLoginButton} from "react-social-login-buttons";

export default function LoginView(props) {

  function handleLogin(e) {
    props.handleLogin(e);
  }
    
  return (
    <div>
        <form className="signUp">
            <img className="center" src="https://i.imgur.com/W7J7b8b.png"/>
            <div className="buttons">
                <TextField margin="normal" variant="standard" color="primary" label="Email" placeholder="email@address.com" type="email" inputRef={props.emailRef}/>
                <TextField margin="normal" variant="standard" type="password" label="Password" placeholder="********" inputRef={props.passwordRef}/>
                <Button variant="contained" type="submit" disabled={false} onClick={handleLogin}>Submit</Button>
            </div>
            <label className="centerTxt">Not a member?</label>
            <Button varian="contained" onClick={() => props.tsu()}> Sign up here</Button>
            <GoogleLoginButton className="zoomLess center" onClick={() => props.signInWGoogle()}/>
        </form>
    </div>
  )
}



