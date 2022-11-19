// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/SuccessAddLiquidity.scss'
import BNBIcon from '../assets/image/BNBTokens.png'
import SBLIcon from '../assets/image/SBLTokens.png'
function SuccessAddLiquidity(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='SuccessAddLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>成功添加流動性</p>

                <div className="subTitle">您已獲得</div>
                <div className="coinValueBox">1,215.451 <div className='coinsBox'><img className='img1' src={SBLIcon} alt="" /><img className='img2' src={BNBIcon} alt="" /></div></div>
                <div className="subTokens">SBL/BNB Pool Tokens</div>

                <div className="toSupplyBtn flex" onClick={() => { props.close() }}>確認供應</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default SuccessAddLiquidity
