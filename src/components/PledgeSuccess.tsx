// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLTokens.png'
import { useTranslation } from 'react-i18next';
function ClaimSuccess(props: any) {
    let { t } = useTranslation()
    const navigate = useNavigate()
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
                <p className='title'>{t("Pledge successful")}!</p>
                <div className="tip">{t("Jump to my pledge")}</div>
                <div className="confirmBtn flex" onClick={() => { navigate('/Pledge') }}>{t("Confirm")}</div>
                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default ClaimSuccess
