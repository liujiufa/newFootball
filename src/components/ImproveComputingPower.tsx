// SBL捐赠销毁捐赠成功
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getPledgeCardUserInfo, promotePower } from '../API/index'
import { NumSplic } from '../utils/tool'
import '../assets/style/componentsStyle/ImproveComputingPower.scss'
import minusIcon from '../assets/image/minusIcon.png'
import addIcon from '../assets/image/addIcon.png'
import warnIcon from '../assets/image/warnIcon.png'
function ImproveComputingPower(props: any) {
    let state = useSelector<stateType, stateType>(state => state);
    const [inputValue, setInputValue] = useState(parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`) + 1)
    const changeNum = (type: string) => {
        if (type == 'add' && inputValue <= 99) {
            setInputValue(inputValue + 1)
        }
        if (type == 'minus' && inputValue >= 1) {
            setInputValue(inputValue - 1)
        }
        if (type == 'max') {
            setInputValue(100)
        }
    }
    const changeFun = (e: any) => {
        let value = e.target.value
        if (value >= inputValue) {
            setInputValue(value)
        }
    }
    // 提升算力
    const promotePowerFun = () => {
        console.log('提升算力');

        if ((inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`)) > 0) {
            promotePower({
                "rate": inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`),
                "tokenId": props.data?.tokenId
            }).then(res => {
                console.log('提升成功')
            })
        }
    }

    useEffect(() => {

    }, [state.token, props.showModal])
    return (
        <>
            <Modal visible={props.showModal}
                className='ImproveComputingPower'
                centered
                width={'509px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>提升算力值</p>
                <div className="subTitle">當前算力：{parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`)}%，提升至</div>
                <div className="inputBox">
                    <div className="minusBtn" onClick={() => changeNum('minus')}><img src={minusIcon} alt="" /></div>
                    <div className="input"><input type="Number" value={`${inputValue}`} onChange={(e) => { changeFun(e) }} />%</div >
                    <div className="addBtn" onClick={() => changeNum('add')}><img src={addIcon} alt="" /></div>
                    <div className="maxBtn flex" onClick={() => changeNum('max')}>Max</div>
                </div>
                <div className="allConsume">纍計消耗：{inputValue * props?.data.promotePowerNum} MBA</div>
                <div className="subTip"><img src={warnIcon} alt="" /> 算力每提升1%算力值消耗300 MBA，不足1%按1%計算</div>
                <div className="confirmBtn flex" onClick={() => { promotePowerFun() }}>確認提升</div>

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ImproveComputingPower
