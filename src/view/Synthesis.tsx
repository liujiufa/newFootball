import React, { useEffect, useState } from 'react';
import { getCardCompoundList, compoundCard } from '../API'
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { CardInfoType } from '../components/Card'
import { contractAddress } from '../config'
import { Modal, Pagination } from 'antd';
import { addMessage, NumSplic, showLoding } from '../utils/tool'
import desIcon from '../assets/image/desIcon.png'
import defaultCard from '../assets/image/defaultCard.png'
import addIcon from '../assets/image/addIcon.png'
import '../assets/style/Synthesis.scss'
import AddImg from '../assets/image/Union.png'
import DropDown from '../components/DropDown'
import Tips from '../components/Tips'
import { useTranslation } from 'react-i18next'
// 徽章合成规则
import CardComRule from '../components/CardComRule'
import BigNumber from 'big.js'
interface CardSynthesisPropsType {
    CardInfo: CardInfoType,
    isShow: boolean,
    close: Function
    mergeSuccess: Function
}
interface SelCardType {
    list: CardInfoType[],
    price: number,
    size: number,
}
const typeMap = [
    {
        key: 'All the types',
        value: 0
    },
    {
        key: 'Perseus Badge',
        value: 1
    },
    {
        key: 'Khaos Badge',
        value: 2
    },
    {
        key: 'Gaea Badge',
        value: 3
    },
    {
        key: 'Astra Badge',
        value: 4
    }
]
export default function Synthesis() {

    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType, stateType>(state => state);
    const [ToBeSelect, setToBeSelect] = useState<SelCardType | null>(null)
    const [isApproved, setIsApproved] = useState(false)
    const [SelCard, setSelCard] = useState<CardInfoType | null>(null)
    /* 确认合成弹窗控制 */
    let [showEnterMerge, setShowEnterMerge] = useState(false)
    /* 合成规则弹窗控制 */
    let [showMergeRule, setShowMergeRule] = useState(false)
    /* 类型筛选 */
    let [type, SetType] = useState(0)
    /* 分页 */
    let [page, SetPage] = useState(1)
    /* 总条数 */
    let [total, SetTotal] = useState(0)
    // SBL授权
    const [ApproveValue, setApproveValue] = useState('0')
    function changePage(pageNum: number) {
        SetPage(pageNum)
    }
    // 授权
    function ApproveFun() {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        showLoding(true)
        Contracts.example.approve1(web3React.account as string, contractAddress.Merge, `${ToBeSelect?.price}`).then(() => {
            Contracts.example.Tokenapprove(web3React.account as string, contractAddress.Merge).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
            }).finally(() => {
                showLoding(false)
            })
        }).finally(() => {
            showLoding(false)
        })
    }
    function ToBeSelectFun(currentPower: number, basePower: number, obj: any) {
        if (currentPower == basePower) {
            setSelCard(obj)
        } else {
            addMessage(t('Insufficient computing power'))
        }
    }
    return (
        <div id='Synthesis'>
            <div className='Title'>{t('NFTs Evolve')}</div>
            <div className='Content'>
                <div className="SynthesisHandle">
                    <div className="SynthesisItems">
                        <div className="CardItems">
                            {/* 三个150px水平排列 */}
                            <div className="CardItemsLeft"><img src={defaultCard} alt="" ></img>
                            </div>
                            <div className="Add"><img src={AddImg} alt="" /></div>
                            {
                                SelCard ? <>
                                    <div className="CardItemsRight"><div className="CardImg"><img src={SelCard.imageUrl} alt="" /></div></div>
                                </> : <>
                                    <div className="CardItemsRight"><div className="CardImg"></div></div>
                                </>
                            }
                        </div>
                        <div className="CardItem">
                            <div className="CardImg1">
                            </div>
                            {ToBeSelect && <div className="Decorate">
                                <div className="Price">{t('Expenses')}</div> <div className='Number'> {` `}{Math.floor(ToBeSelect?.price)} SBL</div>
                            </div>}
                            {
                                ToBeSelect && (parseFloat(ApproveValue) > ToBeSelect?.price) ? <div className='confirmBtn' onClick={() => { setShowEnterMerge(true) }}>{t('Confirm')}</div> : <div className='confirmBtn' onClick={ApproveFun}>{t('Approve')}</div>
                            }
                            <div className='Tip'><div className='TipContent' onClick={() => { setShowMergeRule(true) }}>{t('Evolve rules')}</div><div className='TipImg'> <img style={{ marginLeft: '5px' }} src={desIcon} alt="" /></div></div>
                        </div>
                    </div>
                </div>
                <div className="deviceLine"></div>
                <div className='SynthesisList'>
                    <div className="Category">
                        <div className="dropBox">
                            <DropDown Map={typeMap} change={SetType}></DropDown>
                            <DropDown Map={typeMap} change={SetType}></DropDown>
                        </div>
                        {/* 三个水平排列（保证布局一致） */}
                        {/* <div className="Page">
                            <Pagination style={{ margin: "auto" }} current={page} defaultPageSize={12} total={total} onChange={changePage} />
                        </div> 
                        */}
                    </div>
                    {/* 可点击选择的合成徽章 */}
                    <div className="CardListBox">
                        {
                            ToBeSelect?.list.map((item, index) => <div className="SynthesisCardList" key={item.id} onClick={() => { ToBeSelectFun(item?.basePower, item?.currentPower, item) }}>
                                <div className="Id">ID：{item.cardNo}</div>
                                <div className="Img">
                                    <img src={item.imageUrl} alt="" />
                                </div>
                                <div className="computingPower">
                                    <div className="title">{t("Computing power")}</div>
                                    <div className="value">{item?.currentPower}/{item?.basePower}</div>
                                </div>
                                <div className="share">
                                    <div className="shareBox"><div className="shareValue" style={{ width: `${item?.currentPower / item?.basePower * 100}%` }}>{Math.floor(item?.currentPower / item?.basePower * 100)}%</div></div>
                                </div>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
