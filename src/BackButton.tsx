import { useNavigate } from "react-router-dom";
import './BackButton.css'

export default function BackButton(){
    const navigate = useNavigate();
    return(
        <div className = "backButtonContainer">
            <img className = "backArrow" src={'backArrow.png'}></img>
        </div>
    )
}