// 捐赠奖励释放机制
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { Contracts } from '../web3';
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/ConfirmDestruct.scss'
import { NumSplic } from '../utils/tool';
import { useTranslation } from 'react-i18next';

function ConfirmDestruct(props: any) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const [BNBValue, setBNBValue] = useState('0')
  const web3React = useWeb3React()
  useEffect(() => {
    if (state.token && web3React.account && props.data) {
      Contracts.example.toBNB(web3React.account, props.data * 2).then((res: any) => {
        setBNBValue(new BigNumber(res).div(10 ** 18).toString())
      })
    }
  }, [state.token, web3React.account, props.showModal])
  return (
    <>
      <Modal visible={props.showModal}
        className='ConfirmDestruct'
        centered
        width={'446px'}
        closable={false}
        footer={null}
        onCancel={() => { props.close() }}
      >

        <p className='title'>{t("Burn")}</p>
        <div className='box'>
          <p className='zifujg'>{t("BurnTip", { price1: props.data, price2: NumSplic(BNBValue, 8) })}</p>
        </div>
        <div className="ConfirmBtn flex" onClick={() => { props.BurnFun(parseFloat(props.data)) }}>{t("Confirm")}</div>
      </Modal>
    </>
  )
}
export default ConfirmDestruct
