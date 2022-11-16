import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getBurnUserInfo } from '../API/index'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
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
  let state = useSelector<stateType, stateType>(state => state);
  let { t } = useTranslation()
  let [destructDes, setDestructDes] = useState(false)
  // 销毁记录
  let [donationRecord, setDonationRecord] = useState(false)
  // 领取记录
  let [getRecord, setGetRecord] = useState(false)
  // 获取用户销毁奖励
  let [drawBurnRecord, setDrawBurnRecord] = useState<DestructRewardType | null>(null)

  useEffect(() => {
    if (state.token) {
      getBurnUserInfo().then(res => {
        setDrawBurnRecord(res.data)
        console.log(res.data, "获取销毁奖励领取记录")
      })
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
            <div className="DestructValue">銷毀基金額度：<span>563.4568 BNB</span></div>
            <div className="subTitle">當前最大可銷毀1000SBL，最小須銷毀50 SBL <img onClick={() => { setDestructDes(!destructDes) }} src={desIcon} alt="" /></div>
            <div className="inputBox">
              <input type="number" value={0} />
              <div className="maxBtn">max</div>
              <div className="coinBox"><img src={SBLIcon} alt="" /> SBL</div>
            </div>
            <div className="Balance">餘額：1,457485 SBLSBL</div>
            <div className="DestructBtn Btn flex">銷毀</div>
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
      <ConfirmDestruct showModal={false}></ConfirmDestruct>
      {/* 销毁成功 */}
      <DestructSucceed showModal={false}></DestructSucceed>
      {/* 销毁(捐赠)记录 */}
      <DonationRecord showModal={donationRecord} close={() => { setDonationRecord(false) }}></DonationRecord>
      {/* 领取记录 */}
      <GetRecord showModal={getRecord} close={() => { setGetRecord(false) }}></GetRecord>

    </div >
  )
}
export default React.memo(DestructFund)