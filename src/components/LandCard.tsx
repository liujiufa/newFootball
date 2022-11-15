import React from 'react'
import '../assets/style/componentsStyle/LandCard.scss'
import landImg from '../assets/image/landImg.png'
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
}
interface CardPropsType {
  showDetia: Function,
  cardInfo: CardInfoType,
  Index: number,
}
function LandCard() {
  return (
    <div className="CardItemLinearBorder">
      <div className="CardItem">
        <div className="CardImg">
          <img src={landImg} alt="" />
        </div>
        <div className="cardId">ID：456978</div>
      </div>
    </div>
  )
}
export default React.memo(LandCard)