interface ProfileResultProps{
    name: string,
    func: Function
}
export default function ProfileResult({name,func}: ProfileResultProps){
    return(
        <div className = "profileResultContainer" onClick = {()=>{func(name)}}>
            <div className = "profilePicture"></div>
            <p>{name}</p>
        </div>
    )
}