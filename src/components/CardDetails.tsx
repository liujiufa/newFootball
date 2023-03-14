import React, { useEffect, useState } from 'react';
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { CardInfoType } from './Card'
// import {orderInfoType} from '../view/Swap'
import { useTranslation } from 'react-i18next'
import { addMessage, showLoding } from '../utils/tool'
import { Modal, Image } from 'antd';
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
  pledgeSuccessModal: Function,
}
const cardClass = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
/* type:Swap 交易场详情 CreateOrder 挂单详情 NFT 背包徽章详情 */
function CardDetails(props: any) {
  let { t, i18n } = useTranslation()
  const web3React = useWeb3React()
  // 挂卖授权
  let [isApproved, setIsApproved] = useState(false)
  // 质押授权
  const [isApprovePledgeValue, setIsApprovePledgeValue] = useState(false)
  // 铸造授权
  const [isApproveMergeValue, setIsApproveMergeValue] = useState(false)
  let [putPrice, setPutPrice] = useState('')
  const [ApproveValue, setApproveValue] = useState('0')
  async function createOrder() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    let owenr = await Contracts.example.ownerOf(web3React.account as string, props.CardInfo.tokenId)
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
    Contracts.example.createOrder(web3React.account as string, props.CardInfo.tokenId, putPrice, contractAddress.Token, contractAddress.NFT).then((res: any) => {
      // addMessage("创建订单成功")
      props.CreateOrderSuccess && props.CreateOrderSuccess()
    }).finally(() => {
      showLoding(false)
    })
  }

  // NFT质押
  const NFTPledgeFun = () => {
    if (web3React.account && props.CardInfo.tokenId) {
      showLoding(true)
      Contracts.example.stake(web3React.account as string, contractAddress.NFT, props.CardInfo.tokenId).then((res: any) => {
        console.log('质押成功');
        props.close()
        props.pledgeSuccessModal()
      }).finally(() => {
        showLoding(false)
      })
    }
  }

  useEffect(() => {
    if (web3React.account && props.isShow) {
      setPutPrice('')
      // 查询挂卖是否授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.EXChangeNFT).then((res: any) => {
        setIsApproved(res)
      })

      // 查询质押授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.Pledge).then((res: any) => {
        setIsApprovePledgeValue(res)
      })

      // 查询合成授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.Merge).then((res: any) => {
        setIsApproveMergeValue(res)
      })

    }
  }, [web3React.account, props.type, props.isShow])

  // 挂卖授权
  function createOrderApproval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断徽章等级 */
    Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.EXChangeNFT, true).then(() => {
      setIsApproved(true)
      addMessage(t('Authorization succeeded'))
    })
  }

  // 质押授权
  function Approval() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.Pledge, true).then(() => {
      setIsApprovePledgeValue(true)
      return addMessage(t('Authorization succeeded'))
    })
  }

  // 合成函数
  function ApproveEvolveFun() {
    if (!isApproveMergeValue) {
      if (!web3React.account) {
        return addMessage(t('Please connect Wallet'))
      }
      Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.Merge, true).then(() => {
        setIsApproveMergeValue(true)
        return addMessage(t('Authorization succeeded'))
      })
    }
  }

  // 铸造函数
  function EvolveFun() {
    if (props.CardInfo.currentPower !== props.CardInfo.basePower) {
      return addMessage(t('Insufficient computing power'))
    }
    if (isApproveMergeValue) {
      props.showMerge && props.showMerge()
    } else {
      ApproveEvolveFun()
    }
  }

  function putNum(e: React.ChangeEvent<HTMLInputElement>) {
    setPutPrice(e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
  }
  return (
    <>
      {
        props.CardInfo && <Modal title="Basic Modal" visible={props.isShow}
          destroyOnClose
          onCancel={() => props.close()}
          className='CardModal'
          centered
          width={'417px'}
          closable={false}
          footer={null}
        >
          <div className='title'>{props.type === "CreateOrder" ? t('Listing details') : t('Card Details')}</div>
          <div className='hzimg'>
            <Image src={props.CardInfo.imageUrl} alt="" preview={{
              maskClassName: 'myMaskStyle'
            }}></Image>
          </div>
          <div className="p1">
            <div className='kpdetails'>{t('Card Name')}:{i18n.language === 'zh' ? props.CardInfo.zhCardName : props.CardInfo.cardName}</div>
            <div className='kpdetails'>{t('CardID')}:{props.CardInfo.cardNo}</div>
          </div>
          <div className="p2">
            <div className='kpdetails'>{t("Computing power")}:{props.CardInfo.currentPower}/{props.CardInfo.basePower}({Math.floor(props.CardInfo.currentPower / props.CardInfo.basePower * 100)}%)</div>
            <div className='kpdetails'>{t('CardLevel')}:{t(level[props.CardInfo.cardLevel])}</div>
          </div>

          <div className='kpdetails'>{t('CardType')}:{t(cardClass[props.CardInfo.cardType])}</div>
          <div className='kpdetails'>{t('Introduction Card')}:{i18n.language === 'zh' ? props.CardInfo.zhIntroduce : props.CardInfo.introduce}</div>

          {
            props.type === "NFT" && <div className='butm'>
              {/* 挂卖授权 */}
              {
                isApproved ? <button className={'hc'}><div onClick={() => { props.showCreateOrder && props.showCreateOrder(props.CardInfo.cardLevel) }}>{t("Sale")}</div></button> :
                  <button className={'gm'}><div onClick={() => createOrderApproval()}>{t("Sale")}</div></button>
              }
              {/* 铸造授权 */}
              {
                // props.CardInfo.cardLevel <= 5 && (isApproveMergeValue ? <button className={'hc'} onClick={() => { props.showMerge && props.showMerge() }}>{t('Evolve')}</button> : <button className={'gm'} onClick={() => { ApproveEvolveFun() }}> <div>{t('Evolve')}</div> </button>)
                props.CardInfo.cardLevel <= 5 && (isApproveMergeValue ? <button className={'hc'} onClick={() => { EvolveFun() }}>{t('Evolve')}</button> : <button className={'gm'} onClick={() => { EvolveFun() }}> <div>{t('Evolve')}</div> </button>)
              }
              {
                isApprovePledgeValue ? <button className='hc' onClick={() => { NFTPledgeFun() }}>{t('Pledge')}</button> : <button className='gm' onClick={() => { Approval() }}> <div>{t('Pledge')}</div></button>
              }
            </div>
          }

          {/* 挂卖 */}
          {
            props.type === "CreateOrder" && <p className='kpdetails'>{t('Please enter price')}:<input type='text' value={putPrice} onChange={putNum} />SBL</p>
          }
          {
            props.type === "CreateOrder" && <div className='butm'>
              {
                isApproved ? <button className='hc' onClick={createOrder}>{t('Verify')}</button> : <button className='hc' onClick={() => createOrderApproval()}>{t('Approve')}</button>
              }
            </div>
          }

          {/* <span>{t('Click anywhere to close')}</span> */}
        </Modal>
      }

    </>
  )
}
export default CardDetails