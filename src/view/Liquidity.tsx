import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { getUserLpList } from '../API/index'
import { dateFormat, showLoding, getWebsocketData, initWebSocket } from '../utils/tool'
import { useLocation } from 'react-router-dom';
import { socketUrl } from '../config';
import BigNumber from 'big.js'
import '../assets/style/Liquidity.scss'
import AddLiquidityModal from '../components/AddLiquidityModal'
import ConfirmAddLiquidity from '../components/ConfirmAddLiquidity'
import ConfirmRmLiquidity from '../components/ConfirmRmLiquidity'
import SuccessAddLiquidity from '../components/SuccessAddLiquidity'
import SuccessRmLiquidity from '../components/SuccessRmLiquidity'
import SBLIcon from '../assets/image/SBLToken.png'
import BNBIcon from '../assets/image/BNBIcon.svg'
import switchIcon from '../assets/image/dropDownIcon.png'
import { Contracts } from '../web3';
import Web3 from 'web3';
import { addMessage } from '../utils/tool';
import { isNamedTupleMember } from 'typescript';
interface UserLpListType {
    addTxId: string,
    cancelTxId: string,
    createTime: string,
    currencyPair: number,
    hostAmount: number,
    id: number,
    poolShare: number,
    status: number,
    tokenAmount: number,
    updateTime: string,
    userAddress: string,
    close: boolean,
    type: number,
    chainId: number
}
interface cardLevelObj {
    cardLevel: number
}
export default function Liquidity() {
    let location = useLocation()
    console.log(location.state);
    let state = useSelector<stateType, stateType>(state => state);
    const web3React = useWeb3React()
    let { t } = useTranslation()
    const [userLpList, setUserLpList] = useState<UserLpListType[]>([])
    const [addLiquidityModal, setAddLiquidityModal] = useState(false)
    // 确认
    const [conLiquidityModal, setConLiquidityModal] = useState(false)
    // 添加成功弹窗
    const [successAddLiquidity, setSuccessAddLiquidity] = useState(false)
    // 移除成功弹窗
    const [successRmLiquidity, setSuccessRmLiquidity] = useState(false)
    // 移除弹窗
    const [rmLiquidity, setRmLiquidity] = useState(false)
    // 添加值
    const [addLiquidityValue, setAddLiquidityValue] = useState(0)
    // 币对值
    const [coinPairValue, setCoinPairValue] = useState('0')
    // BNB余额
    const [balance, setBalance] = useState('0')
    // SBL余额
    const [balance1, setBalance1] = useState('0')
    // ToSBL
    const [toSBL, setToSBL] = useState('0')
    const [oepnCardList, setOepnCardList] = useState<number[]>([])
    const [cardLevel] = useState<any>(location.state)
    // 移除流动性值
    const [reLiquidityValue, setRmLiquidityValue] = useState({ type: 0, num: 0, currencyPair: 0, hostAmount: 0, tokenAmount: 0, })
    // 打开确认添加流动性弹窗
    const openConfirmFun = (value: number) => {
        console.log(value);
        setAddLiquidityValue(value)
        setAddLiquidityModal(false)
        setConLiquidityModal(true)
    }
    // 打开相应流动性列表
    const openFun = (key: number) => {
        let list = oepnCardList;
        const flag = list.some(item => Number(item) === Number(key))
        if (flag) {
            list = list.filter(item => Number(item) !== Number(key))
        } else {
            list = [...list, key]
        }
        setOepnCardList(list)
    }
    // 添加流动性
    const addLiquidityFun = (type: number) => {
        console.log(balance, toSBL, balance1, type);
        if (addLiquidityValue > parseFloat(balance) || parseFloat(toSBL) > parseFloat(balance1)) {
            return addMessage('余额不足')
        }
        if (state.token && web3React.account && addLiquidityValue > 0) {
            showLoding(true)
            Contracts.example.addLiquidity(web3React.account, addLiquidityValue, type).then((res: any) => {
                console.log(res);
                setConLiquidityModal(false)
                setSuccessAddLiquidity(true)
                Contracts.example.web3.eth.getTransactionReceipt(res.transactionHash).then((res: any) => {
                    let value = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 64), "ether")
                    setCoinPairValue(value)
                })
            }).finally(() => {
                showLoding(false)
            })
        }
    }
    // 移除流动性
    const RmLiquidityFun = (type: number, chainId: number, currencyPair: number, hostAmount: number, tokenAmount: number) => {
        setRmLiquidityValue({ type: type, num: chainId, currencyPair: currencyPair, hostAmount: hostAmount, tokenAmount: tokenAmount })
        setRmLiquidity(true)
    }
    // 移除流动性
    const rmLiquidityFun = () => {
        if (state.token && web3React.account) {
            showLoding(true)
            Contracts.example.removeLiquidity(web3React.account, reLiquidityValue?.type, reLiquidityValue?.num).then((res: any) => {
                console.log('成功');
                setSuccessRmLiquidity(true)
                setRmLiquidity(false)
                // 我的流动性列表
                getUserLpList().then((res: any) => {
                    console.log(res.data, "我的流动性列表")
                    setUserLpList(res.data.map((item: any) => {
                        return { ...item, close: false }
                    }))
                })
            }).finally(() => {
                showLoding(false)
            })
        }
    }

    useEffect(() => {
        if (state.token && web3React.account) {
            // 我的流动性列表
            let list: any[] = []
            getUserLpList().then((res: any) => {
                console.log(res.data, "我的流动性列表")
                list = res.data.map((item: any) => {
                    return item
                })
                setUserLpList(list)
            })
            // 推送
            let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getUserLpList/${web3React.account}`, `/getUserLpList/${web3React.account}`,
                {}, (data: any) => {
                    console.log(data, userLpList, '获取用户LP数据')
                    setUserLpList(data.map((item: any) => {
                        return item
                    }))
                })
            /* 查询BNB余额 */
            Contracts.example.getBalance(web3React.account).then((res: any) => {
                setBalance(new BigNumber(res).div(10 ** 18).toString())
            })
            /* 查询SBL余额 */
            Contracts.example.balanceOf(web3React.account).then((res: any) => {
                setBalance1(new BigNumber(res).div(10 ** 18).toString())
            })
            // toSBL
            Contracts.example.toLiquiditySBL(web3React.account as string, addLiquidityValue).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
            return () => {
                try {
                    stompClient.disconnect()
                } catch {

                }
                clearInterval(sendTimer)
            }
        }
    }, [state.token, web3React.account])
    useEffect(() => {
        if (cardLevel) {
            setAddLiquidityModal(true)
            console.log(cardLevel);
        }
    }, [])
    return (
        <>
            <div className="LiquidityBox">
                <div className='title'>{t('Liquidity')}</div>
                {
                    userLpList.length > 0 ?
                        <div className="myLiquidityContent">
                            <div className="myLiquidity">{t('My Liquidity')}：</div>
                            {userLpList.map((item, index) => <div key={item.id} className="rmLiquidityBox">
                                <div className="coinsBox">
                                    <div className="coinsvalue">{item?.hostAmount} BNB</div>
                                    <div className="rightBox">
                                        <div className="coinsIcon"><img className='img1' src={SBLIcon} alt="" /><img className='img2' src={BNBIcon} alt="" /></div>
                                        <div className="closeIcon flex" onClick={() => { openFun(item.id) }}><img className={oepnCardList.some(option => Number(option) === Number(item?.id)) ? 'spanRotate' : 'spanReset'} src={switchIcon} alt="" /></div>
                                    </div>
                                </div>
                                {oepnCardList.some(option => Number(option) === Number(item?.id)) && <div className="detailBox">
                                    <div className="item">
                                        <div className="itemTitle">{t('Supply time')}</div>
                                        <div className="itemValue">{dateFormat('YYYY/mm/dd', new Date(item?.createTime))}</div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">LPToken</div>
                                        <div className="itemValue">{item?.currencyPair}</div>
                                    </div>
                                    <div className="rmBtn flex" onClick={() => { RmLiquidityFun(item?.type, item?.chainId, item?.currencyPair, item?.hostAmount, item?.tokenAmount) }}>{t("Remove")}</div>
                                </div>}
                            </div>
                            )}
                        </div>
                        :
                        <div className="content">
                            <div className="myLiquidity">{t("My Liquidity")}：<span>{t("No liquidity found")}</span></div>
                            <div className="myLiquidity"><span>{t("Adding liquidity activates land equity")}</span></div>
                            <div className="addLiquidity flex" onClick={() => { setAddLiquidityModal(true) }}>{t("Add liquidity")}</div>
                        </div>
                }
                {(userLpList.length > 0) && <div className="addLiquidityBtn flex" onClick={() => { setAddLiquidityModal(true) }}>{t("Add liquidity")}</div>}
            </div>
            <AddLiquidityModal Level={cardLevel?.cardLevel} showModal={addLiquidityModal} close={() => { setAddLiquidityModal(false) }} nextFun={openConfirmFun}></AddLiquidityModal>
            <ConfirmAddLiquidity data={addLiquidityValue} showModal={conLiquidityModal} close={() => setConLiquidityModal(false)} addFun={addLiquidityFun}></ConfirmAddLiquidity>
            {<ConfirmRmLiquidity data={reLiquidityValue} showModal={rmLiquidity} rmFun={rmLiquidityFun} close={() => { setRmLiquidity(false) }}></ConfirmRmLiquidity>}
            {<SuccessAddLiquidity data={coinPairValue} showModal={successAddLiquidity} close={() => setSuccessAddLiquidity(false)}></SuccessAddLiquidity>}
            <SuccessRmLiquidity showModal={successRmLiquidity} close={() => { setSuccessRmLiquidity(false) }}></SuccessRmLiquidity>
        </>
    )
}
