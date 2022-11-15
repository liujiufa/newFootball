// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ImproveComputingPower.scss'
import minusIcon from '../assets/image/minusIcon.png'
import addIcon from '../assets/image/addIcon.png'
import warnIcon from '../assets/image/warnIcon.png'
function ImproveComputingPower(props: any) {
    return (
        <>
            <Modal visible={props.showModal}
                className='ImproveComputingPower'
                centered
                width={'509px'}
                closable={false}
                footer={null}
            >
                <p className='title'>提升算力值</p>
                <div className="subTitle">當前算力：50.23%，提升至</div>
                <div className="inputBox">
                    <div className="minusBtn"><img src={minusIcon} alt="" /></div>
                    <div className="input"><input type="Number" /></div>
                    <div className="addBtn"><img src={addIcon} alt="" /></div>
                    <div className="maxBtn flex">Max</div>
                </div>
                <div className="allConsume">纍計消耗：300 MBA</div>
                <div className="subTip"><img src={warnIcon} alt="" /> 算力每提升1%算力值消耗300 MBA，不足1%按1%計算</div>
                <div className="confirmBtn flex">確認提升</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ImproveComputingPower
