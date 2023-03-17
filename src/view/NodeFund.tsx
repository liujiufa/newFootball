import React, { useEffect, useState, useRef } from "react";
import {
  qualifiedNode,
  getCardUserMaxLevelInfo,
  drawNodeFund,
  userCancelDrawAward,
  nodeFund
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
import GainRecording from "../components/GainRecording";
import InviteList from "../components/InviteList";
import BNBIcon from "../assets/image/BNBIcon.svg";
import SBLToken from "../assets/image/SBLIcon.png";
import copyIcon from "../assets/image/copyIcon.png";
import mechanism from "../assets/image/mechanism.png";
import desIcon from "../assets/image/desIcon24.png";
import record from "../assets/image/record.png";
import enoughIcon from "../assets/image/enoughIcon.png";
import noEnoughIcon from "../assets/image/noEnoughIcon.png";
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
  let [landData, setLandData] = useState<landDataType | null>(null);
  let [TabIndex, setTabIndex] = useState(0);
  let [showGuide, setShowGuide] = useState(false);
  let [showProfit, setShowProfit] = useState(false)
  let [ProfitId, setProfitId] = useState(-1)
  /* 邀请奖励机制弹窗控制 */
  let [ShowRevenueRecord, setShowRevenueRecord] = useState(false);
  let [rewardData, setRewardData] = useState<rewardDataType | null>(null);
  let [nodeData, setNodeData] = useState<any>(null);
  let [nodeAwardData, setNodeAwardData] = useState<any>(null);
  /* 用户最高等级 */
  let [MaxLevel, setMaxLevel] = useState(0);
  const web3React = useWeb3React();
  const timeoutRef = useRef(0);
  //   console.log(TabIndex, "TabIndex");
  useEffect(() => {
    if (state.token) {
      // 邀请奖励
      qualifiedNode().then((res) => {
        console.log(res.data, '节点');
        setNodeData(res.data);
      });
      nodeFund().then((res: any) => {
        console.log(res.data, '奖励');
        setNodeAwardData(res.data);
      });
    }
  }, [state.token]);


  function Receive(amount: string) {
    if (!web3React.account) {
      return addMessage(t("Please connect Wallet"));
    }
    if (new BigNumber(amount).lte(0)) {
      return addMessage(t("No collectable quantity"));
    }
    drawNodeFund({
    }).then((res: any) => {
      console.log(res);
      if (res.data) {
        showLoding(true)
        Contracts.example.getNodeFundAward(web3React.account as string, res.data.data).then((res: any) => {
          addMessage(t('Receive success'))
          timeoutRef.current = window.setTimeout(() => {
            nodeFund().then((res: any) => {
              console.log(res.data, '奖励');
              setNodeAwardData(res.data);
            });
          }, 5000);

        },
          (err: any) => {
            if (err.code === 4001) {
              // userCancelDrawAward({ type, id }).then((res) => {
              //   addMessage(t('Cancellation received successfully'))
              // });
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
  const NodeState = () => {
    if (nodeData?.nodeOrLand && nodeData?.is_activation && nodeData?.yesterdayRanking > 0) {
      return <span>是</span>
    } else {
      return <span>否</span>
    }
  }

  return (
    <div className="Edition-Center" id="NodeFund">
      <div className="SwapTitle">节点基金</div>
      <div className="Invitation">
        <div className="itemBox">
          <div className="titleBox">
            <div className="title">达标节点：<NodeState></NodeState></div>
            <div className="titleIcon"><img src={desIcon} onClick={() => { setShowGuide(true) }} alt="" /></div>
          </div>
          <div className="content">
            <div className="items">
              <div className="item"><img src={nodeData?.nodeOrLand ? enoughIcon : noEnoughIcon} alt="" /><div> 持有土地的创世节点/持有五星土地</div></div>
              <div className="item"><img src={nodeData?.is_activation ? enoughIcon : noEnoughIcon} alt="" /><div> 土地激活</div></div>
              <div className="item"><img src={nodeData?.yesterdayRanking > 0 ? enoughIcon : noEnoughIcon} alt="" /><div> 昨日排名: {nodeData?.yesterdayRanking}</div></div>
            </div>
            <div className="NFTNum">我的团队土地NFT数量： <span>{nodeData?.landCount}</span></div>
          </div>
        </div>

        <div className="itemBox">
          <div className="reward">奖励总金额：<span> {nodeAwardData?.totalAmount} MBAS</span></div>
          <div className="yestoday">昨日奖励金额：<span> {nodeAwardData?.yesterDayAmount} MBAS</span></div>
          <div className="inputBox">
            <div className="inputValue">
              <span className="inputValueStyle">{NumSplic(`${nodeAwardData?.amount}`, 4) || "0"}</span>
              <span>
                <img src={SBLToken} alt="" />{nodeAwardData?.coinName || "MBAS"}
              </span>
            </div>
            <div className="getBox"><div className="getBtn flex" onClick={() => Receive(nodeAwardData?.amount)}>{t("Harvest")}</div></div>
          </div>
          <div className="rewardRecord" onClick={() => setShowProfit(true)}>{t("Records2")}<img src={record} alt="" /></div>
        </div>
      </div>


      {/* 规则 */}
      <Modal
        visible={showGuide}
        className='nodeJoinModal guide'
        centered
        width={'500px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuide(false) }}>
        <div className="box">
          <div className="title">节点基金</div>
          <div className="tip">
            1、当日盲盒全网出售量的5%进入节点基金；<br />
            2、持有并激活任意等级土地的创世节点、持有并激活5星土
            地的用户具备参与节点基金排行的资格；<br />
            3、根据参与用户伞下持有的土地NFT数量排行，当日排行前150的用户可以共同瓜分节点基金当日收益。<br />
          </div>
        </div>
      </Modal>
      {/* 收益记录 */}
      <GlodJdSy isShow={showProfit} id={6} close={() => { setShowProfit(false) }}></GlodJdSy>

    </div >
  );
}
