import React, { useState, useEffect } from "react"
import '../assets/style/componentsStyle/carddetails.scss'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { getBoxUserInfo, getPledgeCardUserInfo, getPledgeCardUserData } from '../API'
import PledgeCard, { CardInfoType } from '../components/PledgeCard'
import CancelPledgeSuccess from '../components/CancelPledgeSuccess'
import ImproveComputingPower from '../components/ImproveComputingPower'
import CancelPledge from '../components/CancelPledge'
import '../assets/style/componentsStyle/pledge.scss'
import '../assets/style/componentsStyle/CardSynthesis.scss'
import NoData from '../components/NoData'
import { useViewport } from '../components/viewportContext'
import { Pagination } from 'antd';
import '../assets/style/componentsStyle/AddFlow.scss'
import { useTranslation } from 'react-i18next'
import { showLoding } from "../utils/tool";
import { Contracts } from "../web3";
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
interface PledgeDataType {
  power: number
  amount: number
  dataId: number
  totalAmount: number
}

function Pledge() {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const { width } = useViewport();
  const web3React = useWeb3React()
  let [TabIndex, SetTabIndex] = useState(0)
  /* 获取用户质押上方数据 */
  let [pledgeData, SetPledgeData] = useState<PledgeDataType | null>(null)
  /* 等级筛选 */
  let [level, SetLevel] = useState(0)
  /* 分页总条数 */
  let [totalNum, SetTotalNum] = useState(0)
  // 可领取金额
  let [getValue, setGetValue] = useState(0)
  // 提升算力值数据
  let [computingPower, setComputingPower] = useState(0)
  // 控制可领取金额
  let [getPage, setGetPage] = useState(false)
  // 奖励记录
  let [rewardRecord, setRewardRecord] = useState(false)
  // 取消质押
  let [cancelPledge, setCancelPledge] = useState(false)
  // 取消质押
  let [cancelPledgeSuccess, setCancelPledgeSuccess] = useState(false)
  // 取消质押tokenId
  let [cancelPledgeValue, setCancelPledgeValue] = useState('')
  let [page, SetPage] = useState(1)
  let [userCard, setuserCard] = useState<CardInfoType[]>([])
  // 提升算力值弹窗
  let [iproveComputingPower, setImproveComputingPower] = useState(false)
  // 提升算力函数
  const ImproveComputingPowerFun = (id: number) => {
    setComputingPower(id)
    setImproveComputingPower(true)
  }

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  // 领取页面
  const getBtnFun = (value: any) => {
    setGetValue(value)
    setGetPage(true)
  }
  // 取消NFT质押
  const CancelNFTPledgeFun = (tokenId: string) => {
    if (web3React.account && tokenId) {
      showLoding(true)
      Contracts.example.stake(web3React.account as string, tokenId).then((res: any) => {
        setCancelPledgeSuccess(true)
      }).finally(() => {
        showLoding(false)
      })
    }
  }
  // 确认NFT质押
  const ConNFTPledgeFun = (tokenId: string) => {
    if (web3React.account && tokenId) {
      setCancelPledge(true)
      setCancelPledgeValue(tokenId)
    }
  }

  useEffect(() => {
    if (state.token && web3React.account && TabIndex === 0) {
      getPledgeCardUserInfo({
        currentPage: page,
        pageSize: 12,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户徽章")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }, [state.token, web3React.account, page, TabIndex])
  useEffect(() => {
    if (state.token && web3React.account) {
      getPledgeCardUserData().then(res => {
        console.log(res.data, "获取用户质押上方数据")
        SetPledgeData(res.data)
      })
    }
  }, [state.token, web3React.account])
  return (
    <div>
      <div className="Edition-Center">
        <div className="SwapTitle">
          質押
        </div>
        {pledgeData && <div className="pledgeScreen">
          <div className="Tabs">
            <div className="pledgeValueBox">
              <div className="recentlyComputingPower">當前算力縂值：{pledgeData?.power}</div>
              <div className="pledgeAllReward">質押獎勵總額：{pledgeData?.totalAmount} SBL</div>
            </div>
          </div>
          <div className="DropDownGroup">
            <div className="ableGetReward">可領取收益：<span onClick={() => { setRewardRecord(true) }}>{pledgeData?.amount} SBL</span> {pledgeData?.amount ? <div className="getBtn flex" onClick={() => { getBtnFun(pledgeData?.amount) }}>領取</div> : <div className="getBtn flex" onClick={() => { getBtnFun(0) }}>領取</div>}</div>
          </div>
        </div>}
        {
          userCard.length !== 0 ? <>
            <div className="CardList">
              {
                userCard.map((item, index) => <div className="cancelPledge">
                  <PledgeCard key={item.id} Index={index} cardInfo={item} changeFun={ImproveComputingPowerFun}></PledgeCard>
                  <div className="btn flex" onClick={() => { ConNFTPledgeFun(item.tokenId) }}>取消質押</div>
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
      <CancelPledge CancelFun={CancelNFTPledgeFun} tokenId={cancelPledgeValue} showModal={cancelPledge} close={() => { setCancelPledge(false) }}></CancelPledge>
      {/* 提升算力值 */}
      {userCard[computingPower] && <ImproveComputingPower data={userCard[computingPower]} showModal={iproveComputingPower} close={() => { setImproveComputingPower(false) }}></ImproveComputingPower>}
      {/* 领取记录 */}
      <RewardRecord showModal={rewardRecord} close={() => { setRewardRecord(false) }}></RewardRecord>
      {/* 可领取金额 */}
      <AbleGetReward data={getValue} showModal={getPage} close={() => { setGetPage(false) }}></AbleGetReward>
      {/* 取消成功 */}
      <CancelPledgeSuccess showModal={cancelPledgeSuccess} close={() => { setCancelPledgeSuccess(false) }}></CancelPledgeSuccess>

    </div>
  )
}
export default React.memo(Pledge)