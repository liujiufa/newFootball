// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructSucceed.scss'
import { useTranslation } from 'react-i18next';

function DestructSucceed(props: any) {
  let { t } = useTranslation()
  return (
    <>
      <Modal visible={props.showModal}
        className='DestructSucceed'
        centered
        width={'446px'}
        closable={false}
        footer={null}
        onCancel={() => { props.close() }}
      >

        <p className='title'>{t("Congratulations, the burn was successful!")}</p>
        <div className='box'>
          <p className='zifujg'>{t("28,800 blocks are required to burn again.")}</p>
        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructSucceed
