// 捐赠奖励，收益记录
import React from "react";
import { Modal, Table } from "antd";
import { AddrHandle } from "../utils/tool";
import "../assets/style/componentsStyle/DonationRecord.scss";
import joinTag from '../assets/image/joinTag.png'
import { useTranslation } from "react-i18next";
const { Column } = Table;
function GetRecord(props: any) {
  let { t } = useTranslation()

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
        <p className="title" style={{ marginBottom: '20px' }}> {t("Invitation list")} </p>
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
                <div>{AddrHandle(item.userAddress, 6, 4, ".............")} {item.node && <img src={joinTag} alt="" />}</div>
              </>
            )}
          />

        </Table>
        {/* <span>{t("clickLeave")}</span> */}
      </Modal>
    </>
  );
}
export default GetRecord;
