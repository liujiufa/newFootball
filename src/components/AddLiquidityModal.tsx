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
import BigNumber from 'big.js'
import DropDown from '../components/DropDown'
import '../assets/style/componentsStyle/AddLiquidityModal.scss'
import BNBIcon from '../assets/image/BNB.png'
import addIcon from '../assets/image/addIcon.png'
import SBLIcon from '../assets/image/SBL.png'
function AddLiquidityModal(props: any) {
    let { t } = useTranslation()

    let state = useSelector<stateType, stateType>(state => state);

    const web3React = useWeb3React()

    const [type, setType] = useState(0.2)
    // SBL授权
    const [ApproveValue, setApproveValue] = useState('0')
    // BNB余额
    const [balance, setBalance] = useState('0')
    // SBL余额
    const [balance1, setBalance1] = useState('0')
    // ToSBL
    const [toSBL, setToSBL] = useState('0')

    const handleCallback = useCallback(
        (e) => {
            setType(parseFloat(e.key))
            /* 查询To SBL */
            Contracts.example.toSBL(web3React.account as string, parseFloat(e.key)).then((res: any) => {
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
        showLoding(true)
        Contracts.example.toSBL(web3React.account as string, type).then((res: any) => {
            let value = new BigNumber(res).div(10 ** 18).toString()
            Contracts.example.approve1(web3React.account as string, contractAddress.Token, value).then(() => {
                Contracts.example.Tokenapprove(web3React.account as string, contractAddress.Token).then((res: any) => {
                    setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                }).finally(() => {
                    showLoding(false)
                })
            })
        })

    }

    // 添加流动性
    function addLiquidity() {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        showLoding(true)
        Contracts.example.addLiquidity(web3React.account as string, type).then((res: any) => {
            setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        }).finally(() => {
            showLoding(false)
        })
    }

    useEffect(() => {
        if (web3React.account) {
            /* 查询用户授权 */
            Contracts.example.Tokenapprove(web3React.account, contractAddress.Token).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
                console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
            })
            /* 查询BNB余额 */
            Contracts.example.getBalance(web3React.account).then((res: any) => {
                setBalance(new BigNumber(res).div(10 ** 18).toString())
            })
            /* 查询SBL余额 */
            Contracts.example.balanceOf(web3React.account).then((res: any) => {
                setBalance1(new BigNumber(res).div(10 ** 18).toString())
            })
            // toSBL
            Contracts.example.toSBL(web3React.account as string, type).then((res: any) => {
                setToSBL(new BigNumber(res).div(10 ** 18).toString())
            })

        }
    }, [web3React.account])
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
                <p className='title'>添加流動性</p>
                <div className='topBox Box'>
                    <div className="coinBox">
                        <div className="valueBox">
                            <Dropdown menu={{ items: items.map((item: any) => ({ ...item, onClick: handleCallback })) }} overlayClassName='AddLiquidityDropdown' trigger={['click']} placement="bottom">
                                <a onClick={e => e.preventDefault()}>
                                    <div className="value">{type}</div>
                                </a>
                            </Dropdown>
                            <div className="coinName"> <img src={BNBIcon} alt="" /> BNB</div>
                        </div>
                        <div className="rightBox"><div className="approveBtn flex" >已批准</div> </div>
                    </div>
                    <div className="balanceBox">
                        <div className="balance">餘額：{balance}</div>
                        <div className="rightBox"></div>
                    </div>
                </div>
                <div className='midBox'>
                    <img src={addIcon} alt="" />
                </div>
                <div className='bottomBox Box'>
                    <div className="coinBox">
                        <div className="valueBox">
                            <div className="value">{NumSplic(toSBL, 4)}</div>
                            <div className="coinName"><img src={SBLIcon} alt="" /> SBL</div></div>
                        <div className="rightBox">{parseFloat(ApproveValue) > 0 ? <div className="approveBtn flex">已批准</div> : <div className="approveBtn toApproveBtn  flex" onClick={() => { ApproveFun() }}>批准 SBL</div>}</div>
                    </div>
                    <div className="balanceBox">
                        <div className="balance">餘額：{balance1}</div>
                        <div className="rightBox"></div>
                    </div>
                </div>
                {true ? <div className="toSupplyBtn flex">供應</div> : <div className="supplyBtn flex">供應</div>}

                <span>点击任意地方离开</span>
            </Modal>
        </>
    )
}
export default AddLiquidityModal
