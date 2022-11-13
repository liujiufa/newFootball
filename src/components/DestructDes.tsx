// SBL捐赠规则
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructDes.scss'

function DestructDesRule(props: any) {
  return (
    <>
      <Modal visible={props.showModal}
        className='DestructDesRule'
        centered
        width={'446px'}
        closable={false}
        footer={null}
      >

        <p className='title'>銷毀说明</p>
        <div className='box'>
          <p className='zifujg'>1、销毁基金额度=销毁基⾦池累计收到的BNB-全⽹已经认购的额度*2 </p>
          <p className='zifujg'> 2、单次銷毀上限金额：销毁基金额度50%BNB等价值BNB</p>
          <p className='zifujg'> 3、单次銷毀起始金额：价值0.1BNB的SBL</p>

        </div>

        <span>点击任意地方离开</span>
      </Modal>
    </>
  )
}
export default DestructDesRule
