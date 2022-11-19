//推荐 收益记录
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { Modal, Table } from "antd";
import { dateFormat } from '../utils/tool'
import { getUserAccountDetail } from '../API'
import "../assets/style/componentsStyle/GainRecording.scss";
import { t } from "i18next";
const { Column } = Table;
interface propsType {
  isShow: boolean,
  type: number,
  close: Function
}
const type = ['奖励发放', '奖励发放', '奖励发放', 'Claim2', '奖励发放']
function GainRecording(props: propsType) {
  let state = useSelector<stateType, stateType>(state => state);
  let [recordData, setrecordData] = useState([])
  useEffect(() => {
    if (state.token && props.type) {
      getUserAccountDetail(props.type).then(res => {
        setrecordData(res.data)
        console.log(res.data, '邀请奖励记录');

      })
    }
  }, [state.token, props.type])

  return (
    <>
      <Modal
        visible={props.isShow}
        className="GainRecording"
        onCancel={() => props.close()}
        centered
        width={"525px"}
        closable={false}
        footer={null}
      >
        <p className="title"> {t('Records2')} </p>
        <Table
          dataSource={recordData}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260, x: 'auto' }}
        >
          <Column
            title={t('Time')}
            // width={140}
            render={(item) => (
              <>
                <div className="nowrap">{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title={t('Amount')}
            render={(item) => (
              <>
                <div className="nowrap">{item.amountString} {item.coinName}</div>
              </>
            )}
          />
          <Column
            title={t('Type')}
            render={(item) => (
              <>
                <div className="nowrap">{t(type[item.type])}</div>
              </>
            )}
          />
        </Table>
        <span>{t('Click anywhere to close')}</span>
      </Modal>
    </>
  );
}
export default GainRecording;
