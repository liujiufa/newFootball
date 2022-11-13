// SBL捐赠销毁捐赠成功
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructSucceed.scss'

function DestructSucceed(props: any) {
  return (
    <>
      <Modal visible={props.showModal}
        className='DestructSucceed'
        centered
        width={'446px'}
        closable={false}
        footer={null}
      >

        <p className='title'>恭喜，銷毀成功！</p>
        <div className='box'>
          <p className='zifujg'>28,800個區塊後可再次銷毀。</p>
        </div>

        <span>点击任意地方离开</span>
      </Modal>
    </>
  )
}
export default DestructSucceed
