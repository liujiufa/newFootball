// NTF精灵合成规则
import React from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRule.scss'
import { nftLevel, nftType, landLevel } from '../config'
interface PropsType {
  isShow: boolean,
  close: Function
}

function CardComSuccess(props: any) {
  console.log(props.data, '合成成功数据');

  let { t } = useTranslation()
  return (
    <>
      <Modal visible={props.isShow}
        className='CardComRule'
        onCancel={() => props.close()}
        centered
        width={'593px'}
        closable={false}
        footer={null}
      >
        <p className='title'>{t("Congratulations")}！</p>
        <div className='box'>
          <div className="ImgBox">
            <div className="leftBox">
              <div className="subTitle1">{t("Card")}</div>
              <img src={props.data.imageUrl} alt="" />
              <div className="valueBox">
                {t(nftLevel[props.data.cardLevel])}-{t(nftType[props.data.cardType])}！
                <div className="value">
                  {t("Value")}：{props.data.currentInitValue} BNB
                </div>
              </div>
            </div>
            <div className="rightBox">
              <div className="subTitle1">{t("Land")}</div>
              <img src={props.data.landImgUrl} alt="" />
              <div className="valueBox">
                {t(landLevel[props.data.landLevel])}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default CardComSuccess
