import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ProductCard from '../../componant/cards/ProductCard'
import { AdminNav } from '../../componant/nav/AdminNav'
export const Admindashboard = () => {




    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-md-2'>
                    <AdminNav />

                </div>
                <div className='col-md-6'>
                    <h1>Admin Dashboard</h1>

                    <div className='col'>

                    </div>




                </div>
            </div>

        </div >
    )
}
