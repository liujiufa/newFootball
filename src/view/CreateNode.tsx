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
import GlodJdSy from '../components/GlodJdSy'
import BigNumber from "big.js";
import desIcon from "../assets/image/desIcon24.png";
import record from "../assets/image/record.png";
import enoughIcon from "../assets/image/enoughIcon.png";
import landImg from "../assets/image/land1.jpg";
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
  let [showGuide, setShowGuide] = useState(false);
  let [confirmBuy, setConfimBuy] = useState(false);
  // 邀请奖励数据
  let [rewardData, setRewardData] = useState<rewardDataType | null>(null);
  /* 用户最高等级 */
  let [MaxLevel, setMaxLevel] = useState(0);
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
  const GetBtnFun = () => {
    return <div className="getBtned flexCenter">已领取</div>
    return <div className="getBtn flexCenter">领取</div>
  }
  const BuyBtnFun = () => {
    return <div className="getBtn flexCenter">领取</div>
    return <div className="getBtned flexCenter">已领取</div>
  }
  return (
    <div className="Edition-Center" id="CreateNode">
      <div className="SwapTitle">创世节点</div>
      <div className="subTitle">恭喜您成为创世节点!您的排名是111</div>
      <div className="Invitation">
        <div className="itemBox">
          <div className="item">
            <div className="imgBox">
              <img src={landImg} alt="" />
              <GetBtnFun></GetBtnFun>
            </div>
          </div>
          <div className="item">
            <div className="des">排名1-50名创世节点，额外获得1BNB的MBAS认购额度，并获赠5星土地；
              排名51-100名创世节点，额外获得0.6BNB的MBAS认购额度，并获赠4星土地；
              排名101-150名创世节点，额外获得0.3BNB的MBAS认购额度，并获赠3星土地。
            </div>
            <div className="list">
              <div className="title">认购额度:</div>
              <div className="value">1BNB</div>
            </div>
            <div className="list">
              <div className="title">认购价格:</div>
              <div className="value">0.1USDT/MBAS</div>
            </div>
            <BuyBtnFun></BuyBtnFun>

          </div>
        </div>
      </div>
      {/* 领取成功 */}
      <Modal
        visible={false}
        className='nodeJoinModal guide'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuide(false) }}>
        <div className="box">
          <div className="tip">
            领取成功!在MBAS中添加LP激活土地，<span>去添加</span>
          </div>
        </div>
      </Modal>
      {/* 成功领取土地 */}
      <Modal
        visible={false}
        className='nodeJoinModal'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuide(false) }}>
        <div className="box">
          <div className="tip">
            已成功认领取5星土地 <span>查看</span>
          </div>
        </div>
      </Modal>
      {/* 认购 */}
      <Modal
        visible={false}
        className='nodeJoinModal getModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfimBuy(false) }}>
        <div className="box">
          <div className="title">认购</div>
          <div className="tip">
            本次认购需支付1BNB,将获得111MBAS
          </div>
          <div className="confirm flexCenter">確認</div>
        </div>
      </Modal>
      {/* 成功认购 */}
      <Modal
        visible={false}
        className='nodeJoinModal'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuide(false) }}>
        <div className="box">
          <div className="tip">
            已成功认购100MBAS（认购价值～1BNB）<span>查看</span>
          </div>
        </div>
      </Modal>
    </div >
  );
}
