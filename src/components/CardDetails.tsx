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

interface CardDetailPropsType {
  isShow: boolean,
  close: Function,
  type: string,
  CardInfo: CardInfoType,
  showCreateOrder?: Function
  CreateOrderSuccess?: Function
  showMerge?: Function
}
const cardClass = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
/* type:Swap 交易场详情 CreateOrder 挂单详情 NFT 背包徽章详情 */
function CardDetails(props: CardDetailPropsType) {
  let { t, i18n } = useTranslation()
  const web3React = useWeb3React()
  let [isApproved, setIsApproved] = useState(false)
  let [putPrice, setPutPrice] = useState('')
  async function createOrder() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    let owenr = await Contracts.example.ownerOf(web3React.account as string, props.CardInfo.tokenId)
    if (owenr !== web3React.account) {
      return addMessage(t("Cards don't belong to you"))
    }
    //  if(props.CardInfo.cardLevel<5){
    //   return addMessage(t('Below level 5 cannot be sold'))
    //  }
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
    Contracts.example.createOrder(web3React.account as string, props.CardInfo.tokenId, putPrice, '0x0000000000000000000000000000000000000000', contractAddress.NFT).then((res: any) => {
      // addMessage("创建订单成功")
      props.CreateOrderSuccess && props.CreateOrderSuccess()

    }).finally(() => {
      showLoding(false)
    })
  }
  useEffect(() => {
    if (web3React.account && props.type === "CreateOrder" && props.isShow) {
      setPutPrice('')
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.EXChangeNFT).then((res: any) => {
        setIsApproved(res)
      })
    }
  }, [web3React.account, props.type, props.isShow])
  function Approval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断徽章等级 */
    Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.EXChangeNFT, true).then(() => {
      setIsApproved(true)
      addMessage(t('Authorization succeeded'))
    })
  }
  function putNum(e: React.ChangeEvent<HTMLInputElement>) {
    setPutPrice(e.target.value.replace(/[^\d.]/g, ""))
  }
  return (
    <>
      {
        props.CardInfo && <Modal title="Basic Modal" visible={props.isShow}
          destroyOnClose
          onCancel={() => props.close()}
          className='Card'
          centered
          width={'449px'}
          closable={false}
          footer={null}
        >
          <p className='title'>{props.type === "CreateOrder" ? t('Listing details') : t('Card Details')}</p>
          <div className='hzimg'>
            <img src={props.CardInfo.imageUrl} alt=""></img>
          </div>
          <p className='kpdetails'>{t('Card Name')}:{i18n.language === 'zh' ? props.CardInfo.zhCardName : props.CardInfo.cardName}</p>
          <p className='kpdetails'>{t('CardID')}:{props.CardInfo.cardNo}</p>
          <p className='kpdetails'>{t('CardLevel')}:{t(level[props.CardInfo.cardLevel])}</p>
          <p className='kpdetails'>{t('CardType')}:{t(cardClass[props.CardInfo.cardType])}</p>
          <p className='kpdetails'>{t('Introduction Card')}:{i18n.language === 'zh' ? props.CardInfo.zhIntroduce : props.CardInfo.introduce}</p>
          {
            props.type === "CreateOrder" && <p className='kpdetails'>{t('Please enter price')}:<input type='text' value={putPrice} onChange={putNum} />BNB</p>
          }
          {
            props.type === "NFT" && <div className='butm'>
              <button className={props.CardInfo.cardLevel < 5 ? 'zy' : 'gm'}><div onClick={() => { props.showCreateOrder && props.showCreateOrder(props.CardInfo.cardLevel) }}>{t("Sale")}</div></button>
              {
                props.CardInfo.cardLevel <= 5 && <button className='hc' onClick={() => { props.showMerge && props.showMerge() }}>{t('Evolve')}</button>
              }
              <button className='zy' onClick={() => { addMessage(t('Not opened yet')) }}>{t('Pledge')}</button>
            </div>
          }
          {
            props.type === "CreateOrder" && <div className='butm'>
              {
                isApproved ? <>
                  <button className='hc' onClick={createOrder}>{t('Verify')}</button>
                </> : <>
                  <button className='hc' onClick={Approval}>{t('Approve')}</button>
                </>
              }
            </div>
          }
          <span>{t('Click anywhere to close')}</span>
        </Modal>
      }

    </>
  )
}
export default CardDetails