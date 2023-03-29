import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/CardComRecord.scss'
import defaultCard from '../assets/image/defaultCard.png'
import closeIcon from '../assets/image/closeIcon.png'
import { useSelector } from 'react-redux';
import { stateType } from '../store/reducer';
import { getUserCardCombineRecord } from '../API';
import { dateFormat } from '../utils/tool'
import { nftLevel, nftType, landLevel } from '../config';
import Nodata from '../components/NoData'
interface PropsType {
  isShow: boolean,
  close: Function
}
function CardComSuccess(props: PropsType) {
  let state = useSelector<stateType, stateType>(state => state)
  let { t } = useTranslation()
  const [recordList, setRecordList] = useState<any>([])
  useEffect(() => {
    if (state.token) {
      getUserCardCombineRecord().then((res: any) => {
        console.log(res.data, '12');
        setRecordList(res.data)
      })
    }
  }, [state.token])

  return (
    <>
      <Modal visible={props.isShow}
        className='CardComRecord'
        onCancel={() => props.close()}
        centered
        width={'1000px'}
        closable={false}
        footer={null}
      >
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => props.close()} />
        <div className='title'>{t("Congratulations")}！</div>
        <div className="BigBox">
          <div className="content">
            <div className="items titleItems">
              <div className="item">{t("Time")}</div>
              <div className="item">{t("Card")}1{t("Type")}</div>
              <div className="item">{t("Value")}(BNB)</div>
              <div className="item">{t("Card")}2{t("Type")}</div>
              <div className="item">{t("Value")}(BNB)</div>
              <div className="item">{t("Evolve")}</div>
              <div className="item">{t("Value")}(BNB)</div>
              <div className="item">{t("land gift")}</div>
            </div>
            <div className="Box">
              {recordList.length > 0 ? recordList.map((item: any, index: any) => <div key={index} className="items contentItems">
                <div className="item">{dateFormat('YYYY/mm/dd', new Date(item?.createTime))}</div>
                <div className="item">
                  {nftLevel[item?.combineCardInfoVONFT1?.level]}-{nftType[item?.combineCardInfoVONFT1?.type]}
                  <div className="ID">ID:{item?.combineCardInfoVONFT1?.id}</div>
                </div>
                <div className="item">{item?.combineCardInfoVONFT1?.value}</div>
                <div className="item">
                  {nftLevel[item?.combineCardInfoVONFT2?.level]}-{nftType[item?.combineCardInfoVONFT2?.type]}
                  <div className="ID">ID:{item?.combineCardInfoVONFT2?.id}</div>
                </div>
                <div className="item">{item?.combineCardInfoVONFT2?.value}</div>
                <div className="item">
                  {nftLevel[item?.combineCardInfoVONFT3?.level]}-{nftType[item?.combineCardInfoVONFT3?.type]}
                  <div className="ID">ID:{item?.combineCardInfoVONFT3?.id}</div>
                </div>
                <div className="item">{item?.combineCardInfoVONFT3?.value}</div>
                <div className="item">
                  {landLevel[item?.landLevel]}
                  <div className="ID">ID:{item?.landId}</div>
                </div>
              </div>) : <Nodata></Nodata>}
            </div>

          </div>
        </div>
      </Modal>
    </>
  )
}
export default CardComSuccess
