// 捐赠奖励，收益记录
import React from "react";
import { Modal, Table } from "antd";
import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function GetRecord(props: any) {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `OxE123.............dhio`,
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
        <p className="title" style={{ marginBottom: '20px' }}> 邀請列表 </p>
        <Table
          showHeader={false}
          dataSource={data}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            width={140}
            render={(item) => (
              <>
                <div>{item.name}</div>
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
