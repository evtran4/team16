import { useEffect, useState } from 'react'
import './Popup.css'
import ProfileResult from './ProfileResult'
export default function Popup({active, content, setOpened, currentUsers, setUsers}: any){
    if(active){
        const [added, setAdded] = useState(currentUsers)
        const [search, setSearch] = useState("")
        const [searchResults, setSearchResults] = useState<any[]>([])

        const addUser = (profile:any)=> {
            added.push({name: profile.name, cookie: profile.cookie, total: 0, currentItems: []})
            setSearch("")
            setAdded([...added]);
        }

        const checkAdded = (profile: any) => {
            for(let i= 0; i<added.length; i++){
                if(added[i].cookie == profile.cookie){
                    return true;
                }
            }
            return false;
        }

        useEffect(()=>{
            if(search != ""){
                const fetchSearch = async ()=>{
                    const userBatchRaw = await fetch("http://127.0.0.1:8000/searchUser/" + search)
                    setSearchResults(await userBatchRaw.json())
                }
                fetchSearch()
            }
        },[search])

        if(content == "addMembers"){
            return(
                <div className = "popupContainer">
                    <div className = "popup">
                        <div className="search">
                                <input className="searchbar" type="text" value = {search} placeholder="Search" onChange={((e)=>{setSearch(e.target.value)})}/>
                                <img className = "backArrow" src={'backArrow.png'} onClick = {() => {setOpened(false)}}></img>
                        </div>

                        <div className = "searchResultContainer">
                        {searchResults.filter((profile) => !checkAdded(profile)).map((profile) => {
                            if(search != ""){
                                return(
                                    <ProfileResult func={addUser} profile={profile}/>
                                )
                            }
                         })}
                        </div>



                        <h3>Users:</h3>
                        {added.map((member: any) => (
                            <p>{member.name}</p>
                        ))}

                        <button onClick = {()=>{
                            setUsers(added)
                            setOpened(false)
                        }}>Done</button>
     
                    </div>
                </div>
            )
        }
    }
    else{
        return ""
    }
}