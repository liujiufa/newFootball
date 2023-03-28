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
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }

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
        <p className="title" > {t("Invitation list")} </p>
        <Table
          // showHeader={false}
          dataSource={props.data}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            title="邀請链接"
            width={140}
            render={(item) => (
              <>
                <div>{AddrHandle(item.userAddress, 6, 4, ".............")} {item.node && <img src={joinTag} alt="" />}</div>
              </>
            )}
          />
          <Column
            title="土地领主"
            width={140}
            render={(item) => (
              <>
                <div>土地领主</div>
              </>
            )}
          />
          <Column
            title="土地下精灵"
            width={140}
            render={(item) => (
              <>
                <div>10</div>
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
