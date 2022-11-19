// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/style/componentsStyle/ConfirmExchange.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function ClaimSuccess(props: any) {
    const navigate = useNavigate()
    return (
        <>
            <Modal visible={props.showModal}
                className='ClaimSuccess'
                centered
                width={'418px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>取消質押成功!</p>
                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ClaimSuccess
