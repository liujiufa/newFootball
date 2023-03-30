// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmRmLiquidity.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import bigBNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
import bigSBLIcon from '../assets/image/SBLIcon.png'
import tipIcon from '../assets/image/tipIcon.png'
import { useTranslation } from 'react-i18next';
import { NumSplic } from '../utils/tool';
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
                    <div className="coinsValue">{NumSplic(props.data.currencyPair, 6)} BNB-MBAS</div>
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
                    <div className="value"><img src={BNBIcon} alt="" />{NumSplic(props.data.hostAmount, 4)}</div>
                </div>
                <div className="box">
                    <div className="itemTitle">MBAS</div>
                    <div className="value"><img src={SBLIcon} alt="" />{NumSplic(props.data.tokenAmount, 4)}</div>
                </div>
                <div className="subtip">{t("Removal of LP may cause the land to become invalid and affect your equity income")}</div>

                <div className="toRemoveBtn flex" onClick={() => { props.rmFun() }}>{t("Confirm removal")}</div>

                {/* <span>{t("clickLeave")}</span> */}
            </Modal>
        </>
    )
}
export default ConfirmRmLiquidity
