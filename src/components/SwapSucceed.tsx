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
        onCancel={() => { props.close() }}
      >

        <p className='SwapSuccessTitle'>兌換MBA成功！</p>


        <span>点击任意地方离开</span>
      </Modal>
    </>
  )
}
export default DestructSucceed
