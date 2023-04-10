// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
import closeIcon from '../assets/image/closeIcon.png'

import { NumSplic } from '../utils/tool';
import { useTranslation } from 'react-i18next';
function AbleGetReward(props: any) {
    let { t } = useTranslation()
    return (
        <>
            <Modal visible={props.showModal}
                className='AbleGetReward'
                centered
                width={'418px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />
                <p className='title'>{t("Receivable amount")}</p>
                <div className="valueBox flex">{NumSplic(props.data, 8)} MBAS </div>
                <div className="confirmBtn flex" onClick={() => { props.getFun(3, props.dataId, props.data) }}>{t("Confirm")}</div>
                {/* <span>{t("clickLeave")}</span> */}
            </Modal>
        </>
    )
}
export default AbleGetReward
