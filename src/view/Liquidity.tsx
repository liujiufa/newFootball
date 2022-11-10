import React from 'react'
import '../assets/style/Liquidity.scss'
import AddLiquidityModal from '../components/AddLiquidityModal'
export default function Liquidity() {
    return (
        <>
            <div className="LiquidityBox">
                <div className='title'>流動性</div>
                <div className="content">
                    <div className="myLiquidity">我的流動性：<span>未找到流動性</span></div>
                    <div className="addLiquidity flex">增加流動性</div>
                </div>
            </div>
            <AddLiquidityModal showModal={true}></AddLiquidityModal>
        </>
    )
}
