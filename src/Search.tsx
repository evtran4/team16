import { useState } from 'react';
import BackButton from './backButton';
import ProfileResult from './ProfileResult';
import './Search.css'
import { useLocation, useNavigate } from 'react-router-dom';

let temp = [
    {name: "Evan"},
    {name: "Gabe"},
    {name: "Shelly"},
    {name: "Janet"},
]

export default function Search(){
    let navigate = useNavigate()
    let location = useLocation()
    const [currentlyAdded, setCurrentlyAdded] = useState<string[]>([])
    return(
        <>
        <div className="search">
            <img className = "backArrow" src={'backArrow.png'} onClick = {() => {navigate("/Transaction")}}></img>
            <input className="searchbar" type="text" placeholder="Search" />
          {/* <div className={value === "" ? "search_dropdown_inactive" : "search_dropdown"}>
            <p>hi</p>
          </div> */}
        </div>

        <div className = "searchResultContainer">
            {temp.map((profile)=>(
                <ProfileResult func = {location.state.func} name = {profile.name}></ProfileResult>
            ))}
        </div>

        <h3>Added:</h3>
        {currentlyAdded.map((name)=>{
            <AddedMember name = {name}></AddedMember>
        })}
      </>
    )
}

const AddedMember = ({ name }: { name: string }) => {
    return(
        <ProfileResult func = {()=>{}} name = {name}></ProfileResult>
    )
}