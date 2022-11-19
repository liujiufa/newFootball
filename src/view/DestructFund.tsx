import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getBurnUserInfo } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { Contracts } from '../web3';
import { useWeb3React } from '@web3-react/core'
import { NumSplic, showLoding, addMessage, getBit } from '../utils/tool';
import { contractAddress } from "../config"

import BigNumber from 'big.js'

import '../assets/style/DestructFund.scss'
import DestructSucceed from '../components/DestructSucceed'
import DestructDes from '../components/DestructDes'
import DonateDestroy from '../components/DonateDestroy'
import ConfirmDestruct from '../components/ConfirmDestruct'
import DonationRecord from '../components/DonationRecord'
import GetRecord from '../components/GetRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import BNBIcon from '../assets/image/BNBTokens.png'
import RecordIcon from '../assets/image/record.png'
import desIcon from '../assets/image/desIcon.png'

interface DestructRewardType {
  awardAmount: number,
  coinName: string,
  amount: number,
  dataId: number,
  treatAmount: number
}

function DestructFund() {
  const web3React = useWeb3React()

  let state = useSelector<stateType, stateType>(state => state);
  let { t } = useTranslation()
  let [destructDes, setDestructDes] = useState(false)
  // 销毁记录
  let [donationRecord, setDonationRecord] = useState(false)
  // 销毁成功
  let [burnSuccess, setBurnSuccess] = useState(false)
  // 确定销毁
  let [conBurn, setConBurn] = useState(false)
  // 领取记录
  let [getRecord, setGetRecord] = useState(false)
  // 获取用户销毁奖励
  let [drawBurnRecord, setDrawBurnRecord] = useState<DestructRewardType | null>(null)
  // SBL余额
  const [balance1, setBalance1] = useState('0')
  // TO SBL
  const [toSBL, setToSBL] = useState('0')
  // SBL授权
  const [ApproveValue, setApproveValue] = useState('0')
  const [burnToEarnValue, setBurnToEarnValue] = useState('0')
  // 基金额度
  const [burnLimitValue, setBurnLimitValue] = useState('0')
  const [inputValue, setInputValue] = useState((parseFloat(toSBL) * 0.05) / parseFloat(burnLimitValue) * 0.1)

  // 领取销毁奖励
  const getBurnToEarn = () => {

  }

  const changeFun = (e: any) => {
    let value = e.target.value
    // if (parseFloat(value) >= (parseFloat(toSBL) / parseFloat(burnLimitValue) * 0.1) && value <= parseFloat(balance1) && value <= parseFloat(toSBL) * 0.5) {
    if (value > 0) {
      setInputValue(parseFloat(value))
    } else {

    }
  }
  const maxFun = (num: string) => {
    if (parseFloat(num) > parseFloat(balance1)) {
      setInputValue(parseFloat(balance1))
    } else {
      setInputValue(parseFloat(num))
    }
  }
  const conBurnFun = () => {
    setConBurn(true)
  }


  // 授权
  function ApproveFun() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    showLoding(true)
    Contracts.example.toSBL(web3React.account as string, inputValue).then((res: any) => {
      let value = new BigNumber(res).div(10 ** 18).toString()
      Contracts.example.approve1(web3React.account as string, contractAddress.DstructFund, value).then(() => {
        Contracts.example.Tokenapprove(web3React.account as string, contractAddress.DstructFund).then((res: any) => {
          setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        }).finally(() => {
          showLoding(false)
        })
      })
    })
  }


  // 销毁
  const burnFun = (num: number) => {
    console.log(num);
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    if (num <= 0) {
      return addMessage('请输入正确的值')
    }
    showLoding(true)
    Contracts.example.burnToEarn(web3React.account as string, num).then(() => {
      // addMessage(t('Authorization succeeded'))
      console.log('销毁成功');

      setConBurn(false)
      setBurnSuccess(true)
    }).finally(() => {
      showLoding(false)
    })
  }

  useEffect(() => {
    if (state.token && web3React.account) {
      getBurnUserInfo().then(res => {
        setDrawBurnRecord(res.data)
        console.log(res.data, "获取销毁奖励领取记录")
      })
      Contracts.example.Tokenapprove(web3React.account, contractAddress.DstructFund).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
      })
      /* 查询SBL余额 */
      Contracts.example.balanceOf(web3React.account).then((res: any) => {
        setBalance1(new BigNumber(res).div(10 ** 18).toString())
      })
      /* 查询销毁基金 */
      Contracts.example.burnLimit(web3React.account).then((res: any) => {
        let value = new BigNumber(res).div(10 ** 18).toString()
        setBurnLimitValue(value)
        // toSBL
        Contracts.example.toSBL(web3React.account as string, parseFloat(value)).then((res: any) => {
          setToSBL(new BigNumber(res).div(10 ** 18).toString())
        })
      })
      console.log(parseFloat(getBit(parseFloat(toSBL) / parseFloat(burnLimitValue) * 0.1, 4)), 'nihao');
      // setInputValue(parseFloat(getBit(parseFloat(toSBL) / parseFloat(burnLimitValue) * 0.1, 4)))
    }
  }, [state.token])


  return (
    <div>
      <div className="DestructFund">
        <div className="SwapTitle">
          SBL銷毀
        </div>
        <div className="NodeDesc">
          SBL採用通縮治理模型，將賣出滑點全部打入銷毀基金池，作為對用戶銷毀SBL的獎勵。用戶銷毀SBL，將獲得2倍價值的BNB獎勵，獎勵將在2,592,000個區塊內釋放完畢。每次捐贈後，等待28,800個區塊可以再次捐贈。
        </div>

        <div className="Content">
          {/* 銷毀參與 */}
          <div className="DestructJoin">
            <div className="title">销毁参与</div>
            <div className="DestructValue">銷毀基金額度：<span>{NumSplic(burnLimitValue, 4)} BNB</span></div>
            <div className="subTitle">當前最大可銷毀{NumSplic(`${parseInt(toSBL) * 0.05}`, 4)}SBL，最小須銷毀{NumSplic(`${(parseFloat(toSBL) * 0.05) / parseFloat(burnLimitValue) * 0.1}`, 4)} SBL <img onClick={() => { setDestructDes(!destructDes) }} src={desIcon} alt="" /></div>
            <div className="inputBox">
              <input type="number" value={inputValue} onChange={(e) => { changeFun(e) }} />
              <div className="maxBtn" onClick={() => { maxFun(getBit(parseInt(toSBL) * 0.05, 4)) }}>max</div>
              <div className="coinBox"><img src={SBLIcon} alt="" /> SBL</div>
            </div>
            <div className="Balance">餘額：{NumSplic(balance1, 4)} SBL</div>
            {parseFloat(ApproveValue) > 0 ? <div className="DestructBtn Btn flex" onClick={() => { conBurnFun() }}>銷毀</div> : <div className="DestructBtn Btn flex" onClick={() => { ApproveFun() }}>授权</div>}
            <div className="DestructRecord" onClick={() => { setDonationRecord(!donationRecord) }}>
              銷毀記錄<img src={RecordIcon} alt="" />
            </div>
          </div>
          {/* 銷毀獎勵 */}
          {drawBurnRecord?.dataId && <div className="DestructReward">
            <div className="title">銷毀獎勵</div>
            <div className="rewardValue">獎勵金額：{drawBurnRecord?.awardAmount} {drawBurnRecord?.coinName}</div>
            <div className="toFreed">待釋放：{drawBurnRecord?.treatAmount} {drawBurnRecord?.coinName}</div>
            <div className="process">
              <div className="Freed">進程：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: `${(drawBurnRecord?.treatAmount * 100) / (drawBurnRecord?.awardAmount * 100)}` }}></div>
              </div>
              <div className="value">{(drawBurnRecord?.treatAmount * 100) / (drawBurnRecord?.awardAmount * 100) * 100}%</div>
            </div>
            <div className="inputBox">
              <input type="number" value={drawBurnRecord?.amount} readOnly={true} />
              <div className="coinBox"><img src={BNBIcon} alt="" /> BNB</div>
            </div>
            <div className="getBtn Btn flex">領取</div>
            <div className="getRecord" onClick={() => { setGetRecord(!getRecord) }}>
              領取記錄 <img src={RecordIcon} alt="" />
            </div>
          </div>}
        </div>

      </div>

      {/* 销毁说明 */}
      <DestructDes showModal={destructDes} close={() => { setDestructDes(false) }}></DestructDes>
      {/* 确认销毁 */}
      <ConfirmDestruct showModal={conBurn} data={inputValue} close={() => { setConBurn(false) }} BurnFun={burnFun}></ConfirmDestruct>
      {/* 销毁成功 */}
      <DestructSucceed showModal={burnSuccess} close={() => { setBurnSuccess(false) }}></DestructSucceed>
      {/* 销毁(捐赠)记录 */}
      <DonationRecord showModal={donationRecord} close={() => { setDonationRecord(false) }}></DonationRecord>
      {/* 领取记录 */}
      <GetRecord showModal={getRecord} close={() => { setGetRecord(false) }}></GetRecord>

    </div >
  )
}
export default React.memo(DestructFund)