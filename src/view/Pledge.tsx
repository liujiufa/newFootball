import React, { useState, useEffect } from "react"
import '../assets/style/componentsStyle/carddetails.scss'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { getBoxUserInfo, getPledgeCardUserInfo, getPledgeCardUserData, userDrawAward, userCancelDrawAward } from '../API'
import PledgeCard, { CardInfoType } from '../components/PledgeCard'
import CancelPledgeSuccess from '../components/CancelPledgeSuccess'
import ImproveComputingPower from '../components/ImproveComputingPower'
import CancelPledge from '../components/CancelPledge'
import ImprovePowerSuccess from "../components/ImprovePowerSuccess"
import NoData from '../components/NoData'
import { useViewport } from '../components/viewportContext'
import { Pagination } from 'antd';
import '../assets/style/componentsStyle/CardSynthesis.scss'
import '../assets/style/componentsStyle/AddFlow.scss'
import '../assets/style/componentsStyle/pledge.scss'
import '../assets/style/componentsStyle/AddFluidOk.scss'
import { useTranslation } from 'react-i18next'
import { showLoding, addMessage, NumSplic, getWebsocketData, initWebSocket } from "../utils/tool";
import { Contracts } from "../web3";
import { socketUrl } from "../config";
import BigNumber from 'big.js'
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
  // 提升算力值值
  let [iproveComputingPowerValue, setImproveComputingPowerValue] = useState('0')
  // 提升算力成功
  let [improvePowerSuccess, setImprovePowerSuccess] = useState(false)
  // 提升算力函数
  const ImproveComputingPowerFun = (id: number) => {
    if (userCard[id].currentPower < userCard[id].basePower) {
      setComputingPower(id)
      setImproveComputingPower(true)
    } else {
      return addMessage(t('Computing power is full'))
    }
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
      Contracts.example.unstake(web3React.account as string, tokenId).then((res: any) => {
        setCancelPledge(false)
        setCancelPledgeSuccess(true)
        getPledgeCardUserInfo({
          currentPage: page,
          pageSize: 12,
          userAddress: web3React.account as string
        }).then(res => {
          setuserCard(res.data.list)
          SetTotalNum(res.data.size)
          console.log('---------', res.data.size);
        })
      }).finally(() => {
        showLoding(false)
      })
    }
  }
  // 确认取消NFT质押
  const ConNFTPledgeFun = (tokenId: string) => {
    if (web3React.account && tokenId) {
      setCancelPledge(true)
      setCancelPledgeValue(tokenId)
    }
  }
  function changeTab(tab: number) {
    SetTabIndex(tab)
  }

  // 领取
  function Receive(type: number, id: number, amount: string) {
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
        Contracts.example.getPledgeAward(web3React.account as string, res.data).then((res: any) => {
          setGetPage(false)
          addMessage(t('Receive success'))
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
      getPledgeCardUserInfo({
        currentPage: page,
        pageSize: 12,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户徽章", res.data.size)
        setImproveComputingPowerValue(res.data.promotePowerNum)
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
      // 推送
      let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getPledgeCardUserInfo/${web3React.account}`, `/getPledgeCardUserInfo/${web3React.account}`,
        {
          currentPage: page,
          pageSize: 12,
          userAddress: web3React.account
        }, (data: any) => {
          console.log(data, '用户徽章')
          setImproveComputingPowerValue(data.promotePowerNum)
          setuserCard(data.list)
          SetTotalNum(data.size)
        })
      return () => {
        try {
          stompClient.disconnect()
        } catch {

        }
        clearInterval(sendTimer)
      }

    }
  }, [state.token, web3React.account, page, totalNum, improvePowerSuccess, cancelPledgeSuccess])
  useEffect(() => {
    if (state.token && web3React.account) {
      getPledgeCardUserData().then(res => {
        console.log(res.data, "获取用户质押上方数据")
        SetPledgeData(res.data)
      })
      // 推送
      let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getPledgeCardUserData/${web3React.account}`, `/getPledgeCardUserData/${web3React.account}`,
        {}, (data: any) => {
          console.log(data, '获取用户质押上方数据')
          SetPledgeData(data)
        })
      setGetPage(false)
      return () => {
        try {
          stompClient.disconnect()
        } catch {

        }
        clearInterval(sendTimer)
      }

    }
  }, [state.token, web3React.account])
  return (
    <div>
      <div className="Edition-Center" id="Pledge">
        <div className="SwapTitle">
          {t("Stake")}
        </div>

        <div className="PledgeTabs">
          <div className={TabIndex === 0 ? 'activeTab invalidTab' : 'invalidTab'} onClick={() => { changeTab(0); }}>質押中</div>
          <div className={TabIndex === 1 ? 'activeTab invalidTab' : 'invalidTab'} onClick={() => { changeTab(1); }}>已銷毀</div>
        </div>

        {pledgeData && <div className="pledgeScreen">
          <div className="Tabs">
            <div className="pledgeValueBox">
              <div className="recentlyComputingPower">{t("Total current hashrate")}：{pledgeData?.power}</div>
              <div className="pledgeAllReward">{t("Total staking rewards")}：{NumSplic(`${pledgeData?.totalAmount}`, 8)} SBL</div>
            </div>
          </div>
          <div className="DropDownGroup">
            <div className="ableGetReward">{t("Claimable")}：<span onClick={() => { setRewardRecord(true) }}>{NumSplic(`${pledgeData?.amount}`, 8)} SBL</span> {pledgeData?.amount ? <div className="getBtn flex" onClick={() => { getBtnFun(pledgeData?.amount) }}>{t("Harvest")}</div> : <div className="getBtn flex" onClick={() => { getBtnFun(0) }}>{t("Harvest")}</div>}</div>
          </div>
        </div>}
        {
          userCard.length !== 0 ? <>
            <div className="CardList">
              {
                userCard.map((item, index) => <div className="cancelPledge">
                  <PledgeCard key={item.id} Index={index} cardInfo={item} changeFun={ImproveComputingPowerFun}></PledgeCard>
                  <div className="btn flex" onClick={() => { ConNFTPledgeFun(item.tokenId) }}>{t("Cancel stake")}</div>
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
      {userCard[computingPower] && <ImproveComputingPower successFun={() => { setImprovePowerSuccess(true) }} value={iproveComputingPowerValue} data={userCard[computingPower]} showModal={iproveComputingPower} close={() => { setImproveComputingPower(false) }}></ImproveComputingPower>}
      {/* 领取记录 */}
      <RewardRecord showModal={rewardRecord} close={() => { setRewardRecord(false) }}></RewardRecord>
      {/* 可领取金额 */}
      {pledgeData && <AbleGetReward getFun={Receive} dataId={pledgeData.dataId} data={getValue} showModal={getPage} close={() => { setGetPage(false) }}></AbleGetReward>}
      {/* 取消成功 */}
      <CancelPledgeSuccess showModal={cancelPledgeSuccess} close={() => { setCancelPledgeSuccess(false) }}></CancelPledgeSuccess>
      {/* 提升算力成功 */}
      <ImprovePowerSuccess showModal={improvePowerSuccess} close={() => { setImprovePowerSuccess(false) }}></ImprovePowerSuccess>

    </div>
  )
}
export default React.memo(Pledge)