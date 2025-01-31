import { useLocation, useNavigate } from "react-router-dom"
import ItemCard from "./ItemCard"
import Header from "./Header"
import './Transaction.css'
import { useEffect, useState } from "react"
import Popup from "./Popup"
import NavBar from "./Navbar"

// const template = [
//     {
//         name: "Soda",
//         price: "1.53",
//         id: 0
//     },
//     {
//         name: "Spaghetti",
//         price: "21.54",
//         id: 1
//     },
//     {
//         name: "Hamburger",
//         price: "29.00",
//         id: 2
//     },
//     {
//         name: "Pizza slice",
//         price: "5.00",
//         id: 3
//     },
//     {
//         name: "Steak",
//         price: "61.54",
//         id: 4
//     },
//     {
//         name: "Side salad",
//         price: "4.00",
//         id: 5
//     },
// ]



interface User{
    email: string
    password: string
    name: string
    cookie: string
}
const loading: User = {
    name: "Loading...",
    password: "",
    cookie: "",
    email: ""
}

export default function Transaction(){
    let navigate = useNavigate()
    let location = useLocation()
    let template: any[] = location.state.items
    let totalPrice = 0;
    template.forEach((item)=>{totalPrice += +item.price});

    console.log(template)
    const user = location.state.user;
    const [users, setUsers] = useState<any[]>([{name:user.name, cookie: user.cookie, total: 0, currentItems:[]}])
    const [popup, setPopup] = useState(false)
    const [addedStr, changeAddedStr] = useState(user.name)

    useEffect(()=>{
        let newString = ""
        users.forEach((user: User)=>{
            newString += user.name + ", "
        })

        newString = newString.substring(0, newString.length - 3)
        changeAddedStr(newString)
    },[users])

    console.log(users)
    return(
        <>
            <Popup active={popup} content={"addMembers"} setOpened={setPopup} currentUsers={users} setUsers={setUsers}></Popup>
            <Header text={"Order Summary"}></Header>
            <div className = "itemsContainer">
            {template.map((item) => (
                <ItemCard name = {item.name} price = {item.price} selectable={false} selectFunction = {() => {}} selected = {false} id = {0}></ItemCard>
            ))}
            </div>
            <h2 style={{textAlign: "center"}}>Total: ${totalPrice}</h2>
            <h3 className = "addHeader">Add members: </h3>
            <div className = "addedUsersContainer">
                <p className = 'addedText'>{addedStr}</p>
                <button className = "addButton" onClick = {()=>{setPopup(true)}}>Add</button>
            </div>

            <div className = "mainButtonContainer">
                <button className = "scanButton" onClick = {()=>{
                    navigate("/SplitScreen", {state:{users: users, items: template}})
                    }}>Split by item</button>
            </div>
        </>
    )
}