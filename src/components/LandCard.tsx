import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/style/componentsStyle/LandCard.scss'
import cardBgImg from '../assets/image/cardBgImg.png'
import cardBgImgEN from '../assets/image/cardBgImgEN.png'
import { useTranslation } from 'react-i18next'
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
  tokenId: string,
  isActivation: number
}
interface LandUserCardPropsType {
  showDetail: Function,
  cardInfo: LandUserCard,
  Index: number,
  userLevel: number
}
function LandCard(props: LandUserCardPropsType) {
  let { t, i18n } = useTranslation()
  const cardObj = {
    0: '',
    1: [t('Excellent'), t('add LP with value of 0.4 BNB'), t('LandServiceIncome1'), t('LandDividend')],
    2: [t('Rare'), t('add LP with value of 1 BNB'), t('LandServiceIncome2'), t('LandDividend')],
    3: [t('Good'), t('add LP with value of 2 BNB'), t('LandServiceIncome3'), t('LandDividend')],
    4: [t('Epic'), t('add LP with value of 5 BNB'), t('LandServiceIncome4'), t('LandDividend')],
    5: [t('Legend'), t('add LP with value of 16 BNB'), t('LandServiceIncome5'), t('LandDividend')]
  }
  // console.log(props.cardInfo, props.userLevel, '激活');


  return (
    <div className="CardItemLinearBorder" >
      <div className="CardItem">
        <div className="ID">ID:{props.cardInfo.cardNo}</div>
        <div className="CardImg" onClick={() => { props.showDetail(props.Index) }}>
          {props.cardInfo.isActivation == 0 && <div className="cardBg"></div>}
          <img src={props.cardInfo.imageUrl} alt="" />
        </div>

      </div>
    </div >
  )
}
export default React.memo(LandCard)