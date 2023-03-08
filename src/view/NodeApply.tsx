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
import copyIcon from "../assets/image/copyIcon.png";
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
  let [showJoinSuccess, setShowJoinSuccess] = useState(false);
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
  const BtnFun = () => {
    return <div className="btn flexCenter">参与</div>
    return <div className="btned flexCenter">已参与</div>
    return <div className="btnEnd flexCenter">已结束</div>
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
            <BtnFun></BtnFun>
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
          <div className="items myItems">
            <div className="item rank">105</div>
            <div className="item address">1111111111</div>
            <div className="item num">5</div>
          </div>
          <div className="content">
            <div className="itemsBox">
              <div className="items ">
                <div className="item rank">10</div>
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
      {/* 成功参与 */}
      <Modal
        visible={false}
        className='nodeJoinModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowJoinSuccess(false) }}>
        <div className="box">
          <div className="tip">
            已成功参与节点，等待活动结束领取代币
          </div>
        </div>
      </Modal>
      {/* 领取 */}
      <Modal
        visible={false}
        className='nodeJoinModal getModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowJoinSuccess(false) }}>
        <div className="box">
          <div className="title">领取</div>
          <div className="tip">
            当前节点申请已结束，恭喜您成功认购100MBAS,回退0151234BNB
          </div>
          <div className="confirm flexCenter">確認</div>
        </div>
      </Modal>
      {/* 已结束 */}
      <Modal
        visible={false}
        className='nodeJoinModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowJoinSuccess(false) }}>
        <div className="box">
          <div className="tip">
            当前节点申请已结束，您已成功领取100MBAS,回退0.151234BNB，<span> 查看</span>
          </div>
        </div>
      </Modal>
      {/* 规则 */}
      <Modal
        visible={false}
        className='nodeJoinModal guide'
        centered
        width={'705px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowJoinSuccess(false) }}>
        <div className="box">
          <div className="title">节点申请</div>
          <div className="tip">
            1、所有参与竞选的用户，均可以0.1USDT/MBAS的价格瓜分100万枚MBAS，瓜分后若有BNB剩余，多余的BNB将会被退回。<br />
            2、邀请好友参与竞选，根据直接邀请成功参与竞选的好友数量进行排行，排行前150名成为创世节点。<br />
            3、排名1-50名创世节点，将额外获得1BNB的MBAS认购额度，并获赠5星土地；排名51-100名创世节点，将额外获得0.6BNB的MBAS认购额度，并获赠4星土地；排名101-150名创世节点，将额外获得0.3BNB的MBAS认购额度，并获赠3星土地;<br />
            4、创世节点MBAS认购价格：0.1USDT/MBAS。<br />
            5、创世节点激活任意等级土地，享有参与节点基金瓜分的权益。<br />
          </div>
        </div>
      </Modal>

    </div >
  );
}
