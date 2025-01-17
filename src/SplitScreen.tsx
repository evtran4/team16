import { useLocation } from "react-router-dom"
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
    const [items, setItems] = useState(location.state.items);
    const [currTotal, setCurrTotal] = useState(0);

    const [selectedArr, setSelectedArr] = useState<Set<Number>>(new Set<Number>);

    const [currUser, setCurrUser] = useState(location.state.users[currUserIndex])

    useEffect(()=>{
        console.log("changed")
    },[selectedArr])

    // const findItem = (itemToFind: Item) => {
    //     for(let i =0; i < currUser.currentItems.length; i++){
    //         let currItem = currUser.currentItems[i]

    //         if(currItem.name == itemToFind.name && currItem.price == itemToFind.price){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

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

    // const removeItem = (itemToRemove: Item) => {
    //     let index = 0;
    //     for(let i =0; i < selectedArr.size; i++){
    //         let currItem = currUser.currentItems[i]
    //         if(currItem.name == itemToRemove.name && currItem.price == itemToRemove.price){
    //             index = i;
    //         }
    //     }
    //     selectedArr.delete(itemToRemove.id)
    //     setSelectedArr(selectedArr)
    //     currUser.currentItems.splice(index,1)
    // }

    const changeItems = (item: Item) => {
        console.log(selectedArr)
        if(selectedArr.has(item.id)){
            selectedArr.delete(item.id)
        }
        else{
            selectedArr.add(item.id)
        }
        const temp = new Set<Number>()
        selectedArr.forEach((id:Number) => {temp.add(id)})
        setSelectedArr(temp)
        calculateUserTotal()
        console.log(selectedArr)
    }


    const calculateUserTotal = () => {
        let total = 0;
        selectedArr.forEach((id: Number)=>{
            total += +(items.find((item:Item) => item.id == id)).price
        })
        setCurrTotal(total)
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
            <button className = "scanButton" onClick = {()=>{
                resetItems()
                setCurrUser(location.state.users[++currUserIndex]);
            }}>Next</button>
        </>
    )
}