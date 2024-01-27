import React from 'react';
import Jumbotron from '../componant/cards/Jumbotron';

import NewArrivals from '../componant/home/NewArrivals';
import BestSeller from '../componant/home/BestSeller'
import { Catagorylist } from '../componant/catagory/Catagorylist';
export const Home = () => {
    return (
        <>
            <div className='jumbotron p-5 text-center text text-danger h1 font-weight-bold bg-light'   >
                <Jumbotron text={['New Arrivals', 'Best Sellers']} />
            </div>
            <div className='  jumbotron p-3 text-center display-4  h4  mb-5 mt-5 bg-light'   >
                New Arrivals
            </div>

            <NewArrivals />
            <div className='  jumbotron p-3 text-center display-4  h4  mb-5 mt-5 bg-light'   >
                Best Sellers
            </div>

            <BestSeller />
            <Catagorylist />

        </>

    )
}

export default Home