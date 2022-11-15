// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function CancelPledge(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='CancelPledge'
                centered
                width={'418px'}
                closable={false}
                footer={null}
            >
                <p className='title'>取消質押</p>
                <div className="tip">確認取消質押嗎?</div>
                <div className="confirmBtn flex">確認</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default CancelPledge
