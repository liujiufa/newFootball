//节点收益记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserAccountDetail } from '../API'
import { dateFormat } from '../utils/tool'
import { useTranslation } from 'react-i18next'
import "../assets/style/componentsStyle/GlodJdSy.scss";
const { Column } = Table;
interface propsType {
  isShow: boolean,
  id: number,
  close: Function
}
const type = ['', 'claim', '獎勵領取', '獎勵發放']
function GlodJdSy(props: propsType) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  let [tableData, setTableData] = useState([])
  useEffect(() => {
    if (state.token && props.id !== -1) {
      getUserAccountDetail(props.id).then(res => {
        console.log(res, '222');
        setTableData(res.data)
      })
    }
  }, [state.token, props.id, props.isShow])

  return (
    <>
      <Modal
        visible={props.isShow}
        className="GlodJdSy"
        centered
        onCancel={() => props.close()}
        width={"525px"}
        closable={false}
        footer={null}
      >
        <p className="title"> {t('Records')} </p>
        <Table
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260, x: 'auto' }}
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
            title={t('Amount')}
            render={(item) => (
              <>
                <div>{item.amount} {item.coinName}</div>
              </>
            )}
          />
          <Column
            title={t('Type')}
            render={(item) => (
              <>
                <div>{t(type[item.type])}</div>
              </>
            )}
          />
        </Table>
      </Modal>
    </>
  );
}
export default GlodJdSy;
