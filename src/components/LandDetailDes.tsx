// SBL捐赠规则
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructDes.scss'
import { useTranslation } from 'react-i18next';
import closeIcon from '../assets/image/closeIcon.png'

function DestructDesRule(props: any) {
  let { t } = useTranslation()
  return (
    <>
      <Modal visible={props.showModal}
        className='DestructDesRule'
        centered
        width={'394px'}
        closable={false}
        footer={null}
        onCancel={() => props.close()}
      >
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />

        <p className='title'>昨日分红详情</p>
        <div className='box'>
          <p className='zifujg'>一星土地激活数量：5 ，分红额度：200.1234MBAS
          </p>
          <p className='zifujg'>二星土地激活数量：5 ，分红额度：200.1234MBAS</p>
          <p className='zifujg'>三星土地激活数量：5 ，分红额度：200.1234MBAS</p>
          <p className='zifujg'>四星土地激活数量：5 ，分红额度：200.1234MBAS
          </p>
          <p className='zifujg'>五星土地激活数量：5 ，分红额度：200.1234MBAS</p>

        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
