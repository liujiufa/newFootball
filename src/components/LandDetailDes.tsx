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
          <p className='zifujg'>1.激活地球領土，可獲得地球領主稱號；</p>
          <p className='zifujg'>2.激活行星領土，可獲得行星領主稱號；</p>
          <p className='zifujg'>3.激活銀河領土，可獲得銀河領主稱號；</p>
          <p className='zifujg'>4.激活星際領土，可獲得星際領主稱號；</p>
          <p className='zifujg'>5.激活宇宙領土，可獲得宇宙領主稱號。</p>

        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
