// NTF精灵合成规则
import React from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRule.scss'
import closeIcon from '../assets/image/closeIcon.png'

interface PropsType {
  isShow: boolean,
  close: Function
}
function CardComRule(props: PropsType) {
  let { t } = useTranslation()
  return (
    <>
      <Modal visible={props.isShow}
        className='CardComRule'
        onCancel={() => props.close()}
        centered
        width={'449px'}
        closable={false}
        footer={null}
      >
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />
        <p className='title'>{t('Evolve rules1')}</p>
        <div className='box'>
          <div className='zifujg'>{t('Evolve rules2')}</div>
          <div className='zifujg'>{t('Evolve rules3')}</div>
          <div className='zifujg'>{t('Evolve rules4')}</div>
          <div className='zifujg'>{t('Evolve rules5')}</div>
          <div className='zifujg'>{t('Evolve rules6')}</div>
        </div>
      </Modal>
    </>
  )
}
export default CardComRule
