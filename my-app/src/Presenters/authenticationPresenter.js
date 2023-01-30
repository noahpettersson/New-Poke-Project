import React, { useContext,useEffect, useState, useRef } from 'react'
import { signInWithEmailAndPassword , createUserWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth";
import {auth} from '../firebase.js';
import LoginView from '../Views/loginView'
import SignUpView from "../Views/signUpView";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { saveDisplayName } from '../Redux/displayNameSlice.js';
import { updateUser } from '../Redux/userSlice.js';

const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}

export default function Authentication({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    
    const provider = new GoogleAuthProvider();
    const navigation = useNavigate()
    const [view, setView] = useState("si")
    const emailRef = useRef()
    const passwordRef = useRef()
    function toLogin(){setView("si")}
    function toSignup(){setView("su")}

    function signInWGoogle() {
        signInWithPopup(auth, provider).then((result) => {
            dispatch(saveDisplayName(result.user.displayName))
            dispatch(updateUser(result.user.uid))
            setUser(result.user)
            navigation("/Menu")
        }).catch((error)=>{console.log(error)})
     }
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            dispatch(saveDisplayName(result.user.email.substring(0, result.user.email.indexOf("@"))))
            dispatch(updateUser(result.user.uid))
            navigation("/Menu")
            setUser(result.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === "auth/invalid-email")
                alert("Invalid email-address")
            else if(errorCode === "auth/weak-password")
                alert("Weak password, try something more secure")
            else if(errorCode === "auth/email-already-in-use")
                alert("Email already in use")
            console.log(errorCode)

        });
     }
     function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            // Signed in 
            dispatch(saveDisplayName(result.user.email.substring(0, result.user.email.indexOf("@"))))
            dispatch(updateUser(result.user.uid))
            navigation("/Menu")
            setUser(result.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === "auth/wrong-password")
                alert("Wrong password")
            else if(errorCode === "auth/user-not-found")
                alert("User not found, create an account")
            else if(errorCode === "auth/invalid-email")
                alert("Invalid email-address")
        });
     }
     function signOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(saveDisplayName(""))
            dispatch(updateUser(""))
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
     }

    function handleLoginSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            signIn(emailRef.current.value, passwordRef.current.value)
            
        } catch {
            console.log("Couldn't log in")
            setError("failed to log in")
        }
        setLoading(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            signUp(emailRef.current.value, passwordRef.current.value)

        } catch {
            console.log("already signed up")
            setError("failed to create an account")
        }
        setLoading(false)
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setUser(user)
        })
    
        return unsubscribe
    }, [])

    const value = {
        user,
        signUp,
        signIn,
        signInWGoogle,
        signOut
    }

    return (
        <AuthContext.Provider value = {value}>
            
            {!loading && children}
            <div>
                { (!(view === "si") && true ) || <div><LoginView   
                signIn={signIn} signInWGoogle={signInWGoogle} tsu = {toSignup} emailRef={emailRef} passwordRef={passwordRef}
                handleLogin={handleLoginSubmit}/></div>}
                { (!(view === "su") && true ) || <div><SignUpView  tsi = {toLogin} emailRef={emailRef} passwordRef={passwordRef}
                handleSignUp={handleSubmit} signInWGoogle={signInWGoogle}/></div>}
            </div>
        </AuthContext.Provider>
        );
}

