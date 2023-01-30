import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {GoogleLoginButton} from "react-social-login-buttons";

export default function SignUpView(props) {

    function handleSubmit(e) {
        props.handleSignUp(e)
    }
    
    return (
        <div>
            <form className="signUp">
                <img className="center" src={"https://i.imgur.com/U5o0YxZ.png"} width="70%"/>
                <div className="buttons">
                    <TextField margin="normal" variant="standard" color="primary" label="Email" placeholder="email@address.com" type="email" inputRef={props.emailRef}/>
                    <TextField margin="normal" variant="standard" type="password" label="Password" placeholder="********" inputRef={props.passwordRef}/>
                    <Button variant="contained" type="submit" disabled={false} onClick={handleSubmit} >Submit</Button>
                </div>
                <label className="centerTxt">Already signed up?</label>
                <Button varian="contained" onClick={() => props.tsi()}> Log in here</Button>
                <GoogleLoginButton className="zoomLess center" onClick={() => props.signInWGoogle()}/>
                
            </form>
        </div>
  )
}



