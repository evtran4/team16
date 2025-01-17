import { useEffect, useState } from 'react'
import './Transaction.css'

interface ItemCardProps{
    name: String,
    price: String,
    selectable: Boolean,
    selectFunction: Function,
    selected: boolean,
    id: Number
}
export default function ItemCard({name, price, selectable, selectFunction, selected, id}: ItemCardProps){
    return !selectable ?(
        <div className = "itemCardContainer">
            <p>{name}</p>
            <p>{"$"+ price}</p>
        </div>
    ):
    (
        <div className = "itemCardContainer" style = {selected ? {backgroundColor: "lightgray"}: {backgroundColor: "white"}} onClick = {()=>{
            selectFunction({name, price, id})
        }}>
            <div className = "itemCardColumn">
                <input id="checkBox" type='checkbox' checked = {selected}></input>  
                <p>{name}</p>
            </div>
            <p>{"$"+ price}</p>
        </div>
    )
    
}