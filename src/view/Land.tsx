import React, { useState, useEffect } from 'react'
import Reward from '../components/Reward'
import { useTranslation } from 'react-i18next'
import '../assets/style/Land.scss'
import RewardRecord from '../components/RewardRecord'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import myTerritory from '../assets/image/landProcess/myTerritory.png'
import landApply from '../assets/image/landProcess/landApply.png'
import myRight from '../assets/image/landProcess/myRight.png'
import myTerritoryActive from '../assets/image/landProcess/myTerritoryActive.png'
import landApplyActive from '../assets/image/landProcess/landApplyActive.png'
import myRightActive from '../assets/image/landProcess/myRightActive.png'
import RecordIcon from '../assets/image/record.png'
function Land() {
  let { t } = useTranslation()
  let [Tab, setTab] = useState(1)

  return (
    <div>
      <div className="Land">
        <div className="SwapTitle">
          NFT - 土地
        </div>
        <div className="processState">
          <div className="imgBox"><img src={myTerritory} alt="" /></div>
          <div className="imgBox"><img src={landApply} alt="" /></div>
          <div className="imgBox"><img src={myRight} alt="" /></div>
        </div>
        <div className="LandDesc">
          土地是Space Ball 生態中最有價值的NFT，發行數量有限，是生態中最稀缺的資源。Space Ball 將對早期參與生態交互的用戶進行土地免費空投，用戶參與徽章NFT的合成，即可獲得土地申領權限。持有土地並激活后，可以享受土地分紅和土地服務獎，共享生態發展收益。
        </div>
        <div className="Content">

        </div>

      </div>
      {/* 收益记录 */}
      <RewardRecord showModal={false}></RewardRecord>

    </div>
  )
}
export default React.memo(Land)