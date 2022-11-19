import React, { useEffect, useState } from 'react';
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { CardInfoType } from './Card'
// import {orderInfoType} from '../view/Swap'
import { useTranslation } from 'react-i18next'
import { addMessage, showLoding } from '../utils/tool'
import { Modal } from 'antd';
import { contractAddress } from '../config'
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/carddetails.scss'
import LandDetailImg from '../assets/image/LandDetailImg.png'
interface CardDetailPropsType {
  isShow: boolean,
  close: Function,
  type: string,
  CardInfo: CardInfoType,
  showCreateOrder?: Function
  CreateOrderSuccess?: Function
  showMerge?: Function
}
const LevelObj = { 0: '', 1: '领主', 2: '城主', 3: '市长', 4: '州长', 5: '议长' }
const cardObj = {
  0: '',
  1: ['优秀', '添加价值0.4BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的7%，同品质土地新增收益5%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
  2: ['稀有', '添加价值1BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的10%，同品质土地新增收益10%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
  3: ['良品', '添加价值2BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的13%，同品质土地新增收益15%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
  4: ['史诗', '添加价值5BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的15%，同品质土地新增收益20%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
  5: ['传奇', '添加价值16BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的18%，同品质土地新增收益25%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%']
}
function LandCardDetails(props: any) {
  let { t, i18n } = useTranslation()
  const web3React = useWeb3React()
  let [isApproved, setIsApproved] = useState(false)
  let [putPrice, setPutPrice] = useState('')

  return (
    <>
      <Modal title="Basic Modal" visible={props.showModal}
        destroyOnClose
        onCancel={() => props.close()}
        className='Card'
        centered
        width={'449px'}
        closable={false}
        footer={null}
      >
        <p className='title'>土地詳情</p>
        <div className='hzimg'>
          <div className="pending">已激活</div>
          <img src={props.CardInfo.imageUrl} alt=""></img>
        </div>
        <p className='kpdetails'>土地品質: {cardObj[props.CardInfo.cardLevel][0]}</p>
        <p className='kpdetails'>ID：{props.CardInfo.cardNo}</p>
        <p className='kpdetails'>土地封號：{LevelObj[props.userLevel]}</p>
        <p className='kpdetails'>狀態：{props.userLevel == props.CardInfo.cardLevel ? '激活' : '未激活'}</p>
        <p className='kpdetails'>激活要求：{cardObj[props.CardInfo.cardLevel][1]}</p>
        <p className='kpdetails'>土地服務獎：{cardObj[props.CardInfo.cardLevel][2]}</p>
        <p className='kpdetails'>土地分紅：{cardObj[props.CardInfo.cardLevel][3]}</p>
        <div className='butm'>
          <button className='hc'>出售</button>
          {props.userLevel == props.CardInfo.cardLevel && <button className='hc' >激活</button>}
        </div>
        <span>{t('Click anywhere to close')}</span>
      </Modal>

    </>
  )
}
export default LandCardDetails