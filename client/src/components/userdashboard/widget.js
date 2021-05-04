import React, { useState,useEffect } from 'react';
import { getPurchase } from '../../redux/action/purchaseAction';
import { getReward } from '../../redux/action/rewardAction';
import { useDispatch, useSelector } from 'react-redux'

const Widget = () => {

    const dispatch = useDispatch();
    let purchase = useSelector(state => state.purchase)
    const reward = useSelector(state => state.reward)

    useEffect(() => {

        dispatch(getPurchase());
        dispatch(getReward());

    }, [])
    

    return (
        <div>
            <div className="row">
                <div className="col-lg-4 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                             <p>จำนวนครั้งที่ซื้อ</p>
                            <h3>{purchase.data.length}</h3>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
        
                    </div>
                </div>
                <div className="col-lg-4 col-6">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <p>จำนวนครั้งที่ถูกรางวัล</p>
                            <h3>{reward.data.length}</h3>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                    
                    </div>
                </div>
                <div className="col-lg-4 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <p>รอการประกาศผล</p>
                            <h3>{purchase.wait}</h3>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widget
