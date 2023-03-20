import React from 'react'
import '../assets/style/componentsStyle/Card.scss'
import addIcon from '../assets/image/addIcon.png'
import valueIcon from '../assets/image/valueIcon.svg'
import { useTranslation } from 'react-i18next'
export interface CardInfoType {
  id: number,
  imageUrl: string,
  introduce: string,
  zhIntroduce: string,
  cardName: string,
  zhCardName: string,
  cardNo: string,
  cardType: number,
  cardLevel: number,
  tokenId: string,
  currentPower: number,
  basePower: number
}
interface CardPropsType {
  showDetia: Function,
  cardInfo: CardInfoType,
  Index: number,
}
function Card(props: any) {
  let { t } = useTranslation()
  return (
    <div className="Card">
      <div className="CardItem">
        {props.tag === "Pledge" ? <div className="valueBox">
          <div className="title">價值<div className='iconBox'><img src={valueIcon} alt="" /></div></div>
          <div className="valuePrice">{props.cardInfo.currentInitValue} BNB</div>
        </div> : <div className="burnID">ID:  {props.cardInfo.cardNo}</div>}
        <div className="CardImg" onClick={() => { props.detail() }}>
          <img className={props.tag === "Pledge" ? '' : "imgfilter"} src={props.cardInfo.imageUrl} alt="" />
        </div>
        {props.tag === "Pledge" && <div className="ID">ID:  {props.cardInfo.cardNo}</div>}
        {props.tag === "Pledge" && <div className="cancelBtn flex" onClick={() => { props.cancelFun(props.cardInfo.tokenId) }}>{t("Cancel stake")}</div>}
      </div>
    </div >
  )
}
export default React.memo(Card)