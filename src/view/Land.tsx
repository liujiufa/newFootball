import React, { useState, useEffect } from 'react'
import LandDetailDes from '../components/LandDetailDes'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'antd';
import NoData from '../components/NoData'
import LandCard, { CardInfoType } from '../components/LandCard'
import { getUserCard } from '../API'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import DropDown from '../components/DropDown'
import LandCardDetails from '../components/LandCardDetails'
import LandRewardRecord from '../components/LandRewardRecord'
import LandSwiper from '../components/LandSwiper'

import '../assets/style/Swap.scss'
import '../assets/style/Land.scss'
import ClaimSuccess from '../components/ClaimSuccess'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLTokens.png'
import myTerritory from '../assets/image/landProcess/myTerritory.png'
import landApply from '../assets/image/landProcess/landApply.png'
import myRight from '../assets/image/landProcess/myRight.png'
import myTerritoryActive from '../assets/image/landProcess/myTerritoryActive.png'
import landApplyActive from '../assets/image/landProcess/landApplyActive.png'
import myRightActive from '../assets/image/landProcess/myRightActive.png'
import RecordIcon from '../assets/image/record.png'
import helpIcon from '../assets/image/helpIcon.png'


const LevelMap = [
  {
    key: 'pmap',
    value: 0
  },
  {
    key: 'Common',
    value: 1
  },
  {
    key: 'Uncommon',
    value: 2
  },
  {
    key: 'Outstanding',
    value: 3
  },
  {
    key: 'Rare',
    value: 4
  },
  {
    key: 'Perfect',
    value: 5
  },
  {
    key: 'Epic',
    value: 6
  }
]
function Land() {
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()
  let { t } = useTranslation()
  let [tabActive, setTabActive] = useState('1')
  let [totalNum, SetTotalNum] = useState(0)
  let [userCard, setuserCard] = useState<CardInfoType[]>([])

  useEffect(() => {
    if (state.token && web3React.account && tabActive === '2') {
      getUserCard({
        currentPage: 1,
        level: 0,
        pageSize: 12,
        type: 0,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data.list, "用户卡牌")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }, [state.token, web3React.account, tabActive])

  return (
    <div>
      <div className="Land">
        <div className="SwapTitle">
          NFT - 土地
        </div>
        <div className="processState">
          <div className="imgBox" onClick={() => { setTabActive('1') }}><img src={tabActive === '1' ? myTerritoryActive : myTerritory} alt="" /></div>
          <div className="imgBox" onClick={() => { setTabActive('2') }}><img src={tabActive === '2' ? landApplyActive : landApply} alt="" /></div>
          <div className="imgBox" onClick={() => { setTabActive('3') }}><img src={tabActive === '3' ? myRightActive : myRight} alt="" /></div>
        </div>
        {/* 1.土地申领 */}
        {
          tabActive === '1' && <div className="Content">
            <div className="LandDesc">
              土地是Space Ball 生態中最有價值的NFT，發行數量有限，是生態中最稀缺的資源。Space Ball 將對早期參與生態交互的用戶進行土地免費空投，用戶參與徽章NFT的合成，即可獲得土地申領權限。持有土地並激活后，可以享受土地分紅和土地服務獎，共享生態發展收益。
            </div>
            {/* 轮播图 */}
            <LandSwiper></LandSwiper>
            {false ? <div className="applyBtn flex">申请(2)</div> : <div className="toApplyBtn flex">申请</div>}
          </div>
        }
        {/* 2.我的领地 */}
        {
          tabActive === '2' && <div className="Content">
            <>
              <div className="screen">
                <div className="title">
                  我的封號：<div className="myTitle flex">城主</div>
                </div>
                <div className="DropDownGroup">
                  <DropDown Map={LevelMap}></DropDown>
                </div>
              </div>
              {/* 盲盒 */}
              {
                true ? <>
                  <div className="CardList">
                    <LandCard></LandCard>
                    <LandCard></LandCard>
                    <LandCard></LandCard>
                    <LandCard></LandCard>
                  </div>
                </> : <>
                  <NoData></NoData>
                </>
              }
              <div className="Pagination">
                <Pagination style={{ margin: "auto" }} showQuickJumper defaultCurrent={1} defaultPageSize={12} showSizeChanger={false} total={totalNum} />
              </div>
            </>
          </div>
        }
        {/* 3.我的权益 */}
        {
          tabActive === '3' && <div className="Content">
            <div className="myLandRightBox">
              <div className="myTitle">我的封號：領主<img src={helpIcon}></img> </div>

              <div className="RewardBox">
                <div className="landService">
                  <div className="title">土地服務獎</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">纍計收益：</div>
                      <div className="allRewardValue">100.11 SBL</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">0.000000</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> SBL</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex">領取</div></div>
                  </div>
                  <div className="rewardRecord">獎勵記錄<img src={RecordIcon} alt="" /></div>
                </div>
                <div className="landShare">
                  <div className="title">土地分紅</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">纍計收益：</div>
                      <div className="allRewardValue">100.11 SBL</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">0.000000</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> SBL</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex">領取</div></div>
                  </div>
                  <div className="rewardRecord">獎勵記錄<img src={RecordIcon} alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
      {/* 申领成功 */}
      <ClaimSuccess showModal={false}></ClaimSuccess>
      {/* 土地详情 */}
      <LandCardDetails showModal={false}></LandCardDetails>
      {/* 土地详情 */}
      <LandDetailDes showModal={false}></LandDetailDes>
      {/* 奖励记录 */}
      <LandRewardRecord showModal={false}></LandRewardRecord>
    </div>
  )
}
export default React.memo(Land)