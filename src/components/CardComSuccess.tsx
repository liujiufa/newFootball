// NTF徽章合成规则
import React from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRule.scss'
import defaultCard from '../assets/image/defaultCard.png'
interface PropsType {
  isShow: boolean,
  close: Function
}
function CardComSuccess(props: PropsType) {
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
        <p className='title'>恭喜！</p>
        <div className='box'>
          <div className="ImgBox">
            <div className="leftBox">
              <div className="subTitle">徽章</div>
              <img src={defaultCard} alt="" />
              <div className="valueBox">
                五星-火精靈！
                <div className="value">
                  价值：1.342531 BNB
                </div>
              </div>
            </div>
            <div className="rightBox">
              <div className="subTitle">土地</div>
              <img src={defaultCard} alt="" />
              <div className="valueBox">
                綠茵之地
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default CardComSuccess
