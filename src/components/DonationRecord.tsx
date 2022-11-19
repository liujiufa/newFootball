// 捐赠（销毁）记录，收益记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getBurnRecord } from '../API/index'
import { dateFormat } from "../utils/tool";
import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function DonationRecord(props: any) {
  let state = useSelector<stateType, stateType>(state => state);
  let [donationRecord, setDonationRecord] = useState([])

  useEffect(() => {
    if (state.token && props.showModal) {
      getBurnRecord().then(res => {
        setDonationRecord(res.data)
        console.log(res.data, "销毁记录")
      })
    }
  }, [state.token, props.showModal])

  return (
    <>
      <Modal
        visible={props.showModal}
        className="DonationRecord"
        centered
        width={"525px"}
        closable={false}
        footer={null}
        onCancel={() => props.close()}
      >
        <p className="title"> 銷毀記錄 </p>
        <Table
          dataSource={donationRecord}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            title="時間"
            width={140}
            render={(item) => (
              <>
                {/* <div>{item.createTime}</div> */}
                <div>{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title="銷毀金額SBL"
            render={(item) => (
              <>
                <div>{item.burnAmount}</div>
              </>
            )}
          />
          <Column
            title="獎勵BNB"
            width={140}
            className='rewardBNB'
            render={(item) => (
              <>
                <div>{item.awardAmount}</div>
              </>
            )}
          />
        </Table>
        <span>點擊任意地方關閉</span>
      </Modal>
    </>
  );
}
export default DonationRecord;
