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

        <p className='title'>{t('Reward rules')}</p>
        <div className='box'>
          <p className='tou'>{t('Coinage mechanism')}：</p>
        <p className='zifujg'>{t('node Rules1')}</p>
        <p className='zifujg'>{t('node Rules2')}</p>
        <p className='zifujg'>{t('node Rules3')}</p>
        <p className='zifujg'>{t('node Rules4')}</p>
        <p className='zifujg'>{t('node Rules5')}</p>
        <p className='zifujg'>{t('node Rules6')}</p>
        <p className='zifujg'>{t('node Rules7')}</p>
        <p className='btm'>{t('Unqualified Nodes Refunded')}：</p>
        <p className='zifujg'> {t('RefundContebt')}</p>

        </div>

      <span>{t('Click anywhere to close')}</span>
    </Modal>
    </>
  )
}
export default GlodMechanism
