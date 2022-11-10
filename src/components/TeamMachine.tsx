// 团队奖励机制
import React from 'react'
import { Modal} from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/TeamMachine.scss'
interface propsType{
  isShow:boolean,
  close:Function
}
function TeamMachine(props:propsType) {
  let { t } = useTranslation()
  return (
    <>
    <Modal visible={props.isShow} 
    className='TeamMachine'
    onCancel={()=>props.close()}
    centered
    width={'446px'}
    closable={ false }
    footer={null}
    >

        <p className='title'>{t('rules')}</p>
        <div className='box'>
        <p className='zifujg'>{t('TeamRules1')}</p>
        <p className='zifujg'>{t('TeamRules2')}</p>
        <p className='zifujg'>{t('TeamRules3')}</p>
        <p className='zifujg'>{t('TeamRules4')}</p>
        <p className='zifujg'>{t('TeamRules5')}</p>
        </div>
      <span>{t('Click anywhere to close')}</span>
    </Modal>
    </>
  )
}
export default TeamMachine
