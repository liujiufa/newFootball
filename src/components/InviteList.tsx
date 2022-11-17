// 捐赠奖励，收益记录
import React from "react";
import { Modal, Table } from "antd";
import { AddrHandle } from "../utils/tool";

import "../assets/style/componentsStyle/DonationRecord.scss";
const { Column } = Table;
function GetRecord(props: any) {

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
        <p className="title" style={{ marginBottom: '20px' }}> 邀請列表 </p>
        <Table
          showHeader={false}
          dataSource={props.data}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            width={140}
            render={(item) => (
              <>
                <div>{AddrHandle(item.userAddress, 6, 4, ".............")}</div>
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
