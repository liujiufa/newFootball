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
        <br />
        <br />
        <p className='SwapSuccessTitle'>{t("Exchange MBA success!")}</p>
        <br />
        <br />
        <span>{t("clickLeave")}</span>
      </Modal>
    </>
  )
}
export default DestructSucceed
