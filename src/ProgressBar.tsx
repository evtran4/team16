export default function ProgressBar({step, steps}: any){
    return(
        <div className = "outerProgressBar">
            <div className = "innerProgressBar" style = {{width: (step / steps)*100 + "%"}}></div>
        </div>
    )
}