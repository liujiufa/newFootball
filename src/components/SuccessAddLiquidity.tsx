// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import { getBit } from '../utils/tool';
import '../assets/style/componentsStyle/SuccessAddLiquidity.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
import { useTranslation } from 'react-i18next';
function SuccessAddLiquidity(props: any) {
    const { t } = useTranslation()
    return (
        <>
            <Modal visible={props.showModal}
                className='SuccessAddLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>{t("Successfully added liquidity")}</p>

                <div className="subTitle1">{t("You have obtained")}</div>
                <div className="coinValueBox">{getBit(props.data, 4)} <div className='coinsBox'><img className='img1' src={SBLIcon} alt="" /><img className='img2' src={BNBIcon} alt="" /></div></div>
                <div className="subTokens">SBL/BNB</div>

                {/* <div className="toSupplyBtn flex" onClick={() => { props.close() }}>{t("Confirm supply")}</div> */}

                {/* <span>{t("clickLeave")}</span> */}
            </Modal>
        </>
    )
}
export default SuccessAddLiquidity
