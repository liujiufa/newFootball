// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function AbleGetReward(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='AbleGetReward'
                centered
                width={'418px'}
                closable={false}
                footer={null}
            >
                <p className='title'>可領取金額</p>
                <div className="valueBox flex">100 SBL </div>
                <div className="confirmBtn flex">確認</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default AbleGetReward
