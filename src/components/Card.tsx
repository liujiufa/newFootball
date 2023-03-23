import React from 'react'
import '../assets/style/componentsStyle/Card.scss'
import { useTranslation } from 'react-i18next'
import { ValueBox } from '../App'
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


function Card(props: any) {
  console.log(props.cardInfo, '11111111');
  let { t } = useTranslation()
  const fun = () => {
    if (props.tag === "NFT") {
      props.fun(props.Index)
    } else {
      props.fun()
    }
  }
  return (
    <div className="Card">
      <div className={props?.selectedCard?.cardNo === props.cardInfo.cardNo ? "CardItem selectCardItem" : "CardItem "}>
        {ValueBox(props.cardInfo.currentInitValue)}
        <div className="CardImg" onClick={() => { fun() }}>
          <img src={props.cardInfo.imageUrl} alt="" />
        </div>
        <div className="ID">ID: {props.cardInfo.cardNo}</div>
      </div>
    </div >
  )
}
export default React.memo(Card)