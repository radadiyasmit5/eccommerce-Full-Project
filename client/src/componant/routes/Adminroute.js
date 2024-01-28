import React,{useState,useEffect} from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../../functions/Axios'


const Adminroute = ({ element, ...rest }) => {
    
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setok] = useState(false)

  useEffect(() => {
     if (user && user.token) {
        currentAdmin(user.token).then((response) => {
            setok(true)
        }).catch((err) => {
            console.log(err);
        })
    }
      
  }, [user])

   
    return ok ? (<Route {...rest} />) : (<LoadingToRedirect/>)
}


export default Adminroute