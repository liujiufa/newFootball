import React from 'react'
import {OpenResType} from '../view/NFT'
import { useTranslation } from 'react-i18next'
import { Modal} from 'antd';
import '../assets/style/componentsStyle/OpenRes.scss'
interface PropsType{
    isShow:boolean,
    OpenRes:OpenResType [],
    close:Function
  }
export default function OpenRes(props:PropsType) {
    let { t } = useTranslation()
  return (
    <Modal visible={props.isShow} 
    className='ComSucceed'
    onCancel={()=>props.close()}
    centered
    width={'449px'}
    closable={ false }
    footer={null}
    >
        <p className='titleLebel'>{t('congratulations')} </p>
        <div className='resList' style={{gridTemplateColumns:props.OpenRes.length === 1 ? 'repeat(1, 170px)' :'repeat(auto-fill, 170px)'}}>
          {
            props.OpenRes.map((item,index) => <div className='ResItem' key={index}>
              <img src={item.imageUrl} alt="" />
            </div>)
          }
        </div>
      <span>{t('Click anywhere to close')}</span>
    </Modal>
  )
}
