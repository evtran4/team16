import { useLocation, useNavigate } from "react-router-dom"
import './Finalize.css'
import Cookies from "js-cookie"
export default function Finalize(){
    const location = useLocation()
    const users = location.state.users
    const navigate = useNavigate()

    function createId(){
        let id = ""
        for(let i = 0; i < 50; i++){
            let num = ~~(Math.random() * (10));
            id += num + "" 
        }
        return id;
    }

    const sendRequests = () => {
        users.forEach((user:any)=>{
            if(user.cookie != Cookies.get("user")){
                let id = createId();

                let request = {
                    amount: user.total + "",
                    paymentFrom: user.cookie,
                    paymentTo: Cookies.get("user"),
                    id: id
                }
                console.log(request)
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                  amount: request.amount,
                  paymentFrom: request.paymentFrom,
                  paymentTo: request.paymentTo,
                  id: request.id
                });
                console.log(raw)
              
                const requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                };
                const response =  fetch("http://127.0.0.1:8000/sendTransaction", requestOptions)
            }
        })
    }

    return(
        <div className = "centerContainer">
            <h1>Order Summary</h1>
            <div className = "summaryContainer">
                {users.map((user: any)=>(
                    <>
                        <h2>{user.name}: ${user.total}</h2>
                            {user.currentItems.map((item:any)=>(
                                <p className = "itemText">{item.name}</p>
                            ))}
                    </>
                ))}
            </div>
            <button className = "scanButton" onClick = {()=>{
                sendRequests()
                navigate("/")
                }}>Send</button>
        </div>
    )
}