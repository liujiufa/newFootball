// 交易场徽章详情
import React from 'react';
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd';
import { orderInfoType } from '../view/Swap'
import { Image } from 'antd'
import '../assets/style/componentsStyle/PutParticulars.scss'

interface PropsType {
  isShow: boolean,
  close: Function,
  OrderInfo: orderInfoType
}
const cardClass = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
function PutParticulars(props: PropsType) {
  let { t, i18n } = useTranslation()
  return (
    <>
      {/* <div className='box'>11111</div> */}
      <Modal title="Basic Modal" visible={props.isShow}
        className='PutParticulars'
        onCancel={() => props.close()}
        centered
        width={'449px'}
        closable={false}
        footer={null}
      >
        <p className='title'>{t('Card Details')}</p>
        <div className='hzimg'>
          <Image src={props.OrderInfo.image}></Image>
        </div>
        <div className="p1">
          <p className='kpdetails'>{t('Card Name')}:{i18n.language === 'zh' ? props.OrderInfo.zhCardName : props.OrderInfo.cardName}</p>
          <p className='kpdetails'>{t('CardID')}:{props.OrderInfo.cardNo}</p>
        </div>
        <div className="p2">
          <p className='kpdetails'>{t("Computing power")}:{props.OrderInfo.currentPower}/{props.OrderInfo.basePower}({Math.floor(props.OrderInfo.currentPower / props.OrderInfo.basePower * 100)})%</p>
          <p className='kpdetails'>{t('CardLevel')}:{t(level[props.OrderInfo.cardLevel])}</p>
        </div>
        <p className='kpdetails'>{t('CardType')}:{t(cardClass[props.OrderInfo.cardType])}</p>
        <p className='kpdetails'>{t('Introduction Card')}:{i18n.language === 'zh' ? props.OrderInfo.zhIntroduce : props.OrderInfo.introduce}</p>
        <span>{t('Click anywhere to close')}</span>
      </Modal>
    </>
  )
}
export default PutParticulars