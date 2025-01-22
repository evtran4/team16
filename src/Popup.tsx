import { useState } from 'react'
import './Popup.css'
import ProfileResult from './ProfileResult'
export default function Popup({active, content, setOpened, currentUsers, setUsers}: {active:boolean, content:string, setOpened:Function, currentUsers: Array<{name: string, currentItems: Array}>, setUsers: Function}){
    if(active){
        const [added, setAdded] = useState(currentUsers)

        let tempSearchResults = [
            {name: "Gabe"},
            {name: "Shelly"},
            {name: "Janet"},
            {name: "Guli"}
        ]

        const addUser = (newName:string)=> {
            added.push({name: newName, currentItems: []})
            setAdded([...added])
        }

        if(content == "addMembers"){
            return(
                <div className = "popupContainer">
                    <div className = "popup">
                        <div className="search">
                                <input className="searchbar" type="text" placeholder="Search" />
                                <img className = "backArrow" src={'backArrow.png'} onClick = {() => {setOpened(false)}}></img>
                        </div>

                        <div className = "searchResultContainer">
                            {tempSearchResults.map((profile)=>(
                                <ProfileResult func = {addUser} name = {profile.name}></ProfileResult>
                            ))}
                        </div>



                        <h3>Users:</h3>
                        {added.map((member) => (
                            <p>{member.name}</p>
                        ))}
     
                    </div>
                </div>
            )
        }
    }
    else{
        return ""
    }
}