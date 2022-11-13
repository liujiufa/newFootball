// 捐赠奖励释放机制
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/ConfirmDestruct.scss'

function ConfirmDestruct(props: any) {
  return (
    <>
      <Modal visible={props.showModal}
        className='ConfirmDestruct'
        centered
        width={'446px'}
        closable={false}
        footer={null}
      >

        <p className='title'>銷毀</p>
        <div className='box'>
          <p className='zifujg'>此次銷毀消耗133,452 SBL
            您將獲得 10 BNB 的銷毀獎勵。</p>
        </div>
        <div className="ConfirmBtn flex">確定</div>
      </Modal>
    </>
  )
}
export default ConfirmDestruct
