import React, { useState, useEffect } from 'react'
import Reward from '../components/Reward'
import Node from '../components/Node'
import { useTranslation } from 'react-i18next'
import '../assets/style/DestructFund.scss'
// import AwardMechanism from '../components/AwardMechanism'
// import GainRecording from '../components/GainRecording'
import TeamMachine from '../components/TeamMachine'
import TeamEarnings from '../components/TeamEarnings'
import GlodMechanism from '../components/GlodMechanism'
// import GlodJdSy from '../components/GlodJdSy'
import DestructSucceed from '../components/DestructSucceed'
import DestructDes from '../components/DestructDes'
import DonateDestroy from '../components/DonateDestroy'
import ConfirmDestruct from '../components/ConfirmDestruct'
import DonationRecord from '../components/DonationRecord'
import GetRecord from '../components/GetRecord'
import AddFlowSucceed from '../components/AddFlowSucceed'
import AddFlowRem from '../components/AddFlowRem'
import RemoveAffirm from '../components/RemoveAffirm'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import BNBIcon from '../assets/image/BNBTokens.png'
import RecordIcon from '../assets/image/record.png'
import desIcon from '../assets/image/desIcon.png'
function DestructFund() {
  let { t } = useTranslation()
  let [Tab, setTab] = useState(1)

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
            <div className="subTitle">當前最大可銷毀1000SBL，最小須銷毀50 SBL <img src={desIcon} alt="" /></div>
            <div className="inputBox">
              <input type="number" value={0} />
              <div className="maxBtn">max</div>
              <div className="coinBox"><img src={SBLIcon} alt="" /> SBL</div>
            </div>
            <div className="Balance">餘額：1,457485 SBLSBL</div>
            <div className="DestructBtn Btn flex">銷毀</div>
            <div className="DestructRecord">
              銷毀記錄<img src={RecordIcon} alt="" />
            </div>
          </div>
          {/* 銷毀獎勵 */}
          <div className="DestructReward">
            <div className="title">銷毀獎勵</div>
            <div className="rewardValue">獎勵金額：563.4568 BNB</div>
            <div className="toFreed">待釋放：563.4568 BNB</div>
            <div className="process">
              <div className="Freed">進程：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: '50%' }}></div>
              </div>
              <div className="value">66.7%</div>
            </div>
            <div className="inputBox">
              <input type="number" value={0} />
              <div className="coinBox"><img src={BNBIcon} alt="" /> BNB</div>
            </div>
            <div className="getBtn Btn flex">領取</div>
            <div className="getRecord">
              領取記錄 <img src={RecordIcon} alt="" />
            </div>
          </div>
        </div>

      </div>

      {/* 销毁说明 */}
      <DestructDes showModal={false}></DestructDes>
      {/* 确认销毁 */}
      <ConfirmDestruct showModal={false}></ConfirmDestruct>
      {/* 销毁成功 */}
      <DestructSucceed showModal={false}></DestructSucceed>
      {/* 销毁(捐赠)记录 */}
      <DonationRecord showModal={false}></DonationRecord>
      {/* 领取记录 */}
      <GetRecord showModal={false}></GetRecord>


      {/* 我的交易记录 */}
      {/* <MyDealRecord></MyDealRecord> */}
      {/*  以添加流动性移除确认*/}
      <RemoveAffirm></RemoveAffirm>
      {/* 以添加流动性移除 */}
      <AddFlowRem></AddFlowRem>
      {/* 添加流动性成功 */}
      <AddFlowSucceed></AddFlowSucceed>




      {/* 团队奖励的收益记录 */}
      <TeamEarnings></TeamEarnings>

    </div >
  )
}
export default React.memo(DestructFund)