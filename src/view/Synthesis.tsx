import React, { useEffect, useState } from 'react';
import { getUserCard, getCardCompoundList, compoundCard } from '../API'
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { contractAddress } from '../config'
import { Modal, Pagination } from 'antd';
import { addMessage, initWebSocket, showLoding } from '../utils/tool'
import Card, { CardInfoType } from '../components/Card'
import NoData from '../components/NoData'
import desIcon from '../assets/image/desIcon.svg'
import record from '../assets/image/record.png'
import closeIcon from '../assets/image/closeIcon.png'

import defaultCard from '../assets/image/defaultCard.png'
import addIcon from '../assets/image/addIcon.png'
import '../assets/style/Synthesis.scss'
import AddImg from '../assets/image/Union.png'
import resultImg from '../assets/image/resultImg.png'
import DropDown from '../components/DropDown'
import Tips from '../components/Tips'
import { useTranslation } from 'react-i18next'
import { socketUrl } from "../config"
import { useViewport } from '../components/viewportContext';
// 精灵合成规则
import CardComRule from '../components/CardComRule'
import CardComSuccess from '../components/CardComSuccess'
import CardComRecord from '../components/CardComRecord'
import BigNumber from 'big.js'
declare let window: any;
interface SelCardType {
    list: CardInfoType[],
    price: number,
    size: number,
}
const typeMap = [
    {
        key: 'All the types',
        value: -1
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
    },
    {
        key: 'Purple Badge',
        value: 5
    }
]
export default function Synthesis() {
    const { width } = useViewport()
    let { t } = useTranslation()
    const web3React = useWeb3React()
    let state = useSelector<stateType, stateType>(state => state);
    const [ToBeSelect, setToBeSelect] = useState<SelCardType | null>(null)
    const [isApproved, setIsApproved] = useState(false)
    const [SelCard1, setSelCard1] = useState<any>(null)
    const [MergeResult, setMergeResult] = useState<any>(null)
    const [SelCard2, setSelCard2] = useState<any>(null)
    let [userCard, setuserCard] = useState<CardInfoType[]>([])
    let [ShowComModal, setShowComModal] = useState(false)
    /* 合成规则弹窗控制 */
    let [showMergeRule, setShowMergeRule] = useState(false)
    let [showMergeSuccess, setShowMergeSuccess] = useState(false)
    let [showMergeRecord, setShowMergeRecord] = useState(false)
    /* 等级筛选 */
    let [level, SetLevel] = useState(0)
    /* 类型筛选 */
    let [type, SetType] = useState(-1)
    /* 分页 */
    let [page, SetPage] = useState(1)
    /* 总条数 */
    let [total, SetTotal] = useState(0)
    function changePage(pageNum: number) {
        SetPage(pageNum)
    }
    const LevelMap = [
        {
            key: 'pmap',
            value: 0
        },
        {
            key: 'Fairy',
            value: 1
        },
        {
            key: 'Aqua Genie',
            value: 2
        },
        {
            key: 'Forest Genie',
            value: 3
        },
        {
            key: 'Flame Genie',
            value: 4
        },
        {
            key: 'Terra Genie',
            value: 5
        },
        {
            key: 'Gold Genie',
            value: 6
        }
    ]
    // 合成函数
    function ApproveEvolveFun() {
        if (!isApproved) {
            if (!web3React.account) {
                return addMessage(t('Please connect Wallet'))
            }
            Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.NFT, true).then(() => {
                setIsApproved(true)
                return addMessage(t('Authorization succeeded'))
            })
        }
    }
    //精灵
    const CardListBox = () => {
        if (!SelCard1) {
            // 第一张
            return <div className="CardListBox" >
                {
                    userCard?.length !== 0 ? <>
                        <div className="synthesisCardList">
                            {
                                userCard.map((item, index) => <Card key={item.id} selectedCard={SelCard1} Index={index} cardInfo={item} fun={() => { setSelCard1(item) }}></Card>)
                            }
                        </div>
                    </> : <><NoData></NoData></>
                }
            </div>
        } else {
            // 第二张
            return <div className="CardListBox" >
                {
                    ToBeSelect ? <>
                        <div className="synthesisCardList">
                            {
                                ToBeSelect?.list.map((item, index) => <Card key={item.id} Index={index} selectedCard={SelCard2} cardInfo={item} fun={() => { setSelCard2(item); setShowComModal(false) }}></Card>)
                            }
                        </div>
                    </> : <><NoData></NoData></>
                }
            </div>
        }
    }
    const initFirstFun = () => {
        getUserCard({
            currentPage: page,
            level: level,
            pageSize: 12,
            type: type,
            userAddress: web3React.account as string
        }).then(res => {
            console.log(res.data, "用户精灵")
            setuserCard(res.data.list)
        })
        // 推送
        // let { stompClient, sendTimer } = initWebSocket(socketUrl, `/topic/getCardUserInfo/${web3React.account}`, `/getCardUserInfo/${web3React.account}`,
        //     {
        //         currentPage: page,
        //         level: level,
        //         pageSize: 12,
        //         type: type,
        //         userAddress: web3React.account
        //     }, (data: any) => {
        //         console.log(data, '推送用户卡牌数据')
        //         setuserCard(data.list)
        //     })
        // return () => {
        //     try {
        //         stompClient.disconnect()
        //     } catch {

        //     }
        //     clearInterval(sendTimer)
        // }
    }

    const initSecFun = () => {
        getCardCompoundList({
            currentPage: page,
            level: SelCard1?.cardLevel,
            type: SelCard1?.cardLevel < 5 ? type : SelCard1?.cardType,
            pageSize: 12,
            userAddress: web3React.account as string
        }).then((res: any) => {
            if (res.code === 200) {
                res.data.list = res.data.list.filter((item: CardInfoType) => {
                    return item.tokenId !== SelCard1?.tokenId
                })
                setToBeSelect(res.data)
                SetTotal(res.data.size)
            }
        })
    }

    useEffect(() => {
        if (web3React.account && state.token) {
            initSecFun()
        } else {
            setToBeSelect(null)
        }
    }, [web3React.account, state.token, type, page, SelCard1])

    useEffect(() => {
        if (web3React.account) {
            Contracts.example.isApprovedForAll(web3React.account, contractAddress.NFT).then((res: boolean) => {
                setIsApproved(res)
            })
        }
    }, [web3React.account])

    /* 合成 */
    async function mager() {
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        if (!SelCard1) {
            return addMessage(t('Please select the card to synthesize'))
        }
        if (SelCard1.cardLevel !== SelCard2.cardLevel) {
            return addMessage(t("different card levels"))
        }
        if (SelCard1.cardNo === SelCard2.cardNo) {
            return addMessage(t("Please choose two different cards"))
        }
        if (!SelCard2) {
            return addMessage(t('Please select the card to synthesize'))
        }
        let owner = await Promise.all([
            Contracts.example.ownerOf(web3React.account as string, SelCard1.tokenId),
            Contracts.example.ownerOf(web3React.account as string, SelCard2.tokenId)
        ])
        console.log('mager1', SelCard1.tokenId, SelCard2.tokenId);
        if (owner[0] !== web3React.account || owner[1] !== web3React.account) {
            return addMessage(t('The badge to be synthesized does not belong to you'))
        }
        showLoding(true)
        compoundCard({
            cardId: SelCard1.id,
            choiceCardId: SelCard2.id
        }).then((resSign: any) => {
            console.log(resSign, '合成数据');
            setMergeResult(resSign.data)
            Contracts.example.toSynthesis(web3React.account as string, resSign.data.sign).then((res: any) => {
                setSelCard1(null)
                setSelCard2(null)
                setShowMergeSuccess(true)
                setTimeout(() => {
                    initFirstFun()
                    initSecFun()
                }, 5000)
            }).finally(() => {
                showLoding(false)
            })
        }, () => {
            showLoding(false)
        })
    }

    useEffect(() => {
        if (state.token && web3React.account) {
            initFirstFun()
        } else {
            setuserCard([])
        }
    }, [state.token, web3React.account, level, type, page])
    // 小屏适配
    const Content = () => {
        if (width > 900) {
            return <div className='Content' >
                <div className="SynthesisHandle">
                    <div className="SynthesisItems">
                        <div className="CardItems">
                            {/* 三个150px水平排列 */}
                            <div className="CardItemsLeft" onClick={() => { setSelCard1(null) }}>
                                <div className="CardImg">
                                    <img src={SelCard1?.imageUrl} alt="" ></img>
                                </div>
                                <div className="price">{SelCard1?.currentInitValue ?? 0} BNB</div>
                            </div>
                            <div className="Add"><img src={AddImg} alt="" /></div>
                            <div className="CardItemsRight" onClick={() => { setSelCard2(null) }}>
                                <div className="CardImg">
                                    <img src={SelCard2?.imageUrl} alt="" />
                                </div>
                                <div className="price">{SelCard2?.currentInitValue ?? 0} BNB</div>
                            </div>
                        </div>
                        <div className="result">
                            <img src={resultImg} alt="" />
                        </div>
                        <div className="items">
                            <div className="CardImg1">
                            </div>
                            {
                                isApproved ? <div className='confirmBtn' onClick={() => { mager() }}>{t('Confirm')}</div> : <div className='confirmBtn' onClick={ApproveEvolveFun}>{t('Approve')}</div>
                            }
                            <div className='Tip'>
                                <div className='TipContent TipContent1' onClick={() => { setShowMergeRule(true) }}>{t('Evolve rules')}<img style={{ marginLeft: '5px' }} src={desIcon} alt="" /></div>
                                <div className='TipContent' onClick={() => { setShowMergeRecord(true) }}>{t("Evolve Record")}<img style={{ marginLeft: '5px' }} src={record} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deviceLine"></div>
                <div className='SynthesisList'>
                    <div className="Category">
                        <div className="dropBox">
                            <DropDown Map={typeMap} change={SetType} staetIndex={type}></DropDown>
                            <DropDown Map={LevelMap} change={(num: number) => { SetLevel(num) }} staetIndex={level}>
                            </DropDown>
                        </div>
                        {/* 三个水平排列（保证布局一致） */}
                        {/* 
                        <div className="Page">
                            <Pagination style={{ margin: "auto" }} current={page} defaultPageSize={12} total={total} onChange={changePage} />
                        </div> 
                        */}
                    </div>
                    {/* 精灵 */}
                    <CardListBox></CardListBox>
                </div>
            </div>
        } else {
            return <div className='Content' id="smallContent">
                <div className="SynthesisHandle">
                    <div className="SynthesisItems">
                        <div className="CardItems">
                            {/* 三个150px水平排列 */}
                            <div className="CardItemsLeft" onClick={() => { setSelCard1(null) }}>
                                <div className="CardImg" onClick={() => { setShowComModal(true) }}>
                                    <img src={SelCard1?.imageUrl} alt="" ></img>
                                </div>
                                <div className="price">{SelCard1?.currentInitValue ?? 0} BNB</div>
                            </div>
                            <div className="Add"><img src={AddImg} alt="" /></div>
                            <div className="CardItemsRight" onClick={() => { setSelCard2(null) }}>
                                <div className="CardImg" onClick={() => { setShowComModal(true) }}>
                                    <img src={SelCard2?.imageUrl} alt="" />
                                </div>
                                <div className="price">{SelCard2?.currentInitValue ?? 0} BNB</div>
                            </div>
                        </div>
                        <div className="result">
                            <img src={resultImg} alt="" />
                        </div>
                        <div className="items">
                            <div className="CardImg1">
                            </div>
                            {
                                isApproved ? <div className='confirmBtn' onClick={() => { mager() }}>{t('Confirm')}</div> : <div className='confirmBtn' onClick={ApproveEvolveFun}>{t('Approve')}</div>
                            }
                            <div className='Tip'>
                                <div className='TipContent TipContent1' onClick={() => { setShowMergeRule(true) }}>{t('Evolve rules')}<img style={{ marginLeft: '5px' }} src={desIcon} alt="" /></div>
                                <div className='TipContent' onClick={() => { setShowMergeRecord(true) }}>{t("Evolve Record")}<img style={{ marginLeft: '5px' }} src={record} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    window?.ethereum?.on('accountsChanged', () => {
        if (state.token && web3React.account) {
            setSelCard1(null)
            setSelCard2(null)
        }
    })
    return (
        <div id='Synthesis'>
            <div className='Title'>{t('Evolve')}</div>
            <div className='SynthesisDes'>
            </div>
            <Content></Content>
            <CardComRule isShow={showMergeRule} close={() => setShowMergeRule(false)}></CardComRule>
            {MergeResult && <CardComSuccess isShow={showMergeSuccess} data={MergeResult.cardUser} close={() => setShowMergeSuccess(false)}></CardComSuccess>}
            <CardComRecord isShow={showMergeRecord} close={() => setShowMergeRecord(false)}></CardComRecord>
            <Modal
                visible={ShowComModal}
                className='nodeModal'
                centered
                width={'432px'}
                closable={false}
                footer={null}
                onCancel={() => { setShowComModal(false) }}>
                <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowComModal(false)} />

                <div className='SynthesisList'>
                    <div className="Category">
                        <div className="dropBox">
                            <DropDown Map={typeMap} change={SetType} staetIndex={type}></DropDown>
                            <DropDown Map={LevelMap} change={(num: number) => { SetLevel(num) }} staetIndex={level}>
                            </DropDown>
                        </div>
                        {/* 三个水平排列（保证布局一致） */}
                        {/* 
                        <div className="Page">
                            <Pagination style={{ margin: "auto" }} current={page} defaultPageSize={12} total={total} onChange={changePage} />
                        </div> 
                        */}
                    </div>
                    {/* 精灵 */}
                    <CardListBox></CardListBox>
                </div>
            </Modal>
        </div >
    )
}
