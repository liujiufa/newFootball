import React, { useEffect, useState } from "react";
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
import { addMessage, AddrHandle } from "../utils/tool";
import { Contracts } from "../web3";
import BigNumber from "big.js";
import GainRecording from "../components/GainRecording";
import InviteList from "../components/InviteList";
import BNBIcon from "../assets/image/BNBIcon.svg";
import SBLToken from "../assets/image/SBL.svg";
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
interface InvitationType {
  list: InvitationItem[];
  refereeAddress: string;
  size: number;
}
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
  let [InvitationData, setInvitationTypeDate] = useState<InvitationType | null>(null);


  let [landData, setLandData] = useState<landDataType | null>(null);
  let [TabIndex, setTabIndex] = useState(0);
  // 邀请列表数据弹窗
  let [inviteModal, setInviteModal] = useState(false);
  let [InviTabIndex, setInviTabIndex] = useState(0);
  /* 奖励记录类型 */
  let [RevenueType, setRevenueType] = useState(0);
  let [heavyLoad, setHeavyLoad] = useState(false);
  /* 邀请奖励机制弹窗控制 */
  let [ShowRevenueRecord, setShowRevenueRecord] = useState(false);
  let [teamHeavyLoad, setteamHeavyLoad] = useState(false);
  /* 邀请奖励机制弹窗控制 */
  let [ShowInvitationrewardMech, setShowInvitationrewardMech] = useState(false);
  // 邀请奖励数据
  let [rewardData, setRewardData] = useState<rewardDataType | null>(null);
  /* 用户最高等级 */
  let [MaxLevel, setMaxLevel] = useState(0);
  let [showObtainMethod, setShowObtainMethod] = useState(false);
  const web3React = useWeb3React();
  //   console.log(TabIndex, "TabIndex");
  useEffect(() => {
    if (state.token) {
      // 邀请奖励
      getRefereeUserAccount().then((res) => {
        console.log(res.data, '邀请奖励');
        setRewardData(res.data);
      });


      getCardUserMaxLevelInfo().then((res) => {
        setMaxLevel(res.data);
      });
      // 邀请列表
      getUserReferee().then((res) => {
        console.log(res);
        setInvitationTypeDate(res.data);
      });
      getHomeLand().then((res) => {
        console.log(res);
        setLandData(res.data);
      });
    }
  }, [state.token]);
  let [touteid] = useState(location.state);

  useEffect(() => {
    // console.log(touteid);
    if (touteid && rewardData && landData) {
      setTabIndex(1);
    }
  }, [rewardData, landData]);

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
  function getMaxLevel(type: number) {
    if (type === 0) {
      setHeavyLoad(true);
      setTimeout(() => {
        setHeavyLoad(false);
      }, 1000);
    }
    if (type === 1) {
      setteamHeavyLoad(true);
      setTimeout(() => {
        setteamHeavyLoad(false);
      }, 1000);
    }
    setTimeout(() => {
      setHeavyLoad(false);
    }, 1000);
    getCardUserMaxLevelInfo().then((res) => {
      setMaxLevel(res.data);
    });
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
        Contracts.example
          .getAward(web3React.account as string, res.data, type)
          .then(
            (res: any) => {
              getUserAccountList().then((res) => {
                setRewardData(res.data);
              });
              getCardUserMaxLevelInfo().then((res) => {
                setMaxLevel(res.data);
              });
            },
            (err: any) => {
              if (err.code === 4001) {
                userCancelDrawAward({ type, id });
              }
            }
          );
      } else {
        addMessage(res.msg);
      }
    });
  }
  return (
    <div className="Edition-Center">
      <div className="SwapTitle">{t("Invitation")}</div>
      <div className="Invitation">
        {rewardData && <div className="itemBox">
          <div className="itemTitle">邀請獎勵</div>
          <div className="allRewardBox">
            <div className="allReward">
              <span>纍計獎勵：</span><span>{rewardData.totalAmount} {rewardData.coinName}</span>
            </div>
            <div className="getBox"></div>
          </div>
          <div className="inputBox">
            <div className="inputValue">
              <span>{rewardData.amount}</span>
              <span>
                <img src={SBLToken} alt="" />{rewardData.coinName}
              </span>
            </div>
            <div className="getBox"><div className="getBtn flex">領取</div></div>
          </div>
          <div className="rewardRecord" onClick={() => ShowRevenueRecordFun(1)}>獎勵記錄<img src={record} alt="" /></div>
        </div>}
        {web3React.account && <div className="itemBox">
          <div className="itemTitle">發送您的邀請鏈接</div>
          <div className="itemTip">複製併使用此鏈接，邀請您的朋友加入Space Ball ，一起探索無限精彩的元宇宙世界。建立自己的Space Ball家族！</div>
          <div className="addressBox">
            <div className="referee" >邀請鏈接</div>
            <div className="addressValue">
              {window.location.origin +
                window.location.pathname +
                "?address=" +
                AddrHandle(web3React.account)}
            </div>
            <div className="devideLine"></div>
            <div className="copyBtn" onClick={invitation}><img src={copyIcon} alt="" /></div>
          </div>
          {/* <div className="inviteListBtn" onClick={() => { setInviteModal(true) }}>邀請列表({InvitationData ? 0 : (InvitationData?.list.length - 1)}) <img src={inviteListIcon} alt="" /></div> */}
          <div className="inviteListBtn" onClick={() => { setInviteModal(true) }}>邀請列表({InvitationData?.list.length}) <img src={inviteListIcon} alt="" /></div>
        </div>}
      </div>
      {/* 奖励记录 */}
      <GainRecording
        isShow={ShowRevenueRecord}
        type={RevenueType}
        close={() => setShowRevenueRecord(false)}
      ></GainRecording>
      {/* 邀请列表 */}
      <InviteList data={InvitationData?.list} showModal={inviteModal} close={() => setInviteModal(false)}></InviteList>
    </div >
  );
}
