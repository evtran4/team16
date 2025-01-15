import { useLocation } from "react-router-dom"
import ItemCard from "./ItemCard"
import { useEffect, useState } from "react"
import Header from "./Header"


interface Item{
    name: String,
    price: String
}

let currUserIndex = 0

export default function SplitScreen(){
    const location = useLocation()
    const [items, setItems] = useState(location.state.items);
    const [currTotal, setCurrTotal] = useState(0);
    const [currUser, setCurrUser] = useState(location.state.users[currUserIndex])

    const findItem = (itemToFind: Item) => {
        for(let i =0; i < currUser.currentItems.length; i++){
            let currItem = currUser.currentItems[i]

            if(currItem.name == itemToFind.name && currItem.price == itemToFind.price){
                return true;
            }
        }
        return false;
    }

    const resetItems = () => {
        let tempArr = items
        let index = -1;
        for(let i =0; i<currUser.currentItems.length; i++){
            let itemToRemove: Item = currUser.currentItems[i]
            for(let j = 0; j<items.length; j++){
                let currItem: Item = items[j]
                if(currItem.name == itemToRemove.name && currItem.price == itemToRemove.price){
                    index = j;
                }
            }
            if(index != -1){
                tempArr.splice(index, 1)
                setItems(tempArr)
            }
            index = -1
        }
    }

    const removeItem = (itemToRemove: Item) => {
        let index = 0;
        for(let i =0; i < currUser.currentItems.length; i++){
            let currItem = currUser.currentItems[i]
            if(currItem.name == itemToRemove.name && currItem.price == itemToRemove.price){
                index = i;
            }
        }

        currUser.currentItems.splice(index,1)
    }

    const changeItems = (item: Item) => {
        if(findItem(item)){
            removeItem(item)
        }
        else{
            currUser.currentItems.push(item)
        }
        calculateUserTotal()
    }

    const calculateUserTotal = () => {
        let total = 0;
        currUser.currentItems.forEach((item: Item)=>{total+= +item.price})
        setCurrTotal(total)
    }


    useEffect(()=>{
        calculateUserTotal()
    },[currUser])

    return(
        <>
            <Header text={currUser.name}></Header>
            <div className = "itemsContainer">
                {items.map((item: Item) => (
                    <ItemCard name = {item.name} price = {item.price} selectable = {true} selectFunction = {changeItems}></ItemCard>
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