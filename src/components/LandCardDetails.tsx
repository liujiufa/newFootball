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

// const cardObj = {
//   0: '',
//   1: ['优秀', '添加价值0.4BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的7%，同品质土地新增收益5%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   2: ['稀有', '添加价值1BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的10%，同品质土地新增收益10%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   3: ['良品', '添加价值2BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的13%，同品质土地新增收益15%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   4: ['史诗', '添加价值5BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的15%，同品质土地新增收益20%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   5: ['传奇', '添加价值16BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的18%，同品质土地新增收益25%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%']
// }
function LandCardDetails(props: any) {
  let { t, i18n } = useTranslation()
  const cardObj = {
    0: '',
    1: [t('Excellent'), t('add LP with value of 0.4 BNB'), t('LandServiceIncome1'), t('LandDividend')],
    2: [t('Rare'), t('add LP with value of 1 BNB'), t('LandServiceIncome2'), t('LandDividend')],
    3: [t('Good'), t('add LP with value of 2 BNB'), t('LandServiceIncome3'), t('LandDividend')],
    4: [t('Epic'), t('add LP with value of 5 BNB'), t('LandServiceIncome4'), t('LandDividend')],
    5: [t('Legend'), t('add LP with value of 16 BNB'), t('LandServiceIncome5'), t('LandDividend')]
  }
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const web3React = useWeb3React()
  let [isApproved, setIsApproved] = useState(false)
  let [putPrice, setPutPrice] = useState('')

  // 挂卖授权
  function createOrderApproval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断徽章等级 */
    Contracts.example.setLandApprovalForAll(web3React.account as string, contractAddress.EXChangeNFT, true).then(() => {
      setIsApproved(true)
      addMessage(t('Authorization succeeded'))
    })
  }

  useEffect(() => {
    if (web3React.account && props.isShow) {
      // 查询挂卖是否授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.EXChangeNFT).then((res: any) => {
        setIsApproved(res)
      })
    }
  }, [web3React.account, props.isShow])

  return (
    <>
      <Modal title="Basic Modal" visible={props.showModal}
        destroyOnClose
        onCancel={() => props.close()}
        className='Card'
        centered
        width={'417px'}
        closable={false}
        footer={null}
      >
        <p className='title'>{t("Land details")}</p>
        <div className='hzimg'>
          {props.CardInfo.isActivation == 1 && <div className="pending">{t("Activated")}</div>}
          <img src={props.CardInfo.imageUrl} alt=""></img>
        </div>
        <div className="p1">
          <p className='kpdetails'>{t("Land quality")}: {cardObj[props.CardInfo.cardLevel][0]}</p>
          <p className='kpdetails'>ID：{props.CardInfo.cardNo}</p>
        </div>
        <div className="p2">
          <p className='kpdetails'>{t("Land title")}：{LevelObj[props.userLevel]}</p>
          <p className='kpdetails'>{t("Status")}：{props.CardInfo.isActivation == 1 ? t('Active') : t('Not active')}</p>
        </div>

        <p className='kpdetails'>{t("Activation requirement")}：{cardObj[props.CardInfo.cardLevel][1]}</p>
        <p className='kpdetails'>{t("Land service income")}：{cardObj[props.CardInfo.cardLevel][2]}</p>
        <p className='kpdetails'>{t("Land dividend")}：{cardObj[props.CardInfo.cardLevel][3]}</p>
        <div className='butm'>
          {isApproved ? <button className='hc' onClick={() => { props.showCreateOrder && props.showCreateOrder(props.CardInfo.cardLevel) }}>{t("Sale")}</button> : <button className='gm' onClick={() => { createOrderApproval() }}> <div>{t("Sale")}</div></button>}
          {/* {props.userLevel == props.CardInfo.cardLevel && <button className='hc' >激活</button>} */}
        </div>
        <span>{t('Click anywhere to close')}</span>
      </Modal>

    </>
  )
}
export default LandCardDetails