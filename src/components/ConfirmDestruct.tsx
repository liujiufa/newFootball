// 捐赠奖励释放机制
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useWeb3React } from '@web3-react/core'
import { Contracts } from '../web3';
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/ConfirmDestruct.scss'

function ConfirmDestruct(props: any) {
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

        <p className='title'>銷毀</p>
        <div className='box'>
          <p className='zifujg'>此次銷毀消耗{props.data} SBL
            您將獲得 {BNBValue} BNB 的銷毀獎勵。</p>
        </div>
        <div className="ConfirmBtn flex" onClick={() => { props.BurnFun(parseFloat(props.data)) }}>確定</div>
      </Modal>
    </>
  )
}
export default ConfirmDestruct
