// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function ClaimSuccess(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ClaimSuccess'
                centered
                width={'418px'}
                closable={false}
                footer={null}
            >
                <p className='title'>申領成功</p>
                <div className="tip">優秀土地2  傳奇土地2  稀有土地2  </div>
                <div className="confirmBtn flex">確認</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ClaimSuccess
