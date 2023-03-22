// NTF徽章合成规则
import React from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRule.scss'
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
        <p className='title'>{t('Evolve rules1')}</p>
        <div className='box'>
          <div className='zifujg'>1、水精灵： 2個精灵仙子合成可以獲得地球领土ID權益</div>
          <div className='zifujg'>2、木精灵： 2個水精灵合成可以獲得行星领土ID權益</div>
          <div className='zifujg'>3、火精灵： 2個木精灵合成可以獲得银河领土ID權益</div>
          <div className='zifujg'>4、土精灵： 2個火精灵合成可以獲得星际领土ID權益</div>
          <div className='zifujg'>5、金精灵： 2個同類型合成可以獲得宇宙领土ID權益</div>
        </div>
      </Modal>
    </>
  )
}
export default CardComRule
