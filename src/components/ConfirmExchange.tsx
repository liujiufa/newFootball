// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function ConfirmExchange(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ConfirmExchange'
                centered
                width={'418px'}
                closable={false}
                footer={null}
            >
                <p className='title'>確認兌換嗎</p>

                <div className="confirmBtn flex">確認</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ConfirmExchange
