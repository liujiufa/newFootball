// NTF徽章合成规则
import React from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRecord.scss'
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
        className='CardComRecord'
        onCancel={() => props.close()}
        centered
        width={'1000px'}
        closable={false}
        footer={null}
      >
        <div className='title'>恭喜！</div>
        <div className="content">
          <div className="items titleItems">
            <div className="item">日期</div>
            <div className="item">徽章1类型</div>
            <div className="item">价值(BNB)</div>
            <div className="item">徽章2类型</div>
            <div className="item">价值(BNB)</div>
            <div className="item">合成</div>
            <div className="item">价值(BNB)</div>
            <div className="item">土地赠送</div>
          </div>
          <div className="items contentItems">
            <div className="item">2022/05/06</div>
            <div className="item">
              五星-火精灵
              <div className="ID">ID:123456</div>
            </div>
            <div className="item">1.456987</div>
            <div className="item">
              五星-土精灵
              <div className="ID">ID:123456</div>
            </div>
            <div className="item">1.456987</div>
            <div className="item">
              六星-火精灵
              <div className="ID">ID:123456</div>
            </div>
            <div className="item">1.456987</div>
            <div className="item">
              绿茵之地
              <div className="ID">ID:123456</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default CardComSuccess
