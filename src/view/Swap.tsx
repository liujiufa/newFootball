import React, { useState, useEffect, useCallback } from "react"
import orderRecord from '../assets/image/orderRecord.png'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import PutParticulars from '../components/PutParticulars'
import LandPutParticulars from '../components/LandPutParticulars'
import { useWeb3React } from '@web3-react/core'
import Tips from '../components/Tips'
import { getOrderList, getUserInfo } from '../API'
import { addMessage, initWebSocket, showLoding } from '../utils/tool'
import DropDown from '../components/DropDown'
import CardItem from '../components/CardItem'
import NoData from '../components/NoData'
import { useTranslation } from 'react-i18next'
// import Puchased from '../components/Puchased'
import CancelPurchase from '../components/CancelPurchase'
// import CancelSucceed from '../components/CancelSucceed'
import MyDealRecord from '../components/MyDealRecord'
import { Pagination } from 'antd';
import { Contracts } from "../web3";
import { socketUrl, contractAddress } from '../config'
import BigNumber from 'big.js'
import '../assets/style/Swap.scss'
import MarketDealing from '../components/MarketDealing'

import { debounce } from "../utils/debounce"

// 精灵等级
const LevelMap = [
  {
    key: 'pmap',
    value: 0
  },
  {
    key: 'Fairy',
    value: 1
  },
  {
    key: 'Aqua Genie',
    value: 2
  },
  {
    key: 'Forest Genie',
    value: 3
  },
  {
    key: 'Flame Genie',
    value: 4
  },
  {
    key: 'Terra Genie',
    value: 5
  },
  {
    key: 'Gold Genie',
    value: 6
  }
]
// 土地等级
const LandLevelMap = [
  {
    key: 'pmap',
    value: 0
  },
  {
    key: 'Supernova',
    value: 1
  },
  {
    key: 'Outpost',
    value: 2
  },
  {
    key: 'Galactic Hub',
    value: 3
  },
  {
    key: 'Star Empire',
    value: 4
  },
  {
    key: 'Cosmic Nexus',
    value: 5
  },

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
const sortMap = [
  {
    key: 'Recent Time',
    value: 1
  },
  {
    key: 'Lowest Price',
    value: 2
  },
  {
    key: 'Highest Price',
    value: 3
  }
]
const sortLandMap = [
  {
    key: 'Recent Time',
    value: 1
  },
  {
    key: 'Lowest Price',
    value: 2
  },
  {
    key: 'Highest Price',
    value: 3
  }
]
const MyMap = [
  {
    key: 'All',
    value: -1
  },
  {
    key: 'Badge',
    value: 1
  },
  {
    key: 'Land',
    value: 2
  }
]
export interface orderInfoType {
  id: number,
  price: number,
  cardName: string,
  zhCardName: string,
  cardType: number,
  cardLevel: number,
  tokenId: string,
  cardNo: string,
  chainOrderId: string,
  image: string
  coinName: string
  introduce: string
  zhIntroduce: string
  userAddress: string
  basePower: number
  currentPower: number
  isActivation: number
}

interface newOrderInfoType {
  data: orderInfoType[]
  typeIndex: number
}

function Swap() {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()
  /* 分页总条数 */
  let [totalNum, SetTotalNum] = useState(0)
  /* 分页页数 */
  let [page, SetPage] = useState(1)
  /* 筛选排序 */
  let [sort, SetSort] = useState(1)
  /* 筛选排序 */
  let [sortLand, SetLandSort] = useState(1)
  /* 类型筛选 */
  let [type, SetType] = useState(-1)
  /* 等级筛选 */
  let [level, SetLevel] = useState(0)
  /* 土地等级筛选 */
  let [LandLevel, SetLandLevel] = useState(0)
  console.log(LandLevel);
  /* 用户订单类型筛选 */
  let [usertype, SetUsertype] = useState(-1)
  /* 用户订单等级筛选 */
  let [userlevel, SetUserlevel] = useState(0)
  /* tab */
  let [TabIndex, SetTabIndex] = useState(0)
  /* 类型 */
  let [cardType, SetCardType] = useState(1)
  // 我的封号
  let [userLevel, setUserLevel] = useState(0)
  let [hashTime, setHashTime] = useState(0)
  /* 我的类型 */
  let [cardMyType, SetCardMyType] = useState(-1)
  /* 精灵详情弹窗控制 */
  let [showCardDetail, setShowCardDetail] = useState(false)
  /* 确认购买弹窗控制 */
  let [showEnterBuy, setShowEnterBuy] = useState(false)
  /* 购买成功弹窗控制 */
  let [showBuySuccess, setShowBuySuccess] = useState(false)
  /* 取消订单弹窗控制 */
  let [showCancelOrder, setShowCancelOrder] = useState(false)
  /* 取消订单成功弹窗控制 */
  let [showCancelSuccess, setShowCancelSuccess] = useState(false)
  /* 订单记录弹窗控制 */
  let [showOrderRecord, setShowOrderRecord] = useState(false)
  /* 购买订单信息 */
  let [orderInfo, setOrderInfo] = useState<orderInfoType | null>(null)
  /* 订单列表 */
  let [orderList, setOrderList] = useState<orderInfoType[]>([])
  let [nOrderList, setNOrderList] = useState<newOrderInfoType>({data: [], typeIndex: 0})
  let [landOrderList, setLandOrderList] = useState<newOrderInfoType>({data: [], typeIndex: 0})
  let [mineOrderList, setMineOrderList] = useState<newOrderInfoType>({data: [], typeIndex: 0})
  let [newOrderList, setNewOrderList] = useState<Array<orderInfoType[]>>([[], [], []])
  /* 用户订单列表 */
  let [userOrderList, setUserOrderList] = useState<orderInfoType[]>([])
  // SBL授权
  const [ApproveValue, setApproveValue] = useState('0')
  // 授权
  function ApproveFun(num: number) {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    showLoding(true)
    Contracts.example.approve1(web3React.account as string, contractAddress.EXChangeNFT, `${num}`).then(() => {
      Contracts.example.Tokenapprove(web3React.account as string, contractAddress.EXChangeNFT).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
      }).finally(() => {
        showLoding(false)
      })
    }).finally(() => {
      showLoding(false)
    })
  }
  useEffect(() => {
    setShowCancelOrder(false)
  }, [web3React.account])
  let obj: any = {}

  const getBadgeData = useCallback(
    () => {
      if (cardType === 1 && TabIndex === 0 && state.token && web3React.account) {
        getOrderList({
          cardType: cardType,
          currentPage: page,
          level: level,
          pageSize: 12,
          type: type,
          sortType: sort
          // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
        }).then(res => {
          console.log(res.data.list, '精灵列表')
          setOrderList(res.data.list)
          setNOrderList({data: res.data.list, typeIndex: cardType})
          console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setNOrderList", res.data.list )
          SetTotalNum(res.data.size)
        })
        // 推送
        obj = initWebSocket(socketUrl, `/topic/getOrderList/${web3React.account}`, `/getOrderList/${web3React.account}`,
          {
            cardType: cardType,
            currentPage: page,
            level: level,
            pageSize: 12,
            type: type,
            sortType: sort
            // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
          }, (data: any) => {
            setOrderList(data.list)
            setNOrderList({data: data.list, typeIndex: cardType})
            console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setNOrderList1", data.list )
            SetTotalNum(data.size)
          })
  
        return () => {
          try {
            console.log("nihao1");
            obj.stompClient.disconnect()
            clearInterval(obj.sendTimer)
            obj.subscription.unsubscribe();
          } catch {
  
          }
        }
      };
    },
    [hashTime, page, sort, type, level, TabIndex, state.token, web3React.account, cardType]
  )
  
  // 精灵
  useEffect(() => {
    getBadgeData()
  }, [hashTime])

  const getLandData = useCallback(
    () => {
      if (cardType === 2 && TabIndex === 1 && state.token && web3React.account) {
        getOrderList({
          cardType: cardType,
          currentPage: page,
          level: LandLevel,
          pageSize: 12,
          type: -1,
          sortType: sortLand
          // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
        }).then(res => {
          console.log(res.data.list, '土地列表')
          setOrderList(res.data.list)
          setLandOrderList({data: res.data.list, typeIndex: cardType})
          console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setLandOrderList", res.data.list )

          SetTotalNum(res.data.size)
        })
        // 推送
        obj = initWebSocket(socketUrl, `/topic/getOrderList/${web3React.account}`, `/getOrderList/${web3React.account}`,
          {
            cardType: cardType,
            currentPage: page,
            level: LandLevel,
            pageSize: 12,
            type: -1,
            sortType: sortLand
            // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
          }, (data: any) => {
            console.log(data.list, "土地推送");
  
            setOrderList(data.list)        
            setLandOrderList({data: data.list, typeIndex: cardType})
            console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setLandOrderList1",  {
              cardType: cardType,
              currentPage: page,
              level: LandLevel,
              pageSize: 12,
              type: -1,
              sortType: sortLand
              // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
            }, data.list )

            SetTotalNum(data.size)
          })
        return () => {
          try {
            console.log("nihao2");
            obj.stompClient.disconnect()
            clearInterval(obj.sendTimer)
            obj.subscription.unsubscribe();
          } catch {
  
          }
        }
      };
    },
    [hashTime, page, sort, type, level, TabIndex, state.token, web3React.account, cardType]
  )
  
  // 土地
  useEffect(() => {
    getLandData()
  }, [hashTime])

  const getMineData = useCallback(
    () => {
      if (cardType === 0 && TabIndex === 2 && state.token && web3React.account) {
        try {
          console.log('nihao3');
          obj.stompClient.disconnect()
          clearInterval(obj.sendTimer)
          obj.subscription.unsubscribe();
        } catch {
  
        }
        getOrderList({
          cardType: cardMyType,
          currentPage: page,
          level: userlevel,
          pageSize: 12,
          type: usertype,
          userAddress: web3React.account
          // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
        }).then(res => {
          console.log(res.data.list, '我的列表')
          setUserOrderList(res.data.list)
          setMineOrderList({data: res.data.list, typeIndex: cardMyType})
          console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setMineOrderList", res.data.list )
          SetTotalNum(res.data.size)
        })
        // 推送 
        obj = initWebSocket(socketUrl, `/topic/getOrderList/${web3React.account}`, `/getOrderList/${web3React.account}`,
          {
            cardType: cardMyType,
            currentPage: page,
            level: userlevel,
            pageSize: 12,
            type: usertype,
            userAddress: web3React.account
            // userAddress: '0xdfbd20242002dd329d27a38ff9f4bd8bd6e4aa58'
          }, (data: any) => {
            setUserOrderList(data.list)
            setMineOrderList({data: data.list, typeIndex: cardMyType})
            console.log("Fri Apr 07 2023 19:44:44 GMT+0800 (中国标准时间)", "setMineOrderList1", data.list )
            SetTotalNum(data.size)
          })
          return () => {
            try {
              console.log("nihao3");
              obj.stompClient.disconnect()
              clearInterval(obj.sendTimer)
              obj.subscription.unsubscribe();
            } catch {
    
            }
          }
    };
    },
    [hashTime, page, sort, type, level, TabIndex, state.token, web3React.account, cardType]
  )


  // 我的
  useEffect(() => {
    getMineData()
  }, [hashTime])

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setNewOrderList(prev=>{
        prev = [nOrderList.data, landOrderList.data, mineOrderList.data]
        console.log("prev", prev)
        return prev.concat([])
       })
       setHashTime(+new Date())
    }, 2000);
    return ()=>{
      clearTimeout(timer)
    }
  }, [nOrderList, landOrderList, mineOrderList, cardType, cardMyType, TabIndex, state.token, web3React.account])
  

  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  function buy(index: number) {
    console.log(orderList[index].userAddress === web3React.account?.toLocaleLowerCase())
    if (orderList[index].userAddress === web3React.account?.toLocaleLowerCase()) {
      return addMessage(t("Can't buy your own order"))
    }
    setOrderInfo(orderList[index])
    setShowEnterBuy(true)
  }

  function Cancel(index: number) {
    setOrderInfo(userOrderList[index])
    setShowCancelOrder(true)
  }
  function CancelSuccess() {
    setShowCancelOrder(false)
    getOrderList({
      cardType: cardType,
      currentPage: page,
      level: userlevel,
      pageSize: 12,
      type: usertype,
      userAddress: web3React.account as string
    }).then(res => {
      setUserOrderList(res.data.list)
      SetTotalNum(res.data.size)
    })
    setShowCancelSuccess(true)
  }

  function changeTab(tab: number) {
    SetTabIndex(tab)
  }


  function ShowCardDetailFun(index: number, type: string) {
    if (type === 'swap') {
      setOrderInfo(orderList[index])
    } else {
      setOrderInfo(userOrderList[index])
    }
    setShowCardDetail(true)
  }

  useEffect(() => {
    if (state.token) {
      // 我的封号
      getUserInfo().then(res => {
        console.log(res.data, "我的封号")
        setUserLevel(res.data.level)
      })
    }
  }, [state.token, web3React.account])

  useEffect(() => {
    // 查询授权
    if (web3React.account) {
      Contracts.example.Tokenapprove(web3React.account as string, contractAddress.EXChangeNFT).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
      })
    }
  }, [web3React.account])

  console.log("newOrderList", newOrderList)


  return (
    <div>
      <div className="Edition-Center" id="Swap">
        {/* 交易记录 */}
        <MyDealRecord isShow={showOrderRecord} close={() => { setShowOrderRecord(false) }} ></MyDealRecord>
        {/* 精灵详情 */}
        {
          orderInfo && orderInfo.cardType !== 0 && <PutParticulars isShow={showCardDetail} OrderInfo={orderInfo} close={() => setShowCardDetail(false)} ></PutParticulars>
        }
        {/* 土地详情 */}
        {
          orderInfo && orderInfo.cardType === 0 && <LandPutParticulars userLevel={userLevel} isShow={showCardDetail} OrderInfo={orderInfo} close={() => setShowCardDetail(false)} ></LandPutParticulars>
        }
        {/* 取消挂卖成功 */}
        <Tips isShow={showCancelSuccess} title={t('Cancellation succeeded')} subTitle={t('Cancel tips')} enterFun={() => setShowCancelSuccess(false)} close={() => setShowCancelSuccess(false)}></Tips>
        {/* 取消挂卖 */}
        {
          orderInfo && <CancelPurchase isShow={showCancelOrder} buyInfo={orderInfo} close={() => setShowCancelOrder(false)} CancelSuccess={CancelSuccess}></CancelPurchase>
        }
        {/* 购买成功 */}
        <Tips isShow={showBuySuccess} title={t('Purchase successfully2')} subTitle={t('Purchase successfully')} enterFun={() => setShowBuySuccess(false)} close={() => setShowBuySuccess(false)}></Tips>
        {/*确认购买  */}
        {
          orderInfo && <MarketDealing isShow={showEnterBuy} buyInfo={orderInfo} close={() => { setShowEnterBuy(false) }} buySuccess={() => setShowBuySuccess(true)}></MarketDealing>
        }
        {/* 精灵详情 */}
        <div className="SwapTitle">
          {t('Swap')}
        </div>
        <div className="screen">
          <div className="Tabs">
            <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(0); SetCardType(1) }}>{t("Badge")}</div>
            <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(1); SetCardType(2) }}>{t("Land")}</div>
            <div className={TabIndex === 2 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(2); SetCardType(0) }}>{t('Swd')}</div>
          </div>
          {
            TabIndex === 0 && <div className="DropDownGroup">
              <DropDown Map={LevelMap} change={SetLevel} staetIndex={level}></DropDown>
              <DropDown Map={typeMap} change={SetType} staetIndex={type}></DropDown>
              <DropDown Map={sortMap} change={SetSort} staetIndex={sort}></DropDown>
            </div>
          }
          {
            TabIndex === 1 && <div className="DropDownGroup">
              <DropDown Map={LandLevelMap} change={SetLandLevel}></DropDown>
              <DropDown Map={sortLandMap} change={SetLandSort} staetIndex={sortLand}></DropDown>
            </div>
          }
          {
            TabIndex === 2 && <div className="DropDownGroup">
              <img src={orderRecord} alt="" onClick={() => { setShowOrderRecord(true) }} />
              <DropDown Map={MyMap} change={SetCardMyType} staetIndex={cardMyType}  ></DropDown>
            </div>
          }
        </div>
        {
          TabIndex === 0 && <>
            {/* 交易场NFT列表 */}
            {
              newOrderList[0].length !== 0 ? <>
                <div className="CardList">
                  {
                    newOrderList[0].map((item, index) => <CardItem ApproveValue={ApproveValue} approveFun={ApproveFun} key={item.id} type="commodity" orderInfo={item} showCardDetail={() => { ShowCardDetailFun(index, 'swap') }} buy={() => buy(index)}></CardItem>)
                  }
                </div>
              </> : <>
                <NoData></NoData>
              </>
            }
          </>
        }
        {
          TabIndex === 1 && <>
            {/* 交易场土地列表 */}
            {
              newOrderList[1].length !== 0 ? <>
                <div className="CardList">
                  {
                    newOrderList[1].map((item, index) => <CardItem ApproveValue={ApproveValue} approveFun={ApproveFun} key={item.id} type="commodity" orderInfo={item} showCardDetail={() => { ShowCardDetailFun(index, 'swap') }} buy={() => buy(index)}></CardItem>)
                  }
                </div>
              </> : <>
                <NoData></NoData>
              </>
            }
          </>
        }
        {
          TabIndex === 2 && <>
            {/* 交易场我的列表 */}
            {
              newOrderList[2].length !== 0 ? <>
                <div className="CardList">
                  {
                    newOrderList[2]?.map((item, index) => <CardItem type="goods" key={item.id} orderInfo={item} showCardDetail={() => { ShowCardDetailFun(index, 'my') }} CancelOrder={() => Cancel(index)}></CardItem>)
                  }
                </div>
              </> : <>
                <NoData></NoData>
              </>
            }

          </>
        }
        {/* 交易场数据合个人交易场数据共用一个分页器 */}
        <div className="Pagination">
          <Pagination style={{ margin: "auto" }} showQuickJumper defaultCurrent={page} defaultPageSize={12} hideOnSinglePage showSizeChanger={false} total={totalNum} onChange={onChange} />
        </div>

      </div>
    </div>
  )
}
export default React.memo(Swap)