import React , {useState , useEffect} from 'react'
import {CardInfoType} from './Card'
import {Contracts} from '../web3'
import {contractAddress} from '../config'
import {getCardCompoundList } from '../API'
import DropDown from '../components/DropDown'
import {useSelector} from "react-redux";
import {stateType} from '../store/reducer'
import {useWeb3React} from '@web3-react/core'
import { Modal, Pagination } from 'antd';
import { useTranslation } from 'react-i18next'
import '../assets/style/componentsStyle/SelMerge.scss'
interface CardSynthesisPropsType {
    CardInfo:CardInfoType,
    isShow: boolean,
    close:Function,
    EnterSelCard:Function,
}
interface SelCardType{
    list:CardInfoType [],
    price:number,
    size:number
}
const typeMap = [
    {
      key:'All the types',
      value:0
    },
    {
      key:'Perseus Badge',
      value:1
    },
    {
      key:'Khaos Badge',
      value:2
    },
    {
      key:'Gaea Badge',
      value:3
    },
    {
      key:'Astra Badge',
      value:4
    }
  ]
export default function SelMerge(props:CardSynthesisPropsType) {
    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType,stateType>(state => state);
    const [ToBeSelect,setToBeSelect] = useState<SelCardType | null>(null)
    const [SelCard,setSelCard] = useState<CardInfoType | null>(null)
    /* 类型筛选 */
    let [type,SetType] = useState(0)
    /* 分页 */
    let [page,SetPage] = useState(1)
    /* 总条数 */
    let [total,SetTotal] = useState(0)
    function changePage(pageNum:number){
        SetPage(pageNum)
    }
    useEffect(()=>{
        if(web3React.account && state.token && props.isShow){
            setSelCard(null)
            getCardCompoundList({
                currentPage:page,
                level:props.CardInfo.cardLevel,
                type:props.CardInfo.cardLevel < 5 ?  type :props.CardInfo.cardType, 
                pageSize:12,
                userAddress:web3React.account as string
            }).then(res=>{
                res.data.list = res.data.list.filter((item:CardInfoType)=>{
                    return item.tokenId !== props.CardInfo.tokenId
                })
                setToBeSelect(res.data)
                SetTotal(res.data.size)
            })
            // Contracts.example.isApprovedForAll(web3React.account, contractAddress.Merge).then((res:boolean)=>{
            //     setIsApproved(res)
            // })
        }
    },[web3React.account,state.token,type,props.isShow,page])
  return (
    <Modal visible={props.isShow}
    className='Merge'
    onCancel={()=>props.close()}
    centered
    maskClosable
    width={315}
    closable={false}
    footer={null}
>
<div className='Title'>{t('NFTs Evolve')}</div>
    <div className='MergeSynthesisList'>
        <div className="Category">
        {
            props.isShow && props.CardInfo.cardLevel < 5 && <DropDown Map={typeMap} change={SetType}></DropDown>
        }
            {/* 三个水平排列（保证布局一致） */}
            <div className="Page">
                <Pagination simple current={page} total={total} defaultPageSize={12} onChange={changePage} />
            </div>
        </div>
        <div className="CardListBox">
            {
                ToBeSelect?.list.map((item,index)=><div className="SynthesisCardList" key={item.id} onClick={()=>{props.EnterSelCard(item)}}>
                    <div className="Img">
                        <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="Id">ID:{item.cardNo}</div>
                </div>)
            }
        </div>
    </div>
</Modal>
  )
}
