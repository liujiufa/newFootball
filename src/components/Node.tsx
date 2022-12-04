import React, { useState, useEffect } from 'react'
import { Contracts } from '../web3'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { addMessage, showLoding } from '../utils/tool'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getNodeBase, buyNodeBase, getNodeUserList, getCardUserMaxLevelInfo, nodeReturned, cancelBuyNodeBase } from '../API'
import GoldRecord from '../components/GoldRecord'
import GlodJdSy from '../components/GlodJdSy'
import GlodMechanism from '../components/GlodMechanism'
import NodeIntr from '../components/NodeIntr'
import record from '../assets/image/record.png'
import Refresh from '../assets/image/Refresh.png'
import nodeInte from '../assets/image/nodeInte.png'
import SBLToken from '../assets/image/SBL.svg'
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
const nodeAccelerate = ['My tier1', 'nodeAccelerate1', 'nodeAccelerate2', 'nodeAccelerate3', 'nodeAccelerate4', 'nodeAccelerate5', 'nodeAccelerate6', 'nodeAccelerate7']
export default function Node() {
    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType, stateType>(state => state);
    let [NodeBase, setNodeBase] = useState<NodeInfoType | null>(null)
    let [NodeRecord, setNodeRecord] = useState<NodeRecordType[]>([])
    /* 铸币节点申请记录弹窗 */
    let [showApplyRecord, setshowApplyRecord] = useState(false)
    /* 铸币节点奖励记录弹窗 */
    let [showProfit, setShowProfit] = useState(false)
    /* 用户最高等级 */
    let [MaxLevel, setMaxLevel] = useState(0)
    /* 铸币节点奖励记录id */
    let [ProfitId, setProfitId] = useState(-1)
    /* 加载状态 */
    let [heavyLoad, setHeavyLoad] = useState(false)
    /* 节点奖励机制 */
    let [nodeRules, setNodeRules] = useState(false)
    /* 节点介绍 */
    let [nodeIntr, setNodeIntr] = useState(false)

    useEffect(() => {
        if (state.token) {
            getNodeUserList().then(res => {
                setNodeRecord(res.data)
            })
            getNodeBase().then(res => {
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
                        getNodeBase().then(res => {
                            setNodeBase(res.data)
                        })
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
    /* 显示节点奖励记录弹窗 */
    function ShowProfitFun(id: number) {
        console.log(id)
        setProfitId(id)
        setShowProfit(true)
    }
    function getMaxLevel() {
        setHeavyLoad(true)
        setTimeout(() => {
            setHeavyLoad(false)
        }, 1000)
        getCardUserMaxLevelInfo().then(res => {
            setMaxLevel(res.data)
        })
    }
    /* 领取 */
    function receive() {
        addMessage(t('Not opened yet'))
    }
    /* 退还 */
    function returnFun(id: number, amount: number) {
        if (new BigNumber(amount).lte(0)) {
            addMessage(t('Insufficient recoverable amount'))
        }
        if (web3React.account) {
            showLoding(true)
            nodeReturned({ id, userAddress: web3React.account }).then(res => {
                if (res.data) {
                    Contracts.example.quitNode(web3React.account as string, res.data).then((res: any) => {
                    }).finally(() => {
                        showLoding(false)
                    })
                } else {
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
                                {/* <div className="progressRow">
                            <div className="progressLabel">
                                {t('Progress')}：
                            </div>
                            <div className="progress">
                                <div className="progressValue" style={{ width: NodeBase.currentNodeBase.alreadyBuyNum + NodeBase.currentNodeBase.systemBuyNum > 99 ? '99%' : NodeBase.currentNodeBase.alreadyBuyNum + NodeBase.currentNodeBase.systemBuyNum + '%' }}></div>
                            </div>
                        </div> */}
                                <div className={NodeBase.currentNodeBase.isBuy ? "applyBtn flexCenter" : "applyBtn invalid flexCenter"} onClick={buyNode}>{t('Application')}</div>
                                <span className="record" onClick={() => { setshowApplyRecord(true) }}>{t('Record2')} <img src={record} alt="" /></span>
                            </div>
                        }

                    </div>

                    {/* 铸币节点申请记录 */}
                    <GoldRecord isShow={showApplyRecord} close={() => { setshowApplyRecord(false) }}></GoldRecord>
                    {/* 铸币节点收益记录 */}
                    <GlodJdSy isShow={showProfit} id={ProfitId} close={() => { setShowProfit(false) }}></GlodJdSy>
                    {/* 铸币节点奖励机制 */}
                    <GlodMechanism isShow={nodeRules} close={() => { setNodeRules(false) }}></GlodMechanism>
                    {/* 节点介绍 */}
                    <NodeIntr isShow={nodeIntr} close={() => { setNodeIntr(false) }}></NodeIntr>
                </div>
            }
        </>
    )
}
