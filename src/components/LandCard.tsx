import React from 'react'
import '../assets/style/componentsStyle/LandCard.scss'
import landImg from '../assets/image/landImg.png'
export interface LandUserCard {
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
interface LandUserCardPropsType {
  showDetail: Function,
  cardInfo: LandUserCard,
  Index: number,
}
function LandCard(props: LandUserCardPropsType) {
  return (
    <div className="CardItemLinearBorder" onClick={() => { props.showDetail(props.Index) }}>
      <div className="CardItem">
        <div className="CardImg">
          <img src={props.cardInfo.imageUrl} alt="" />
        </div>
        <div className="cardId">ID：{props.cardInfo.cardNo}</div>
      </div>
    </div>
  )
}
export default React.memo(LandCard)