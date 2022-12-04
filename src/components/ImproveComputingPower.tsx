// SBL捐赠销毁捐赠成功
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getPledgeCardUserInfo, promotePower, getMbaUserInfo } from '../API/index'
import { addMessage, NumSplic } from '../utils/tool'
import '../assets/style/componentsStyle/ImproveComputingPower.scss'
import minusIcon from '../assets/image/minusIcon.png'
import addIcon from '../assets/image/addIcon.png'
import warnIcon from '../assets/image/warnIcon.png'
import { useTranslation } from 'react-i18next';
function ImproveComputingPower(props: any) {
    let { t } = useTranslation()
    console.log(props.data);

    let state = useSelector<stateType, stateType>(state => state);
    const [inputValue, setInputValue] = useState((parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`) + 1) > 100 ? 100 : parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`) + 1)
    const [mbaUserInfoValue, setMbaUserInfoValue] = useState(0)
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
        let value = e.target.value.replace(/^[^1-9]+|[^0-9]/g, '')
        setInputValue(value)
    }
    // 提升算力(value:累计消耗MBA)
    const promotePowerFun = (value: number) => {
        console.log('提升算力');
        if (value < 0) { return addMessage(t('Please enter correct value')) }
        if (inputValue > 100) { return addMessage(t('Please enter correct value')) }
        if (mbaUserInfoValue < value) { return addMessage(t('Insufficient MBA balance')) }
        if ((inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`)) > 0) {
            promotePower({
                "rate": inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`),
                "tokenId": props.data?.tokenId
            }).then(res => {
                props.close()
                props.successFun()
            })
        }
    }
    useEffect(() => {
        if (state.token) {
            getMbaUserInfo().then((res: any) => {
                setMbaUserInfoValue(res.data.amount)
                console.log(res.data, "获取用户销毁奖励")
            })
        }
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
                <p className='title'>{t("Increase computing power")}</p>
                <div className="subTitle">{t("Current hashrate: 50.23%, increased to", { num: parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`) })}</div>
                <div className="inputBox">
                    <div className="minusBtn" onClick={() => changeNum('minus')}><img src={minusIcon} alt="" /></div>
                    <div className="input"><input type="Number" value={`${inputValue}`} onChange={(e) => { changeFun(e) }} />%</div >
                    <div className="addBtn" onClick={() => changeNum('add')}><img src={addIcon} alt="" /></div>
                    <div className="maxBtn flex" onClick={() => changeNum('max')}>Max</div>
                </div>
                <div className="allConsume">{t("Total cost")}：{(inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`)) * parseInt(props?.value)} MBA</div>
                <div className="subTip"><img src={warnIcon} alt="" /> {t("increateRules", { num: props.value })}</div>
                <div className="confirmBtn flex" onClick={() => { promotePowerFun((inputValue - parseInt(`${props.data?.currentPower / props.data?.basePower * 100}`)) * parseInt(props?.value)) }}>確認提升</div>

                <span>{t("clickLeave")}</span>
            </Modal>
        </>
    )
}
export default ImproveComputingPower
