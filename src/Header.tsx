interface HeaderProps{
    text: string
}
export default function Header({text}: HeaderProps){
    return(
        <div className = "headerContainer">
            <h1 className = "headerText">{text}</h1>
        </div>
    )
}