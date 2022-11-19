import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBL.svg'
import '../assets/style/componentsStyle/CardItem.scss'
import { orderInfoType } from '../view/Swap'
import { contractAddress } from '../config';
import { useWeb3React } from '@web3-react/core'
import { Contracts } from '../web3'
import { addMessage, showLoding } from '../utils/tool'
import BigNumber from 'big.js'
interface CardInfo {
  orderInfo: orderInfoType
  type: string
  showCardDetail: Function,
  buy?: Function,
  CancelOrder?: Function
}
function CardItem(props: CardInfo) {
  let { t } = useTranslation()
  const web3React = useWeb3React()

  // SBL授权
  const [ApproveValue, setApproveValue] = useState('0')
  // 授权
  function ApproveFun() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    showLoding(true)
    Contracts.example.approve1(web3React.account as string, contractAddress.EXChangeNFT, `${props.orderInfo.price}`).then(() => {
      Contracts.example.Tokenapprove(web3React.account as string, contractAddress.EXChangeNFT).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
      }).finally(() => {
        showLoding(false)
      })
    })
  }

  useEffect(() => {
    // 查询授权
    Contracts.example.Tokenapprove(web3React.account as string, contractAddress.EXChangeNFT).then((res: any) => {
      setApproveValue(new BigNumber(res).div(10 ** 18).toString())
    })
  }, [web3React.account])
  return (
    <div className="CardItemLinearBorder">
      <div className="CardItem">
        <div className="CardImg" onClick={() => props.showCardDetail()}>
          {props.type === "goods" && <div className="pending">{t('Pending order')}</div>}
          <img src={props.orderInfo?.image} alt="" />
        </div>
        {
          props.type === "commodity" && <>
            <div className="price">
              <div className="computingPower">
                <div className="title">算力</div>
                <div className="shareBox"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower*100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower*100)}%</div></div>
                <div className="value">{props.orderInfo?.currentPower}/{props.orderInfo?.basePower}</div>
              </div>
              <div className="box">
                <div className="priceFlex">
                  <span>{t('price')}:{props.orderInfo?.price} </span>
                  <span>{props.orderInfo?.coinName}</span>
                </div>
                <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />
              </div>
            </div>
          </>
        }
        {
          props.type === "goods" && <>
            <div className="price">
              <div className="computingPower">
                <div className="title">算力</div>
                <div className="shareBox"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower*100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower*100)}%</div></div>
                <div className="value">{props.orderInfo?.currentPower}/{props.orderInfo?.basePower}</div>
              </div>
              <div className="box">
                <div className="priceFlex">
                  <span>{t('price')}:{props.orderInfo?.price} </span>
                  <span>{props.orderInfo?.coinName}</span>
                </div>
                <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />
              </div>
            </div>
          </>
        }
      </div>
      {/* ！：调用函数时忽略 undefined 类型 */}
      {
        props.type === "goods" ? <div className="buyBtn linear-gradient" onClick={() => props.CancelOrder!()}>{t('Cancel')}</div>
          : (parseFloat(ApproveValue) > 0 ? <div className="buyBtn linear-gradient" onClick={() => { props.buy!() }}>{t('buy')}</div> : <div className="buyBtn linear-gradient" onClick={() => { ApproveFun() }}>授权</div>)
      }
    </div >
  )
}
export default React.memo(CardItem)