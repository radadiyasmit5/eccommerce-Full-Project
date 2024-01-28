import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";


const LoadingToRedirect = () => {
    const [count, setcount] = useState(5)
    const history = useHistory();

    useEffect(() => {

        const interval = setInterval(() => {
            setcount((countupdate) => --countupdate)
            
        }, 1000)

        count === 0 && history.push("/")

      return ()=>  clearInterval(interval)
    },[count])



    return <div className="container p-5 text-center">
        <p>redirecting you in {count}</p>

    </div>

}



export default LoadingToRedirect;