import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getMbaUserInfo } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import '../assets/style/MBASwap.scss'
import ConfirmExchange from '../components/ConfirmExchange'
import ExchangeRecord from '../components/ExchangeRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import bigSBLIcon from '../assets/image/SBLTokenIcon.png'
import recordIcon from '../assets/image/recordIcon.png'

interface GetMbaUserInfoType {
    amount: number,
    coinName: string,
    createTime: string,
    id: number,
    totalAmount: number,
    updateTime: string,
    userAddress: string,
    mbaPrice: number
}

export default function MBASwap() {

    let state = useSelector<stateType, stateType>(state => state);
    let { t } = useTranslation()
    // 获取用户销毁奖励
    let [mbaUserInfo, setMbaUserInfo] = useState<GetMbaUserInfoType | null>(null)
    // 兌換記錄(使用记录)
    const [mbaRecord, setMbaRecord] = useState(false)
    const [mbaRecordType, setMbaRecordType] = useState<number | null>()
    const MbaRecordFun = (id: number) => {
        setMbaRecordType(id)
        setMbaRecord(true)
    }

    useEffect(() => {
        if (state.token) {
            getMbaUserInfo().then(res => {
                setMbaUserInfo(res.data)
                console.log(res.data, "获取用户销毁奖励")
            })
        }
    }, [state.token])
    return (
        <>
            {mbaUserInfo && <div className="MBASwapBox">
                <div className='title'>MBA兌換</div>
                <div className="content">
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={bigSBLIcon} alt="" />
                            MBA的餘額：{mbaUserInfo.amount}
                        </div>
                        <div className="rightBox" onClick={() => { MbaRecordFun(1) }}>
                            使用記錄
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={bigSBLIcon} alt="" />
                            SBL的餘額：10000
                        </div>
                        <div className="rightBox" onClick={() => { MbaRecordFun(2) }}>
                            兌換記錄
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="MBAContent">
                        <div className="subMBATitle">MBA</div>
                        <div className="Box topBox">
                            <div className="itemTitle">消耗</div>
                            <div className="minBox">
                                <div className="coinName">SBL</div>
                                <div className="coinValue"><img src={SBLIcon} alt="" /> 100，000.00</div>
                                <div className="maxBtn">最大</div>
                            </div>
                        </div>
                        <div className="Box">
                            <div className="itemTitle">獲得</div>
                            <div className="minBox">
                                <div className="coinName">MBA</div>
                                <div className="coinValue"><img src={SBLIcon} alt="" /> 100，000.00</div>
                                <div className="maxBtn"></div>
                            </div>
                        </div>
                        <div className="recentlyRadio">當前匯率：1MBA = {mbaUserInfo?.mbaPrice}SBL</div>
                        <div className="toMBA flex">兌換為MBA</div>
                    </div>
                </div>
            </div>}

            <ConfirmExchange showModal={false}></ConfirmExchange>
            {/* 兑换记录&使用记录 */}
            <ExchangeRecord showModal={mbaRecord} id={mbaRecordType} close={() => setMbaRecord(false)}></ExchangeRecord>

        </>
    )
}
