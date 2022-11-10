// 金币节点奖励机制
import React from 'react'
import { Modal} from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/GlodMechanism.scss'
interface propsType{
  isShow:boolean,
  close:Function
}
function GlodMechanism(props:propsType) {
  let { t } = useTranslation()
  return (
    <>
    <Modal visible={props.isShow} 
    className='GlodMechanism'
    onCancel={()=>props.close()}
    centered
    width={'634px'}
    closable={ false }
    footer={null}
    >

        <p className='title'>{t('Ecological coinage node')}</p>
        <div className='nodeInte box'>
            <div>{t('nodeInte1')}</div>
            <div>{t('nodeInte2')}</div>
        </div>
      <span>{t('Click anywhere to close')}</span>
    </Modal>
    </>
  )
}
export default GlodMechanism
