import React, { useState, useEffect } from 'react'
import Reward from '../components/Reward'
import Node from '../components/Node'
import { useTranslation } from 'react-i18next'
import '../assets/style/SBL.scss'
import RewardRecord from '../components/RewardRecord'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import RecordIcon from '../assets/image/record.png'
function SBL() {
  let { t } = useTranslation()
  let [Tab, setTab] = useState(1)

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
          <div className="DestructReward">
            <div className="title">節點獎勵</div>
            <div className="rewardValue">鑄幣額度：1800 SBL</div>
            <div className="toFreed">剩餘鑄幣：200 SBL</div>
            <div className="process">
              <div className="Freed">進程：</div>
              <div className="processBox">
                <div className="processBar" style={{ width: '50%' }}></div>
              </div>
              <div className="value">（97D）</div>
            </div>
            <div className="inputBox">
              <input type="number" value={0} />
              <div className="coinBox"><img src={SBLIcon} alt="" /> SBL</div>
            </div>
            <div className="btnBox">
              <div className="Btn flex">領取</div>
              <div className="notBtn flex">退還</div>
            </div>
            <div className="getRecord">
              收益記錄 <img src={RecordIcon} alt="" />
            </div>
          </div>
        </div>

      </div>
      {/* 收益记录 */}
      <RewardRecord showModal={false}></RewardRecord>

    </div>
  )
}
export default React.memo(SBL)