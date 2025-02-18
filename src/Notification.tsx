import { useEffect, useState } from "react"

interface User{
    email: string
    password: string
    name: string
    cookie: string,
    notifications: any[]
}

export default function Notification({user, notification}: any){
    const [name, setName] = useState("Loading...")
    const [paid, setPaid] = useState(false)

    useEffect(()=>{
        if(user.cookie == notification.paymentTo){
            getNameByCookie(notification.paymentFrom)
        }
        else if(notification.paymentTo != -1){
            getNameByCookie(notification.paymentTo)
        }
    })
    const getNameByCookie = async (cookie: string) => {
        const userRawResponse = await fetch("http://127.0.0.1:8000/getUserByCookie/" + cookie)
        let user: User = await userRawResponse.json()
        setName(user.name)
    }

    const sendPayment = async ()=>{
        setPaid(true)
        const userRawResponse = await fetch("http://127.0.0.1:8000/sendPayment/" + notification.id, {
            method: 'DELETE'
        })
    }

    if(paid){
        return ""
    }

    if(notification.paymentTo == -1){
        return(
            <p>You currently have no ongoing payments</p>
        )
    }
    else if(user.cookie == notification.paymentTo){
        return(
            <p className = "notificationText">You requested {name} ${notification.amount}</p>
        )
    }
    else{
        return(
            <div className = "outgoingPaymentContainer">
                <p className = "notificationText">{name} requested ${notification.amount}</p>
                <button onClick = {()=>{
                    sendPayment()
                }}>Pay</button>
            </div>
        )
    }
}