import { useNavigate } from "react-router-dom"
import ItemCard from "./ItemCard"
import './Transaction.css'
import { useState } from "react"
const template = [
    {
        name: "Soda",
        price: "1.53"
    },
    {
        name: "Spaghetti",
        price: "21.54"
    },
    {
        name: "Hamburger",
        price: "29.00"
    },
    {
        name: "Pizza slice",
        price: "5.00"
    },
    {
        name: "Beef Wellington",
        price: "61.54"
    },
    {
        name: "Side salad",
        price: "4.00"
    },
]

let tempUsers = [
    {
        name: "Shelly",
        currentItems: []
    },
    {
        name: "Janet",
        currentItems: []
    },
    {
        name: "Gabe",
        currentItems: []
    }
]
export default function Transaction(){
    let navigate = useNavigate()
    let totalPrice = 0;
    template.forEach((item)=>{totalPrice += +item.price});
    const [users, setUsers] = useState(tempUsers)
    return(
        <>
            <div className = "itemsContainer">
            {template.map((item) => (
                <ItemCard name = {item.name} price = {item.price} selectable={false} selectFunction = {() => {}}></ItemCard>
            ))}
            </div>
            <h1>Total: ${totalPrice}</h1>
            <h3>Members added: Shelly, Janet, Gabe</h3>
            <button className = "scanButton" onClick = {()=>{
                navigate("/SplitScreen", {state:{users: users, items: template}})
                }}>Split by item</button>
                <p>Pass the device to each person for them to select their items</p>
        </>
    )
}