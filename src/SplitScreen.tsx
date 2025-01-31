import { useLocation, useNavigate } from "react-router-dom"
import ItemCard from "./ItemCard"
import { useEffect, useState } from "react"
import Header from "./Header"


interface Item{
    name: String,
    price: String,
    id: Number,
}

let currUserIndex = 0

export default function SplitScreen(){
    const location = useLocation()
    const navigate = useNavigate()
    const [items, setItems] = useState(location.state.items);
    const [currTotal, setCurrTotal] = useState(0);

    const [selectedArr, setSelectedArr] = useState<Set<Number>>(new Set<Number>);

    const [currUser, setCurrUser] = useState(location.state.users[currUserIndex])

    const resetItems = () => {
        let temp = new Array<Item>()
        items.forEach((item: Item) =>{
            if(!selectedArr.has(item.id)){
                temp.push(item)
            }
        })
        setItems(temp)
        setSelectedArr(new Set<Number>)
    }


    const changeItems = (item: Item) => {
        if(selectedArr.has(item.id)){
            selectedArr.delete(item.id)
        }
        else{
            selectedArr.add(item.id)
        }
        const temp = new Set<Number>()
        selectedArr.forEach((id:Number) => {temp.add(id)})
        calculateUserTotal()
    }


    const calculateUserTotal = () => {
        let total = 0;
        selectedArr.forEach((id: Number)=>{
            let item = items.find((item:Item) => item.id == id)
            total += +item.price
        })
        setCurrTotal(Math.round(total * 100)/100)
    }


    useEffect(()=>{
        calculateUserTotal()
    },[currUser])

    return(
        <>
            <Header text={currUser.name}></Header>
            <div className = "itemsContainer">
                {items.map((item: Item, index: number) => (
                    <ItemCard name = {item.name} price = {item.price} selectable = {true} selectFunction = {changeItems} selected={selectedArr.has(item.id)} id = {item.id} ></ItemCard>
                ))}
            </div>
            <h3>{currUser.name}'s total: {"$" + currTotal}</h3>
            <div className = "mainButtonContainer">
                <button className = "scanButton" onClick = {()=>{
                    selectedArr.forEach((id: Number)=>{
                        let item = items.find((item:Item) => item.id == id)
                        currUser.currentItems.push(item)
                    })
                    currUser.total = currTotal;

                    if(currUserIndex < location.state.users.length-1){
                        resetItems()
                        setCurrUser(location.state.users[++currUserIndex]);
                    }
                    else{
                        navigate("/Finalize", {state:{users: location.state.users}})
                    }
                }}>Next</button>
            </div>
        </>
    )
}