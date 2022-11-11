// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmRmLiquidity.scss'
import BNBIcon from '../assets/image/BNB.png'
import bigBNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBL.png'
import bigSBLIcon from '../assets/image/SBLTokens.png'
import tipIcon from '../assets/image/tipIcon.png'
function ConfirmRmLiquidity(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ConfirmRmLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
            >
                <p className='title'>移除流動性</p>
                <div className="coinBox">
                    <div className="coinsValue">1 BNB</div>
                    <div className="coinsIcon">
                        <img className='img1' src={bigSBLIcon} alt="" />
                        <img className='img2' src={bigBNBIcon} alt="" />
                    </div>
                </div>
                <div className="tip">
                    移除流動性後，您將可能失去獲得獎勵資格
                </div>
                <div className="subTitle">您將獲得：</div>
                <div className="box">
                    <div className="itemTitle">BNB</div>
                    <div className="value"><img src={BNBIcon} alt="" />128.7894</div>
                </div>
                <div className="box">
                    <div className="itemTitle">SBL</div>
                    <div className="value"><img src={SBLIcon} alt="" />128.7894</div>
                </div>

                <div className="toRemoveBtn flex">確認移除</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ConfirmRmLiquidity
