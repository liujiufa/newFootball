import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
import valueIcon from '../assets/image/valueIcon.svg'
import '../assets/style/componentsStyle/CardItem.scss'
import { orderInfoType } from '../view/Swap'
import BigNumber from 'big.js'
import { useViewport } from '../components/viewportContext'
function CardItem(props: any) {
  let { t } = useTranslation()
  const { width } = useViewport()
  return (
    <div className="CardItemLinearBorder">
      <div className="CardItem">
        <div className="valueBox">
          <div className="title">價值<div className='iconBox'><img src={valueIcon} alt="" /></div></div>
          <div className="valuePrice">{props.orderInfo?.currentInitValue} BNB</div>
        </div>
        <div className="CardImg" onClick={() => props.showCardDetail()}>
          {props.type === "goods" && <div className="pending">{t('Pending order')}</div>}
          <img src={props.orderInfo?.image} alt="" />
        </div>
        {/* 所有列表 */}
        {
          props.type === "commodity" && <>
            <div className="price">
              <div className="box">
                {width > 425 && <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />}
                <div className="priceFlex">
                  <div>{props.orderInfo?.price} {props.orderInfo?.coinName}</div>
                </div>
              </div>
            </div>
          </>
        }
        {/* 我的列表 */}
        {
          props.type === "goods" && <>
            <div className="price">
              <div className="box">
                {width > 425 && <img className="coinName" src={props.orderInfo?.coinName === 'SBL' ? SBLIcon : BNBIcon} alt="" />}
                <div className="priceFlex">
                  <div>{props.orderInfo?.price} {props.orderInfo?.coinName}</div>
                </div>
              </div>
            </div>
          </>
        }
        {
          props.type === "goods" ? <div className="buyBtn" onClick={() => props.CancelOrder!()}>{t('Cancel')}</div>
            : (parseFloat(props.ApproveValue as string) > props.orderInfo.price ? <div className="buyBtn" onClick={() => { props.buy!() }}>{t('buy')}</div> : <div className="buyBtn" onClick={() => { props.approveFun!(props.orderInfo.price) }}>{t("Approve")}</div>)
        }
      </div>
    </div >
  )
}
export default React.memo(CardItem)