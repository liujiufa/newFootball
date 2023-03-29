import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import "../assets/style/PurchaseBox.scss";
interface PurchasePropsType {
  isShow: boolean;
  close: Function;
}
function PurchaseBox(props: PurchasePropsType) {
  let { t } = useTranslation();
  return (
    <>
      <Modal
        visible={props.isShow}
        className="PurchaseModal"
        centered
        onCancel={() => props.close()}
        maskClosable
        width={"449px"}
        closable={false}
        footer={null}
      >
        <div className="Title">{t("buySuccess")}</div>
        <div className="Tip">{t("Tipx")}</div>
        <div className="Handle">
          <div className="Button">
            <div className="Open flex" onClick={() => props.close()}>
              {t("Confirm")}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default PurchaseBox;
