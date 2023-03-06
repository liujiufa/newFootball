// SBL捐赠规则
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructDes.scss'
import { useTranslation } from 'react-i18next';

function DestructDesRule(props: any) {
  const { t } = useTranslation()
  return (
    <>
      <Modal visible={props.showModal}
        className='DestructDesRule'
        centered
        width={'446px'}
        closable={false}
        footer={null}
        onCancel={() => props.close()}
      >

        <p className='title'>{t("Burn rule")}</p>
        <div className='box'>
          <p className='zifujg'>{t("BurnRule1")}</p>
          <p className='zifujg'>{t("BurnRule2")}</p>
          <p className='zifujg'>{t("BurnRule3")}</p>
        </div>
        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
