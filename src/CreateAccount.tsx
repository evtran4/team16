
import Cookies from 'js-cookie'
import AuthRouter from './App';
import {useNavigate, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import OTPInput from './OTPInput.tsx';
import EmailVerification from './EmailVerification.tsx';
import './CreateAccount.css'
let account = {
    email: "",
    password: "",
    name: "",
    cookie: "",
    notification: ""
}

function createCookie(){
    let cookie = ""
    for(let i = 0; i < 50; i++){
        let num = ~~(Math.random() * (10));
        cookie += num + "" 
    }
    Cookies.set("user", cookie.toString(), {expires: 1})
    account.cookie = cookie.toString();
}

function createAcc(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "name": account.name,
      "email": account.email,
      "password": account.password,
      "likes": [],
      "seen": [],
      "cookie": account.cookie
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const response =  fetch("http://127.0.0.1:8000/createAccount", requestOptions)
}

export default function CreateAccount(){
    const [stepNum, setStepNum] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        account.email = email
        account.password = password
    }, [email, password])

    return(
        <>
        {stepNum != 0? <ProgressBar step = {stepNum} steps = {3}></ProgressBar> : ""}
        <div className = "accountSetupContainer">
            <EmailVerification 
                setStepNum = {setStepNum} 
                stepNum = {stepNum} 
                setEmail = {setEmail}
                setPassword = {setPassword}/>
            <Info
                setStepNum = {setStepNum} 
                stepNum = {stepNum}/>
            <Finalize
                setStepNum = {setStepNum} 
                stepNum = {stepNum}
                navigate = {navigate}/>
        </div>
        </>
    )
}

function Info({stepNum, setStepNum}: any){
    const [inputStatus, setInputStatus] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const tags: any = []
    return (stepNum == 1)?(
        <>
            <h3>What's your name?</h3>
            <p className = "inputStatus" style = {(inputStatus == ""? {display: "none"}: {display: "block"})}>{inputStatus}</p>
            <div className = "nameInputContainer">
                <input id = "firstName" className = "informationBox" type = "text" onChange = {(e)=>{setFirstName(e.target.value)}} placeholder = "First Name"></input>
                <input id = "lastName" className = "informationBox" type = "text" onChange = {(e)=>{setLastName(e.target.value)}} placeholder = "Last Name"></input>
            </div>

            <button className = "submitButton" onClick = {() => {
                let value = firstName + lastName
                if(value.length >= 2){
                    account.name = value;
                    setStepNum(2); 
                }
                else{
                    setInputStatus("Your name cannot be empty.")
                }
            }}>Submit</button>
        </>
    ): ""
}

// function Button({option, tags, limit}: any){
//     const [selected, setSelected] = useState(false);
    
//     return(
//         <button className = "buttonOption" style = {selected ? {backgroundColor: "#f07585"} : {backgroundColor: "gainsboro"}} onClick = {() => {
//             if(tags.length < limit && selected == false){
//                 setSelected(!selected)
//                 tags.push(option)
//             }
//             else if(selected == true){
//                 setSelected(!selected)
//                 tags.splice(tags.indexOf(option), 1)
//             }
//         }}>{option}</button>
//     )
// }


function Finalize({stepNum, navigate}: any){
    return (stepNum == 6)? (
        <>
            <h3>Finalize!</h3>
            <button className = "submitButton" onClick = {() => {
                createCookie();
                createAcc();
                navigate("/")
                }}>Create Account</button>
            <p>Once you create an account, your Terpmail address cannot be used again.</p>
        </>
    ): ""
}

