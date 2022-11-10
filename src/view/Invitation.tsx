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
import AwardMechanism from "../components/AwardMechanism";
import GainRecording from "../components/GainRecording";
import TeamMachine from "../components/TeamMachine";
import BNBIcon from "../assets/image/BNBIcon.svg";
import SBLToken from "../assets/image/SBL.svg";
import copyIcon from "../assets/image/copyIcon.png";
import mechanism from "../assets/image/mechanism.png";
import Refresh from "../assets/image/Refresh.png";
import record from "../assets/image/record.png";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import "../assets/style/Invitation.scss";
import "../assets/style/componentsStyle/MyDealRecord.scss";
import "../assets/style/componentsStyle/Reward.scss";
import { type } from "@testing-library/user-event/dist/type";
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
interface rewardDataType {
  refereeList: refereeData[];
  teamList: refereeData[];
}
interface landDataType {
  status: number;
  level: number;
  imageUrl?: string;
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
  let [InvitationData, setInvitationTypeDate] = useState<InvitationType | null>(
    null
  );
  let [landData, setLandData] = useState<landDataType | null>(null);
  let [TabIndex, setTabIndex] = useState(0);
  /* 团队奖励机制弹窗控制 */
  let [showTeamMachine, setShowTeamMachine] = useState(false);
  let [InviTabIndex, setInviTabIndex] = useState(0);
  /* 奖励弹窗类型 */
  let [RevenueType, setRevenueType] = useState(0);
  let [heavyLoad, setHeavyLoad] = useState(false);
  /* 邀请奖励机制弹窗控制 */
  let [ShowRevenueRecord, setShowRevenueRecord] = useState(false);
  let [teamHeavyLoad, setteamHeavyLoad] = useState(false);
  /* 邀请奖励机制弹窗控制 */
  let [ShowInvitationrewardMech, setShowInvitationrewardMech] = useState(false);
  let [rewardData, setRewardData] = useState<rewardDataType | null>(null);
  /* 用户最高等级 */
  let [MaxLevel, setMaxLevel] = useState(0);
  let [showObtainMethod, setShowObtainMethod] = useState(false);
  const web3React = useWeb3React();
  //   console.log(TabIndex, "TabIndex");
  useEffect(() => {
    if (state.token) {
      getUserAccountList().then((res) => {
        console.log(res);
        setRewardData(res.data);
      });
      getCardUserMaxLevelInfo().then((res) => {
        setMaxLevel(res.data);
      });
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
      <div className="TabRow">
        <div
          className={
            TabIndex === 0
              ? "TabItem linear-gradient"
              : "TabItem InvitationInvalid"
          }
          onClick={() => {
            setTabIndex(0);
          }}
        >
          {t("Invitation")}
        </div>
        <div
          className={
            TabIndex === 1
              ? "TabItem linear-gradient"
              : "TabItem InvitationInvalid"
          }
          onClick={() => {
            setTabIndex(1);
          }}
        >
          {t("Family land")}
        </div>
      </div>
      {TabIndex === 0 ? (
        <>
          <div className="RewardLabel">{t("Referral Rewards")}</div>
          {rewardData && (
            <div className="RewardItem">
              {rewardData.refereeList.map((item) => (
                <div key={item.id} className="RewardRow">
                  <div className="RewardNum">
                    {item.amountString}
                    <div className="TokenInfo">
                      <img src={tokenIcon[item.coinName]} alt="" />
                      {item.coinName}
                    </div>
                  </div>
                  <div
                    className="receiveBtn linear-gradient flexCenter"
                    onClick={() => Receive(1, item.id, item.amountString)}
                  >
                    {t("Claim")}
                  </div>
                </div>
              ))}
              <div className="RewardExplain">
                {t("My tier")}:
                {MaxLevel >= 2 ? t(recommend[2]) : t(recommend[MaxLevel])}{" "}
                <img
                  src={Refresh}
                  className={heavyLoad ? "imgRotate" : ""}
                  onClick={() => {
                    getMaxLevel(0);
                  }}
                  alt=""
                />
              </div>
              <span
                className="mechanism"
                onClick={() => {
                  setShowInvitationrewardMech(true);
                }}
              >
                {t("rules")} <img src={mechanism} alt="" />
              </span>
              <span className="record" onClick={() => ShowRevenueRecordFun(1)}>
                {t("Records2")} <img src={record} alt="" />
              </span>
            </div>
          )}
          <div className="InvitationLabel">{t("Send your referral link")}</div>
          <div className="InvitationRule">{t("CopyReferralTips")}</div>
          <div className="BoxBorder" style={{ marginTop: 10 }}>
            <div className="InvitationAddr">
              <div className="boxLabel">{t("Invitation")}</div>
              <div className="userAddr" onClick={invitation}>
                {web3React.account && (
                  <div className="link">
                    <div className="linkAddr">
                      {window.location.origin +
                        window.location.pathname +
                        "?address=" +
                        AddrHandle(web3React.account)}
                    </div>
                    <div className="division"></div>
                    <img src={copyIcon} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="BoxBorder" style={{ marginTop: 20 }}>
            <div className="InvitationAddr">
              <div className="boxLabel">
                <div
                  className="labelItem"
                  style={{ marginRight: 30 }}
                  onClick={() => {
                    setInviTabIndex(0);
                  }}
                >
                  {t("Invitation list")}
                </div>
              </div>
              {/* <div className="boxLabel"> {t('Referral')} <div className="InvitationNum flexCenter">{t('Referrals')}:{InvitationData?.size}{t('ren')}</div></div> */}
              {
                <ul className="InvitationList">
                  {InvitationData?.list.map((item, index) => (
                    <li key={item.id}>
                      {AddrHandle(item.userAddress, 6, 4, ".............")}
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        </>
      ) : (
        <div className="land">
          <div className="RewardLabel">{t("Community rewards")}</div>
          {rewardData && (
            <div className="RewardItem">
              {rewardData.teamList.map((item) => (
                <div key={item.id} className="RewardRow">
                  <div className="RewardNum">
                    {item.amountString}
                    <div className="TokenInfo">
                      <img src={tokenIcon[item.coinName]} alt="" />
                      {item.coinName}
                    </div>
                  </div>
                  <div
                    className="receiveBtn linear-gradient flexCenter"
                    onClick={() => Receive(2, item.id, item.amountString)}
                  >
                    {t("Claim")}
                  </div>
                </div>
              ))}
              <div className="RewardExplain">
                {t("My tier")}:{t(teamreward[MaxLevel])}{" "}
                <img
                  src={Refresh}
                  className={teamHeavyLoad ? "imgRotate" : ""}
                  onClick={() => {
                    getMaxLevel(1);
                  }}
                  alt=""
                />
              </div>
              <span
                className="mechanism"
                onClick={() => {
                  setShowTeamMachine(true);
                }}
              >
                {t("Reward rules")} <img src={mechanism} alt="" />
              </span>
              <span className="record" onClick={() => ShowRevenueRecordFun(2)}>
                {t("Records2")} <img src={record} alt="" />
              </span>
            </div>
          )}
          <div
            className="InvitationLabel"
            onClick={() => {
              setShowObtainMethod(true);
            }}
          >
            {t("How to obtain family land")}{" "}
            <span className="prominent">?</span>
          </div>
          {landData?.status === 0 && !landData?.imageUrl ? (
            <div className="OperationTips">
              {t("Obtain method")}:<br></br>
              1、{t("Obtain method1")}
              <br></br>
              2、{t("Obtain method2")}
              <br></br>
              3、{t("Obtain method3")}
              <br></br>
              4、{t("Obtain method4")}
              <br></br>
              5、{t("Obtain method5")}
              <br></br>
            </div>
          ) : (
            <div className="imgBox">
              <img src={landData?.imageUrl} alt="" />
              <div
                style={{ color: level[landData?.level as number].color }}
                className="levelText"
              >
                {t(level[landData?.level as number].text)}
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        visible={showObtainMethod}
        className="MyDealRecord"
        onCancel={() => setShowObtainMethod(false)}
        centered
        width={"634px"}
        closable={false}
        footer={null}
      >
        <p className="title"> {t("Obtain method")} </p>
        <div className="ObtainMethodItem">
          1、{t("Obtain method1")}
          <br></br>
          2、{t("Obtain method2")}
          <br></br>
          3、{t("Obtain method3")}
          <br></br>
          4、{t("Obtain method4")}
          <br></br>
          5、{t("Obtain method5")}
          <br></br>
        </div>
        <span>{t("Click anywhere to close")}</span>
      </Modal>
      {/* 推荐奖励机制 */}
      <AwardMechanism
        isShow={ShowInvitationrewardMech}
        close={() => setShowInvitationrewardMech(false)}
      ></AwardMechanism>
      {/* 奖励记录 */}
      <GainRecording
        isShow={ShowRevenueRecord}
        type={RevenueType}
        close={() => setShowRevenueRecord(false)}
      ></GainRecording>
      {/* 团队奖励机制 */}
      <TeamMachine
        isShow={showTeamMachine}
        close={() => setShowTeamMachine(false)}
      ></TeamMachine>
    </div>
  );
}
