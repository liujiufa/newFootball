import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getMbaUserInfo } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core';
import { Contracts } from '../web3';
import { NumSplic, addMessage, showLoding } from '../utils/tool';
import { InputNumber } from 'antd';
import { contractAddress } from "../config"
import SwapSucceed from '../components/SwapSucceed'
import BigNumber from 'big.js'
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
    const web3React = useWeb3React()
    // SBL余额
    const [balance1, setBalance1] = useState('0')
    // SBL授权
    const [ApproveValue, setApproveValue] = useState('0')
    const [confirmExchange, setConfirmExchange] = useState(false)
    let state = useSelector<stateType, stateType>(state => state);
    let { t } = useTranslation()
    // 获取用户销毁奖励
    let [mbaUserInfo, setMbaUserInfo] = useState<GetMbaUserInfoType | null>(null)
    // 兌換記錄(使用记录)
    const [inputValue, setInputValue] = useState(0)
    const [inputMBAValue, setInputMBAValue] = useState(0)
    const [mbaRecord, setMbaRecord] = useState(false)
    const [swapSucceed, setSwapSucceed] = useState(false)
    const [mbaRecordType, setMbaRecordType] = useState<number | null>()
    const MbaRecordFun = (id: number) => {
        setMbaRecordType(id)
        setMbaRecord(true)
    }

    const changeFun = (e: any, type: string) => {
        if (mbaUserInfo) {
            if (type === 'SBL') {
                let value = e.target.value
                // setInputValue(value)
                setInputValue(parseInt(`${value * (mbaUserInfo?.mbaPrice)}`))
                setInputMBAValue(value)
            }
            if (type === 'MBA') {
                let value = e.target.value
                // setInputMBAValue(parseInt(value))
                setInputMBAValue(value / (mbaUserInfo?.mbaPrice))
                setInputValue(parseInt(value))
            }
        }
    }

    // 授权
    function ApproveFun() {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        showLoding(true)
        Contracts.example.approve1(web3React.account as string, contractAddress.Pledge, `${inputValue}`).then(() => {
            Contracts.example.Tokenapprove(web3React.account as string, contractAddress.Pledge).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
            }).finally(() => {
                showLoding(false)
            })
        })

    }
    // 兑换MBA
    const improveHashRate = () => {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        showLoding(true)
        Contracts.example.improveHashRate(web3React.account as string, inputValue).then((res: any) => {
            setConfirmExchange(false)
            setSwapSucceed(true)
        }).finally(() => {
            showLoding(false)
        })
    }

    const maxFun = (value: number) => {
        if (balance1 && mbaUserInfo) {
            setInputValue(value)
            setInputMBAValue(parseInt(`${value * (mbaUserInfo?.mbaPrice)}`))
        }
    }

    useEffect(() => {
        if (state.token && web3React.account) {
            /* 查询SBL余额 */
            Contracts.example.balanceOf(web3React.account).then((res: any) => {
                setBalance1(new BigNumber(res).div(10 ** 18).toString())
            })
            Contracts.example.Tokenapprove(web3React.account, contractAddress.Pledge).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
            })
            getMbaUserInfo().then(res => {
                setMbaUserInfo(res.data)
                console.log(res.data, "获取用户销毁奖励")
            })
        }
    }, [state.token, web3React.account])
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
                            SBL的餘額：{NumSplic(balance1, 4)}
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
                                <div className="coinValue"><img src={SBLIcon} alt="" /> <input type="number" value={inputValue} onChange={(e) => { changeFun(e, 'SBL') }} /></div>
                                <div className="maxBtn" onClick={() => { maxFun(parseFloat(`${NumSplic(balance1, 4)}`)) }}>最大</div>
                            </div>
                        </div>
                        <div className="Box">
                            <div className="itemTitle">獲得</div>
                            <div className="minBox">
                                <div className="coinName">MBA</div>
                                <div className="coinValue"><img src={SBLIcon} alt="" /> <input type="number" value={inputMBAValue} onChange={(e) => { changeFun(e, 'MBA') }} /></div>
                                <div className="maxBtn"></div>
                            </div>
                        </div>
                        <div className="recentlyRadio">當前匯率：1MBA = {mbaUserInfo?.mbaPrice}SBL</div>
                        {parseFloat(ApproveValue) > 0 ? <div className="toMBA flex" onClick={() => { setConfirmExchange(true) }}>兌換為MBA</div> : <div className="toMBA flex" onClick={() => { ApproveFun() }}>授权</div>}
                    </div>
                </div>
            </div>}

            <ConfirmExchange swapFun={improveHashRate} showModal={confirmExchange} close={() => { setConfirmExchange(false) }}></ConfirmExchange>
            {/* 兑换记录&使用记录 */}
            <ExchangeRecord showModal={mbaRecord} id={mbaRecordType} close={() => setMbaRecord(false)}></ExchangeRecord>
            <SwapSucceed showModal={swapSucceed} close={() => setSwapSucceed(false)}></SwapSucceed>
        </>
    )
}
