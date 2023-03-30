// SBL捐赠规则
import React from 'react'
import { Modal } from 'antd';
import '../assets/style/componentsStyle/DestructDes.scss'
import { useTranslation } from 'react-i18next';
import closeIcon from '../assets/image/closeIcon.png'
import { starLevel } from '../config'
import { NumSplic } from '../utils/tool'
function DestructDesRule(props: any) {
  let { t } = useTranslation()
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
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />

        <p className='title'>{t("Yesterday's dividend details")}</p>
        <div className='box'>
          {props.data?.map((item: any, index: any) => <p key={index} className='zifujg' >
            {/* {starLevel[item?.level]}土地激活数量：{item?.acount}，分红额度：{item?.amount}MBAS */}
            {t("One-star land activation quantity: 5, dividend amount: 200.1234MBAS", { value1: t(starLevel[item?.level]), value2: item?.acount, value3: NumSplic(item?.amount, 4) })}
          </p>
          )}
          {/* <p className='zifujg'>二星土地激活数量：5 ，分红额度：200.1234MBAS</p>
          <p className='zifujg'>三星土地激活数量：5 ，分红额度：200.1234MBAS</p>
          <p className='zifujg'>四星土地激活数量：5 ，分红额度：200.1234MBAS
          </p>
          <p className='zifujg'>五星土地激活数量：5 ，分红额度：200.1234MBAS</p> */}

        </div>

        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  )
}
export default DestructDesRule
