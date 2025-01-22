import { useNavigate } from "react-router-dom"
import ItemCard from "./ItemCard"
import Header from "./Header"
import './Transaction.css'
import { useState } from "react"
import Popup from "./Popup"
const template = [
    {
        name: "Soda",
        price: "1.53",
        id: 0
    },
    {
        name: "Spaghetti",
        price: "21.54",
        id: 1
    },
    {
        name: "Hamburger",
        price: "29.00",
        id: 2
    },
    {
        name: "Pizza slice",
        price: "5.00",
        id: 3
    },
    {
        name: "Steak",
        price: "61.54",
        id: 4
    },
    {
        name: "Side salad",
        price: "4.00",
        id: 5
    },
]

let tempUsers = [
    {
        name: "Evan",
        currentItems: []
    }
]
export default function Transaction(){
    let navigate = useNavigate()
    let totalPrice = 0;
    template.forEach((item)=>{totalPrice += +item.price});
    const [users, setUsers] = useState(tempUsers)
    const [popup, setPopup] = useState(false)

    return(
        <>
            <Popup active={popup} content={"addMembers"} setOpened={setPopup} currentUsers={users} setUsers={setUsers}></Popup>
            <Header text = {"Order Summary"}></Header>
            <div className = "itemsContainer">
            {template.map((item) => (
                <ItemCard name = {item.name} price = {item.price} selectable={false} selectFunction = {() => {}} selected = {false} id = {0}></ItemCard>
            ))}
            </div>
            <h1>Total: ${totalPrice}</h1>
            <h3>Add members: </h3>
            <button onClick = {()=>{setPopup(true)}}>Add people</button>
            <button className = "scanButton" onClick = {()=>{
                navigate("/SplitScreen", {state:{users: users, items: template}})
                }}>Split by item</button>

        </>
    )
}