import React from 'react';
import { Card, Skeleton } from 'antd';

export const LoadingCard = ({ count }) => {
    const card = () => {
        let totalcard = []

        for (let i = 0; i < count; i++) {
            totalcard.push(
                <Card className='col m-3'>
                    <Skeleton active ></Skeleton>
                </Card>
            )
        }
        return totalcard;
    }


    return <div className='row pb-5'> {card()}</div>








}






