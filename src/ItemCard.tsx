import { useEffect } from 'react'
import './Transaction.css'

interface ItemCardProps{
    name: String,
    price: String,
    selectable: Boolean,
    selectFunction: Function
}
export default function ItemCard({name, price, selectable, selectFunction}: ItemCardProps){
        
    return !selectable ?(
        <div className = "itemCardContainer">
            <p>{name}</p>
            <p>{"$"+ price}</p>
        </div>
    ):
    (
        <div className = "itemCardContainer">
            <div className = "itemCardColumn">
                <input id="checkBox" type='checkbox' onChange={() => {
                    selectFunction({name, price})
                    }}></input>  
                <p>{name}</p>
            </div>
            <p>{"$"+ price}</p>
        </div>
    )
    
}