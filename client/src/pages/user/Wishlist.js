import React from 'react'
import { DashboardPageHeading } from '../../componant/DashboardPageHeading'
import DashboardPageWrapper from '../../componant/DashboardPageWrapper'
import SliderCompoment from '../../componant/nav/SliderCompoment'
import UserNav from '../../componant/nav/UserNav'
export const Wishlist = () => {
    return (
        <>
          <DashboardPageWrapper>
            {/* <div > */}
            {/* <AdminNav /> */}
            <SliderCompoment isAdmin={false}/>
            {/* </div> */}
            <div className="col slider-rightSide-container">
              <DashboardPageHeading heading={"user wishlist"} />
    
              <div className='col'> <h1>user wishlist</h1></div> *
            </div>
          </DashboardPageWrapper>
        </>
      )
}

{/* <div className='col'> <h1>user wishlist</h1></div> */}