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
          <img src={LandDetailImg} alt=""></img>
        </div>
        <p className='kpdetails'>土地品質:優秀</p>
        <p className='kpdetails'>ID：152145</p>
        <p className='kpdetails'>土地封號：領主</p>
        <p className='kpdetails'>狀態：未激活</p>
        <p className='kpdetails'>激活要求：添加價值0.4 BNB的LP</p>
        <p className='kpdetails'>土地服務獎：土地內新增購買寶箱和徽章升級消耗SBL的7%，同品質土地新增收益5%</p>
        <p className='kpdetails'>土地分紅：所有同品質土地每日均分新增購買寶箱和徽章升級消耗SBL的2.5%</p>
        <div className='butm'>
          <button className='hc'>出售</button>
          <button className='hc'>激活</button>
        </div>
        <span>{t('Click anywhere to close')}</span>
      </Modal>

    </>
  )
}
export default LandCardDetails