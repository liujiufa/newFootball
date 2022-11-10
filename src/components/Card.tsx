import React from 'react'
import '../assets/style/componentsStyle/CardItem.scss'
export interface CardInfoType{
  id:number,
  imageUrl:string,
  introduce:string,
  zhIntroduce:string,
  cardName:string,
  zhCardName:string,
  cardNo:string,
  cardType:number,
  cardLevel:number,
  tokenId:string
}
interface CardPropsType{
    showDetia:Function,
    cardInfo:CardInfoType,
    Index:number,
}
function Card(props:CardPropsType) {
  return (
    <div className="CardItemLinearBorder" onClick={()=>{props.showDetia(props.Index)}}>
        <div className="CardItem">
            <div className="CardImg">
              <img src={props.cardInfo.imageUrl} alt="" />
            </div>
            <div className="cardId">ID：{props.cardInfo.cardNo}</div>
        </div>
    </div>
  )
}
export default React.memo(Card)