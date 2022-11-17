import { useTranslation } from 'react-i18next'
import React from 'react'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBL.svg'
import '../assets/style/componentsStyle/CardItem.scss'
import { orderInfoType } from '../view/Swap'
interface CardInfo {
  orderInfo: orderInfoType
  type: string
  showCardDetail: Function,
  buy?: Function,
  CancelOrder?: Function
}
function CardItem(props: CardInfo) {
  let { t } = useTranslation()
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
                <div className="shareBox"><div className="shareValue" style={{ width: `${props.orderInfo?.basePower / props.orderInfo?.currentPower * 100}%` }}>{props.orderInfo?.basePower / props.orderInfo?.currentPower}%</div></div>
                <div className="value">{props.orderInfo?.basePower}/{props.orderInfo?.currentPower}</div>
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
                <div className="shareBox"><div className="shareValue" style={{ width: `${props.orderInfo?.basePower / props.orderInfo?.currentPower * 100}%` }}>{props.orderInfo?.basePower / props.orderInfo?.currentPower}%</div></div>
                <div className="value">{props.orderInfo?.basePower}/{props.orderInfo?.currentPower}</div>
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
          : <div className="buyBtn linear-gradient" onClick={() => { props.buy!() }}>{t('buy')}</div>
      }
    </div >
  )
}
export default React.memo(CardItem)