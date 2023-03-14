import React from 'react'
import '../assets/style/componentsStyle/Card.scss'
import addIcon from '../assets/image/addIcon.png'
import { useTranslation } from 'react-i18next'
import valueIcon from '../assets/image/valueIcon.svg'
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
  tokenId: string
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
        <div className="valueBox">
          <div className="title">價值<div className='iconBox'><img src={valueIcon} alt="" /></div></div>
          <div className="valuePrice">2.542531 BNB</div>
        </div>
        <div className="CardImg" onClick={() => { props.showDetia(props.Index) }}>
          <img src={props.cardInfo.imageUrl} alt="" />
        </div>
        <div className="ID">ID:  {props.cardInfo.cardNo}</div>
      </div>
    </div >
  )
}
export default React.memo(Card)