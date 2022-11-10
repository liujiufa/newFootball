import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import {stateType} from '../store/reducer'
import {useWeb3React} from '@web3-react/core'
import {getUserAccountList , userDrawAward , getCardUserMaxLevelInfo , userCancelDrawAward } from '../API'
import {Contracts} from '../web3'
import AwardMechanism from './AwardMechanism'
import GainRecording from './GainRecording'
import TeamMachine from '../components/TeamMachine'
import BNBIcon from '../assets/image/BNBIcon.svg'
import SBLToken from '../assets/image/SBL.svg'
import Refresh from '../assets/image/Refresh.png'
import mechanism from '../assets/image/mechanism.png'
import record from '../assets/image/record.png'
import '../assets/style/componentsStyle/Reward.scss'
import {addMessage} from '../utils/tool'
import BigNumber from 'big.js'
import { useTranslation } from 'react-i18next'
interface refereeData{
    id: number,
    amount:number,
    amountString:string,
    coinName:string
}
interface rewardDataType{
    refereeList:refereeData[]
    teamList:refereeData[]
}
const tokenIcon:{[key:string]:string} = {
    SBL:SBLToken,
    BNB:BNBIcon
}
const recommend=['My tier1','My tier2','My tier3']

const teamreward=['My tier1','My tier1','My tier1','sports center1','sports center2','sports center3','sports center4','sports center5']

export default function Reward() {
    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType,stateType>(state => state);
    let [rewardData,setRewardData] = useState<rewardDataType | null>(null)
    /* 邀请奖励机制弹窗控制 */
    let [ShowInvitationrewardMech,setShowInvitationrewardMech] = useState(false)
    /* 团队奖励机制弹窗控制 */
    let [showTeamMachine,setShowTeamMachine] = useState(false)
    /* 邀请奖励机制弹窗控制 */
    let [ShowRevenueRecord,setShowRevenueRecord] = useState(false)
    /* 奖励弹窗类型 */
    let [RevenueType,setRevenueType] = useState(0)
    /* 用户最高等级 */
    let [MaxLevel,setMaxLevel] = useState(0)
    let [heavyLoad,setHeavyLoad] = useState(false)
    let [teamHeavyLoad,setteamHeavyLoad] = useState(false)
    useEffect(()=>{
        if(state.token){
            getUserAccountList().then(res=>{
                console.log(res)
                setRewardData(res.data)
            })
            getCardUserMaxLevelInfo().then(res=>{
                setMaxLevel(res.data)
            })
        }
    },[state.token])
    function ShowRevenueRecordFun(type:number){
        console.log(type)
        setRevenueType(type)
        setShowRevenueRecord(true)
    }
     function getMaxLevel(type:number){
         if(type === 0){
             setHeavyLoad(true)
             setTimeout(()=>{
                setHeavyLoad(false)
             },1000)
         }
         if(type === 1){
            setteamHeavyLoad(true)
            setTimeout(()=>{
                setteamHeavyLoad(false)
            },1000)
        }
         setTimeout(()=>{
            setHeavyLoad(false)
         },1000)
        getCardUserMaxLevelInfo().then(res=>{
            setMaxLevel(res.data)
        })
     }
    function Receive(type:number,id:number,amount:string){
        if(!web3React.account){
            return addMessage(t('Please connect Wallet'))
        }
        if(new BigNumber(amount).lte(0)){
            return addMessage(t('No collectable quantity'))
        }
        userDrawAward({
            type,id
        }).then((res:any)=>{
            if(res.data){
                Contracts.example.getAward(web3React.account as string,res.data,type).then((res:any)=>{
                    getUserAccountList().then(res=>{
                        setRewardData(res.data)
                    })
                    getCardUserMaxLevelInfo().then(res=>{
                        setMaxLevel(res.data)
                    })
                },(err:any)=>{
                    if(err.code === 4001){
                        userCancelDrawAward({type,id})
                    }
                })
            }else{
                addMessage(res.msg)
            }
        })
    }
  return (
    <div>
        <div className="RewardLabel">
        {t('Referral Rewards')}
        </div>
        {
            rewardData && <div className="RewardItem">
                {
                    rewardData.refereeList.map((item)=><div key={item.id} className="RewardRow">
                        <div className="RewardNum">
                            {item.amountString}
                            <div className="TokenInfo">
                                <img src={tokenIcon[item.coinName]} alt="" />
                                {item.coinName}
                            </div>
                        </div>  
                        <div className="receiveBtn linear-gradient flexCenter" onClick={()=>Receive(1,item.id,item.amountString)}>
                        {t('Claim')}
                        </div>
                    </div>)
                }
            <div className="RewardExplain">{t('My tier')}:{MaxLevel >= 2 ? t(recommend[2]) : t(recommend[MaxLevel])} <img src={Refresh} className={heavyLoad ? "imgRotate" :""} onClick={()=>{getMaxLevel(0)}} alt="" /></div>
            <span className="mechanism" onClick={()=>{setShowInvitationrewardMech(true)}}>{t('rules')} <img src={mechanism} alt="" /></span>
            <span className="record" onClick={()=>ShowRevenueRecordFun(1)}>{t('Records2')} <img src={record} alt="" /></span>
        </div>
        }
        
        <div className="RewardLabel">
        {t('Community rewards')}
        </div>
        {
            rewardData && <div className="RewardItem">
                {
                    rewardData.teamList.map((item)=><div key={item.id} className="RewardRow">
                    <div className="RewardNum">
                        {item.amountString}
                        <div className="TokenInfo">
                            <img src={tokenIcon[item.coinName]} alt="" />
                            {item.coinName}
                        </div>
                    </div>  
                    <div className="receiveBtn linear-gradient flexCenter"  onClick={()=>Receive(2,item.id,item.amountString)}>
                    {t('Claim')}
                    </div>
                </div>)
                }
                <div className="RewardExplain">{t('My tier')}:{t(teamreward[MaxLevel])} <img src={Refresh} className={teamHeavyLoad ? "imgRotate" :""} onClick={()=>{getMaxLevel(1)}} alt="" /></div>
                <span className="mechanism" onClick={()=>{setShowTeamMachine(true)}}>{t('Reward rules')} <img src={mechanism} alt="" /></span>
                <span className="record" onClick={()=>ShowRevenueRecordFun(2)}>{t('Records2')} <img src={record} alt="" /></span>
            </div>
        }
        {/* 推荐奖励机制 */}
        <AwardMechanism isShow={ShowInvitationrewardMech} close={()=>setShowInvitationrewardMech(false)}></AwardMechanism>
        {/* 奖励记录 */}
        <GainRecording isShow={ShowRevenueRecord} type={RevenueType} close={()=>setShowRevenueRecord(false)}></GainRecording>
        {/* 团队奖励机制 */}
        <TeamMachine isShow={showTeamMachine} close={()=>setShowTeamMachine(false)}></TeamMachine>
    </div>
  )
}
