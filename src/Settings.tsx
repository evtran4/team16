import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
export default function Settings(){
    let navigate = useNavigate()

    return(
        <>
        <img className = "backIcon" src = "backArrow.png" onClick = {()=>{navigate("/")}}></img>
            <div className = "mainButtonContainer">
                <button className = "scanButton" onClick = {()=>{
                    Cookies.remove("user")
                    navigate("/Login")
                }}>Logout</button>
            </div>
        </>
    )
}