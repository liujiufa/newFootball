// 捐赠奖励，收益记录
import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserAccountDetail } from '../API/index'
import { dateFormat } from '../utils/tool'
import { rewardType } from '../config'
import "../assets/style/componentsStyle/DonationRecord.scss";
import { useTranslation } from "react-i18next";
const { Column } = Table;
function GetRecord(props: any) {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const [rewardRecordList, setRewardRecordList] = useState([])
  const web3React = useWeb3React()

  useEffect(() => {
    if (state.token) {
      getUserAccountDetail(3).then((res) => {
        setRewardRecordList(res.data)
      })
    }
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
        <p className="title"> {t("Pick up record")} </p>
        <Table
          dataSource={rewardRecordList}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260, x: 450 }}
        >
          <Column
            title={t("Time")}
            width={140}
            render={(item) => (
              <>
                <div>{dateFormat('YYYY-mm-dd HH:MM', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title={t("Amount")}
            render={(item) => (
              <>
                <div>{item.amount}MBAS</div>
              </>
            )}
          />
          <Column
            title={t("Type")}
            width={140}
            render={(item) => (
              <>
                <div>{rewardType[item.type]}</div>
              </>
            )}
          />
        </Table>
      </Modal>
    </>
  );
}
export default GetRecord;
