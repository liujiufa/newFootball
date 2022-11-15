import React, { useState, useEffect } from "react"
import '../assets/style/componentsStyle/carddetails.scss'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { getBoxUserInfo, getUserCard } from '../API'
import PledgeCard, { CardInfoType } from '../components/PledgeCard'
import ImproveComputingPower from '../components/ImproveComputingPower'
import CancelPledge from '../components/CancelPledge'
import '../assets/style/componentsStyle/pledge.scss'
import '../assets/style/componentsStyle/CardSynthesis.scss'
import NoData from '../components/NoData'
import { useViewport } from '../components/viewportContext'
import { Pagination } from 'antd';
import '../assets/style/componentsStyle/AddFlow.scss'
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/AddFluidOk.scss'
import RewardRecord from '../components/RewardRecord'
import AbleGetReward from '../components/AbleGetReward'

export interface BoxInfo {
  id: number,
  image: string,
  buyCount: number
}
export interface OpenResType {
  imageUrl: string,
  cardLevel: number,
  cardName: string
}

function Pledge() {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const { width } = useViewport();
  const web3React = useWeb3React()
  let [TabIndex, SetTabIndex] = useState(0)
  /* 类型筛选 */
  let [type, SetType] = useState(0)
  /* 等级筛选 */
  let [level, SetLevel] = useState(0)
  /* 分页总条数 */
  let [totalNum, SetTotalNum] = useState(0)
  let [page, SetPage] = useState(1)
  let [userCard, setuserCard] = useState<CardInfoType[]>([])
  /* 合成成功弹窗控制 */
  let [showMergeSuccess, setShowMergeSuccess] = useState(false)

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }

  useEffect(() => {
    if (state.token && web3React.account && TabIndex === 0) {
      getUserCard({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        userAddress: '0x1fcac7551589e67c6b7e4452a681dab0127a5db7'
      }).then(res => {
        console.log(res.data.list, "用户徽章")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }, [state.token, web3React.account, type, level, page, TabIndex])
  return (
    <div>
      <div className="Edition-Center">
        <div className="SwapTitle">
          質押
        </div>
        <div className="pledgeScreen">
          <div className="Tabs">
            <div className="pledgeValueBox">
              <div className="recentlyComputingPower">當前算力縂值：10000</div>
              <div className="pledgeAllReward">質押獎勵總額：100，000，000 SBL</div>
            </div>
          </div>
          <div className="DropDownGroup">
            <div className="ableGetReward">可領取收益：<span>100，000，000 SBL</span> <div className="getBtn flex">領取</div></div>
          </div>
        </div>
        {
          userCard.length !== 0 ? <>
            <div className="CardList">
              {
                userCard.map((item, index) => <div className="cancelPledge">
                  <PledgeCard key={item.id} Index={index} cardInfo={item} ></PledgeCard>
                  <div className="btn flex">取消質押</div>
                </div>)
              }
            </div>
          </> : <>
            <NoData></NoData>
          </>
        }
        <div className="Pagination">
          <Pagination style={{ margin: "auto" }} showQuickJumper defaultCurrent={page} defaultPageSize={12} showSizeChanger={false} total={totalNum} onChange={onChange} />
        </div>
      </div>
      {/* 取消质押 */}
      <CancelPledge showModal={false}></CancelPledge>
      {/* 提升算力值 */}
      <ImproveComputingPower showModal={false}></ImproveComputingPower>
      {/* 领取记录 */}
      <RewardRecord showModal={false}></RewardRecord>
      {/* 可领取金额 */}
      <AbleGetReward showModal={false}></AbleGetReward>

    </div>
  )
}
export default React.memo(Pledge)