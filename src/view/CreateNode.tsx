import React, { useEffect, useState, useRef } from "react";
import {
  nodeLand, drawNodeAward, drawLand
} from "../API";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { stateType } from "../store/reducer";
import { useWeb3React } from "@web3-react/core";
import { addMessage, AddrHandle, NumSplic, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
import BigNumber from "big.js";
import defaultCard from "../assets/image/defaultCard.png";
import copy from "copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import { BlockUrl, landLevel } from '../config'
import "../assets/style/Invitation.scss";
import "../assets/style/componentsStyle/MyDealRecord.scss";
import "../assets/style/componentsStyle/Reward.scss";
declare let window: any;

export default function Invitation() {
  let location = useLocation();
  let { t } = useTranslation();
  const navigate = useNavigate()
  let state = useSelector<stateType, stateType>((state) => state);
  let [CreateNodeData, setCreateNodeData] = useState<any>();
  let [isBuyValue, setIsBuyValue] = useState<any>([]);
  let [showGuide, setShowGuide] = useState(false);
  let [showGuideed, setShowGuideed] = useState(false);
  let [isBuy, setIsBuy] = useState(false);
  let [showBuySuccess, setShowBuySuccess] = useState(false);
  let [confirmBuy, setConfimBuy] = useState(false);
  let [hashValue, setHashValue] = useState();
  const web3React = useWeb3React();
  useEffect(() => {
    if (state.token && web3React.account) {
      nodeLand().then((res: any) => {
        if (res.code === 200) {
          console.log(res.data, '创世节点配置');
          setCreateNodeData(res?.data)
          Contracts.example.queryClaimExtraMBAS(res?.data?.nodeLevel, web3React.account as string).then((res: any) => {
            console.log(res, '确认领取数据');
            setIsBuyValue([new BigNumber(res[0]).div(10 ** 18).toString(), new BigNumber(res[1]).div(10 ** 18).toString()])
          })
        }
      })
    }
  }, [state.token, web3React.account, confirmBuy]);

  useEffect(() => {
    if (state.token && web3React.account) {
      Contracts.example.nodeReward(web3React.account).then((res: any) => {
        console.log(res, '是否认购');
        setIsBuy(res)
      })
    }
  }, [state.token, web3React.account]);

  window?.ethereum?.on('accountsChanged', () => {
    if (state.token && web3React.account) {
      Contracts.example.nodeReward(web3React.account).then((res: any) => {
        console.log(res, '是否认购');
        setIsBuy(res)
      })
    }
  })

  // 认购
  const drawAwardFun = () => {
    if (state.token && web3React.account) {
      drawNodeAward({
      }).then((res: any) => {
        console.log(res, "创世节点");
        if (res.code === 200) {
          showLoding(true)
          Contracts.example.claimExtraMBAS(res.data, web3React.account as string, NumSplic(CreateNodeData?.giveValue, 1) as string).then((res: any) => {
            console.log(res, '领取成功');
            showLoding(false)
            addMessage("领取成功")
            setConfimBuy(false)
            setHashValue(res.transactionHash)
            Contracts.example.nodeReward(web3React.account as string).then((res: any) => {
              setIsBuy(res)
            })
          }).finally(() => {
            showLoding(false)
          })
        }
      })
    }
  }
  const drawLandFun = () => {
    if (state.token && web3React.account) {
      drawLand({ id: CreateNodeData?.id }).then((res: any) => {
        console.log(res, "tudi");
        if (res.code === 200) {
          showLoding(true)
          Contracts.example.ApplyLand(web3React.account as string, res.data).then((res: any) => {
            console.log(res, '领取成功');
            showLoding(false)
            setShowGuide(true)
          }).finally(() => {
            showLoding(false)
          })
        }
      }).catch((res: any) => {
        addMessage(res.msg)
      })
    }
  }

  const GetBtnFun = () => {
    if (CreateNodeData?.status === 1) {
      return <div className="getBtned flexCenter" onClick={() => { setShowGuideed(true) }}>已领取</div>
    } else {
      return <div className="getBtn flexCenter" onClick={() => { drawLandFun() }}>领取</div>
    }
  }

  const BuyBtnFun = () => {
    if (CreateNodeData?.nodeLevel >= 1 && CreateNodeData?.nodeLevel <= 150) {
      if (!isBuy) {
        return <div className="getBtn flexCenter" onClick={() => { setConfimBuy(true) }}>认购</div>
      } else {
        return <div className="getBtned flexCenter" onClick={() => { setShowBuySuccess(true) }}>已认购</div>
      }
    } else {
      return <div className="getBtnEnd flexCenter">认购</div>
    }
  }

  const activeFun = () => {
    navigate('/Liquidity', { state: { cardLevel: CreateNodeData?.level as number } })
  }

  return (
    <div className="Edition-Center" id="CreateNode">
      <div className="SwapTitle">创世节点</div>
      <div className="subTitle">恭喜您成为创世节点!您的排名是{CreateNodeData?.nodeLevel}</div>
      <div className="Invitation">
        <div className="itemBox">
          <div className="item">
            <div className="imgBox">
              <img src={CreateNodeData?.image ?? defaultCard} alt="" />
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
              <div className="value">{NumSplic(CreateNodeData?.giveValue, 1)}BNB</div>
            </div>
            <div className="list">
              <div className="title">认购价格:</div>
              <div className="value">{NumSplic(CreateNodeData?.initPrice, 1)}USDT/MBAS</div>
            </div>
            {CreateNodeData ? <BuyBtnFun></BuyBtnFun> : <div className="getBtnEnd flexCenter">认购</div>}
          </div>
        </div>
      </div>
      {/* 领取成功 */}
      <Modal
        visible={showGuide}
        className='nodeJoinModal guide'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuide(false) }}>
        <div className="box">
          <div className="tip">
            领取成功!在MBAS中添加LP激活土地，<span onClick={() => { activeFun() }}>去添加</span>
          </div>
        </div>
      </Modal>
      {/* 成功领取土地 */}
      <Modal
        visible={showGuideed}
        className='nodeJoinModal'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowGuideed(false) }}>
        <div className="box">
          <div className="tip">
            已成功认领取{landLevel[CreateNodeData?.level]}星土地 <span onClick={() => { navigate('/Land') }}>查看</span>
          </div>
        </div>
      </Modal>
      {/* 认购 */}
      <Modal
        visible={confirmBuy}
        className='nodeJoinModal getModal'
        centered
        width={'383px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfimBuy(false) }}>
        <div className="box">
          <div className="title">认购</div>
          <div className="tip">
            本次认购需支付{NumSplic(CreateNodeData?.giveValue, 4)}BNB,将获得{NumSplic(isBuyValue[1], 4)}MBAS
          </div>
          {!isBuy ? <div className="confirm flexCenter" onClick={() => { drawAwardFun() }}>確認</div> : <div className="confirmed flexCenter">確認</div>}
        </div>
      </Modal>
      {/* 成功认购 */}
      <Modal
        visible={showBuySuccess}
        className='nodeJoinModal'
        centered
        width={'432px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowBuySuccess(false) }}>
        <div className="box">
          <div className="tip">
            已成功认购{parseInt(isBuyValue[1])}MBAS（认购价值～{NumSplic(CreateNodeData?.giveValue, 1)}BNB）<span onClick={() => { window.open(BlockUrl + hashValue) }}>查看</span>
          </div>
        </div>
      </Modal>
    </div >
  );
}
