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
import { useViewport } from '../components/viewportContext'
interface CardInfo {
  orderInfo: orderInfoType
  type: string
  showCardDetail: Function,
  buy?: Function,
  CancelOrder?: Function,
  approveFun?: Function
  ApproveValue?: string
}
function CardItem(props: CardInfo) {
  let { t } = useTranslation()
  const web3React = useWeb3React()
  const { width } = useViewport()
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
    }).finally(() => {
      showLoding(false)
    })
  }
  // 转账
  // function transferFun() {
  //   if (!web3React.account) {
  //     return addMessage(t('Please connect Wallet'))
  //   }
  //   showLoding(true)
  //   Contracts.example.approve1(web3React.account as string, contractAddress.EXChangeNFT, `${props.orderInfo.price}`).then(() => {
  //     Contracts.example.Tokenapprove(web3React.account as string, contractAddress.EXChangeNFT).then((res: any) => {
  //       setApproveValue(new BigNumber(res).div(10 ** 18).toString())
  //     }).finally(() => {
  //       showLoding(false)
  //     })
  //   })
  // }

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
        {/* 所有列表 */}
        {
          props.type === "commodity" && <>
            <div className="price">
              {
                props.orderInfo?.cardType !== 5 ? <div>
                  <div className="computingPower">
                    <div className="title">{t("ComputingPower")}</div>
                    {width >= 1024 && <div className="shareBox"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100 * 100) / 100}%</div></div>}
                    {/* <div className="value">{props.orderInfo?.currentPower}/{props.orderInfo?.basePower}</div> */}
                    <div className="value">{props.orderInfo?.currentPower}</div>
                  </div>
                  {!(width >= 1024) && <div className="shareBox1"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100 * 100) / 100}%</div></div>}
                </div> : <div>

                </div>
              }
              <div className="box">
                <div className="priceFlex">
                  <span>{t('price')}:{props.orderInfo?.price} </span>
                  <span>{props.orderInfo?.coinName}</span>
                </div>
                {width > 425 && <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />}
              </div>
            </div>
          </>
        }
        {/* 我的列表 */}
        {
          props.type === "goods" && <>
            <div className="price">
              {props.orderInfo?.cardType !== 5 ? <div><div className="computingPower">
                <div className="title">{t("ComputingPower")}</div>
                {width >= 1024 && <div className="shareBox"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100 * 100) / 100}%</div></div>}
                <div className="value">{props.orderInfo?.currentPower}</div>
              </div>
                {!(width >= 1024) && <div className="shareBox1"><div className="shareValue" style={{ width: `${Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100)}%` }}>{Math.floor(props.orderInfo?.currentPower / props.orderInfo?.basePower * 100 * 100) / 100}%</div></div>}
              </div>
                : <div>
                </div>}
              <div className="box">
                <div className="priceFlex">
                  <span>{t('price')}:{props.orderInfo?.price} </span>
                  <span>{props.orderInfo?.coinName}</span>
                </div>
                {width > 425 && <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />}
              </div>
            </div>
          </>
        }
      </div>
      {/* ！：调用函数时忽略 undefined 类型 */}
      {
        props.type === "goods" ? <div className="buyBtn linear-gradient" onClick={() => props.CancelOrder!()}>{t('Cancel')}</div>
          : (parseFloat(props.ApproveValue as string) > props.orderInfo.price ? <div className="buyBtn linear-gradient" onClick={() => { props.buy!() }}>{t('buy')}</div> : <div className="buyBtn linear-gradient" onClick={() => { props.approveFun!(props.orderInfo.price) }}>{t("Approve")}</div>)
        // : <div className="buyBtn linear-gradient" onClick={() => { props.buy!() }}>{t('buy')}</div>
      }
    </div >
  )
}
export default React.memo(CardItem)