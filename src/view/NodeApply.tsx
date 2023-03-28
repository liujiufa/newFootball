import React, { useEffect, useState, useRef } from "react";
import { getNodeEquityBase, getRankingRecord, nodeRecurit } from "../API";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { stateType } from "../store/reducer";
import { useWeb3React } from "@web3-react/core";
import { addMessage, AddrHandle, dateFormat, NumSplic, showLoding, GetQueryString } from "../utils/tool";
import { Contracts } from "../web3";
import { BlockUrl, BNBValue } from '../config'
import BigNumber from "big.js";
import copyIcon from "../assets/image/copyIcon.png";
import ableInviteIcon from "../assets/image/ableInviteIcon.png";
import nodeAction from "../assets/image/nodeAction.png";
import rankIcon from "../assets/image/rankIcon.png";
import closeIcon from "../assets/image/closeIcon.png";
import copy from "copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/style/Invitation.scss";
import "../assets/style/componentsStyle/MyDealRecord.scss";
import "../assets/style/componentsStyle/Reward.scss";
import NoData from "../components/NoData";
import { useViewport } from "../components/viewportContext";
BigNumber.NE = -40
BigNumber.PE = 40
interface NodeDataType {
  "id": number,
  "periodNum": number,
  "campaignPrice": number,
  "campaignCoinName": string,
  "startTime": number,
  "endTime": number,
  "status": number,
  "publicOfferPrice": number,
  "publicOfferCoinName": string,
  "publicOfferNum": number,
  "createTime": number,
  "updateTime": number,
  "refereeCount": number
}
export default function Invitation() {
  let location = useLocation();
  let navigate = useNavigate()
  //   console.log(location.state);
  let { t } = useTranslation();
  const { width } = useViewport()
  let state = useSelector<stateType, stateType>((state) => state);
  let [NodeApplyData, setNodeApplyData] = useState<NodeDataType>();
  let [NodeRankData, setNodeRankData] = useState<any>([]);
  let [ShowMoreDetail, setShowMoreDetail] = useState(false);
  let [showJoinSuccess, setShowJoinSuccess] = useState(false);
  let [showGetSuccess, setShowGetSuccess] = useState(false);
  let [ConfirmBuy, setConfirmBuy] = useState(false);
  let [BtnState, setBtnState] = useState(false);
  let [isGetBtn, setIsGetBtn] = useState(false);
  let [hashValue, setHashValue] = useState();
  let [isGetValue, setIsGetValue] = useState<any>([]);
  let [NodeAplyGetValue, setNodeAplyGetValue] = useState<any>();
  const web3React = useWeb3React();
  useEffect(() => {
    if (state.token && web3React.account) {
      getNodeEquityBase().then((res) => {
        console.log(res.data, '');
        setNodeApplyData(res.data);
        getRankingRecord(res.data.id).then((res) => {
          console.log(res.data, 'rank');
          let arr: any = [];
          res.data.map((item: any, index: number) => {
            // item = { ...item, rank: Number(index) + 1 }
            arr.push({ ...item, rank: Number(index) + 1 })
          })
          setNodeRankData(arr);
        });
      });
      nodeRecurit().then((res: any) => {
        console.log("nodeRecurit", res.data);
        setNodeAplyGetValue(res.data)
      })
    }
  }, [state.token]);

  useEffect(() => {
    if (state.token && web3React.account) {
      Contracts.example.nodes(web3React.account).then((res: any) => {
        setBtnState(res)
      })
      Contracts.example.claimedNode(web3React.account).then((res: any) => {
        setIsGetBtn(res)
      })
    }
  }, [state.token]);

  useEffect(() => {
    if (state.token && web3React.account) {
      if (web3React.account) {
        Contracts.example.queryClaimMBAS(web3React.account).then((res: any) => {
          setIsGetValue([new BigNumber(res[0]).div(10 ** 18).toString(), new BigNumber(res[1]).div(10 ** 18).toString()])
        })
      }
    }
  }, [state.token, ConfirmBuy]);

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
  // 参与节点
  const buyNode = () => {
    let refereeUserAddress = GetQueryString("address") || '0x0000000000000000000000000000000000000000'
    if (web3React.account) {
      Contracts.example.getBalance(web3React.account).then((res: any) => {
        console.log(new BigNumber(res).div(10 ** 18).toString(), 'BNB余额');
        if (new BigNumber(BNBValue).lte(new BigNumber(res).div(10 ** 18).toString())) {
          showLoding(true)
          Contracts.example.buyJoinNode(web3React.account as string, refereeUserAddress, BNBValue).then((res: any) => {
            console.log(res, '购买end');
            showLoding(false)
            setShowJoinSuccess(true)
            Contracts.example.nodes(web3React.account as string).then((res: any) => {
              console.log(res, '是否参与');
              setBtnState(res)
            })
          }).finally(() =>
            showLoding(false)
          )
        } else {
          addMessage(t("Insufficient balance"))
        }
      })
    }
  }
  // 领取节点
  const getNode = () => {
    if (web3React.account) {
      showLoding(true)
      Contracts.example.claimMBAS(web3React.account as string).then((res: any) => {
        console.log(res, "交易哈希");
        showLoding(false)
        addMessage(t("Receive success"))
        setHashValue(res.transactionHash)
        setConfirmBuy(false)
        // setShowGetSuccess(true)
        Contracts.example.claimedNode(web3React.account as string).then((res: any) => {
          console.log(res, '是否领取');
          setIsGetBtn(res)
        })
      }).finally(() =>
        showLoding(false)
      )
    }
  }

  const BtnFun = () => {
    if (NodeApplyData!.startTime > Date.now() || Date.now() > NodeApplyData!.endTime) {
      if (BtnState) {
        if (!isGetBtn) {
          return <div className="btn flexCenter" onClick={() => { setConfirmBuy(true) }}>{t("Harvest")}</div>
        } else {
          return <div className="btned flexCenter" onClick={() => { setShowGetSuccess(true) }}>{t("Claimed")}</div>
        }
      } else {
        return <div className="btnEnd flexCenter">{t("Ended")}</div>
      }
    } else {
      if (!BtnState) {
        return <div className="btn flexCenter" onClick={() => { buyNode() }}>参与</div>
      } else {
        return <div className="btned flexCenter">已参与</div>
      }
    }
  }

  return (
    <div className="Edition-Center" id="NodeApply">
      <div className="SwapTitle">{t("Application")}</div>
      <div className="subTitle">{t("Application Period")}: {dateFormat('YYYY.mm.dd HH:MM', new Date(NodeApplyData?.startTime || 0))}-{dateFormat('YYYY.mm.dd HH:MM', new Date(NodeApplyData?.endTime || 0))}</div>
      <div className="Invitation">
        <div className="itemBox">
          <div className="itemTip">
            {t("inviteTip")} <span onClick={() => { setShowMoreDetail(true) }}>{t("See more")}</span></div>
          {width > 435 ? <div className="addressBox">
            <div className="referee" >{t("Personal Invitation Link")}：</div>
            <div className="addressValue">
              {window.location.origin +
                window.location.pathname +
                "?address=" +
                AddrHandle(web3React.account as string)}
            </div>
            <div className="devideLine"></div>
            <div className="copyBtn" onClick={invitation}><img src={copyIcon} alt="" /></div>
          </div> : <div className="addressBox smallAddressBox">
            <div className="referee" >{t("Personal Invitation Link")}：</div>
            <div >
              <span>
                {window.location.origin +
                  window.location.pathname +
                  "?address=" +
                  AddrHandle(web3React.account as string)}
              </span>
              <div className="devideLine"></div>
              <div className="copyBtn" onClick={invitation}><img src={copyIcon} alt="" /></div>
            </div>
          </div>}
          <div className="inviteListBtn">{t("Valid invitation Number")}:{NodeApplyData?.refereeCount ?? 0} <img onClick={() => { navigate('/Invitation') }} src={ableInviteIcon} alt="" /></div>
        </div>

        <div className="itemBox nodeAction">
          <div className="topContent">
            {true ? <img src={nodeAction} alt="" /> : <div className="noNodeAction">
              <div className="tip">{t("Application Period")}: {NodeApplyData?.startTime}-{NodeApplyData?.endTime}</div>
            </div>}
          </div>
          <div className="bottomContent">
            <div className="price">
              {t("buyNodeTip", { value1: NodeApplyData?.campaignPrice || 0.02, coinName1: NodeApplyData?.campaignCoinName || "BNB", value2: NodeApplyData?.publicOfferNum || 1000000, coinName2: NodeApplyData?.publicOfferCoinName || "MBAS" })}
            </div>
            {NodeApplyData && <BtnFun></BtnFun>}
          </div>
        </div>
      </div>
      <div className="nodeRank">
        <div className="nodeTitle">
          <img src={rankIcon} alt="" />{t("Genesis Node Ranking")}
        </div>
        <div className="nodeContent">
          <div className="items title">
            <div className="item rank">{t("Ranking")}</div>
            <div className="item address">{t("Address")}</div>
            <div className="item num">{t("Invitations")}</div>
          </div>

          {NodeRankData.length > 0 ? <>
            {NodeRankData?.filter((item: any) => (web3React.account)?.toLowerCase() === (item?.userAddress).toLowerCase()).map((item: any) => <div className="items myItems">
              <div className="item rank">{item?.rank}</div>
              <div className="item address">{AddrHandle(item?.userAddress)}</div>
              <div className="item num">{item?.refereeCount}</div>
            </div>)}
            <div className="content">
              <div className="itemsBox">
                {NodeRankData.map((item: any, index: any) => <div key={index} className={index % 2 === 0 ? "items" : "oddItems items"}>
                  <div className="item rank">{item?.rank}</div>
                  <div className="item address">{AddrHandle(item?.userAddress)}</div>
                  <div className="item num">{item?.refereeCount}</div>
                </div>)}
              </div>
            </div>
          </> : <NoData></NoData>
          }
        </div>
      </div>
      {/* 成功参与 */}
      <Modal
        visible={showJoinSuccess}
        className='nodeJoinModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowJoinSuccess(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowJoinSuccess(false)} />
        <div className="box">
          <div className="tip">
            已成功参与节点，等待活动结束领取代币
          </div>
        </div>
      </Modal>
      {/* 领取 */}
      {isGetValue && <Modal
        visible={ConfirmBuy}
        className='nodeJoinModal getModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfirmBuy(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmBuy(false)} />
        <div className="box">
          <div className="title">领取</div>
          <div className="tip">
            当前节点申请已结束，恭喜您成功认购{NumSplic(isGetValue[0], 4)}MBAS,回退{NumSplic(isGetValue[1], 4)}BNB
          </div>
          <div className="confirm flexCenter" onClick={() => { getNode() }}>確認</div>
        </div>
      </Modal>}
      {/* 已领取 */}
      {(isGetValue || NodeAplyGetValue) && <Modal
        visible={showGetSuccess}
        className='nodeJoinModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGetSuccess(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowGetSuccess(false)} />
        <div className="box">
          <div className="tip">
            当前节点申请已结束，您已成功领取{NumSplic(NodeAplyGetValue?.earnNum || isGetValue[0], 4)}MBAS,回退{NumSplic(NodeAplyGetValue?.needPayNum || isGetValue[1], 4)}BNB，<span onClick={() => { window.open(BlockUrl + (NodeAplyGetValue?.txId || hashValue)) }}> 查看</span>
          </div>
        </div>
      </Modal>}
      {/* 规则 */}
      <Modal
        visible={ShowMoreDetail}
        className='nodeJoinModal guide'
        centered
        width={'705px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowMoreDetail(false) }}>
        <div className="box">
          <div className="title">{t("Application")}</div>
          <div className="tip">
            {t("NodeDes1")}<br />
            {t("NodeDes2")}<br />
            {t("NodeDes3")}<br />
            {t("NodeDes4")}<br />
            {t("NodeDes5")}<br />
            {t("NodeDes6")}<br />
            {t("NodeDes7")}<br />
          </div>
        </div>
      </Modal>

    </div >
  );
}
