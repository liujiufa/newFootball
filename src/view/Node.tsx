import React , {useState , useEffect} from 'react'
import Reward from '../components/Reward'
import Node from '../components/Node'
import { useTranslation } from 'react-i18next'
import '../assets/style/SBL.scss'
// import AwardMechanism from '../components/AwardMechanism'
// import GainRecording from '../components/GainRecording'
import TeamMachine from '../components/TeamMachine'
import TeamEarnings from '../components/TeamEarnings'
import GlodMechanism from '../components/GlodMechanism'
// import GlodJdSy from '../components/GlodJdSy'
import DonateSucceed from '../components/DonateSucceed'
import DonateRule from '../components/DonateRule'
import DonateDestroy from '../components/DonateDestroy'
import ReleaseMechanusm from '../components/ReleaseMechanusm'
import DonationRecord from '../components/DonationRecord'
import AddFlowSucceed from '../components/AddFlowSucceed'
import AddFlowRem from '../components/AddFlowRem'
import RemoveAffirm from '../components/RemoveAffirm'
// import MyDealRecord from '../components/MyDealRecord'

function SBL() {
  let { t } = useTranslation()
    let [Tab,setTab] = useState(1)

  return (
    <div>
        <div className="Edition-Center">
            <div className="SwapTitle">
            {t('Node Coinage')}
            </div>
            <div className="NodeDesc">
            {t('NodeDesc')}
            </div>
            {/* <div className="TabRow">
                <div className={Tab ===0 ? "TabItem linear-gradient":"TabItem Inactivation"} onClick={() =>setTab(0)}>{t('Reward')}</div>
                <div className={Tab ===1 ? "TabItem linear-gradient":"TabItem Inactivation"}onClick={() =>setTab(1)}>{t('Coinage')}</div>
            </div> */}
            {
                Tab ===0 && <>
                {/* 奖励模块 */}
                <Reward></Reward>
                </>
            }
            {
                Tab ===1 && <>
                {/* 铸币节点模块 */}
                <Node></Node>
                </>
            }
        </div>
       {/* 我的交易记录 */}
      {/* <MyDealRecord></MyDealRecord> */}
      {/*  以添加流动性移除确认*/}
      <RemoveAffirm></RemoveAffirm>
      {/* 以添加流动性移除 */}
      <AddFlowRem></AddFlowRem>
      {/* 添加流动性成功 */}
      <AddFlowSucceed></AddFlowSucceed>
      {/* 捐赠奖励，收益记录 */}
      <DonationRecord></DonationRecord>
      {/* 捐赠奖励，释放机制 */}
      <ReleaseMechanusm></ReleaseMechanusm>
      {/* 捐赠销毁，销毁记录 */}
      <DonateDestroy></DonateDestroy>
      {/* 捐赠规则 */}
      <DonateRule></DonateRule>
      {/* 捐赠销毁捐赠成功 */}
      <DonateSucceed></DonateSucceed>

      {/* 团队奖励的收益记录 */}
      <TeamEarnings></TeamEarnings>

    </div>
  )
}
export default React.memo(SBL)