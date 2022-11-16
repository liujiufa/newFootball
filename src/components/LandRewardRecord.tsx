// 奖励记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'

import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function GetRecord(props: any) {
  let state = useSelector<stateType, stateType>(state => state);
  const [rewardRecordList, setRewardRecordList] = useState([])
  const web3React = useWeb3React()

  useEffect(() => {

  }, [state.token, web3React.account, props.showModal])
  return (
    <>
      <Modal
        visible={props.showModal}
        className="DonationRecord"
        centered
        width={"705px"}
        closable={false}
        footer={null}
        onCancel={() => { props.close() }}
      >
        <p className="title"> 獎勵記錄 </p>
        <Table
          // dataSource={ }
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
            title="金額(SBL)"
            render={(item) => (
              <>
                <div>{item.ID}</div>
              </>
            )}
          />
          <Column
            title="類型"
            render={(item) => (
              <>
                <div>{item.denji}</div>
              </>
            )}
          />
          <Column
            title="類別"
            width={140}
            render={(item) => (
              <>
                <div>{item.denji}</div>
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
