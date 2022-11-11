// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmAddLiquidity.scss'
import BNBIcon from '../assets/image/BNB.png'
import SBLIcon from '../assets/image/SBL.png'
import tipIcon from '../assets/image/tipIcon.png'
function ConfirmAddLiquidity(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ConfirmAddLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
            >
                <p className='title'>添加流動性</p>

                <div className="box">
                    <div className="subTitle">入金 BNB</div>
                    <div className="value"><img src={BNBIcon} alt="" />1</div>
                </div>
                <div className="box">
                    <div className="subTitle">入金 SBL</div>
                    <div className="value"><img src={SBLIcon} alt="" />128.7894</div>
                </div>
                <div className="box">
                    <div className="subTitle">匯率</div>
                    <div className="radioValue">
                        <div className="radio">1 SBL = 0.0002 BNB </div>
                        <div className="radio">1 BNB = 123.0000 SBL</div>
                    </div>
                </div>
                <div className="tip">
                    <img src={tipIcon} alt="" />
                    匯率根據SWAP實時價格預估
                </div>

                {true ? <div className="toSupplyBtn flex">確認供應</div> : <div className="supplyBtn flex">供應</div>}

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ConfirmAddLiquidity
