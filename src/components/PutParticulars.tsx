// 交易场精灵详情
import React from 'react';
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd';
import { orderInfoType } from '../view/Swap'
import { Image } from 'antd'
import { nftType, nftLevel, starLevel } from '../config'

import '../assets/style/componentsStyle/PutParticulars.scss'

function PutParticulars(props: any) {
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
        <div className='title'>{t('Card Details')}</div>
        <div className='hzimg'>
          <Image src={props.OrderInfo.image}></Image>
        </div>
        <div className="p1">
          <div className='kpdetails'>{t('Card Name')}:{t(nftLevel[props.OrderInfo.cardLevel])}</div>
          <div className='kpdetails'>{t('CardID')}:{props.OrderInfo.cardNo}</div>
        </div>
        <div className="p2">
          <div className='kpdetails'>{t("Computing power")}:{props.OrderInfo.power}</div>
          <div className='kpdetails'>{t('CardLevel')}:{t(starLevel[props.OrderInfo.cardLevel])}</div>
        </div>
        <div className="p2">
          <div className='kpdetails'>{t('CardType')}:{t(nftType[props.OrderInfo.cardType])}</div>
          <div className='kpdetails'>{t('Value')}：{props.OrderInfo.currentInitValue} BNB</div>
        </div>
        <div className='kpdetails'>{t('Introduction Card')}:{i18n.language === 'zh' ? props.OrderInfo.zhIntroduce : props.OrderInfo.introduce}</div>
      </Modal>
    </>
  )
}
export default PutParticulars