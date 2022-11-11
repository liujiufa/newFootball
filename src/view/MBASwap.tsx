import React from 'react'
import '../assets/style/MBASwap.scss'
import AddLiquidityModal from '../components/AddLiquidityModal'
import SBLIcon from '../assets/image/SBLToken.png'
import bigSBLIcon from '../assets/image/SBLTokenIcon.png'
import recordIcon from '../assets/image/recordIcon.png'
export default function MBASwap() {
    return (
        <>

            <div className="MBASwapBox">
                <div className='title'>MBA兌換</div>
                <div className="content">
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={bigSBLIcon} alt="" />
                            MBA的餘額：10000
                        </div>
                        <div className="rightBox">
                            使用記錄
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={bigSBLIcon} alt="" />
                            SBL的餘額：10000
                        </div>
                        <div className="rightBox">
                            使用記錄
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="MBAContent">
                        <div className="subMBATitle">MBA</div>
                        <div className="Box">
                            <div className="itemTitle">消耗</div>
                            <div className="coinName">SBL</div>
                            <div className="coinValue"><img src={SBLIcon} alt="" /> 100，000.00</div>
                            <div className="maxBtn">最大</div>
                        </div>
                        <div className="Box">
                            <div className="itemTitle">獲得</div>
                            <div className="coinName">MBA</div>
                            <div className="coinValue"><img src={SBLIcon} alt="" /> 100，000.00</div>
                            <div className="maxBtn"></div>
                        </div>
                        <div className="recentlyRadio">當前匯率：1MBA = 11SBL</div>
                        <div className="toMBA">兌換為MBA</div>
                    </div>
                </div>

            </div>

            <AddLiquidityModal showModal={false}></AddLiquidityModal>

        </>
    )
}
