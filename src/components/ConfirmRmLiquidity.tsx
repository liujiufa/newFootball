// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmRmLiquidity.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import bigBNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBL.png'
import bigSBLIcon from '../assets/image/SBLTokens.png'
import tipIcon from '../assets/image/tipIcon.png'
import { useTranslation } from 'react-i18next';
function ConfirmRmLiquidity(props: any) {
    const { t } = useTranslation()
    return (
        <>
            <Modal visible={props.showModal}
                className='ConfirmRmLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>{t("Remove liquidity")}</p>
                <div className="coinBox">
                    <div className="coinsValue">{props.data.currencyPair} BNB</div>
                    <div className="coinsIcon">
                        <img className='img1' src={bigSBLIcon} alt="" />
                        <img className='img2' src={bigBNBIcon} alt="" />
                    </div>
                </div>
                <div className="tip">
                    {t("After withdrawing liquidity, you may lose eligibility for rewards")}
                </div>
                <div className="subTitle">{t("You will get")}：</div>
                <div className="box">
                    <div className="itemTitle">BNB</div>
                    <div className="value"><img src={BNBIcon} alt="" />{props.data.hostAmount}</div>
                </div>
                <div className="box">
                    <div className="itemTitle">SBL</div>
                    <div className="value"><img src={SBLIcon} alt="" />{props.data.tokenAmount}</div>
                </div>

                <div className="toRemoveBtn flex" onClick={() => { props.rmFun() }}>{t("Confirm removal")}</div>

                {/* <span>{t("clickLeave")}</span> */}
            </Modal>
        </>
    )
}
export default ConfirmRmLiquidity
