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
        width={'394px'}
        closable={false}
        footer={null}
        onCancel={() => props.close()}
      >

        <p className='title'>土地詳情説明</p>
        <div className='box'>
          <p className='zifujg'>1、激活优秀NFT土地 ，可获得领主封号；</p>
          <p className='zifujg'>2、激活稀有NFT土地 ，可獲得城主封號；</p>
          <p className='zifujg'>3、激活良品NFT土地 ，可獲得市長封號；</p>
          <p className='zifujg'>4、激活史詩NFT土地 ，可獲得州長封號；</p>
          <p className='zifujg'>5、激活傳奇NFT土地 ，可獲得議長封號。</p>

        </div>

        <span>点击任意地方离开</span>
      </Modal>
    </>
  )
}
export default DestructDesRule
