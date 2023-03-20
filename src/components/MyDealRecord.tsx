// SBL/我的交易记录
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { Modal, Table } from "antd";
import { getOrderStateList } from '../API'
import { dateFormat } from '../utils/tool'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { starLevel, landLevel } from '../config'
import "../assets/style/componentsStyle/MyDealRecord.scss";
const status = ['Put shelf', 'revoke', 'Sold', 'purchase']
const type = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge', 'Land']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
const { Column } = Table;
interface propsType {
  isShow: boolean,
  close: Function
}
function MyDealRecord(props: propsType) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  let [tableData, setTableData] = useState([])
  useEffect(() => {
    if (state.token && props.isShow) {
      getOrderStateList().then(res => {
        setTableData(res.data)
        console.log(res.data, "交易记录")
      })
    }
  }, [state.token, props.isShow])

  return (
    <>
      <Modal
        visible={props.isShow}
        className="MyDealRecord"
        onCancel={() => props.close()}
        centered
        width={"886px"}
        closable={false}
        footer={null}
      >
        <p className="title"> {t('Transaction record')} </p>

        <Table
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260, x: true }}
        >
          <Column
            title={t('Time')}
            render={(item) => (
              <>
                <div>{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title="ID"
            render={(item) => (
              <>
                <div>{item.cardNo}</div>
              </>
            )}
          />
          <Column
            title={t('Grade')}
            render={(item) => (
              <>
                <div>{item.cardType === 0 ? landLevel[item.cardLevel] : starLevel[item.cardLevel]}</div>
              </>
            )}
          />
          <Column
            title={t('Type')}
            render={(item) => (
              <>
                <div>{item.cardType === 0 ? "土地NFT" : "精灵NFT"}</div>
              </>
            )}
          />
          <Column
            title={t('category')}
            render={(item) => (
              <>
                <div>{t(status[item.status])}</div>
              </>
            )}
          />
          <Column
            title={t('Amount')}
            render={(item) => (
              <>
                <div>{item.orderPrice}MBAS</div>
              </>
            )}
          />
        </Table>
      </Modal>
    </>
  );
}
export default MyDealRecord;
