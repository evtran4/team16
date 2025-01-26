import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Cookies from "js-cookie"
export default function Login(){
    const [email, setEmail] = useState("blank")
    const [password, setPassword] = useState("blank")
    const [loginStatus, setLoginStatus] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        const response = await fetch("http://127.0.0.1:8000/getUserByLogin/" + email + "/" + password)
        const user = await response.json()
        if(user.cookie != "-1"){
            console.log(user)
            Cookies.set("user", user.cookie)
            navigate("/")
        }
        else{
            setLoginStatus("Could not find an account with this login")
        }
    }
    return(
        <div className = "centerContainer">
            <div className = "accountSetupContainer">
                <h3>Login</h3>
                <p className = "inputStatus" style = {(loginStatus == ""? {display: "none"}: {display: "block"})}>{loginStatus}</p>
                <input id = "createBox" className = "informationBox" type = "text"  placeholder = "Email" onChange = {(e)=>{setEmail(e.target.value)}}></input>
                <input id = "createBox" className = "informationBox" type = "password"  placeholder = "Password" onChange = {(e)=>{setPassword(e.target.value)}}></input>
                <button className = "submitButton" onClick = {() => {
                    handleLogin();
                }}>Log in</button>
                <Link to="/CreateAccount">Don't have an account? Sign up Here</Link>
            </div>
        </div>
    )
}