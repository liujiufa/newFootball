import React from 'react'
import { Modal} from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/Puchased.scss'
interface TipsPropsType{
    title:string,
    subTitle:string,
    isShow:boolean,
    enterFun:Function,
    close:Function
}

 function Tips(props:TipsPropsType) {
  let { t } = useTranslation()
  return (
    <>
    <Modal title="Basic Modal" visible={props.isShow} 
      className='Puchased'
      onCancel={()=>props.close()}
      centered
      width={'449px'}
      closable={ false }
      footer={null}
      >
          <p className='title'>{props.title}</p>
          <p className='zifujg'>{props.subTitle}</p>
        {/* <span>{t('Click anywhere to close')}</span> */}
        <button className='btm' onClick={()=>props.enterFun()}>{t('Confirm')}</button>
      </Modal></>
  )
}
export default React.memo(Tips)