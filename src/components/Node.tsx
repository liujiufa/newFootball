import React, { useState, useEffect, useRef } from 'react'
import { Contracts } from '../web3'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { addMessage, showLoding } from '../utils/tool'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getNodeBase, buyNodeBase, getNodeUserList, getCardUserMaxLevelInfo, nodeReturned, cancelBuyNodeBase } from '../API'
import GoldRecord from '../components/GoldRecord'
import record from '../assets/image/record.png'
import '../assets/style/componentsStyle/Node.scss'
import { contractAddress } from '../config'
import BigNumber from 'big.js'
import { setInterval } from 'timers/promises';

interface NodeBase {
    id: number
    price: number,
    buyCoinName: string,
    awardNum: number,
    alreadyBuyNum: number,
    systemBuyNum: number,
    isBuy: number,
}
interface NodeInfoType {
    currentNodeBase: NodeBase,
    downNodeBase: NodeBase
}
interface NodeRecordType {
    id: number,
    backDay: number,
    totalAwardNum: number,
    stayAwardNum: number,
    stayDrawNum: number,
    currentDay: number,
    coinName: string,
    isReturn: number
    retainTokenNum: number
}
interface ApplyRecordType {
    id: number,
}
export default function Node(props: any) {
    const timeoutRef = useRef(0)
    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType, stateType>(state => state);
    let [NodeBase, setNodeBase] = useState<NodeInfoType | null>(null)
    let [NodeRecord, setNodeRecord] = useState<NodeRecordType[]>([])
    /* 铸币节点申请记录弹窗 */
    let [showApplyRecord, setshowApplyRecord] = useState(false)
    /* 用户最高等级 */
    let [MaxLevel, setMaxLevel] = useState(0)
    useEffect(() => {
        if (state.token) {
            getNodeUserList().then(res => {
                setNodeRecord(res.data)
            })
            getNodeBase().then(res => {
                console.log(res.data);
                setNodeBase(res.data)
            })
            getCardUserMaxLevelInfo().then(res => {
                setMaxLevel(res.data)
            })
            let Time = window.setInterval(() => {
                getNodeUserList().then(res => {
                    setNodeRecord(res.data)
                })
                getNodeBase().then(res => {
                    setNodeBase(res.data)
                })
            }, 3000)
            return () => {
                clearInterval(Time)
            }
        }
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [state.token])
    async function buyNode() {
        if (web3React.account && NodeBase) {
            if (NodeBase.currentNodeBase.isBuy === 0) {
                return addMessage(t('Node release in progress, please purchase after release'))
            }
            let balanceOf = await Contracts.example.getBalance(web3React.account)
            if (new BigNumber(balanceOf).div(10 ** 18).lt(NodeBase.currentNodeBase.price)) {
                return addMessage(t('not enough'))
            }
            showLoding(true)
            buyNodeBase({
                id: NodeBase.currentNodeBase.id,
                userAddress: web3React.account
            }).then((res: any) => {
                console.log("购买节点加密", res)
                if (res.data) {
                    Contracts.example.buyNode(web3React.account as string, res.data, NodeBase!.currentNodeBase.price).then(() => {
                        timeoutRef.current = window.setTimeout(() => {
                            props.getFun()
                        }, 3000);
                    }, (error: any) => {
                        cancelBuyNodeBase({
                            id: NodeBase!.currentNodeBase.id,
                            userAddress: web3React.account as string
                        }).then(res => {
                            console.log("用户取消")
                        })
                    })
                        .finally(() => {
                            showLoding(false)
                        })
                } else {
                    addMessage(res.msg)
                    showLoding(false)
                }
            }, () => {
                showLoding(false)
            })
        }
    }
    return (
        <>
            {
                NodeBase && <div className='nodeApplication' >
                    <div className="RewardLabel">
                        {t('Node application')}
                    </div>

                    <div className="row">
                        {
                            NodeBase &&
                            <div className="RewardItem">
                                <div className="NodeTips">
                                    <div>
                                        {t('Current node application')}:
                                    </div>
                                    {
                                        t('PayBNBForSBL', { BNBNum: NodeBase.currentNodeBase.price, SBLNum: NodeBase.currentNodeBase.awardNum })
                                    }
                                </div>
                                <div className={NodeBase.currentNodeBase.isBuy ? "applyBtn flexCenter" : "applyBtn invalid flexCenter"} onClick={buyNode}>{t('Application')}</div>
                                <span className="record" onClick={() => { setshowApplyRecord(true) }}>{t('Record2')} <img src={record} alt="" /></span>
                            </div>
                        }
                    </div>
                    {/* 铸币节点申请记录 */}
                    <GoldRecord isShow={showApplyRecord} close={() => { setshowApplyRecord(false) }}></GoldRecord>
                </div>
            }
        </>
    )
}
