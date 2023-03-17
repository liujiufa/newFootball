// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
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
                <br />
                <br />
                <div className='title'>{t("Successfully cancel the pledge")}!</div>
                <br />
                <br />
                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default ClaimSuccess
