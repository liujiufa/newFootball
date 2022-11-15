import React from 'react'
import '../assets/style/componentsStyle/Card.scss'
import addIcon from '../assets/image/addIcon.png'
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
function Card(props: any) {
  return (
    <div className="Card" onClick={() => { props.showDetia(props.Index) }}>
      <div className="CardItem">
        <div className="cardId">ID：{props.cardInfo.cardNo}</div>
        <div className="CardImg">
          <img src={props.cardInfo.imageUrl} alt="" />
        </div>
        <div className="computingPower">
          <div className="title">算力</div>
          <div className="value">50/100</div>
        </div>
        <div className="share">
          <div className="shareBox"><div className="shareValue" style={{ width: '50%' }}>66.7%</div></div>
          <div className="addBtn"><img src={addIcon} alt="" /></div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(Card)