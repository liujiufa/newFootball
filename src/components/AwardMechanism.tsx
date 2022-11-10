// 奖励机制
import React from "react";
import { Modal } from "antd";
import { useTranslation } from 'react-i18next'
import "../assets/style/componentsStyle/AwardMechanism.scss";

interface propsType {
  isShow: boolean;
  close: Function;
}
function AwardMechanism(props: propsType) {
  let { t } = useTranslation()
  return (
    <>
      <Modal
        // visible={true}
        visible={props.isShow}
        className="AwardMechanism"
        onCancel={() => props.close()}
        centered
        width={"449px"}
        closable={false}
        footer={null}
      >
        <p className="title">{t('rules')}</p>
        <p className="zifujg">{t('Hold a common NFT card and get a 12% one-star referral bonus')}</p>
        <p className="zifujg">{t('Hold a uncommon NFT card and get a 2-star 8% referral bonus')}</p>
        <div className="btm"></div>
        <span>{t('Click anywhere to close')}</span>
      </Modal>
    </>
  );
}
export default AwardMechanism;
