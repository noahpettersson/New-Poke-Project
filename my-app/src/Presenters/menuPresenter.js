import MenuView from "../Views/menuView"
import { useDispatch } from 'react-redux'
import { resetScore } from "../Redux/scoreSlice"
import React from "react"
import { useNavigate } from 'react-router-dom'

function Menu() {
    const dispatch = useDispatch()
    const navigation = useNavigate()

    function redirect(param) {
        if(param === "/pokedex")
            navigation(param)
        else if(param === "/quizmenu")
            navigation(param)
        else
            console.log("something went wrong")
    }

    function signout() {
        navigation("/")
    }

    React.useEffect(() => {dispatch(resetScore());}, [])

    return (
        <div>
           <MenuView redirect={redirect} logout={signout}/>
        </div>
    );
}

export default Menu;