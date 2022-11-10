//金币节点 申请记录
import React , {useEffect , useState} from "react";
import { Modal, Table } from "antd";
import { useTranslation } from 'react-i18next'
import {getNodeUserBuyRecord} from '../API'
import {dateFormat} from '../utils/tool'
import {useSelector} from "react-redux";
import {stateType} from '../store/reducer'
import '../assets/style/componentsStyle/GoldRecord.scss'

  
const { Column } = Table;
interface propsType{
  isShow:boolean,
  close:Function
}
interface applyRecord{
  createTime:number,
  applyPrice:number,
  coinName:string
}
function GoldRecord(props:propsType) {
  let { t ,i18n} = useTranslation()
  let state = useSelector<stateType,stateType>(state => state);
  let [BuyRecord,setBuyRecord] = useState([])
  useEffect(()=>{
    if(state.token && props.isShow){
      getNodeUserBuyRecord().then(res=>{
        setBuyRecord(res.data)
        console.log(res,"获取用户申请记录")
      })
    }
  },[state.token , props.isShow])
  return (
    <>
      <Modal
        visible={props.isShow}
        className="GoldRecord"
        onCancel={()=>props.close()}
        centered
        width={"525px"}
        closable={false}
        footer={null}
      >
        <p className="title"> {t('Record2')} </p>
        <Table
          dataSource={BuyRecord}
          pagination={false}
          rowKey="id"
          // style={{overflowY:'auto',maxHeight:260}}
          scroll={{ y: 260,x:'auto' }}
        >
          <Column
            title={t('Time')}
            render={(item) => (
              <>
                <div>{dateFormat('YYYY-mm-dd HH:MM',new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title={t('Application2')}
            render={(item) => (
              <>
                <div>{item.applyPrice} {item.coinName}</div>
              </>
            )}
          />
          <Column
            align="right"

            width={i18n.language === 'en' ? 150 :'auto'}
            title={t('Coinage amount')}
            render={(item) => (
              <>
                <div>{item.awardNum}</div>
              </>
            )}
          />
        </Table>
        <span>{t('Click anywhere to close')}</span>
      </Modal>
    </>
  );
}
export default GoldRecord;
