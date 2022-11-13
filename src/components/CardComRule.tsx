// NTF徽章合成规则
import React from 'react'
import { Modal} from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRule.scss'
interface PropsType{
  isShow:boolean,
  close:Function
}
function CardComRule(props:PropsType) {
  let { t } = useTranslation()
  return (
    <>
    <Modal visible={props.isShow} 
    className='CardComRule'
    onCancel={()=>props.close()}
    centered
    width={'449px'}
    closable={ false }
    footer={null}
    >

        <p className='title'>{t('Evolve rules1')}</p>
        <div className='box'>
        <p className='zifujg'>{t('Evolve rule1')}</p>
        <p className='zifujg'>{t('Evolve rule2')}</p>
        <p className='zifujg'>{t('Evolve rule3')}</p>
        <p className='zifujg'>{t('Evolve rule4')}</p>
        <p className='zifujg'>{t('Evolve rule5')}</p>
        </div>

      <span>{t('Click anywhere to close')}</span>
    </Modal>
    </>
  )
}
export default CardComRule
