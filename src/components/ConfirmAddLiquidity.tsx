// SBL捐赠销毁捐赠成功
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { Contracts } from '../web3';
import { useWeb3React } from '@web3-react/core'
import { NumSplic } from '../utils/tool'
import BigNumber from 'big.js'

import '../assets/style/componentsStyle/ConfirmAddLiquidity.scss'
import BNBIcon from '../assets/image/BNB.png'
import SBLIcon from '../assets/image/SBL.png'
import tipIcon from '../assets/image/tipIcon.png'
const typeObj = { '0.2': 1, '0.5': 2, '1': 3, '2.5': 4, '8': 5 }
function ConfirmAddLiquidity(props: any) {
    const web3React = useWeb3React()
    // ToSBL
    const [toSBL, setToSBL] = useState('0')
    useEffect(() => {
        if (web3React.account) {
            // toSBL
            Contracts.example.toSBL(web3React.account as string, props.data).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
        }
    }, [web3React.account, props.showModal])
    return (
        <>
            <Modal visible={props.showModal}
                className='ConfirmAddLiquidity'
                centered
                width={'459px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <p className='title'>添加流動性</p>

                <div className="box">
                    <div className="subTitle">入金 BNB</div>
                    <div className="value"><img src={BNBIcon} alt="" />{props.data}</div>
                </div>
                <div className="box">
                    <div className="subTitle">入金 SBL</div>
                    <div className="value"><img src={SBLIcon} alt="" />{NumSplic(toSBL, 4)}</div>
                </div>
                <div className="box">
                    <div className="subTitle">匯率</div>
                    <div className="radioValue">
                        <div className="radio">1 SBL = {NumSplic(`${props.data / parseFloat(toSBL)}`, 10)} BNB </div>
                        <div className="radio">1 BNB = {NumSplic(`${parseFloat(toSBL) / props.data}`, 4)} SBL</div>
                    </div>
                </div>
                <div className="tip">
                    <img src={tipIcon} alt="" />
                    匯率根據SWAP實時價格預估
                </div>

                <div className="toSupplyBtn flex" onClick={() => { props.addFun(typeObj[props.data]) }}>確認供應</div>
                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default ConfirmAddLiquidity
