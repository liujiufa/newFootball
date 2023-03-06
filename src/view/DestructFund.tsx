import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getBurnUserInfo, userDrawAward, userCancelDrawAward } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { Contracts } from '../web3';
import { useWeb3React } from '@web3-react/core'
import { NumSplic, showLoding, addMessage, getBit, initWebSocket } from '../utils/tool';
import { contractAddress, socketUrl } from "../config"

import BigNumber from 'big.js'

import '../assets/style/DestructFund.scss'
import DestructSucceed from '../components/DestructSucceed'
import DestructDes from '../components/DestructDes'
import DonateDestroy from '../components/DonateDestroy'
import ConfirmDestruct from '../components/ConfirmDestruct'
import DonationRecord from '../components/DonationRecord'
import GetRecord from '../components/GetRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import BNBIcon from '../assets/image/BNBIcon.svg'
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
  // 最小额度
  const [minBurn, setMinBurn] = useState('0')
  // SBL授权
  const [ApproveValue, setApproveValue] = useState('0')
  // 基金额度
  const timeoutRef = useRef(0);
  const [burnLimitValue, setBurnLimitValue] = useState('0')
  const [inputValue, setInputValue] = useState(0)

  const changeFun = (e: any) => {
    let value = e.target.value.replace(/^[^1-9]+|[^0-9]/g, '')
    // let value = e.target.value.toString()
    // if (parseFloat(value) >= (parseFloat(toSBL) / parseFloat(burnLimitValue) * 0.1) && value <= parseFloat(balance1) && value <= parseFloat(toSBL) * 0.5) {
    // setInputValue(parseFloat(value))
    setInputValue(value)
  }

  const maxFun = (num: number) => {
    if (num > parseFloat(balance1)) {
      setInputValue(parseFloat(balance1))
    } else {
      setInputValue(num)
    }
  }

  const conBurnFun = () => {
    if (parseFloat(burnLimitValue) <= 0) {
      return addMessage(t('Insufficient amount of destruction fund'))
    }
    if (inputValue <= Math.floor(parseInt(toSBL) * 0.05) && inputValue >= parseInt(minBurn)) {
      setConBurn(true)
    } else {
      return addMessage(t('Please enter the correct value'))
    }
  }

  // 授权
  function ApproveFun() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    if (parseFloat(burnLimitValue) <= 0) {
      return addMessage(t('Insufficient amount of destruction fund'))
    }
    if (inputValue < parseFloat(minBurn) || inputValue > Math.floor(parseInt(toSBL) * 0.05)) {
      return addMessage(t('Please enter the correct value'))
    }
    showLoding(true)
    Contracts.example.approve1(web3React.account as string, contractAddress.BurnFund, `${inputValue}`).then(() => {
      Contracts.example.Tokenapprove(web3React.account as string, contractAddress.BurnFund).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
      }).finally(() => {
        showLoding(false)
      })
    }).finally(() => {
      showLoding(false)
    })
  }

  // 销毁
  const burnFun = (num: number) => {
    console.log(num);
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
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
  // 领取销毁奖励
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
        Contracts.example.getBurnFundAward(web3React.account as string, res.data).then((res: any) => {
          addMessage(t('Receive success'))
          if (state.token && web3React.account) {
            timeoutRef.current = window.setTimeout(() => {
              getBurnUserInfo().then(res => {
                setDrawBurnRecord(res.data)
                console.log(res.data, "获取销毁奖励")
              })
            }, 5000);
          }
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
  useEffect(() => {
    if (state.token && web3React.account) {
      getBurnUserInfo().then(res => {
        setDrawBurnRecord(res.data)
        console.log(res.data, "获取销毁奖励")
      })

      // let time = setInterval(() => {
      //   getBurnUserInfo().then(res => {
      //     setDrawBurnRecord(res.data)
      //   })
      // }, 3000)
      // 推送
      let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getBurnUserInfo/${web3React.account}`, `/getBurnUserInfo/${web3React.account}`,
        {}, (data: any) => {
          setDrawBurnRecord(data)
        })
      Contracts.example.Tokenapprove(web3React.account, contractAddress.BurnFund).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
      })
      /* 查询SBL余额 */
      Contracts.example.balanceOf(web3React.account).then((res: any) => {
        setBalance1(new BigNumber(res).div(10 ** 18).toString())
      })
      /* 查询销毁基金 */
      Contracts.example.burnLimit(web3React.account).then((res: any) => {
        console.log(res, '销毁基金额度');
        let value = new BigNumber(res).div(10 ** 18).toString()
        setBurnLimitValue(value)
        // toSBL
        Contracts.example.toSBL(web3React.account as string, parseFloat(value)).then((res: any) => {
          let toSBLValue = new BigNumber(res).div(10 ** 18).toString()
          setToSBL(toSBLValue)
        })
      })
      /* 查询最小销毁 */
      Contracts.example.minToBurn(web3React.account).then((res: any) => {
        let value = new BigNumber(res).div(10 ** 18).toString()
        Contracts.example.toSBL(web3React.account as string, parseFloat(value)).then((res: any) => {
          let toSBLValue = new BigNumber(res).div(10 ** 18).toString()
          console.log(toSBLValue, '最小销毁额度');

          setMinBurn(`${parseInt(toSBLValue) + 1}`)
          setInputValue(parseInt(toSBLValue) + 1)

        })
      })
      return () => {
        try {
          stompClient.disconnect()
        } catch {

        }
        clearInterval(sendTimer)
        clearTimeout(timeoutRef.current);
      }
    }
  }, [state.token, web3React.account])


  return (
    <div>
      <div className="DestructFund">
        <div className="SwapTitle">
          {t("SBL destroyed")}
        </div>
        <div className="NodeDesc">
          {t("SBL Des")}
        </div>
        <div className="Content">
          {/* 銷毀參與 */}
          <div className="DestructJoin">
            <div className="title">{t("Burn")}</div>
            <div className="DestructValue">{t("Destruction Fund Quota")}：<span>{NumSplic(burnLimitValue, 4)} BNB</span></div>
            <div className="subTitle">{t("destructTip", { price1: Math.floor(parseInt(toSBL) * 0.05), price2: parseInt(minBurn) })}<img onClick={() => { setDestructDes(!destructDes) }} src={desIcon} alt="" /></div>
            <div className="inputBox">
              <input value={inputValue} onChange={(e) => { changeFun(e) }} />
              <div className="maxBtn" onClick={() => { maxFun(Math.floor(parseInt(toSBL) * 0.05)) }}>max</div>
              <div className="coinBox"><img src={SBLIcon} alt="" /> SBL</div>
            </div>
            <div className="Balance">{t("Balance")}：{NumSplic(balance1, 4)} SBL</div>
            {parseFloat(ApproveValue) > inputValue ? (Math.floor(parseInt(toSBL) * 0.05) < parseInt(minBurn) ? <div className="DestructBtn Btn DestructBtning flex" onClick={() => { addMessage(t("Currently cannot be destroyed")) }}>{t("Destroy")}</div> : <div className="DestructBtn Btn  flex" onClick={() => { conBurnFun() }}>{t("Destroy")}</div>) : <div className="DestructBtn Btn flex" onClick={() => { ApproveFun() }}>{t("Approve")}</div>}
            <div className="DestructRecord" onClick={() => { setDonationRecord(!donationRecord) }}>
              {t("Destroy records")}<img src={RecordIcon} alt="" />
            </div>
          </div>
          {/* 銷毀獎勵 */}
          <div className="DestructReward">
            <div className="title">{t("Destruction Rewards")}</div>
            <div className="rewardValue">{t("Award amount")}：{NumSplic(`${drawBurnRecord?.awardAmount}`, 8) || "0"} {drawBurnRecord?.coinName || "SBL"}</div>
            <div className="toFreed">{t("To be released")}：{NumSplic(`${drawBurnRecord?.treatAmount}`, 8) || "0"} {drawBurnRecord?.coinName || "SBL"}</div>
            {drawBurnRecord ? <div className="process">
              <div className="Freed">{t("Process")}：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: `${Math.floor(((drawBurnRecord!.awardAmount) - (drawBurnRecord!.treatAmount)) / (drawBurnRecord!.awardAmount) * 100)}%` }}></div>
              </div>
              <div className="value">{Math.floor(((drawBurnRecord!.awardAmount) - (drawBurnRecord!.treatAmount)) / (drawBurnRecord!.awardAmount) * 100)}%</div>
            </div> :
              <div className="process">
                <div className="Freed">{t("Process")}：</div>
                <div className="processBox">
                  <div className="processBar" style={{ width: `0%` }}></div>
                </div>
                <div className="value">0%</div>
              </div>}
            <div className="inputBox">
              <input type="number" className='destructInput' value={`${NumSplic(`${drawBurnRecord?.amount}`, 8) || 0}`} readOnly={true} />
              <div className="coinBox"><img src={BNBIcon} alt="" /> BNB</div>
            </div>
            <div className="getBtn Btn flex" onClick={() => { Receive(5, drawBurnRecord?.dataId as number, drawBurnRecord?.amount as number) }}>{t("Harvest")}</div>
            <div className="getRecord" onClick={() => { setGetRecord(!getRecord) }}>
              {t("Pick up record")} <img src={RecordIcon} alt="" />
            </div>
          </div>
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