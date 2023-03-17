import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getMbaUserInfo } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core';
import { Contracts } from '../web3';
import { NumSplic, addMessage, showLoding, getFullNum } from '../utils/tool';
import { InputNumber } from 'antd';
import { contractAddress } from "../config"
import SwapSucceed from '../components/SwapSucceed'
import BigNumber from 'big.js'
import '../assets/style/MBASwap.scss'
import ConfirmExchange from '../components/ConfirmExchange'
import ExchangeRecord from '../components/ExchangeRecord'
import SBLIcon from '../assets/image/SBLIcon.png'
import bigSBLIcon from '../assets/image/SBLIcon.png'
import recordIcon from '../assets/image/record.png'
import MBAToken from '../assets/image/MBAToken.png'
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
    const timeoutRef = useRef(0)
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
    const [inputValue, setInputValue] = useState(30000)
    const [inputMBAValue, setInputMBAValue] = useState(300)
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
                setInputValue(value)
                // setInputValue(parseInt(`${value * (mbaUserInfo?.mbaPrice)}`))
                setInputMBAValue(Math.floor(value / (mbaUserInfo?.mbaPrice)))
            }
            if (type === 'MBA') {
                let value = e.target.value.replace(/^[^1-9]+|[^0-9]/g, '')
                // setInputMBAValue(parseInt(value))
                setInputMBAValue(value)
                setInputValue(parseInt(value) * (mbaUserInfo?.mbaPrice))
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
        if (inputValue > parseFloat(balance1)) {
            return addMessage(t('Insufficient balance'))
        }
        showLoding(true)
        Contracts.example.improveHashRate(web3React.account as string, inputValue).then((res: any) => {
            setConfirmExchange(false)
            setSwapSucceed(true)
            timeoutRef.current = window.setTimeout(() => {
                getMbaUserInfo().then(res => {
                    setMbaUserInfo(res.data)
                    console.log(res.data, "")
                })
                if (web3React.account) {
                    Contracts.example.balanceOf(web3React.account).then((res: any) => {
                        setBalance1(new BigNumber(res).div(10 ** 18).toString())
                        console.log('SBL余额', new BigNumber(res).div(10 ** 18).toString());
                    })
                }
            }, 5000);
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
                console.log('SBL余额', new BigNumber(res).div(10 ** 18).toString());
            })
            Contracts.example.Tokenapprove(web3React.account, contractAddress.Pledge).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
            })
            getMbaUserInfo().then(res => {
                setMbaUserInfo(res.data)
                console.log(res.data, "")
            })
            return () => {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [state.token, web3React.account])
    return (
        <>
            {mbaUserInfo && <div className="MBASwapBox">
                <div className='title'>{t("MBA Convert")}</div>
                <div className="content">
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={MBAToken} alt="" />
                            {t("MBA Balance")}：{mbaUserInfo.amount}
                        </div>
                        <div className="rightBox" onClick={() => { MbaRecordFun(1) }}>
                            {t("Usage record")}
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="balanceBox">
                        <div className="leftBox">
                            <img src={bigSBLIcon} alt="" />
                            {t("SBL Balance")}：{getFullNum(Math.floor(parseFloat(balance1) * 10000) / 10000)}
                        </div>
                        <div className="rightBox" onClick={() => { MbaRecordFun(2) }}>
                            {t("Convert record")}
                            <img src={recordIcon} alt="" />
                        </div>
                    </div>
                    <div className="MBAContent">
                        <div className="subMBATitle">MBA</div>
                        <div className="Box topBox">
                            <div className="itemTitle">{t("Cost")}</div>
                            <div className="minBox">
                                <div className="coinName">SBL</div>
                                <div className="coinValue"><img src={SBLIcon} alt="" /> <input type="number" value={inputValue} onChange={(e) => { changeFun(e, 'SBL') }} /></div>
                                <div className="maxBtn" onClick={() => { maxFun(parseFloat(`${NumSplic(balance1, 4)}`)) }}>{t("Max")}</div>
                            </div>
                        </div>
                        <div className="Box">
                            <div className="itemTitle">{t("Get")}</div>
                            <div className="minBox">
                                <div className="coinName">MBA</div>
                                <div className="coinValue"><img src={MBAToken} alt="" /> <input type="number" value={inputMBAValue} onChange={(e) => { changeFun(e, 'MBA') }} /></div>
                                <div className="maxBtn"></div>
                            </div>
                        </div>
                        <div className="recentlyRadio">{t("Estimate")}：1MBA = {mbaUserInfo?.mbaPrice}SBL</div>
                        {parseFloat(ApproveValue) > inputValue ? <div className="toMBA flex" onClick={() => { setConfirmExchange(true) }}>{t("Convert to MBA")}</div> : <div className="toMBA flex" onClick={() => { ApproveFun() }}>{t("Approve")}</div>}
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
