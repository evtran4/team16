
import './Homepage.css'
import NavBar from './Navbar'
export default function Homepage(){
    return(
        <>
                <button className = "scanButton">Scan a bill</button>
                <p>Split any bill by scanning it with your camera, adding users to split with!</p>

                <div className = "notificationsContainer">
                    <h3 className = "notificationHeader">Unpaid requests:</h3>
                    <p>You currently have no unpaid requests</p>
                </div>

                <div className = "notificationsContainer">
                    <h3 className = "notificationHeader">Ongoing payments:</h3>
                    <p>You currently have no ongoing payments</p>
                </div>

                <NavBar></NavBar>
        </>
    )
}