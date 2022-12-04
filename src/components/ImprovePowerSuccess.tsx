// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLTokens.png'
import { useTranslation } from 'react-i18next';
function ClaimSuccess(props: any) {
    let { t } = useTranslation()
    return (
        <>
            <Modal visible={props.showModal}
                className='ClaimSuccess'
                centered
                width={'418px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>{t("Successfully increase computing power")}</p>
                <div className="confirmBtn flex" onClick={() => { props.close() }}>{t("Confirm")}</div>

                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default ClaimSuccess
