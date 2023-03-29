import React, { useEffect, useState } from 'react';
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { CardInfoType } from './Card'
// import {orderInfoType} from '../view/Swap'
import { useTranslation } from 'react-i18next'
import { addMessage, showLoding } from '../utils/tool'
import { Modal, Image } from 'antd';
import { contractAddress } from '../config'
import i18next from 'i18next';
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/carddetails.scss'

interface CardDetailPropsType {
  isShow: boolean,
  close: Function,
  type: string,
  CardInfo: CardInfoType,
  showCreateOrder?: Function
  CreateOrderSuccess?: Function
  showMerge?: Function
  pledgeSuccessModal: Function,
}
const cardClass = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
/* type:Swap 交易场详情 CreateOrder 挂单详情 NFT 背包精灵详情 */
// const cardObj = {
//   0: '',
//   1: ['优秀', '添加价值0.4BNB的LP', '土地内新增购买宝箱和精灵升级消耗SBL的7%，同品质土地新增收益5%', '所有同品质土地每日均分新增购买宝箱和精灵升级消耗SBL的2.5%'],
//   2: ['稀有', '添加价值1BNB的LP', '土地内新增购买宝箱和精灵升级消耗SBL的10%，同品质土地新增收益10%', '所有同品质土地每日均分新增购买宝箱和精灵升级消耗SBL的2.5%'],
//   3: ['良品', '添加价值2BNB的LP', '土地内新增购买宝箱和精灵升级消耗SBL的13%，同品质土地新增收益15%', '所有同品质土地每日均分新增购买宝箱和精灵升级消耗SBL的2.5%'],
//   4: ['史诗', '添加价值5BNB的LP', '土地内新增购买宝箱和精灵升级消耗SBL的15%，同品质土地新增收益20%', '所有同品质土地每日均分新增购买宝箱和精灵升级消耗SBL的2.5%'],
//   5: ['传奇', '添加价值16BNB的LP', '土地内新增购买宝箱和精灵升级消耗SBL的18%，同品质土地新增收益25%', '所有同品质土地每日均分新增购买宝箱和精灵升级消耗SBL的2.5%']
// }

function CardDetails(props: any) {
  let { t, i18n } = useTranslation()
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const cardObj = {
    0: '',
    1: [t('Supernova'), t('add LP with value of 0.4 BNB'),],
    2: [t('Outpost'), t('add LP with value of 1 BNB'),],
    3: [t('Galactic Hub'), t('add LP with value of 2 BNB'),],
    4: [t('Star Empire'), t('add LP with value of 5 BNB'),],
    5: [t('Cosmic Nexus'), t('add LP with value of 16 BNB'),]
  }
  const web3React = useWeb3React()
  let [putPrice, setPutPrice] = useState('')

  async function createOrder() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    let owenr = await Contracts.example.ownerLandOf(web3React.account as string, props.CardInfo.tokenId)
    console.log(owenr, '333');
    if (owenr !== web3React.account) {
      return addMessage(t("Cards don't belong to you"))
    }
    if (putPrice.length === 0) {
      return addMessage(t('Please enter the correct price'))
    }
    let numSplit = putPrice.toString().split(".")
    if (numSplit.length === 2 && numSplit[1].length > 4) {
      return addMessage(t('Please enter the correct precision'))
    }
    if (putPrice === '.') {
      return addMessage(t('Please enter the correct price'))
    }
    if (numSplit.length > 2) {
      return addMessage(t('Please enter the correct price'))
    }
    if (numSplit[0].length > 18) {
      return addMessage(t('Please enter the correct precision'))
    }
    if (new BigNumber(putPrice).lte(0)) {
      return addMessage(t('Please enter the correct price'))
    }
    showLoding(true)
    Contracts.example.createOrder(web3React.account as string, props.CardInfo.tokenId, putPrice, contractAddress.Token, contractAddress.LandNFT).then((res: any) => {
      // addMessage("创建订单成功")
      props.CreateOrderSuccess && props.CreateOrderSuccess()
    }).finally(() => {
      showLoding(false)
    })
  }

  function putNum(e: React.ChangeEvent<HTMLInputElement>) {
    setPutPrice(e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
  }
  return (
    <>
      {
        props.CardInfo && <Modal visible={props.isShow}
          destroyOnClose
          onCancel={() => props.close()}
          className='landCard'
          centered
          width={'417px'}
          closable={false}
          footer={null}
        >
          <p className='title'>{props.type === "CreateOrder" ? t('Listing details') : t('Card Details')}</p>
          <div className="detailModalBox">
            <div className='hzimg'>
              <Image src={props.CardInfo.imageUrl} alt=""></Image>
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
            <div className='kpdetails'>{t("land introduction")}{i18next.language === "zh" ? props.CardInfo.zhIntroduce : props.CardInfo.introduce}</div>
            {/* 挂卖 */}
            {
              props.type === "CreateOrder" && <p className='kpdetails'>{t('Please enter price')}:<input type='text' value={putPrice} onChange={putNum} />MBAS</p>
            }
            {
              props.type === "CreateOrder" && <div className='butm'>
                <button className='hc' onClick={createOrder}>{t('Confirm')}</button>
              </div>
            }
          </div>
        </Modal>
      }

    </>
  )
}
export default CardDetails