// 捐赠奖励，收益记录
import React from "react";
import { Modal, Table } from "antd";
import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function DonationRecord(props: any) {
  const columns = [
    {
      title: "時間",
      dataIndex: "time",
      width: 130,
    },
    {
      title: "銷毀金額SBL",
      dataIndex: "SBLBalance",
    },
    {
      title: "獎勵BNB",
      dataIndex: "BNBReward",
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `2022/05/06 11:40`,
      ID: "2,352,455.4756",
      denji: "10.4156",
    });
  }
  return (
    <>
      <Modal
        visible={props.showModal}
        className="DonationRecord"
        centered
        width={"525px"}
        closable={false}
        footer={null}
      >
        <p className="title"> 銷毀記錄 </p>
        <Table
          dataSource={data}
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
            title="銷毀金額SBL"
            render={(item) => (
              <>
                <div>{item.ID}</div>
              </>
            )}
          />
          <Column
            title="獎勵BNB"
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
export default DonationRecord;
