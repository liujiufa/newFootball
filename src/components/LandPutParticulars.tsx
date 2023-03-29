// 交易场精灵详情
import React from 'react';
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd';
import { orderInfoType } from '../view/Swap'
import { Image } from 'antd'
import '../assets/style/componentsStyle/PutParticulars.scss'
import { landLevel, starLevel } from '../config'
interface PropsType {
  isShow: boolean,
  close: Function,
  OrderInfo: orderInfoType
  userLevel: number
}

function PutParticulars(props: PropsType) {
  let { t, i18n } = useTranslation()
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const cardObj = {
    0: '',
    1: [t('Excellent'), t('add LP with value of 0.4 BNB'), t('LandServiceIncome1'), t('LandDividend')],
    2: [t('Rare'), t('add LP with value of 1 BNB'), t('LandServiceIncome2'), t('LandDividend')],
    3: [t('Good'), t('add LP with value of 2 BNB'), t('LandServiceIncome3'), t('LandDividend')],
    4: [t('Epic'), t('add LP with value of 5 BNB'), t('LandServiceIncome4'), t('LandDividend')],
    5: [t('Legend'), t('add LP with value of 16 BNB'), t('LandServiceIncome5'), t('LandDividend')]
  }

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
        <div className='title'>{t("Land details")}</div>
        <div className='hzimg'>
          <Image src={props.OrderInfo.image}></Image>
        </div>
        <div className="p1">
          <div className='kpdetails'>{t("Land quality")}: {t(landLevel[props.OrderInfo.cardLevel])}</div>
          <div className='kpdetails'>ID：{props.OrderInfo.cardNo}</div>
        </div>
        <div className="p2">
          <div className='kpdetails'>{t("Land title")}：{LevelObj[props.userLevel]}</div>
          <div className='kpdetails'>{t("Level")}：{starLevel[props.OrderInfo.cardLevel]}</div>
        </div>

        <div className='kpdetails'>{t("Activation requirement")}：{cardObj[props.OrderInfo.cardLevel][1]}</div>
        <div className='kpdetails'>{t("land introduction")}：{cardObj[props.OrderInfo.cardLevel][2]}</div>
      </Modal>
    </>
  )
}
export default PutParticulars