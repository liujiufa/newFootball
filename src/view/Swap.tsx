import React, { useState, useEffect } from "react"
import orderRecord from '../assets/image/orderRecord.png'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import PutParticulars from '../components/PutParticulars'
import { useWeb3React } from '@web3-react/core'
import Tips from '../components/Tips'
import { getOrderList } from '../API'
import { addMessage } from '../utils/tool'
import DropDown from '../components/DropDown'
import CardItem from '../components/CardItem'
import NoData from '../components/NoData'
import { useTranslation } from 'react-i18next'
// import Puchased from '../components/Puchased'
import CancelPurchase from '../components/CancelPurchase'
// import CancelSucceed from '../components/CancelSucceed'
import MyDealRecord from '../components/MyDealRecord'
import { Pagination } from 'antd';

import '../assets/style/Swap.scss'
import MarketDealing from '../components/MarketDealing'

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
  /* 类型筛选 */
  let [type, SetType] = useState(0)
  /* 等级筛选 */
  let [level, SetLevel] = useState(0)
  /* 用户订单类型筛选 */
  let [usertype, SetUsertype] = useState(0)
  /* 用户订单等级筛选 */
  let [userlevel, SetUserlevel] = useState(0)
  /* tab */
  let [TabIndex, SetTabIndex] = useState(0)
  /* 徽章详情弹窗控制 */
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
  /* 用户订单列表 */
  let [userOrderList, setUserOrderList] = useState<orderInfoType[]>([])
  useEffect(() => {
    setShowCancelOrder(false)
  }, [web3React.account])
  useEffect(() => {
    if (TabIndex === 0 && state.token && web3React.account) {
      getOrderList({
        currentPage: page,
        level: level,
        pageSize: 12,
        type: type,
        sortType: sort
      }).then(res => {
        console.log(res, "交易场订单")
        setOrderList(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }, [page, sort, type, level, TabIndex, state.token, web3React.account])
  useEffect(() => {
    if (TabIndex === 1 && state.token && web3React.account) {
      getOrderList({
        currentPage: page,
        level: userlevel,
        pageSize: 12,
        type: usertype,
        userAddress: web3React.account
      }).then(res => {
        setUserOrderList(res.data.list)
        SetTotalNum(res.data.size)
      })
    }
  }, [page, sort, usertype, userlevel, TabIndex, state.token, web3React.account])
  function onChange(pageNumber: number) {
    SetPage(pageNumber)
    console.log('Page: ', pageNumber);
  }
  function buy(index: number) {
    // if()
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
  return (
    <div>
      <div className="Edition-Center">
        {/* 我的交易记录 */}
        <MyDealRecord isShow={showOrderRecord} close={() => { setShowOrderRecord(false) }} ></MyDealRecord>
        {/* 徽章详情 */}
        {
          orderInfo && <PutParticulars isShow={showCardDetail} OrderInfo={orderInfo} close={() => setShowCardDetail(false)} ></PutParticulars>
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
        {/* 徽章详情 */}
        <div className="SwapTitle">
          {t('Swap')}
        </div>
        <div className="screen">
          <div className="Tabs">
            <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(0) }}>{t('Ssy')}</div>
            <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(1) }}>{t('Swd')}</div>
          </div>
          {
            TabIndex === 0 && <div className="DropDownGroup">
              <DropDown Map={LevelMap} change={SetLevel}></DropDown>
              <DropDown Map={typeMap} change={SetType}></DropDown>
              <DropDown Map={sortMap} change={SetSort}></DropDown>
            </div>
          }
          {
            TabIndex === 1 && <div className="DropDownGroup">
              <img src={orderRecord} alt="" onClick={() => { setShowOrderRecord(true) }} />
              <DropDown Map={LevelMap} change={SetUserlevel} ></DropDown>
              <DropDown Map={typeMap} change={SetUsertype}></DropDown>
            </div>
          }
        </div>
        {
          TabIndex === 0 && <>
            {/* 交易场所有列表 */}
            {
              orderList.length !== 0 ? <>
                <div className="CardList">
                  {
                    orderList.map((item, index) => <CardItem key={item.id} type="commodity" orderInfo={item} showCardDetail={() => { ShowCardDetailFun(index, 'swap') }} buy={() => buy(index)}></CardItem>)
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
            {/* 交易场我的列表 */}
            {
              userOrderList.length !== 0 ? <>
                <div className="CardList">
                  {
                    userOrderList.map((item, index) => <CardItem type="goods" key={item.id} orderInfo={item} showCardDetail={() => { ShowCardDetailFun(index, 'my') }} CancelOrder={() => Cancel(index)}></CardItem>)
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