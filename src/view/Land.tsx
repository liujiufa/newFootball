import React, { useState, useEffect, useRef } from 'react'
import LandDetailDes from '../components/LandDetailDes'
import { useTranslation } from 'react-i18next'
import { Pagination } from 'antd';
import NoData from '../components/NoData'
import LandCard, { LandUserCard } from '../components/LandCard'
import { getLandUserBeneficial, getLandUserCardList, getUserInfo, getLandUserList, claimLand, userDrawAward, userCancelDrawAward } from '../API'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Contracts } from "../web3";
import { showLoding, addMessage, NumSplic } from '../utils/tool';
import Slide from "../components/Slide";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SellCardDetails from '../components/SellCardDetails'
import Tips from '../components/Tips'
import BigNumber from 'big.js'
import Banner from '../components/LandSwiper'
import DropDown from '../components/DropDown'
import LandCardDetails from '../components/LandCardDetails'
import LandRewardRecord from '../components/LandRewardRecord'
import '../assets/style/Swap.scss'
import '../assets/style/Land.scss'
import ClaimSuccess from '../components/ClaimSuccess'
// import MyDealRecord from '../components/MyDealRecord'
import SBLIcon from '../assets/image/SBLIcon.png'

import myTerritory from '../assets/image/landProcess/myTerritory.png'
import landApply from '../assets/image/landProcess/landApply.png'
import myRight from '../assets/image/landProcess/myRight.png'
import myTerritoryActive from '../assets/image/landProcess/myTerritoryActive.png'
import landApplyActive from '../assets/image/landProcess/landApplyActive.png'
import myRightActive from '../assets/image/landProcess/myRightActive.png'

import myTerritoryEN from '../assets/image/landProcessEN/myTerritory.png'
import landApplyEN from '../assets/image/landProcessEN/landApply.png'
import myRightEN from '../assets/image/landProcessEN/myRight.png'
import myTerritoryActiveEN from '../assets/image/landProcessEN/myTerritoryActive.png'
import landApplyActiveEN from '../assets/image/landProcessEN/landApplyActive.png'
import myRightActiveEN from '../assets/image/landProcessEN/myRightActive.png'

import RecordIcon from '../assets/image/record.png'
import helpIcon from '../assets/image/helpIcon.png'

const LevelMap = [
  {
    key: 'pmap',
    value: 0
  },
  {
    key: 'Excellent',
    value: 1
  },
  {
    key: 'Rare',
    value: 2
  },
  {
    key: 'Good',
    value: 3
  },
  {
    key: 'Epic',
    value: 4
  },
  {
    key: 'Legend',
    value: 5
  },
]



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
interface landObjType {
  id: number,
  title: string,
  subTitle: string,
  img: string,
  count: string
}

const tabObj = {
  "zh": [landApply, myTerritory, myRight, landApplyActive, myTerritoryActive, myRightActive],
  "en": [landApplyEN, myTerritoryEN, myRightEN, landApplyActiveEN, myTerritoryActiveEN, myRightActiveEN],
}

