import React, { useState, useEffect, useRef } from 'react'
import Reward from '../components/Reward'
import Node from '../components/Node'
import { useTranslation } from 'react-i18next'
import { getNodeBase, buyNodeBase, getNodeUserList, getCardUserMaxLevelInfo, nodeReturned, cancelBuyNodeBase, userDrawAward, userCancelDrawAward } from '../API'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { addMessage, showLoding } from '../utils/tool'
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import '../assets/style/SBL.scss'
import GlodJdSy from '../components/GlodJdSy'
import BigNumber from 'big.js'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLIcon.png'
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
  applyPrice: number
}
interface ApplyRecordType {
  id: number,
}

function SBL() {
  const web3React = useWeb3React()
  let state = useSelector<stateType, stateType>(state => state);
  let { t } = useTranslation()
  let [showProfit, setShowProfit] = useState(false)
  let [NodeBase, setNodeBase] = useState<NodeInfoType | null>(null)
  let [NodeRecord, setNodeRecord] = useState<NodeRecordType[]>([])
  /* 铸币节点奖励记录id */
  let [ProfitId, setProfitId] = useState(-1)
  const timeoutRef = useRef(0);
  function ShowProfitFun(id: number) {
    console.log(id)
    setProfitId(id)
    setShowProfit(true)
  }
  /* 退还 */
  function returnFun(id: number, amount: number) {
    if (new BigNumber(amount).lte(0)) {
      return addMessage(t('Insufficient recoverable amount'))
    }
    if (web3React.account) {
      showLoding(true)
      nodeReturned({ id, userAddress: web3React.account }).then(res => {
        console.log(res, 'tuihuan');
        if (res.data) {
          Contracts.example.quitNode(web3React.account as string, res.data).then((res: any) => {
            addMessage(t("Successful refund"))
            timeoutRef.current = window.setTimeout(() => {
              getNodeUserList().then(res => {
                console.log(res.data, '节点奖励');
                setNodeRecord(res.data)
              })
            }, 5000);
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
  // 领取奖励
  function Receive(type: number, id: number, amount: number) {
    console.log(type, id, amount);
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    if (new BigNumber(amount).lte(0)) {
      return addMessage(t('No collectable quantity'))
    }
    userDrawAward({
      type, id
    }).then((res: any) => {
      console.log(res);
      if (res.data && web3React.account) {
        showLoding(true)
        Contracts.example.getNodeAward(web3React.account as string, res.data, type).then((res: any) => {
          addMessage(t('Receive success'))
          timeoutRef.current = window.setTimeout(() => {
            getNodeUserList().then(res => {
              console.log(res.data, '节点奖励');
              setNodeRecord(res.data)
            })
          }, 5000);
        }, (err: any) => {
          if (err.code === 4001) {
            userCancelDrawAward({ type, id }).then(() => {
              addMessage(t('Cancellation received successfully'))
            })
          }
        }).finally(() => {
          showLoding(false)
        })
      } else {
        addMessage(res.msg)
      }
    })
  }
  const getFun = () => {
    if (state.token) {
      getNodeUserList().then(res => {
        setNodeRecord(res.data)
        console.log(res.data, '节点奖励');
      })
    }
  }

  useEffect(() => {
    if (state.token) {
      getNodeUserList().then(res => {
        setNodeRecord(res.data)
        console.log(res.data, '节点奖励');
      })
      getNodeBase().then(res => {
        setNodeBase(res.data)
      })
      return () => {
        clearTimeout(timeoutRef.current)
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
          {t('NodeDesc')}<br />
          {t('NodeDesc1')}<br />
          {t('NodeDesc2')}<br />
          {t('NodeDesc3')}<br />
          {t('NodeDesc4')}<br />
        </div >
        <div className="Content">
          {/* 節點申請 */}
          <Node getFun={() => { getFun() }}></Node>
          {/* 銷毀獎勵 */}
          {NodeRecord.length > 0 ? NodeRecord.map((item) => <div key={item.id} className="DestructReward">
            <div className="title">{t("Node reward")}</div>
            <div className="rewardValue">{t("Mintage")}：{item.totalAwardNum} {item.coinName}</div>
            <div className="toFreed">{t("RemainingMint")}：{item.stayAwardNum} {item.coinName}</div>
            <div className="process">
              <div className="Freed">{t("Progress")}：</div>
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
                  <div className="Btn flex" onClick={() => Receive(6, item.id, item.stayDrawNum)}>{t('Claim')}</div>
                  <div className="Btn flex" onClick={() => { returnFun(item.id, item.applyPrice) }}>{t('Refund')}</div>
                </div> :
                <div className="btnBox">
                  <div className="Btn flex" onClick={() => Receive(6, item.id, item.stayDrawNum)}>{t('Claim')}</div>
                  <div className="notBtn flex">{t('Refund')}</div>
                </div>
            }
            <div className="getRecord" onClick={() => { ShowProfitFun(item.id) }}>
              {t("Records")} <img src={RecordIcon} alt="" />
            </div>
          </div>) : <div className="DestructReward">
            <div className="title">{t("Node reward")}</div>
            <div className="rewardValue">{t("Mintage")}：-</div>
            <div className="toFreed">{t("RemainingMint")}：-</div>
            <div className="process">
              <div className="Freed">{t("Progress")}：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: 0 + '%' }}></div>
              </div>
              <div className="value">-</div>
            </div>
            <div className="inputBox">
              <input type="number" value={0} readOnly={true} />
              <div className="coinBox"><img src={SBLIcon} alt="" />-</div>
            </div>

            <div className="btnBox">
              <div className="Btn flex">{t('Claim')}</div>
              <div className="notBtn flex">{t('Refund')}</div>
            </div>
            <div className="getRecord">
              {t("Records")} <img src={RecordIcon} alt="" />
            </div>
          </div>}
        </div>
      </div >
      {/* 节点收益记录 */}
      <GlodJdSy isShow={showProfit} id={ProfitId} close={() => { setShowProfit(false) }
      }></GlodJdSy >
    </div >
  )
}
export default React.memo(SBL)