// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/AddLiquidityModal.scss'
import BNBIcon from '../assets/image/BNB.png'
import addIcon from '../assets/image/addIcon.png'
import SBLIcon from '../assets/image/SBL.png'
function AddLiquidityModal(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='AddLiquidityModal'
                centered
                width={'528px'}
                closable={false}
                footer={null}
            >
                <p className='title'>添加流動性</p>
                <div className='topBox Box'>
                    <div className="balanceBox">
                        <div className="balance">餘額：1,457.485</div>
                        <div className="rightBox"></div>
                    </div>
                    <div className="coinBox">
                        <div className="valueBox">
                            <div className="value">0.5</div>
                            <div className="coinName"> <img src={BNBIcon} alt="" /> BNB</div>
                        </div>
                        <div className="rightBox"><div className="approveBtn flex">已批准</div></div>
                    </div>
                </div>
                <div className='midBox'>
                    <img src={addIcon} alt="" />
                </div>
                <div className='bottomBox Box'>
                    <div className="balanceBox">
                        <div className="balance">餘額：1,457.485</div>
                        <div className="rightBox"></div>
                    </div>
                    <div className="coinBox">
                        <div className="valueBox">
                            <div className="value">54.1455</div>
                            <div className="coinName"><img src={SBLIcon} alt="" /> SBL</div></div>
                        <div className="rightBox"><div className="approveBtn toApproveBtn  flex" >批准 SBL</div></div>
                    </div>
                </div>
                <div className="supplyBtn flex">供應</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default AddLiquidityModal