function Land() {
  const timeoutRef = useRef(0)
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()
  let { t, i18n } = useTranslation()
  console.log(i18n);

  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const landObj = [
    { id: 1, title: t("Outstanding quality land"), count: 0 },
    { id: 2, title: t("Rare quality land"), count: 0 },
    { id: 3, title: t("Perfect quality land"), count: 0 },
    { id: 4, title: t("Epic quality land"), count: 0 },
    { id: 5, title: t("Legendary quality land"), count: 0 },
  ]
  let [tabActive, setTabActive] = useState('2')
  let [totalNum, SetTotalNum] = useState(0)
  // 我的封号
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
  // 我的权益
  let [userBeneficial, setUserBeneficial] = useState<UserBeneficialType[]>([])

  // 我的领地
  let [landUserCard, setLandUserCard] = useState<LandUserCard[]>([])
  /* 创建订单弹窗控制 */
  let [showCreateOrder, setShowCreateOrder] = useState(false)
  /* 创建订单成功弹窗控制 */
  let [showCreateOrderSuccess, setShowCreateOrderSuccess] = useState(false)

  // 奖励记录
  const rewardRecordFun = (index: number) => {
    setLandRewardRecordId(index)
    setLandRewardRecord(true)
  }

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  // 打开对应土地详情（index:）
  const showDetailFun = (index: number) => {
    setCardDetialIndex(index)
    setUserCardDetail(true)
  }
  function createOrderFun(level: number) {
    setUserCardDetail(false)
    setShowCreateOrder(true)
  }
  // 挂卖成功
  function CreateOrderSuccess() {
    setShowCreateOrder(false)
    setShowCreateOrderSuccess(true)
    if (state.token && web3React.account) {
      timeoutRef.current = window.setTimeout(() => {
        // 我的封号
        getUserInfo().then(res => {
          console.log(res.data, "我的封号")
          setUserLevel(res.data.level)
        })
        // 我的领地
        getLandUserCardList({
          currentPage: page,
          level: level,
          pageSize: 12,
          userAddress: web3React.account as string
        }
        ).then(res => {
          console.log(res.data.list, "我的领地")
          setLandUserCard(res.data.list)
          SetTotalNum(res.data.size)
        })
      }, 5000);

    }
  }

  // 领取
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
        Contracts.example.getLandAward(web3React.account as string, res.data).then((res: any) => {
          addMessage(t('Receive success'))
          timeoutRef.current = window.setTimeout(() => {
            // 我的权益
            getLandUserBeneficial().then(res => {
              console.log(res.data, "我的权益")
              setUserBeneficial(res.data)
            })
            getUserInfo().then(res => {
              console.log(res.data, "我的封号")
              setUserLevel(res.data.level)
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
        console.log(res.data.list, "我的领地")
        setLandUserCard(res.data.list)
        SetTotalNum(res.data.size)
      })

    }
  }, [state.token, web3React.account, level, page, tabActive, showCreateOrderSuccess])

  useEffect(() => {
    if (state.token) {
      // 我的封号
      getUserInfo().then(res => {
        console.log(res.data, "我的封号")
        setUserLevel(res.data.level)
      })
    }
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
          NFT - {t("Land")}
        </div>
        <div className="processState">
          <div className="imgBox imgBox1" onClick={() => { setTabActive('2') }}><img src={tabActive === '2' ? tabObj[i18n.language][4] : tabObj[i18n.language][1]} alt="" /></div>
          <div className="imgBox" onClick={() => { setTabActive('3') }}><img src={tabActive === '3' ? tabObj[i18n.language][5] : tabObj[i18n.language][2]} alt="" /></div>
        </div>
        {/* 2.我的领地 */}
        {
          tabActive === '2' && <div className="Content">
            <>
              <div className="screen">
                <div className="title">
                  {userLevel >= 0 && <>{t("My title")}：<div className="myTitle flex">{LevelObj[userLevel]}</div></>}
                </div>
                <div className="DropDownGroup">
                  <DropDown Map={LevelMap} change={SetLevel} staetIndex={level}></DropDown>
                </div>
              </div>
              {/* 我的领地 */}
              {
                landUserCard.length > 0 ? <>
                  <div className="CardList">
                    {landUserCard.map((item, index) => <LandCard userLevel={userLevel} key={item.id} Index={index} cardInfo={item} showDetail={showDetailFun}></LandCard>)}
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
              <div className="myTitle" onClick={() => { setLandDetailDes(true) }}>{t("My title")}：{LevelObj[userLevel]}<img src={helpIcon}></img> </div>
              {/* 我的权益 */}
              <div className="RewardBox">
                <div className="landService">
                  <div className="title">{t("Land service income")}</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">{t("Cumulative income")}：</div>
                      <div className="allRewardValue">{NumSplic(`${userBeneficial[0]?.totalAmount}`, 4) || "0"} {userBeneficial[0]?.coinName || "MBAS"}</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">{NumSplic(`${userBeneficial[0]?.amount}`, 4) || "0"}</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> {userBeneficial[0]?.coinName || "MBAS"}</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex" onClick={() => { Receive(2, userBeneficial[0]?.id, userBeneficial[0]?.amount) }}>{t("Harvest")}</div></div>
                  </div>
                  <div className="rewardRecord" onClick={() => { rewardRecordFun(2) }}>{t("Records2")}<img src={RecordIcon} alt="" /></div>
                </div>

                <div className="landShare">
                  <div className="title">{t("Land dividend")}</div>
                  <div className="allReward">
                    <div className='allRewardBox'>
                      <div className="allRewardTitle">{t("Cumulative income")}：</div>
                      <div className="allRewardValue">{NumSplic(`${userBeneficial[1]?.totalAmount}`, 4) || "0"} {userBeneficial[1]?.coinName || "MBAS"}</div>
                    </div>
                    <div className="btnBox"><div></div></div>
                  </div>
                  <div className="valueBox">
                    <div className="box">
                      <div className="value">{NumSplic(`${userBeneficial[1]?.amount}`, 4) || "0"}</div>
                      <div className="coinName"><img src={SBLIcon} alt="" /> {userBeneficial[1]?.coinName || 'MBAS'}</div>
                    </div>
                    <div className="btnBox"><div className="getBtn flex" onClick={() => { Receive(4, userBeneficial[1]?.id, userBeneficial[1]?.amount) }}>{t("Harvest")}</div></div>
                  </div>
                  <div className="rewardRecord" onClick={() => { rewardRecordFun(4) }}>{t("Records2")}<img src={RecordIcon} alt="" /></div>
                </div>

              </div>
            </div>
          </div>
        }

      </div>
      {/* 挂卖成功 */}
      <Tips isShow={showCreateOrderSuccess} title={t('List successfully')} subTitle={t('List to the market successfully')} enterFun={() => setShowCreateOrderSuccess(false)} close={() => setShowCreateOrderSuccess(false)}></Tips>
      {/* 土地详情 */}
      {landUserCard[cardDetialIndex] && <LandCardDetails showCreateOrder={createOrderFun} userLevel={userLevel} CardInfo={landUserCard[cardDetialIndex]} showModal={userCardDetail} close={() => setUserCardDetail(false)}></LandCardDetails>}
      {/* 土地详情说明 */}
      <LandDetailDes showModal={landDetailDes} close={() => setLandDetailDes(false)}></LandDetailDes>
      {/* 奖励记录(土地服务费、土地分红) */}
      {landRewardRecordId && <LandRewardRecord id={landRewardRecordId} showModal={landRewardRecord} close={() => { setLandRewardRecord(false) }}></LandRewardRecord>}
      {/* 土地挂卖 */}
      {
        landUserCard.length > 0 && landUserCard[cardDetialIndex] && <SellCardDetails userLevel={userLevel} isShow={showCreateOrder} CardInfo={landUserCard[cardDetialIndex]} CreateOrderSuccess={CreateOrderSuccess} close={() => setShowCreateOrder(false)} type="CreateOrder"></SellCardDetails>
      }
    </div >
  )
}
export default React.memo(Land)