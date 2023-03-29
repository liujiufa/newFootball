// SBL捐赠销毁捐赠成功
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { Contracts } from '../web3';
import { useWeb3React } from '@web3-react/core'
import { NumSplic } from '../utils/tool'
import BigNumber from 'big.js'

import '../assets/style/componentsStyle/ConfirmAddLiquidity.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLIcon from '../assets/image/SBLIcon.png'
import tipIcon from '../assets/image/tipIcon.png'
import closeIcon from '../assets/image/closeIcon.png'

import { useTranslation } from 'react-i18next';
const typeObj = { '0.2': 1, '0.5': 2, '1': 3, '2.5': 4, '8': 5 }
function ConfirmAddLiquidity(props: any) {
    const { t } = useTranslation()
    const web3React = useWeb3React()
    // ToSBL
    const [toSBL, setToSBL] = useState('0')
    const [oneToSBL, setOneToSBL] = useState('0')
    const [oneToBNB, setToBNB] = useState('0')
    useEffect(() => {
        if (web3React.account) {
            // toSBL
            Contracts.example.toLiquiditySBL(web3React.account as string, props.data).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
            //1BNB=> toSBL
            Contracts.example.toLiquiditySBL(web3React.account as string, 1).then((res: any) => {
                setOneToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
            //1SBL=> toBNB
            Contracts.example.toLiquidityBNB(web3React.account as string, 1).then((res: any) => {
                setToBNB(new BigNumber(res).div(10 ** 18).toString())
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
                <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />
                <p className='title'>{t("Add liquidity")}</p>

                <div className="box">
                    <div className="">{t("Deposit BNB")}</div>
                    <div className="value"><img src={BNBIcon} alt="" />{props.data}</div>
                </div>
                <div className="box">
                    <div className="">{t("Deposit MBAS")}</div>
                    <div className="value"><img src={SBLIcon} alt="" />{NumSplic(toSBL, 4)}</div>
                </div>
                <div className="box">
                    <div className="">{t("Exchange rate")}</div>
                    <div className="radioValue">
                        <div className="radio">1 MBAS = {NumSplic(oneToBNB, 10)} BNB </div>
                        <div className="radio">1 BNB = {NumSplic(oneToSBL, 10)} MBAS</div>
                    </div>
                </div>
                <div className="tip">
                    <img src={tipIcon} alt="" />
                    {t("The exchange rate is estimated based on SWAP real-time price.")}
                </div>

                <div className="toSupplyBtn flex" onClick={() => { props.addFun(typeObj[props.data]) }}>{t("Confirm supply")}</div>
                {/* <span>{t("clickLeave")}</span> */}
            </Modal>
        </>
    )
}
export default ConfirmAddLiquidity
