// SBL捐赠规则
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructDes.scss'
import { useTranslation } from 'react-i18next';

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

        <p className='title'>{t("Land Detail")}</p>
        <div className='box'>
          <p className='zifujg'>{t("LandDetailTip1")}</p>
          <p className='zifujg'>{t("LandDetailTip2")}</p>
          <p className='zifujg'>{t("LandDetailTip3")}</p>
          <p className='zifujg'>{t("LandDetailTip4")}</p>
          <p className='zifujg'>{t("LandDetailTip5")}</p>

        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
