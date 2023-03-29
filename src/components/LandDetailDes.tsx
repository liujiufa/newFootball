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

        <p className='title'>{t("DesTitle")}</p>
        <div className='box'>
          <p className='zifujg'>{t("DesItem1")}
          </p>
          <p className='zifujg'>{t("DesItem2")}</p>
          <p className='zifujg'>{t("DesItem3")}</p>
          <p className='zifujg'>{t("DesItem4")}
          </p>
          <p className='zifujg'>{t("DesItem5")}</p>

        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
