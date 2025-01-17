import { useEffect, useState } from 'react'
import './Transaction.css'

interface ItemCardProps{
    name: String,
    price: String,
    selectable: Boolean,
    selectFunction: Function
}
export default function ItemCard({name, price, selectable, selectFunction}: ItemCardProps){
    const [selected, setSelected] = useState(false)
    return !selectable ?(
        <div className = "itemCardContainer">
            <p>{name}</p>
            <p>{"$"+ price}</p>
        </div>
    ):
    (
        <div className = "itemCardContainer" style = {selected ? {backgroundColor: "lightgray"}: {backgroundColor: "white"}} onClick = {()=>{selected ? setSelected(false) : setSelected(true)}}>
            <div className = "itemCardColumn">
                <input id="checkBox" type='checkbox' checked = {selected} onChange={() => {
                    selectFunction({name, price})
                    }}></input>  
                <p>{name}</p>
            </div>
            <p>{"$"+ price}</p>
        </div>
    )
    
}