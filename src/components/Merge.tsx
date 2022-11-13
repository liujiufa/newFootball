import React, { useState ,useEffect} from 'react'
import {CardInfoType} from './Card'
import {compoundCard , compoundCardConfig} from '../API'
import {Contracts} from '../web3'
import {useWeb3React} from '@web3-react/core'
import AddImg from '../assets/image/Union.png'
import {addMessage,showLoding} from '../utils/tool'
import Tips from '../components/Tips'
import BigNumber from 'big.js'
import { useTranslation } from 'react-i18next'
import {contractAddress} from '../config'
import CardComRule from '../components/CardComRule'
import RuleImg from '../assets/image/CardSynthesis.png'
import '../assets/style/componentsStyle/Merge.scss'
import { Modal } from 'antd';
interface CardSynthesisPropsType {
    CardInfo:CardInfoType,
    SelCard?:CardInfoType | null,
    isShow: boolean,
    close:Function,
    SelCardFun:Function,
    mergeSuccess:Function,
}
interface SelCardType{
    list:CardInfoType [],
    price:number,
    size:number
}

export default function Merge(props:CardSynthesisPropsType) {
    let { t } = useTranslation()
    const web3React = useWeb3React()
    const [isApproved,setIsApproved] = useState(false)
    const [MergePrice,setMergePrice] = useState<number>(0)
    /* 合成规则弹窗控制 */
    let [showMergeRule,setShowMergeRule] = useState(false)
    /* 确认合成弹窗控制 */
    let [showEnterMerge,setShowEnterMerge] = useState(false)
    useEffect(()=>{
        if(props.isShow && web3React.account){
            compoundCardConfig(props.CardInfo.cardLevel).then(res=>{
                setMergePrice(res.data.price)
            })
            Contracts.example.isApprovedForAll(web3React.account, contractAddress.Merge).then((res:boolean)=>{
                setIsApproved(res)
            })
        }
    },[props.isShow,props.CardInfo.cardLevel])
    /* 授权 */
    function Approval(){
        if(!web3React.account){
            addMessage(t('Please connect Wallet'))
        }
        showLoding(true)
        /* 判断徽章等级 */
        Contracts.example.setApprovalForAll(web3React.account as string,contractAddress.Merge,true).then(()=>{
            addMessage(t('Authorization succeeded'))
          setIsApproved(true)
        }).finally(()=>{
            showLoding(false)
        })
    }
    /* 合成 */
    async function mager(){
        setShowEnterMerge(false)
        if(!web3React.account){
            return addMessage(t('Please connect Wallet'))
        }
        if(!props.SelCard){
            return addMessage(t('Please select the card to synthesize'))
        }
        let Balance = await Contracts.example.getBalance(web3React.account as string)
        Balance = new BigNumber(Balance).div(10 ** 18).toString()
        if(new BigNumber(Balance).lt(MergePrice as number)){
        return addMessage(t('not enough'))
        }
        showLoding(true)
        compoundCard({
            cardId:props.CardInfo.id, 
            choiceCardId:props.SelCard.id
        }).then(resSign=>{
            Contracts.example.toSynthesis(web3React.account as string, resSign.data.sign,MergePrice as number).then((res:any)=>{
                props.mergeSuccess(resSign.data.cardUser)
            }).finally(()=>{
                showLoding(false)
            })
        },()=>{
            showLoding(false)
        })
    }
  return (
      <>
        {/* 确认合成 */}
        <Tips isShow={showEnterMerge} title={t('Expenses2')} subTitle={t('The evolving cost')+MergePrice+"BNB"} enterFun={mager} close={()=>setShowEnterMerge(false)}></Tips>
        <CardComRule isShow={showMergeRule} close={()=>setShowMergeRule(false)}></CardComRule>
        <Modal visible={props.isShow && !showMergeRule}
            className='Merge'
            onCancel={()=>props.close()}
            centered
            maskClosable
            width={315}
            closable={false}
            footer={null}
        >
            <div className='Title'>{t('NFTs Evolve')}</div>
            <div className="mergeBox">
                <div className="SynthesisItems">
                    <div className="CardItems">
                        {/* 三个150px水平排列 */}
                        <div className="CardItemsLeft"><img src={props.CardInfo && props.CardInfo.imageUrl} alt="" ></img>
                        </div>
                        <div className="Add"><img src={AddImg} alt="" /></div>
                        {
                            props.SelCard ? <>
                            <div className="CardItemsRight"><div className="CardImg"><img src={props.SelCard.imageUrl} alt="" /></div></div>
                            </> : <>
                            <div className="CardItemsRight" onClick={()=>{props.SelCardFun()}}><div className="CardImg"></div></div>
                            </>
                        }
                        
                    </div>
                    <div className="mergeCardItem">
                        <div className="CardImg">
                        </div>
                        <div className="Decorate">
                            <div className="Price">{t('Expenses')}：</div><div className='Number'>{MergePrice}BNB</div>
                        </div>
                        {
                            isApproved ? <button onClick={()=>{setShowEnterMerge(true)}}>{t('Confirm')}</button> : <button onClick={Approval}>{t('Approve')}</button>
                        }
                        {/* <button onClick={()=>{setShowEnterMerge(true)}}>{t('Confirm')}</button> */}
                        <div className='Tip' onClick={()=>setShowMergeRule(true)}><div className='TipContent' >{t('Evolve rules')}</div><div className='TipImg'> <img src={RuleImg} alt="" /></div></div>
                    </div>
                </div>
            </div>
        </Modal>
      </>
  )
}
