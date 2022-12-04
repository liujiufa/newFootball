// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/SuccessRmLiquidity.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLTokens.png'
import { useTranslation } from 'react-i18next';
function SuccessRmLiquidity(props: any) {
    const { t } = useTranslation()
    return (
        <>
            <Modal visible={props.showModal}
                className='SuccessRmLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>{t("Removed successfully")}</p>

                <div className="tip">{t("Liquidity successfully removed")}！</div>

                <div className="confirmBtn flex" onClick={() => { props.close() }}>{t("Confirm")}</div>

                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default SuccessRmLiquidity
