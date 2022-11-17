// 奖励记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserAccountDetail } from '../API/index'
import { dateFormat } from '../utils/tool'
import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
const type = ['奖励发放', '奖励发放', '奖励发放', 'Claim2', '奖励发放']
function GetRecord(props: any) {
  let state = useSelector<stateType, stateType>(state => state);
  const [rewardRecordList, setRewardRecordList] = useState([])
  const web3React = useWeb3React()

  useEffect(() => {
    getUserAccountDetail(props.id).then((res) => {
      setRewardRecordList(res.data)
    })
  }, [state.token, web3React.account, props.showModal, props.id])
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
                <div>{dateFormat('YYYY-mm-dd', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title="金額"
            render={(item) => (
              <>
                <div>{item.amount} {item.coinName}</div>
              </>
            )}
          />
          <Column
            title="類型"
            render={(item) => (
              <>
                <div>{type[item.type]}</div>
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
