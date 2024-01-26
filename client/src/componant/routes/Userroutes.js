import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'


const Userroutes = ({element,...rest}) => {
    console.log({...rest},"rest");
    console.log(element);
    const { user } = useSelector((state) => ({ ...state }))
  
    return user && user.token ? (<Route {...rest} />) : (<LoadingToRedirect/>)
}


export default Userroutes