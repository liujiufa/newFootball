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
        console.log(res, '是否参与');
        setBtnState(res)
      })
      Contracts.example.claimedNode(web3React.account).then((res: any) => {
        console.log(res, '是否领取');
        setIsGetBtn(res)
      })
    }
  }, [state.token]);

  useEffect(() => {
    if (state.token && web3React.account) {
      if (web3React.account) {
        Contracts.example.queryClaimMBAS(web3React.account).then((res: any) => {
          console.log(res, '确认领取数据');
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
        addMessage("领取成功")
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
          return <div className="btn flexCenter" onClick={() => { setConfirmBuy(true) }}>领取</div>
        } else {
          return <div className="btned flexCenter" onClick={() => { setShowGetSuccess(true) }}>已领取</div>
        }
      } else {
        return <div className="btnEnd flexCenter">已结束</div>
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
      <div className="SwapTitle">节点申请</div>
      <div className="subTitle">活动时间: {dateFormat('YYYY.mm.dd HH:MM', new Date(NodeApplyData?.startTime || 0))}-{dateFormat('YYYY.mm.dd HH:MM', new Date(NodeApplyData?.endTime || 0))}</div>
      <div className="Invitation">
        <div className="itemBox">
          <div className="itemTip">
            节点申请介绍:支付0.2BNB参与节点竞选，共同瓜分100万枚MBAS。邀请好友参与，邀请排名前150名，成为创世节点，获得额外认购额度并获赠星级土地奖励，解锁身份特权。 <span onClick={() => { setShowMoreDetail(true) }}>查看更多</span></div>
          {width > 435 ? <div className="addressBox">
            <div className="referee" >我的邀请链接：</div>
            <div className="addressValue">
              {window.location.origin +
                window.location.pathname +
                "?address=" +
                AddrHandle(web3React.account as string)}
            </div>
            <div className="devideLine"></div>
            <div className="copyBtn" onClick={invitation}><img src={copyIcon} alt="" /></div>
          </div> : <div className="addressBox smallAddressBox">
            <div className="referee" >我的邀请链接：</div>
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
          <div className="inviteListBtn">有效邀请:{NodeApplyData?.refereeCount ?? 0} <img onClick={() => { navigate('/Invitation') }} src={ableInviteIcon} alt="" /></div>
        </div>

        <div className="itemBox nodeAction">
          <div className="topContent">
            {true ? <img src={nodeAction} alt="" /> : <div className="noNodeAction">
              <div className="tip">活动时间: {NodeApplyData?.startTime}-{NodeApplyData?.endTime}</div>
            </div>}
          </div>
          <div className="bottomContent">
            <div className="price">支付 {NodeApplyData?.campaignPrice || 0.02}{NodeApplyData?.campaignCoinName || "BNB"} 瓜分 {NodeApplyData?.publicOfferNum || 1000000} 枚{NodeApplyData?.publicOfferCoinName || "MBAS"}</div>
            {NodeApplyData && <BtnFun></BtnFun>}
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
