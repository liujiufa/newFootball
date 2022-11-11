// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/SuccessRmLiquidity.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function SuccessRmLiquidity(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='SuccessRmLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
            >
                <p className='title'>移除成功</p>

                <div className="tip">已成功移除流動性！</div>

                <div className="confirmBtn flex">確認</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default SuccessRmLiquidity
