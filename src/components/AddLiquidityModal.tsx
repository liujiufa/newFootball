// SBL捐赠销毁捐赠成功
import React, { useCallback, useEffect, useState } from 'react'
import type { MenuProps } from 'antd';
import { Modal, Dropdown } from 'antd';
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { Contracts } from '../web3';
import { contractAddress } from "../config"
import { isApprove, addMessage, showLoding, AddrHandle, NumSplic } from '../utils/tool'
import { useTranslation } from 'react-i18next'
import { useViewport } from './viewportContext';
import BigNumber from 'big.js'
import DropDown from '../components/DropDown'
import '../assets/style/componentsStyle/AddLiquidityModal.scss'
import BNBIcon from '../assets/image/BNBIcon.svg'
import addIcon from '../assets/image/addIcon.png'
import SBLIcon from '../assets/image/SBLIcon.png'
import switchIcon from '../assets/image/dropDownIcon.png'
import closeIcon from '../assets/image/closeIcon.png'
import Web3 from 'web3';
let landLevelObj = { 1: 0.2, 2: 0.5, 3: 1, 4: 2.5, 5: 8 }
function AddLiquidityModal(props: any) {
    let { t } = useTranslation()
    let landType = { 0.2: t('Excellent'), 0.5: t('Rare'), 1: t('Good'), 2.5: t('Epic'), 8: t('Legend') }
    const { width } = useViewport()
    let state = useSelector<stateType, stateType>(state => state);
    const web3React = useWeb3React()
    const [type, setType] = useState(0.2)
    // SBL授权
    const [ApproveValue, setApproveValue] = useState('0')
    // BNB余额
    const [balance, setBalance] = useState('0')
    // SBL余额
    const [balance1, setBalance1] = useState('0')
    // ToMBAS
    const [toSBL, setToSBL] = useState('0')
    const [close, setClose] = useState(true)
    const handleCallback = useCallback(
        (e) => {
            setType(parseFloat(e.key))
            setClose(false)
            Contracts.example.toLiquiditySBL(web3React.account as string, parseFloat(e.key)).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
        },
        [type],
    )
    const items: MenuProps['items'] = [
        {
            label: <div className='dropValue'>0.2</div>,
            key: '0.2',
        },
        {
            type: 'divider',
        },
        {
            label: <div className='dropValue'>0.5</div>,
            key: '0.5'
        },
        {
            type: 'divider',
        },
        {
            label: <div className='dropValue'>1</div>,
            key: '1'
        },
        {
            type: 'divider',
        },
        {
            label: <div className='dropValue'>2.5</div>,
            key: '2.5',
        },
        {
            type: 'divider',
        },
        {
            label: <div className='dropValue'>8</div>,
            key: '8'
        },
    ];

    // 授权
    function ApproveFun() {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        Contracts.example.toLiquiditySBL(web3React.account as string, parseFloat(toSBL)).then((res: any) => {
            let value = new BigNumber(res).div(10 ** 18).toString()
            showLoding(true)
            Contracts.example.approve1(web3React.account as string, contractAddress.Liquidity, value).then(() => {
                Contracts.example.Tokenapprove(web3React.account as string, contractAddress.Liquidity).then((res: any) => {
                    setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                })
            }).finally(() => {
                showLoding(false)
            })
        })

    }

    const confirmApplyFun = () => {
        if (type > parseFloat(balance) && parseFloat(toSBL) > parseFloat(balance1)) {
            return addMessage(t('Insufficient balance'))
        }
        props.nextFun(type)
    }

    useEffect(() => {
        if (web3React.account) {
            /* 查询用户授权 */
            Contracts.example.Tokenapprove(web3React.account, contractAddress.Liquidity).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
            })
            /* 查询BNB余额 */
            Contracts.example.getBalance(web3React.account).then((res: any) => {
                setBalance(new BigNumber(res).div(10 ** 18).toString())
            })
            /* 查询MBAS余额 */
            Contracts.example.balanceOf(web3React.account).then((res: any) => {
                setBalance1(new BigNumber(res).div(10 ** 18).toString())
            })
            // toMBAS
            Contracts.example.toLiquiditySBL(web3React.account as string, type).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })
        }
    }, [web3React.account, props.showModal])

    useEffect(() => {
        if (props?.Level) {
            setType(landLevelObj[props?.Level])
        }
    }, [props?.Level])

    return (
        <>
            <Modal visible={props.showModal}
                className='AddLiquidityModal'
                centered
                width={'528px'}
                closable={false}
                footer={null}
                onCancel={() => { props.close() }}
            >
                <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />
                <p className='title'>{t("Add liquidity")}</p>
                {/* <p className='titleTip'>{t("AddLand", { landType: landType[type] })}</p> */}
                <div className='topBox Box'>
                    <div className="coinBox">
                        <div className="valueBox">
                            <Dropdown menu={{ items: items.map((item: any) => ({ ...item, onClick: handleCallback })) }} overlayClassName='AddLiquidityDropdown' trigger={['click']} placement="bottom">
                                <a onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setClose(!close)
                                    }}
                                >
                                    <div className="minBox"><div className="value">{type}</div><img className={close ? 'spanReset' : 'spanRotate'} src={switchIcon} alt="" /> </div>
                                </a>
                            </Dropdown>
                            <div className="coinName"> <img src={BNBIcon} alt="" />BNB</div>
                        </div>
                        {/* <div className="rightBox">{web3React.account && <div className="approveBtn flex" >{t("Approved")}</div>} </div> */}
                    </div>

                    <div className="balanceBox">
                        <div className="balance">{t("Balance")}：{NumSplic(balance, 4)}</div>
                        {/* {width > 425 && <div className="rightBox"></div>} */}
                    </div>

                </div>
                <div className='midBox'>
                    <img src={addIcon} alt="" />
                </div>
                <div className='bottomBox Box'>
                    <div className="coinBox">
                        <div className="valueBox">
                            <div className="value">{NumSplic(toSBL, 4)}</div>
                            <div className="coinName"><img src={SBLIcon} alt="" /> MBAS</div>
                        </div>
                    </div>
                    <div className="balanceBox">
                        <div className="balance">{t("Balance")}：{NumSplic(balance1, 4)}</div>
                        {/* {width > 425 && <div className="rightBox"></div>} */}
                    </div>
                </div>
                <div className="btnBox">{parseFloat(ApproveValue) <= parseFloat(toSBL) && <div className="approveBtn toApproveBtn  flex" onClick={() => { ApproveFun() }}> 授权 MBAS </div>}</div>
                {parseFloat(ApproveValue) > parseFloat(toSBL) ? <div className="toSupplyBtn flex" onClick={() => { confirmApplyFun() }}>{t("Supply")}</div> : <div className="supplyBtn flex">{t("Supply")}</div>}
                <p className='titleTip'>{t("AddLand", { landType: landType[type] })}</p>
            </Modal >
        </>
    )
}
export default AddLiquidityModal
