import React, { useState, useEffect } from 'react'
import Reward from '../components/Reward'
import Node from '../components/Node'
import { useTranslation } from 'react-i18next'
import { getNodeBase, buyNodeBase, getNodeUserList, getCardUserMaxLevelInfo, nodeReturned, cancelBuyNodeBase, userDrawAward } from '../API'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { addMessage, showLoding } from '../utils/tool'
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import '../assets/style/SBL.scss'
import RewardRecord from '../components/RewardRecord'
import ApplyRecord from '../components/ApplyRecord'
import GlodJdSy from '../components/GlodJdSy'
import BigNumber from 'big.js'

// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import RecordIcon from '../assets/image/record.png'

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

function SBL() {
  const web3React = useWeb3React()
  let state = useSelector<stateType, stateType>(state => state);
  let { t } = useTranslation()
  let [Tab, setTab] = useState(1)
  let [showProfit, setShowProfit] = useState(false)
  let [NodeBase, setNodeBase] = useState<NodeInfoType | null>(null)
  let [NodeRecord, setNodeRecord] = useState<NodeRecordType[]>([])
  /* 铸币节点申请记录弹窗 */
  let [showApplyRecord, setshowApplyRecord] = useState(false)
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

  function ShowProfitFun(id: number) {
    console.log(id)
    setProfitId(id)
    setShowProfit(true)
  }
  /* 领取 */
  function receive() {
    userDrawAward({
      "id": 0,
      "type": 0
    }).then(res => {
      console.log(res, '节点奖励领取')
    })
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
      }, 5000)
      return () => {
        clearInterval(Time)
      }
    }
  }, [state.token])


  return (
    <div>
      <div className="Node">
        <div className="SwapTitle">
          {t('Node Coinage')}
        </div>
        <div className="NodeDesc">
          {t('NodeDesc')}
        </div>
        <div className="Content">
          {/* 節點申請 */}
          <Node></Node>
          {/* 銷毀獎勵 */}
          {NodeRecord.map((item) => <div key={item.id} className="DestructReward">
            <div className="title">節點獎勵</div>
            <div className="rewardValue">鑄幣額度：{item.totalAwardNum} {item.coinName}</div>
            <div className="toFreed">剩餘鑄幣：{item.stayAwardNum} {item.coinName}</div>
            <div className="process">
              <div className="Freed">進程：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: item.currentDay / item.backDay * 100 + '%' }}></div>
              </div>
              <div className="value">（{item.backDay}D）</div>
            </div>
            <div className="inputBox">
              <input type="number" value={item.stayDrawNum} readOnly={true} />
              <div className="coinBox"><img src={SBLIcon} alt="" /> {item.coinName}</div>
            </div>
            {
              item.isReturn === 1 ?
                <div className="btnBox">
                  <div className="Btn flex" onClick={receive}>{t('Claim')}</div>
                  <div className="notBtn flex" onClick={() => { returnFun(item.id, item.retainTokenNum) }}>{t('Refund')}</div>
                </div> :
                <div className="btnBox">
                  <div className="Btn flex" onClick={receive}>{t('Claim')}</div>
                </div>
            }
            <div className="getRecord" onClick={() => { ShowProfitFun(item.id) }}>
              收益記錄 <img src={RecordIcon} alt="" />
            </div>
          </div>)}
        </div>

      </div>
      {/* 收益记录(代替) */}
      <RewardRecord showModal={false}></RewardRecord>
      {/* 节点收益记录 */}
      <GlodJdSy isShow={showProfit} id={ProfitId} close={() => { setShowProfit(false) }}></GlodJdSy>

      {/* 申请记录 */}
      <ApplyRecord showModal={false}></ApplyRecord>

    </div>
  )
}
export default React.memo(SBL)