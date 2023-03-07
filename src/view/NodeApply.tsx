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
import SBLToken from "../assets/image/SBL.png";
import copyIcon from "../assets/image/copyIcon.png";
import mechanism from "../assets/image/mechanism.png";
import Refresh from "../assets/image/Refresh.png";
import record from "../assets/image/record.png";
import inviteListIcon from "../assets/image/inviteListIcon.png";
import ableInviteIcon from "../assets/image/ableInviteIcon.png";
import nodeAction from "../assets/image/nodeAction.png";
import rankIcon from "../assets/image/rankIcon.png";
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
  const timeoutRef = useRef(0);
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
    return () => {
      clearTimeout(timeoutRef.current)
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
        showLoding(true)
        Contracts.example
          .getInviteReward(web3React.account as string, res.data)
          .then(
            (res: any) => {
              addMessage(t('Receive success'))
              timeoutRef.current = window.setTimeout(() => {
                // getUserAccountList().then((res) => {
                //   setRewardData(res.data);
                // });
                getCardUserMaxLevelInfo().then((res) => {
                  setMaxLevel(res.data);
                });
                getRefereeUserAccount().then((res) => {
                  console.log(res.data, '邀请奖励');
                  setRewardData(res.data);
                });
              }, 5000);

            },
            (err: any) => {
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
    <div className="Edition-Center" id="NodeApply">
      <div className="SwapTitle">节点申请</div>
      <div className="subTitle">活动时间: 2022.04.05 18: 06-2022.05.05 18: 06</div>

      <div className="Invitation">

        <div className="itemBox">
          <div className="itemTip">
            节点申请介绍:支付0.2BNB参与节点竞选，共同瓜分100万枚MBAS。邀请好友参与，邀请排名前150名，成为创世节点，获得额外认购额度并获赠星级土地奖励，解锁身份特权。 <span>查看更多</span></div>
          <div className="addressBox">
            <div className="referee" >我的邀请链接：</div>
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
          <div className="inviteListBtn" onClick={() => { setInviteModal(true) }}>有效邀请:5 <img src={ableInviteIcon} alt="" /></div>
        </div>

        <div className="itemBox nodeAction">
          <div className="topContent">
            {true ? <img src={nodeAction} alt="" /> : <div className="noNodeAction">
              <div className="tip">活动时间: 2022.04.05 18: 06-2022.05.05 18: 06</div>
            </div>}
          </div>
          <div className="bottomContent">
            <div className="price">支付 0.2BNB 瓜分100万枚MBAS</div>
            <div className="btn flexCenter">参与</div>
          </div>
        </div>
      </div>

      <div className="nodeRank">
        <div className="nodeTitle">
          <img src={rankIcon} alt="" />创世节点排行
        </div>
        <div className="nodeContent">
          <div className="items title">
            <div className="item rank">排行</div>
            <div className="item address">地址</div>
            <div className="item num">邀请数量</div>
          </div>
          <div className="content">
            <div className="items myItems">
              <div className="item rank">105</div>
              <div className="item address">1111111111</div>
              <div className="item num">5</div>
            </div>
            <div className="itemsBox">
              <div className="items ">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items oddItems">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
              <div className="items">
                <div className="item rank">105</div>
                <div className="item address">0xsdfdfuhdosadhudfgjvbncb546454872r2gefdhfdj</div>
                <div className="item num">5</div>
              </div>
            </div>
          </div>
        </div>
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
