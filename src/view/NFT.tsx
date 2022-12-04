import React, { useState, useEffect } from "react"
import '../assets/style/componentsStyle/carddetails.scss'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import CardDetails from '../components/CardDetails'
import { getBoxUserInfo, getUserCard, getPromotePowerNum } from '../API'
import DropDown from '../components/DropDown'
import Card, { CardInfoType } from '../components/Card'
import Tips from '../components/Tips'
import BlindBox from '../components/BlindBox'
import CardSynthesis from "../components/CardSynthesis"
import '../assets/style/Swap.scss'
import PledgeSuccess from '../components/PledgeSuccess'
import NoData from '../components/NoData'
import Merge from '../components/Merge'
import { useViewport } from '../components/viewportContext'
import { addMessage, showLoding } from '../utils/tool'
import { Pagination } from 'antd';
import '../assets/style/componentsStyle/AddFlow.scss'
import SelMerge from "../components/SelMerge"
import ImprovePowerSuccess from "../components/ImprovePowerSuccess"
import ImproveComputingPower from "../components/ImproveComputingPower"
import { useTranslation } from 'react-i18next'
// 挂卖详情
import PutParticulars from '../components/PutParticulars'
// 合成成功
import ComSucceed from '../components/ComSucceed'
import OpenRes from '../components/openRes'
// 徽章合成规则
import CardComRule from '../components/CardComRule'
// 盲盒开启
import BoxOpen from '../components/BoxOpen'


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
const typeMap = [
  {
    key: 'All the types',
    value: 0
  },
  {
    key: 'Perseus Badge',
    value: 1
  },
  {
    key: 'Khaos Badge',
    value: 2
  },
  {
    key: 'Gaea Badge',
    value: 3
  },
  {
    key: 'Astra Badge',
    value: 4
  }
]
function NFT() {
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
  let [cardDetialIndex, setCardDetialIndex] = useState(0)
  let [userBox, setuserBox] = useState<BoxInfo[]>([])
  let [userCard, setuserCard] = useState<CardInfoType[]>([])
  /* 合成弹窗控制 */
  const [showCardSynthesis, setshowCardSynthesis] = useState(false)
  /* 徽章详情弹窗控制 */
  let [showCardDetail, setShowCardDetail] = useState(false)
  /* 创建订单弹窗控制 */
  let [showCreateOrder, setShowCreateOrder] = useState(false)
  /* 创建订单成功弹窗控制 */
  let [showCreateOrderSuccess, setShowCreateOrderSuccess] = useState(false)
  /* 开卡成功弹窗控制 */
  let [showOpenCard, setShowOpenCard] = useState(false)
  /* 合成成功弹窗控制 */
  let [showMergeSuccess, setShowMergeSuccess] = useState(false)
  /* 移动端选择合成徽章 */
  let [showMerge, setshowMerge] = useState(false)
  /* 移动端选择合成徽章 */
  let [showSelCard, setshowSelCard] = useState(false)
  /* 质押成功 */
  let [showPledge, setShowPledge] = useState(false)
  /* 选中合成的徽章信息 */
  const [SelCardInfo, setSelCardInfo] = useState<CardInfoType | null>(null)
  /* 开盲盒结果 */
  let [openRes, setOpenRes] = useState<OpenResType[] | null>(null)
  let [MergeRes, setMergeRes] = useState<OpenResType | null>(null)
  // 提升算力值数据
  let [computingPower, setComputingPower] = useState(0)
  // 提升算力成功
  let [improvePowerSuccess, setImprovePowerSuccess] = useState(false)
  // 提升算力值弹窗
  let [iproveComputingPower, setImproveComputingPower] = useState(false)
  // MBA
  const [MBAValue, setMBAValue] = useState('0')
  // 提升算力值值
  let [iproveComputingPowerValue, setImproveComputingPowerValue] = useState('0')

  function showDetial(index: number) {
    setCardDetialIndex(index)
    setShowCardDetail(true)
  }

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  function createOrderFun(level: number) {
    // if(level < 5 ){
    //   return addMessage(t('Cannot be sold'))
    // }
    setShowCardDetail(false)
    setShowCreateOrder(true)
  }
  function showMergeFun() {
    setSelCardInfo(null)
    setShowCardDetail(false)
    /* pc端 */
    setshowCardSynthesis(true)
    /* 移动端 */
    setshowMerge(true)
  }
  function openSuccess(res: OpenResType[]) {
    setOpenRes(res)
    setShowOpenCard(true)
  }
  function mergeSuccess(res: OpenResType) {
    setMergeRes(res)
    setshowCardSynthesis(false)
    setShowMergeSuccess(true)
    if (state.token && web3React.account && TabIndex === 0) {
      getUserCard({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户徽章")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }
  /* 移动端显示选择徽章弹窗 */
  function SelCard() {
    setshowMerge(false)
    setshowSelCard(true)
  }
  // 挂卖成功
  function CreateOrderSuccess() {
    setShowCreateOrder(false)
    setShowCreateOrderSuccess(true)
    if (state.token && web3React.account && TabIndex === 0) {
      getUserCard({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户徽章")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }
  function EnterSelCard(Card: CardInfoType) {
    setSelCardInfo(Card)
    setshowMerge(true)
    setshowSelCard(false)
  }
  // 提升算力函数
  const ImproveComputingPowerFun = (id: number) => {
    if (userCard[id].currentPower < userCard[id].basePower) {
      setComputingPower(id)
      setImproveComputingPower(true)
    } else {
      return addMessage(t('Computing power is full'))
    }
  }

  /* 初始化数据 */
  useEffect(() => {
    if (state.token && web3React.account && TabIndex === 1) {
      getBoxUserInfo().then(res => {
        console.log(res)
        setuserBox(res.data)
      })

      let time = setInterval(() => {
        getBoxUserInfo().then(res => {
          setuserBox(res.data)
        })
      }, 3000)
      return () => {
        clearInterval(time)
      }
    }
  }, [state.token, web3React.account, TabIndex])

  useEffect(() => {
    if (state.token && web3React.account && TabIndex === 0) {
      getUserCard({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户徽章")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
      getPromotePowerNum().then(res => {
        console.log(res.data, 'MBA值')
        setMBAValue(res.data)
      })
    } else {
      setuserCard([])
    }
  }, [state.token, web3React.account, type, level, page, TabIndex, improvePowerSuccess])

  useEffect(() => {
    setshowCardSynthesis(false)
    setShowCreateOrder(false)
    // 切换账号
    setShowMergeSuccess(false)
  }, [web3React.account, state.token])

  return (
    <div>
      {/*质押成功 */}
      <PledgeSuccess showModal={showPledge} close={() => { setShowPledge(false) }}></PledgeSuccess>
      {/* 盲盒开启成功 */}
      {
        openRes && <OpenRes isShow={showOpenCard} OpenRes={openRes} close={() => setShowOpenCard(false)} ></OpenRes>
      }
      {/* 徽章详情 */}
      {
        userCard.length > 0 && <CardDetails pledgeSuccessModal={() => { setShowPledge(true) }} isShow={showCardDetail} showMerge={showMergeFun} showCreateOrder={createOrderFun} CardInfo={userCard[cardDetialIndex]} close={() => setShowCardDetail(false)} type="NFT"></CardDetails>
      }
      {/* 徽章挂卖 */}
      {
        userCard.length > 0 && userCard[cardDetialIndex] && <CardDetails pledgeSuccessModal={() => { setShowPledge(true) }} isShow={showCreateOrder} CardInfo={userCard[cardDetialIndex]} CreateOrderSuccess={CreateOrderSuccess} close={() => setShowCreateOrder(false)} type="CreateOrder"></CardDetails>
      }
      {/* 挂卖成功 */}
      <Tips isShow={showCreateOrderSuccess} title={t('List successfully')} subTitle={t('List to the market successfully')} enterFun={() => setShowCreateOrderSuccess(false)} close={() => setShowCreateOrderSuccess(false)}></Tips>
      {/* 徽章合成 */}
      {
        width >= 1024 && <CardSynthesis isShow={showCardSynthesis} mergeSuccess={mergeSuccess} CardInfo={userCard[cardDetialIndex]} close={() => setshowCardSynthesis(false)}></CardSynthesis>
      }
      {/* 小屏确定 */}
      {
        width < 1024 && userCard[cardDetialIndex] && <Merge isShow={showCardSynthesis && showMerge} mergeSuccess={mergeSuccess} SelCard={SelCardInfo} CardInfo={userCard[cardDetialIndex]} SelCardFun={SelCard} close={() => { setshowMerge(false); setshowCardSynthesis(false) }}></Merge>
      }
      {/* 小屏选择NFT */}
      {
        width < 1024 && <SelMerge isShow={showCardSynthesis && showSelCard} CardInfo={userCard[cardDetialIndex]} EnterSelCard={EnterSelCard} close={() => { setshowSelCard(false); setshowCardSynthesis(false) }}></SelMerge>
      }
      {/* 提升算力值 */}
      {userCard[computingPower] && <ImproveComputingPower successFun={() => { setImprovePowerSuccess(true) }} value={MBAValue} data={userCard[computingPower]} showModal={iproveComputingPower} close={() => { setImproveComputingPower(false) }}></ImproveComputingPower>}


      {/* 提升算力成功 */}
      <ImprovePowerSuccess showModal={improvePowerSuccess} close={() => { setImprovePowerSuccess(false) }}></ImprovePowerSuccess>
      <div className="Edition-Center">
        <div className="SwapTitle">
          {t('stock')}
        </div>
        {/* 合成成功 */}
        {
          MergeRes && <ComSucceed isShow={showMergeSuccess} CardInfo={MergeRes as OpenResType} close={() => { setShowMergeSuccess(false) }}></ComSucceed>
        }
        <div className="screen">
          <div className="Tabs">
            <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { SetTabIndex(0) }}>{t('Card')}</div>
            <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { SetTabIndex(1) }}>{t('BlindBox')}</div>
          </div>
          {
            TabIndex === 0 && <div className="DropDownGroup">
              <DropDown Map={LevelMap} change={SetLevel} staetIndex={level}></DropDown>
              <DropDown Map={typeMap} change={SetType} staetIndex={type}></DropDown>
            </div>
          }

        </div>
        {
          TabIndex === 0 ? <>
            {/* 徽章徽章 */}
            {
              userCard.length !== 0 ? <>
                <div className="CardList">
                  {
                    userCard.map((item, index) => <Card key={item.id} Index={index} cardInfo={item} showDetia={showDetial} changeFun={ImproveComputingPowerFun}></Card>)
                  }
                </div>
              </> : <>
                <NoData></NoData>
              </>
            }
            <div className="Pagination">
              <Pagination style={{ margin: "auto" }} showQuickJumper defaultCurrent={page} defaultPageSize={12} showSizeChanger={false} total={totalNum} onChange={onChange} />
            </div>
          </> : <>
            {/* 盲盒 */}
            {
              userBox.length !== 0 ? <>
                <div className="CardList">
                  {
                    userBox.map((item) => <BlindBox openSuccess={openSuccess} key={item.id} BoxInfo={item}></BlindBox>)
                  }
                </div>
              </> : <>
                <NoData></NoData>
              </>
            }

          </>
        }
      </div>
    </div >
  )
}
export default React.memo(NFT)