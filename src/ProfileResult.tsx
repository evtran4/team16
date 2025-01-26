interface ProfileResultProps{
    name: string,
    func: Function
}
export default function ProfileResult({profile,func}: any){
    return(
        <div className = "profileResultContainer" onClick = {()=>{func(profile)}}>
            <div className = "profilePicture"></div>
            <p>{profile.name}</p>
        </div>
    )
}