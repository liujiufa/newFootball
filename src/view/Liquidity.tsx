import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { getUserLpList } from '../API/index'
import { dateFormat } from '../utils/tool'
import '../assets/style/Liquidity.scss'
import AddLiquidityModal from '../components/AddLiquidityModal'
import ConfirmAddLiquidity from '../components/ConfirmAddLiquidity'
import ConfirmRmLiquidity from '../components/ConfirmRmLiquidity'
import SuccessAddLiquidity from '../components/SuccessAddLiquidity'
import SuccessRmLiquidity from '../components/SuccessRmLiquidity'
import SBLIcon from '../assets/image/SBLToken.png'
import BNBIcon from '../assets/image/BNBIcon.png'
import switchIcon from '../assets/image/switchIcon.png'
import { Contracts } from '../web3';
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
    close: boolean
}
export default function Liquidity() {
    let state = useSelector<stateType, stateType>(state => state);
    const web3React = useWeb3React()
    let { t } = useTranslation()
    const [userLpList, setUserLpList] = useState<UserLpListType[]>([])
    const [addLiquidityModal, setAddLiquidityModal] = useState(false)
    // 打开相应流动性列表
    const openFun = (key: number) => {
        userLpList.map((item) => {
            if (item.id === key) {
                item.close = !item.close
            }
        })
        setUserLpList(userLpList)
    }


    // console.log(Contracts.example, '流动性');
    // useEffect(() => {
    //     if (state.token, web3React.account) {
    //         Contracts.example.addLiquidity(web3React.account).then((res: boolean) => {
    //         })
    //     }
    // }, [state.token, web3React.account])

    useEffect(() => {
        if (state.token && web3React.account) {
            // 我的流动性
            getUserLpList().then(res => {
                console.log(res.data, "我的流动性列表")
                setUserLpList(res.data.map((item: any) => {
                    return { ...item, close: false }
                }))
            })
        }
    }, [state.token, web3React.account])
    return (
        <>
            <div className="LiquidityBox">
                <div className='title'>流動性</div>
                {
                    userLpList.length > 0 ?
                        userLpList.map((item, index) => <div key={item.id} className="myLiquidityContent">
                            <div className="myLiquidity">我的流動性：</div>
                            <div className="rmLiquidityBox">
                                <div className="coinsBox">
                                    <div className="coinsvalue">{item?.hostAmount} BNB</div>
                                    <div className="rightBox">
                                        <div className="coinsIcon"><img className='img1' src={SBLIcon} alt="" /><img className='img2' src={BNBIcon} alt="" /></div>
                                        <div className="closeIcon flex" onClick={() => { openFun(item.id) }}><img src={switchIcon} alt="" /></div>
                                    </div>

                                </div>
                                {item?.close && <div className="detailBox">
                                    <div className="item">
                                        <div className="itemTitle">添加時間</div>
                                        <div className="itemValue">{dateFormat('YYYY/mm/dd', new Date(item?.createTime))}</div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">您的池份額</div>
                                        <div className="itemValue">{item?.poolShare}%</div>
                                    </div>
                                    <div className="rmBtn flex">移除</div>
                                </div>}
                            </div>
                        </div>)
                        :
                        <div className="content">
                            <div className="myLiquidity">我的流動性：<span>未找到流動性</span></div>
                            <div className="addLiquidity flex" onClick={() => { setAddLiquidityModal(true) }}>增加流動性</div>
                        </div>

                }
                {(userLpList.length > 0) && <div className="addLiquidityBtn flex">增加流動性</div>}
            </div>

            <AddLiquidityModal showModal={addLiquidityModal} close={() => { setAddLiquidityModal(false) }}></AddLiquidityModal>
            <ConfirmAddLiquidity showModal={false}></ConfirmAddLiquidity>
            <ConfirmRmLiquidity showModal={false}></ConfirmRmLiquidity>
            <SuccessAddLiquidity showModal={false}></SuccessAddLiquidity>
            <SuccessRmLiquidity showModal={false}></SuccessRmLiquidity>

        </>
    )
}
