
import { useEffect, useState } from 'react'
import './Homepage.css'
import NavBar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Notification from './Notification'

interface User{
    email: string
    password: string
    name: string
    cookie: string,
    notifications: any[]
}
const loading: User = {
    name: "Loading...",
    password: "",
    cookie: "",
    email: "",
    notifications: []
}

interface Notification{
    amount: string
    paymentFrom: string
    paymentTo: string
    id: string
}



export default function Homepage(){
    const navigate = useNavigate()
    const [user,setUser] = useState<User>(loading)

    //-1 signifies none
    const [incoming, setIncoming] = useState<any[]>([])
    const [outgoing, setOutgoing] = useState<any[]>([])

    useEffect(()=>{
        if(Cookies.get("user") == null){
            navigate("/Login")
        }
        else{
            fetchData()
        }
    },[])

    useEffect(()=>{
       getNotifications()
    },[user])

    async function fetchData(){
        const userRawResponse = await fetch("http://127.0.0.1:8000/getUserByCookie/" + Cookies.get("user"))
        let tempUser = await userRawResponse.json();
        if(tempUser.cookie == "-1"){
            navigate("/Login")
        }
        else{
            await setUser(tempUser)
        }
    }

    const getNotifications = () => {
        let tempIncoming: any = []
        let tempOutgoing: any = []

        user.notifications.forEach((notification) => {
            if(notification.paymentTo == user.cookie){
                tempIncoming.push(notification)
            }
            else{
                tempOutgoing.push(notification)
            }
        })

        if(tempIncoming.length > 0){
            setIncoming(tempIncoming)
        }
        else{
            setIncoming([{paymentTo: -1}])
        }

        if(tempOutgoing.length > 0){
            setOutgoing(tempOutgoing)
        }
        else{
            setOutgoing([{paymentTo: -1}])
        }
    }

    

    return(
        <>
            <NavBar></NavBar>
            <div className = "mainButtonContainer">
            <button className = "scanButton" onClick = {() => {
                    if(user != loading){
                        navigate("/Camera", {state:{user: user}})
                    }
                    }}>Split!</button>
                <p>Hi {user.name}! Split any bill by scanning it with your camera and adding users to split with!</p>
            </div>


            <div className = "notificationsContainer">
                <h3 className = "notificationHeader">Payment Requests:</h3>
                <div className = "notifications">
                    {outgoing.map((notification)=>(
                        <Notification user = {user} notification = {notification}></Notification>
                    ))}
                </div>
            </div>

            <div className = "notificationsContainer">
                <h3 className = "notificationHeader">Awaiting payments:</h3>
                <div className = "notificatiois">
                    {incoming.map((notification)=>(
                        <Notification user = {user} notification = {notification}></Notification>
                    ))}
                </div>

            </div>
        </>
    )
}