// NTF合成成功
import React from 'react'
import { Modal} from 'antd';
import {OpenResType} from '../view/NFT'
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/ComSucceed.scss'
interface PropsType{
  isShow:boolean,
  CardInfo:OpenResType,
  close:Function
}
const cardType=['','Common','Uncommon','Outstanding','Rare','Perfect','Epic']
function ComSucceed(props:PropsType) {
  let { t } = useTranslation()
  return (
    <>
    <Modal visible={props.isShow} 
    className='ComSucceed'
    onCancel={()=>props.close()}
    centered
    width={'449px'}
    closable={ false }
    footer={null}
    >

        <div className='box'>
          <img src={props.CardInfo.imageUrl} alt='' />
        </div>
        <p className='title'>{t('GetCard',{cardType:t(cardType[props.CardInfo.cardLevel])})} </p>
      <span>{t('Click anywhere to close')}</span>
    </Modal>
    </>
  )
}
export default ComSucceed
