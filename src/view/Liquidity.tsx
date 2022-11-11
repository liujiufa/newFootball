import React from 'react'
import '../assets/style/Liquidity.scss'
import AddLiquidityModal from '../components/AddLiquidityModal'
import ConfirmAddLiquidity from '../components/ConfirmAddLiquidity'
import ConfirmRmLiquidity from '../components/ConfirmRmLiquidity'
import SuccessAddLiquidity from '../components/SuccessAddLiquidity'
import SuccessRmLiquidity from '../components/SuccessRmLiquidity'
import SBLIcon from '../assets/image/SBLToken.png'
import BNBIcon from '../assets/image/BNBIcon.png'
import switchIcon from '../assets/image/switchIcon.png'
export default function Liquidity() {
    return (
        <>

            <div className="LiquidityBox">
                <div className='title'>流動性</div>
                {
                    false ?
                        <div className="content">
                            <div className="myLiquidity">我的流動性：<span>未找到流動性</span></div>
                            <div className="addLiquidity flex">增加流動性</div>
                        </div>
                        :
                        <div className="myLiquidityContent">
                            <div className="myLiquidity">我的流動性：</div>
                            <div className="rmLiquidityBox">
                                <div className="coinsBox">
                                    <div className="coinsvalue">0.4 BNB</div>
                                    <div className="rightBox">
                                        <div className="coinsIcon"><img className='img1' src={SBLIcon} alt="" /><img className='img2' src={BNBIcon} alt="" /></div>
                                        <div className="closeIcon flex"><img src={switchIcon} alt="" /></div>
                                    </div>

                                </div>
                                {true && <div className="detailBox">
                                    <div className="item">
                                        <div className="itemTitle">添加時間</div>
                                        <div className="itemValue">2022/05/07 17:56</div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">您的池份額</div>
                                        <div className="itemValue">0.00%</div>
                                    </div>
                                    <div className="rmBtn flex">移除</div>
                                </div>}
                            </div>
                        </div>
                }
                <div className="addLiquidityBtn flex">增加流動性</div>
            </div>

            <AddLiquidityModal showModal={false}></AddLiquidityModal>
            <ConfirmAddLiquidity showModal={false}></ConfirmAddLiquidity>
            <ConfirmRmLiquidity showModal={false}></ConfirmRmLiquidity>
            <SuccessAddLiquidity showModal={false}></SuccessAddLiquidity>
            <SuccessRmLiquidity showModal={false}></SuccessRmLiquidity>

        </>
    )
}
