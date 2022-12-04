// 奖励记录
import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserAccountDetail } from '../API/index'
import { dateFormat } from '../utils/tool'
import "../assets/style/componentsStyle/DonationRecord.scss";
import { useTranslation } from "react-i18next";
const { Column } = Table;
function GetRecord(props: any) {
  let { t } = useTranslation()
  const type = [t('Distribution'), t('Distribution'), t('Distribution'), t('Claim2'), t('Distribution')]
  let state = useSelector<stateType, stateType>(state => state);
  const [rewardRecordList, setRewardRecordList] = useState([])
  const web3React = useWeb3React()

  useEffect(() => {
    if (state.token) {
      getUserAccountDetail(props.id).then((res) => {
        setRewardRecordList(res.data)
        console.log(res.data, '土地奖励');

      })
    }
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
        <p className="title"> {t("Records2")} </p>
        <Table
          dataSource={rewardRecordList}
          pagination={false}
          rowKey="id"
          scroll={{ y: 260 }}
        >
          <Column
            title={t("Time")}
            width={140}
            render={(item) => (
              <>
                <div>{dateFormat('YYYY-mm-dd', new Date(item.createTime))}</div>
              </>
            )}
          />
          <Column
            title={t("Amount")}
            render={(item) => (
              <>
                <div>{item.amount} {item.coinName}</div>
              </>
            )}
          />
          <Column
            title={t("Type")}
            render={(item) => (
              <>
                <div>{type[item.type]}</div>
              </>
            )}
          />
        </Table>
        <span>{t("clickLeave")}</span>
      </Modal>
    </>
  );
}
export default GetRecord;
