import { useNavigate } from "react-router-dom"
import "./Navbar.css"

export default function NavBar(){
    let navigate = useNavigate()
    return(
        <div className = "navBarContainer">
            <h1 className="titleText">Split.</h1>
            <img className = "icon" src={"settingsIcon.png"} onClick = {()=>{
                navigate("/Settings")
            }}></img>
        </div>
    )
}