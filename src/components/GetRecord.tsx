// 获取销毁奖励领取记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getDrawBurnRecord } from '../API/index'
import { dateFormat } from "../utils/tool";
import "../assets/style/componentsStyle/DonationRecord.scss";
import { useTranslation } from "react-i18next";
import { Content } from "antd/lib/layout/layout";
import { rewardType } from '../config'
const { Column } = Table;
const typeObj = { '3': '收益领取' }
function GetRecord(props: any) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  // 获取销毁奖励领取记录
  let [drawBurnRecord, setDrawBurnRecord] = useState([])
  useEffect(() => {
    if (state.token && props.showModal) {
      getDrawBurnRecord().then(res => {
        setDrawBurnRecord(res.data)
        console.log(res.data, "获取销毁奖励领取记录")
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
        onCancel={() => { props.close() }}
      >
        <p className="title"> {t("Pick up record")} </p>
        <Table
          dataSource={drawBurnRecord}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            title={t("Time")}
            // width={140}
            render={(item) => (
              <>
                <div>{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title={t("Amount BNB")}
            render={(item) => (
              <>
                <div>{item.amountString}</div>
              </>
            )}
          />
          <Column
            title={t("Type")}
            // width={140}
            render={(item) => (
              <>
                <div>{t(rewardType[item.type])}</div>
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
