// 捐赠奖励，收益记录
import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserAccountDetail } from '../API/index'
import { dateFormat } from '../utils/tool'
import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function GetRecord(props: any) {
  let state = useSelector<stateType, stateType>(state => state);
  const [rewardRecordList, setRewardRecordList] = useState([])
  const web3React = useWeb3React()

  useEffect(() => {
    getUserAccountDetail(3).then((res) => {
      setRewardRecordList(res.data)
    })
  }, [state.token, web3React.account, props.showModal])
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
        <p className="title"> 領取記錄 </p>
        <Table
          dataSource={rewardRecordList}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            title="時間"
            width={140}
            render={(item) => (
              <>
                <div>{item.name}</div>
              </>
            )}
          />
          <Column
            title="金額"
            render={(item) => (
              <>
                <div>{item.amount}</div>
              </>
            )}
          />
          <Column
            title="類型"
            width={140}
            render={(item) => (
              <>
                <div>獎勵領取</div>
              </>
            )}
          />
        </Table>
        <span>點擊任意地方關閉</span>
      </Modal>
    </>
  );
}
export default GetRecord;
