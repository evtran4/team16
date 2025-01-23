import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom'
import CreateAccount from './CreateAccount';
import AuthRouter from './App';
import OTPInput from './OTPInput';

let code = ""
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export default function EmailVerification({stepNum, setStepNum, setEmail, setPassword}: any){
  const [signUpStatus, setSignUpStatus] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [otpStatus, setOtpStatus] = useState(false)
  let navigate = useNavigate()
    useEffect(() => {
        if(Cookies.get("auth") == "true"){
            navigate("/CreateAccount")
        }
    })

    function generateCode(){
        let code = ""
        for(let i = 0; i < 4; i++){
            let num = ~~(Math.random() * (10));
            code += num + ""
        }
        return code
    }
    const checkValidEmail = async (email: string) => {
        const raw = await fetch("http://127.0.0.1:8000/checkValidEmail/" + (email == ""? "blank": email))
        let response = await raw.json();
        return response.valid
    }
    const handleVerifyClick = async () => {
        if(emailRegex.test(emailInput)){
            if(await checkValidEmail(emailInput)){
                code = generateCode()
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                const raw = JSON.stringify({
                    "email" : emailInput
                });
        
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                };
        
                const response = await fetch("http://127.0.0.1:8000/email/" + code, requestOptions)
                setOtpStatus(true)
                // document.getElementById("submitButton").disabled = true;
                // document.getElementById("emailBox").disabled = true;
                // document.getElementById("passwordBox").disabled = true;
            }
            else{
                setSignUpStatus("Must register with a valid TerpMail address")
            }
        }
        else{
            setSignUpStatus("This TerpMail address is already in use.")
        }
    };

    const verifyCode = (codeInput) => {
        if(codeInput == code){
            setEmail(emailInput)
            setPassword(passwordInput)
            setStepNum(1)
        }
    }

    return (stepNum == 0)? (
        <>
            <h3>Sign Up</h3>
            <p className = "inputStatus" style = {(signUpStatus == ""? {display: "none"}: {display: "block"})}>{signUpStatus}</p>
            <input id = "emailBox" className = "informationBox" type = "text" placeholder = "Email" onChange = {(e) => {setEmailInput(e.target.value)}}></input>
            <input id = "passwordBox" className = "informationBox" type = "text" placeholder = "Password" onChange = {e => {setPasswordInput(e.target.value)}}></input>
            <button id = "submitButton" className = "submitButton" onClick = {() => {
                //Make sure email is not being used 
                handleVerifyClick(document.getElementById("emailBox").value)
            }}>Create Account</button>
            <OTPInput otpStatus = {otpStatus} setOtpStatus = {setOtpStatus} verifyCode={verifyCode}></OTPInput>
            <Link to="/">Already have an account? Log in</Link>
        </>
    ): ""
};

