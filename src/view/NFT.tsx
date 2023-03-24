import React, { useState, useEffect, useRef, useCallback } from "react"
import '../assets/style/componentsStyle/carddetails.scss'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import CardDetails from '../components/CardDetails'
import { getBoxUserInfo, getUserCard, getPromotePowerNum } from '../API'
import DropDown from '../components/DropDown'
import Card, { CardInfoType } from '../components/Card'
import Tips from '../components/Tips'
import '../assets/style/Swap.scss'
import PledgeSuccess from '../components/PledgeSuccess'
import NoData from '../components/NoData'
import { useViewport } from '../components/viewportContext'
import { addMessage, showLoding, getWebsocketData, initWebSocket } from '../utils/tool'
import { Pagination } from 'antd';
import '../assets/style/componentsStyle/AddFlow.scss'
import SelMerge from "../components/SelMerge"
import { useTranslation } from 'react-i18next'
import { socketUrl } from "../config"
// 合成成功
import ComSucceed from '../components/ComSucceed'
import OpenRes from '../components/openRes'



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
    key: '精灵仙子',
    value: 1
  },
  {
    key: '木精灵',
    value: 2
  },
  {
    key: '水精灵',
    value: 3
  },
  {
    key: '火精灵',
    value: 4
  },
  {
    key: '土精灵',
    value: 5
  },
  {
    key: '金精灵',
    value: 6
  }
]
const typeMap = [
  {
    key: 'All the types',
    value: -1
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
  },
  {
    key: 'Purple Badge',
    value: 5
  }
]
// var level: number = 0
function NFT() {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const { width } = useViewport();
  const web3React = useWeb3React()
  let [TabIndex, SetTabIndex] = useState(0)
  /* 类型筛选 */
  let [type, SetType] = useState(-1)
  let levelRef = useRef<number>(0)
  let funRef = useRef()
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
  /* 精灵详情弹窗控制 */
  let [showCardDetail, setShowCardDetail] = useState(false)
  /* 创建订单弹窗控制 */
  let [showCreateOrder, setShowCreateOrder] = useState(false)
  /* 创建订单成功弹窗控制 */
  let [showCreateOrderSuccess, setShowCreateOrderSuccess] = useState(false)
  /* 开卡成功弹窗控制 */
  let [showOpenCard, setShowOpenCard] = useState(false)
  /* 合成成功弹窗控制 */
  let [showMergeSuccess, setShowMergeSuccess] = useState(false)
  /* 移动端选择合成精灵 */
  let [showMerge, setshowMerge] = useState(false)
  /* 移动端选择合成精灵 */
  let [showSelCard, setshowSelCard] = useState(false)
  /* 质押成功 */
  let [showPledge, setShowPledge] = useState(false)
  /* 选中合成的精灵信息 */
  const [SelCardInfo, setSelCardInfo] = useState<CardInfoType | null>(null)
  /* 开盲盒结果 */
  let [openRes, setOpenRes] = useState<OpenResType[] | null>(null)
  let [MergeRes, setMergeRes] = useState<OpenResType | null>(null)
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
        console.log(res.data, "用户精灵")
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
  /* 初始化数据 */
  useEffect(() => {
    if (state.token && web3React.account && TabIndex === 1) {
      getBoxUserInfo().then(res => {
        console.log(res)
        setuserBox(res.data)
      })
      // let time = setInterval(() => {
      //   getBoxUserInfo().then(res => {
      //     setuserBox(res.data)
      //   })
      // }, 3000)
      const { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/noOpenEgg/${web3React.account}`, `/noOpenEgg/${web3React.account}`, {}, (data: any) => {
        console.log(data, '推送数据')
        setuserBox(data)
      })
      return () => {
        try {
          stompClient.disconnect()
        } catch {

        }
        clearInterval(sendTimer)
      }
    } else {
      setuserBox([])
    }

  }, [state.token, web3React.account, TabIndex])

  useEffect(() => {
    let fun: any
    if (state.token && web3React.account && TabIndex === 0) {
      getUserCard({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        userAddress: web3React.account
      }).then(res => {
        console.log(res.data, "用户精灵")
        setuserCard(res.data.list)
        SetTotalNum(res.data.size)
      })
      // 推送
      let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getCardUserInfo/${web3React.account}`, `/getCardUserInfo/${web3React.account}`,
        {
          currentPage: page,
          level: level,
          pageSize: 12,
          type: type,
          userAddress: web3React.account
        }, (data: any) => {
          console.log(data, '推送用户卡牌数据')
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
    } else {
      setuserCard([])
    }
  }, [state.token, web3React.account, level, type, page, TabIndex])

  useEffect(() => {
    setshowCardSynthesis(false)
    setShowCreateOrder(false)

    if (web3React.account && state.token) {
    } else {
      // 切换账号
      setShowMergeSuccess(false)
    }
  }, [web3React.account, state.token])

  return (
    <div>
      <div className="Edition-Center">
        <div className="SwapTitle">
          {t('stock')}
        </div>
        {/* 合成成功 */}
        {
          MergeRes && <ComSucceed isShow={showMergeSuccess} CardInfo={MergeRes as OpenResType} close={() => { setShowMergeSuccess(false) }}></ComSucceed>
        }
        <div className="screen">
          <div className="DropDownGroup">
            <DropDown Map={LevelMap} change={(num: number) => { SetLevel(num) }} staetIndex={level}>
            </DropDown>
            <DropDown Map={typeMap} change={SetType} staetIndex={type}>
            </DropDown>
          </div>
        </div>
        {/* 精灵精灵 */}
        {
          userCard.length !== 0 ? <>
            <div className="CardList">
              {
                userCard.map((item, index) => <Card key={item.id} Index={index} cardInfo={item} fun={showDetial} tag='NFT'></Card>)
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
      {/*质押成功 */}
      <PledgeSuccess showModal={showPledge} close={() => { setShowPledge(false) }}></PledgeSuccess>
      {/* 盲盒开启成功 */}
      {
        openRes && <OpenRes isShow={showOpenCard} OpenRes={openRes} close={() => setShowOpenCard(false)} ></OpenRes>
      }
      {/* 精灵详情 */}
      {
        userCard.length > 0 && <CardDetails pledgeSuccessModal={() => { setShowPledge(true) }} isShow={showCardDetail} showMerge={showMergeFun} showCreateOrder={createOrderFun} CardInfo={userCard[cardDetialIndex]} close={() => setShowCardDetail(false)} type="NFT"></CardDetails>
      }
      {/* 精灵挂卖 */}
      {
        userCard.length > 0 && userCard[cardDetialIndex] && <CardDetails pledgeSuccessModal={() => { setShowPledge(true) }} isShow={showCreateOrder} CardInfo={userCard[cardDetialIndex]} CreateOrderSuccess={CreateOrderSuccess} close={() => setShowCreateOrder(false)} type="CreateOrder"></CardDetails>
      }
      {/* 挂卖成功 */}
      <Tips isShow={showCreateOrderSuccess} title={t('List successfully')} subTitle={t('List to the market successfully')} enterFun={() => setShowCreateOrderSuccess(false)} close={() => setShowCreateOrderSuccess(false)}></Tips>


      {/* 小屏选择NFT */}
      {
        width < 1024 && <SelMerge isShow={showCardSynthesis && showSelCard} CardInfo={userCard[cardDetialIndex]} EnterSelCard={EnterSelCard} close={() => { setshowSelCard(false); setshowCardSynthesis(false) }}></SelMerge>
      }
    </div >
  )
}
export default React.memo(NFT)