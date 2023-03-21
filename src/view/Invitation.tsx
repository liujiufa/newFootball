import React, { useEffect, useState, useRef } from "react";
import {
  getUserReferee,
  getHomeLand,
  getUserAccountList,
  getCardUserMaxLevelInfo,
  userDrawAward,
  userCancelDrawAward,
} from "../API";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { stateType } from "../store/reducer";
import { useWeb3React } from "@web3-react/core";
import { addMessage, AddrHandle, NumSplic, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
import BigNumber from "big.js";
import GainRecording from "../components/GainRecording";
import InviteList from "../components/InviteList";
import BNBIcon from "../assets/image/BNBIcon.svg";
import SBLToken from "../assets/image/SBLIcon.png";
import copyIcon from "../assets/image/copyIcon.png";
import mechanism from "../assets/image/mechanism.png";
import Refresh from "../assets/image/Refresh.png";
import record from "../assets/image/record.png";
import inviteListIcon from "../assets/image/inviteListIcon.png";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import "../assets/style/Invitation.scss";
import "../assets/style/componentsStyle/MyDealRecord.scss";
import "../assets/style/componentsStyle/Reward.scss";
import { type } from "@testing-library/user-event/dist/type";
import { getRefereeUserAccount } from '../API/index'
interface InvitationItem {
  userAddress: string;
  id: number;
}
// interface InvitationType {
//   list: InvitationItem[];
//   refereeAddress: string;
//   size: number;
// }
interface refereeData {
  id: number;
  amount: number;
  amountString: string;
  coinName: string;
}
interface landDataType {
  status: number;
  level: number;
  imageUrl?: string;
}
interface rewardDataType {
  amount: number,
  amountString: string,
  coinName: string,
  createTime: string,
  freezeAmount: number,
  id: number,
  totalAmount: number,
  type: number,
  updateTime: string,
  userAddress: string,
  userId: number
}
const tokenIcon: { [key: string]: string } = {
  SBL: SBLToken,
  BNB: BNBIcon,
};
const recommend = ["My tier1", "My tier2", "My tier3"];

const teamreward = [
  "My tier1",
  "My tier1",
  "My tier1",
  "sports center1",
  "sports center2",
  "sports center3",
  "sports center4",
  "sports center5",
];
const level = [
  {
    text: "Outstanding",
    color: "#43ADFF",
  },
  {
    text: "Outstanding",
    color: "#43ADFF",
  },
  {
    text: "Outstanding",
    color: "#43ADFF",
  },
  {
    text: "Outstanding",
    color: "#43ADFF",
  },
  {
    text: "Rare",
    color: "#B351FC",
  },
  {
    text: "Perfect",
    color: "#FF9547",
  },
  {
    text: "Epic",
    color: "#ED1C40",
  },
  {
    text: "Legend",
    color: "#FCDB40",
  },
];
export default function Invitation() {
  let location = useLocation();
  //   console.log(location.state);
  let { t } = useTranslation();
  let state = useSelector<stateType, stateType>((state) => state);
  // 邀请列表数据
  let [InvitationData, setInvitationTypeDate] = useState<any>(null);
  // 邀请列表数据弹窗
  let [inviteModal, setInviteModal] = useState(false);
  /* 奖励记录类型 */
  let [RevenueType, setRevenueType] = useState(0);
  /* 邀请奖励机制弹窗控制 */
  let [ShowRevenueRecord, setShowRevenueRecord] = useState(false);
  // 邀请奖励数据
  let [rewardData, setRewardData] = useState<rewardDataType | null>(null);
  const web3React = useWeb3React();
  const timeoutRef = useRef(0);
  //   console.log(TabIndex, "TabIndex");
  useEffect(() => {
    if (state.token) {
      // 邀请奖励
      getRefereeUserAccount().then((res) => {
        console.log(res.data, '邀请奖励');
        setRewardData(res.data);
      });
      // 邀请列表
      getUserReferee().then((res) => {
        console.log(res, '邀请列表');
        setInvitationTypeDate(res.data);
      });
    }
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [state.token]);
  function invitation() {
    if (!web3React.account) {
      return addMessage(t("Please connect Wallet"));
    } else {
      copy(
        window.location.origin +
        window.location.pathname +
        "?address=" +
        web3React.account
      );
      addMessage(t("Copy Success"));
    }
  }

  function ShowRevenueRecordFun(type: number) {
    console.log(type);
    setRevenueType(type);
    setShowRevenueRecord(true);
  }

  function Receive(type: number, id: number, amount: string) {
    if (!web3React.account) {
      return addMessage(t("Please connect Wallet"));
    }
    if (new BigNumber(amount).lte(0)) {
      return addMessage(t("No collectable quantity"));
    }
    userDrawAward({
      type,
      id,
    }).then((res: any) => {
      if (res.data) {
        showLoding(true)
        Contracts.example.getInviteReward(web3React.account as string, res.data)
          .then((res: any) => {
              addMessage(t('Receive success'))
              timeoutRef.current = window.setTimeout(() => {
                getRefereeUserAccount().then((res) => {
                  console.log(res.data, '邀请奖励');
                  setRewardData(res.data);
                });
              }, 5000);
            }, (err: any) => {
              if (err.code === 4001) {
                userCancelDrawAward({ type, id }).then((res) => {
                  addMessage(t('Cancellation received successfully'))
                });
              }
            }
          ).finally(() => {
            showLoding(false)
          });
      } else {
        addMessage(res.msg);
      }
    });
  }
  return (
    <div className="Edition-Center">
      <div className="SwapTitle">{t("Invitation")}</div>
      <div className="Invitation">

        <div className="itemBox">
          <div className="itemTitle">{t("Referral Rewards")}</div>
          <div className="allRewardBox">
            <div className="allReward">
              <span>{t("Cumulative rewards")}：</span><span>{NumSplic(`${rewardData?.totalAmount}`, 4) || "0"} {rewardData?.coinName || "SBL"}</span>
            </div>
            <div className="getBox"></div>
          </div>
          <div className="inputBox">
            <div className="inputValue">
              <span className="inputValueStyle">{NumSplic(`${rewardData?.amountString}`, 4) || "0"}</span>
              <span>
                <img src={SBLToken} alt="" />{rewardData?.coinName || "SBL"}
              </span>
            </div>
            <div className="getBox"><div className="getBtn flex" onClick={() => Receive(1, rewardData?.id as number, `${rewardData?.amount}`)}>{t("Harvest")}</div></div>
          </div>
          <div className="rewardRecord" onClick={() => ShowRevenueRecordFun(1)}>{t("Records2")}<img src={record} alt="" /></div>
        </div>

        <div className="itemBox">
          <div className="itemTitle">{t("Send your invite link")}</div>
          <div className="itemTip">複製併使用此鏈接，邀請您的朋友加入Meta Base ，一起探索無限精彩的元宇宙世界。建立自己的Meta Base 家族！</div>
          <div className="addressBox">
            <div className="referee" >{t("Invite link")}</div>
            <div className="addressValue">
              {window.location.origin +
                window.location.pathname +
                "?address=" +
                AddrHandle(web3React.account as string)}
            </div>
            <div className="devideLine"></div>
            <div className="copyBtn" onClick={invitation}><img src={copyIcon} alt="" /></div>
          </div>
          {/* <div className="inviteListBtn" onClick={() => { setInviteModal(true) }}>邀請列表({InvitationData ? 0 : (InvitationData?.list.length - 1)}) <img src={inviteListIcon} alt="" /></div> */}
          <div className="inviteListBtn" onClick={() => { setInviteModal(true) }}>{t("Invitation list")}({InvitationData?.length}) <img src={inviteListIcon} alt="" /></div>
        </div>
      </div>
      {/* 奖励记录 */}
      <GainRecording
        isShow={ShowRevenueRecord}
        type={RevenueType}
        close={() => setShowRevenueRecord(false)}
      ></GainRecording>
      {/* 邀请列表 */}
      <InviteList data={InvitationData} showModal={inviteModal} close={() => setInviteModal(false)}></InviteList>
    </div >
  );
}
