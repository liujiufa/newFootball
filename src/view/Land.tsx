import React, { useState, useEffect } from 'react'
import LandDetailDes from '../components/LandDetailDes'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'antd';
import NoData from '../components/NoData'
import LandCard, { LandUserCard } from '../components/LandCard'
import { getLandUserBeneficial, getLandUserCardList, getUserInfo, getLandUserList } from '../API'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import DropDown from '../components/DropDown'
import LandCardDetails from '../components/LandCardDetails'
import LandRewardRecord from '../components/LandRewardRecord'
import LandSwiper from '../components/LandSwiperCopy'
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
    key: 'Uncommon',
    value: 1
  },
  {
    key: 'Outstanding',
    value: 2
  },
  {
    key: 'Rare',
    value: 3
  },
  {
    key: 'Perfect',
    value: 4
  },
  {
    key: 'Epic',
    value: 5
  },
  {
    key: '传奇',
    value: 6
  },
]
const LevelObj = { 0: '', 1: '领主', 2: '城主', 3: '市长', 4: '州长', 5: '议长' }
interface UserBeneficialType {
  amount: number,
  amountString: string,
  coinName: string,
  createTime: string,
  freezeAmount: number,
  id: number,
  totalAmount: number,
  type: number,
  updateTime: string,
  userAddress: string,
  userId: number
}

function Land() {
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()
  let { t } = useTranslation()
  let [tabActive, setTabActive] = useState('1')
  let [totalNum, SetTotalNum] = useState(0)
  let [userLevel, setUserLevel] = useState(0)
  let [page, SetPage] = useState(1)
  // 土地详情index
  let [cardDetialIndex, setCardDetialIndex] = useState(0)
  // 土地等级筛选
  let [level, SetLevel] = useState(0)
  // 控制土地详情
  let [userCardDetail, setUserCardDetail] = useState(false)
  // 控制奖励记录
  let [landRewardRecord, setLandRewardRecord] = useState(false)
  // 控制奖励index
  let [landRewardRecordId, setLandRewardRecordId] = useState(0)
  // 控制土地详情说明
  let [landDetailDes, setLandDetailDes] = useState(false)
  //  土地申领
  let [landApplication, setLandApplication] = useState([])
  // 我的权益
  let [userBeneficial, setUserBeneficial] = useState<UserBeneficialType[]>([])
  //  土地申领数量
  let [landApplicationNum, setLandApplicationNum] = useState(0)
  // 我的领地
  let [landUserCard, setLandUserCard] = useState<LandUserCard[]>([])

  // 奖励记录
  const rewardRecordFun = (index: number) => {
    setLandRewardRecordId(index)
    setLandRewardRecord(true)
  }

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  // 打开对应土地详情
  const showDetailFun = (index: number) => {
    setCardDetialIndex(index)
    setUserCardDetail(true)
  }

  useEffect(() => {
    if (state.token && web3React.account && tabActive === '2') {
      // 我的领地
      getLandUserCardList({
        currentPage: page,
        level: level,
        pageSize: 12,
        userAddress: web3React.account
      }
      ).then(res => {
        console.log(res.data, "我的领地")
        setLandUserCard(res.data)
        SetTotalNum(res.data.size)
      })
    }
  }, [state.token, web3React.account, level, page, tabActive])

  useEffect(() => {
    if (state.token && web3React.account && tabActive === '1') {
      // 土地申领
      getLandUserList().then(res => {
        console.log(res.data, "获取土地申领数据")
        setLandApplication(res.data)
        setLandApplicationNum(res.data.reduce((sum: any, item: any) => sum + item.landCount, 0))
      })
    }
    // 我的封号
    getUserInfo().then(res => {
      console.log(res.data, "我的封号")
      setUserLevel(res.data.levlel)
    })

    if (state.token && web3React.account && tabActive === '3') {
      // 我的权益
      getLandUserBeneficial().then(res => {
        console.log(res.data, "我的权益")
        setUserBeneficial(res.data)
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
          <div className="imgBox" onClick={() => { setTabActive('1') }}><img src={tabActive === '1' ? landApplyActive : landApply} alt="" /></div>
          <div className="imgBox" onClick={() => { setTabActive('2') }}><img src={tabActive === '2' ? myTerritoryActive : myTerritory} alt="" /></div>
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
            {landApplicationNum > 0 ? <div className="applyBtn flex">申请({landApplicationNum})</div> : <div className="toApplyBtn flex">申请</div>}
          </div>
        }
        {/* 2.我的领地 */}
        {
          tabActive === '2' && <div className="Content">
            <>
              <div className="screen">
                <div className="title">
                  我的封號：<div className="myTitle flex">{LevelObj[userLevel]}</div>
                </div>
                <div className="DropDownGroup">
                  <DropDown Map={LevelMap} change={SetLevel} staetIndex={level}></DropDown>
                </div>
              </div>
              {/* 盲盒 */}
              {
                landUserCard.length > 0 ? <>
                  <div className="CardList">
                    {landUserCard.map((item, index) => <LandCard key={item.id} Index={index} cardInfo={item} showDetail={showDetailFun}></LandCard>)}
                  </div>
                </> : <>
                  <NoData></NoData>
                </>
              }
              <div className="Pagination">
                <Pagination style={{ margin: "auto" }} showQuickJumper defaultCurrent={1} defaultPageSize={12} showSizeChanger={false} total={totalNum} onChange={onChange} />
              </div>
            </>
          </div>
        }
        {/* 3.我的权益 */}
        {
          tabActive === '3' && <div className="Content">
            <div className="myLandRightBox">
              <div className="myTitle" onClick={() => { setLandDetailDes(true) }}>我的封號：{LevelObj[userLevel]}<img src={helpIcon}></img> </div>
              {/* 我的权益 */}
              {userBeneficial.length > 0 && <div className="RewardBox">

                <div className="landService">
                  <div className="title">土地服務獎</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">纍計收益：</div>
                      <div className="allRewardValue">{userBeneficial[0]?.totalAmount} {userBeneficial[0]?.coinName}</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">{userBeneficial[0]?.amount}</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> {userBeneficial[0]?.coinName}</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex">領取</div></div>
                  </div>
                  <div className="rewardRecord" onClick={() => { rewardRecordFun(1) }}>獎勵記錄<img src={RecordIcon} alt="" /></div>
                </div>

                <div className="landShare">
                  <div className="title">土地分紅</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">纍計收益：</div>
                      <div className="allRewardValue">{userBeneficial[1]?.totalAmount} {userBeneficial[1]?.coinName}</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">{userBeneficial[1]?.amount}</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> {userBeneficial[1]?.coinName}</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex">領取</div></div>
                  </div>
                  <div className="rewardRecord" onClick={() => { rewardRecordFun(2) }}>獎勵記錄<img src={RecordIcon} alt="" /></div>
                </div>

              </div>}
            </div>
          </div>
        }

      </div>
      {/* 申领成功 */}
      <ClaimSuccess showModal={false}></ClaimSuccess>
      {/* 土地详情 */}
      {landUserCard[cardDetialIndex] && <LandCardDetails CardInfo={landUserCard[cardDetialIndex]} showModal={userCardDetail} close={() => setUserCardDetail(false)}></LandCardDetails>}
      {/* 土地详情说明 */}
      <LandDetailDes showModal={landDetailDes} close={() => setLandDetailDes(false)}></LandDetailDes>
      {/* 奖励记录(土地服务费、土地分红) */}
      {landRewardRecordId && <LandRewardRecord id={landRewardRecordId} showModal={landRewardRecord}></LandRewardRecord>}
    </div >
  )
}
export default React.memo(Land)