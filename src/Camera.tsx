import React, {useRef, useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './Camera.css'
export default function Camera(){
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const videoStreamRef: any = useRef(null)
    let user = location.state.user
    let items: any = []
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {width: 500, height: 656,facingMode: { exact: "environment" }}
        })
        .then(stream => {
            videoStreamRef.current = stream
            let video = videoRef.current
            video.srcObject = stream
            video.play()
        })
        .catch(err => {
            console.log("error")
        })
    }

    const takePhoto = () => {
        const width =  500;
        const height = 656;

        let video = videoRef.current
        let photo = photoRef.current

        photo.width = width
        photo.height = height

        let ctx = photo.getContext('2d')

        ctx.drawImage(video, 0, 0, width, height)
        setHasPhoto(true)




         // Convert the canvas to a Blob
         photo.toBlob((blob: any) => {
            if (blob) {
                // Create a FormData object
                const formData = new FormData();
                formData.append("file", blob, "photo.jpg"); // Use "file" as the key
        
                // Send the image to the server
                fetch("http://127.0.0.1:8000/getItems", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Image processed successfully:", data);
                        items = data.items
                    })
                    .then(()=>{
                        videoStreamRef.current.getTracks().forEach((track: any) => {
                            track.stop()
                            console.log("Track stopped:", track)
                        })
                        
                        navigate("/Transaction", {state:{user: user, items: items}})
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                    });
            }
        }, "image/jpeg");
    };
    
    useEffect(() => {
        getVideo()
        return () => {
            if (videoStreamRef.current) {
                // console.log("Stopping video stream...");
                videoStreamRef.current.getTracks().forEach((track: any) => {
                    track.stop()
                    // console.log("Track stopped:", track)
                })
            }
        }
    }, [])

    return(
        <>
            <div className = "centerContainer">
                <div className = "camera">
                    <video ref = {videoRef}></video>
                </div>
            </div>

            <div className = "mainButtonContainer">
                <canvas  style = {{display: "none"}}ref = {photoRef}></canvas>
                <button className = "scanButton" onClick = {takePhoto}>SCAN</button>
            </div>
        </>
    )
}