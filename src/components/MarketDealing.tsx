// 确认购买
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { Contracts } from '../web3'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { addMessage, showLoding } from '../utils/tool'
import { useWeb3React } from '@web3-react/core'
import { orderInfoType } from '../view/Swap'
import { contractAddress } from '../config';
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/MarketDealing.scss'

interface MarketDealingPropsType {
  isShow: boolean,
  close: Function,
  buySuccess: Function,
  buyInfo: orderInfoType
}
function MarketDealing(props: MarketDealingPropsType) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()

  async function buyFun() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    let Balance = await Contracts.example.balanceOf(web3React.account as string)
    Balance = new BigNumber(Balance).div(10 ** 18).toString()
    if (new BigNumber(Balance).lt(props.buyInfo.price)) {
      return addMessage(t('not enough'))
    }
    showLoding(true)
    Contracts.example.takeOrder(web3React.account as string, props.buyInfo.chainOrderId, props.buyInfo.price).then(() => {
      /* 购买成功关闭弹窗 */
      props.close()
      /* 购买成功回调 */
      props.buySuccess()
    }).finally(() => {
      showLoding(false)
    })
  }

  return (
    <>
      <Modal title="Basic Modal" visible={props.isShow}
        className='Market'
        onCancel={() => props.close()}
        centered
        width={'449px'}
        closable={false}
        footer={null}
      >
        <p className='title'>{t('Confirm purchase')}</p>
        <p className='zifujg'>{t('needPayBuy', { price: props.buyInfo.price, coinName: props.buyInfo.coinName })}</p>
        <span>{t('Click anywhere to close')}</span>
        {<button className='btm' onClick={buyFun}>{t('Verify')}</button>}
      </Modal></>
  )
}
export default MarketDealing