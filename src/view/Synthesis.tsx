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
import desIcon from '../assets/image/desIcon.png'
import translateRecoedIcon from '../assets/image/translateRecoedIcon.png'
import defaultCard from '../assets/image/defaultCard.png'
import addIcon from '../assets/image/addIcon.png'
import '../assets/style/Synthesis.scss'
import AddImg from '../assets/image/Union.png'
import resultImg from '../assets/image/resultImg.png'
import DropDown from '../components/DropDown'
import Tips from '../components/Tips'
import { useTranslation } from 'react-i18next'
import { socketUrl } from "../config"
// 徽章合成规则
import CardComRule from '../components/CardComRule'
import CardComSuccess from '../components/CardComSuccess'
import CardComRecord from '../components/CardComRecord'
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
    const [SelCard1, setSelCard1] = useState<any>(null)
    const [MergeResult, setMergeResult] = useState<any>(null)
    const [SelCard2, setSelCard2] = useState<CardInfoType | null>(null)
    let [userCard, setuserCard] = useState<CardInfoType[]>([])
    /* 分页总条数 */
    let [totalNum, SetTotalNum] = useState(0)
    /* 确认合成弹窗控制 */
    let [showEnterMerge, setShowEnterMerge] = useState(false)
    /* 合成规则弹窗控制 */
    let [showMergeRule, setShowMergeRule] = useState(false)
    let [showMergeSuccess, setShowMergeSuccess] = useState(false)
    let [showMergeRecord, setShowMergeRecord] = useState(false)
    /* 等级筛选 */
    let [level, SetLevel] = useState(0)
    /* 类型筛选 */
    let [type, SetType] = useState(0)
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
            key: 'Common',
            value: 1
        },
        {
            key: 'Uncommon',
            value: 2
        },
        {
            key: 'Outstanding',
            value: 3
        },
        {
            key: 'Rare',
            value: 4
        },
        {
            key: 'Perfect',
            value: 5
        },
        {
            key: 'Epic',
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
    //徽章
    const CardListBox = () => {
        if (!SelCard1) {
            // 第一张
            return <div className="CardListBox" >
                {
                    userCard?.length !== 0 ? <>
                        <div className="synthesisCardList">
                            {
                                userCard.map((item, index) => <Card key={item.id} Index={index} cardInfo={item} fun={() => { setSelCard1(item) }}></Card>)
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
                                ToBeSelect?.list.map((item, index) => <Card key={item.id} Index={index} cardInfo={item} fun={() => { setSelCard2(item) }}></Card>)
                            }
                        </div>
                    </> : <><NoData></NoData></>
                }
            </div>
        }
    }
    useEffect(() => {
        if (web3React.account && state.token) {
            getCardCompoundList({
                currentPage: page,
                level: SelCard1?.cardLevel,
                type: SelCard1?.cardLevel < 5 ? type : SelCard1?.cardType,
                pageSize: 12,
                userAddress: web3React.account
            }).then((res: any) => {
                if (res.code === 200) {
                    res.data.list = res.data.list.filter((item: CardInfoType) => {
                        return item.tokenId !== SelCard1?.tokenId
                    })
                    console.log(res.data, '??????');
                    // toSBLFun(res.data.price, res.data)
                    setToBeSelect(res.data)
                    SetTotal(res.data.size)
                }
            })
            Contracts.example.isApprovedForAll(web3React.account, contractAddress.NFT).then((res: boolean) => {
                setIsApproved(res)
            })
        }
    }, [web3React.account, state.token, type, page, SelCard1])

    /* 合成 */
    async function mager() {
        setShowEnterMerge(false)
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        if (!SelCard1) {
            return addMessage(t('Please select the card to synthesize'))
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
            console.log(resSign);
            setMergeResult(resSign.data)
            Contracts.example.toSynthesis(web3React.account as string, resSign.data.sign).then((res: any) => {
                setShowMergeSuccess(true)
            }).finally(() => {
                showLoding(false)
            })
        }, () => {
            showLoding(false)
        })
    }

    useEffect(() => {
        if (state.token && web3React.account) {
            getUserCard({
                currentPage: page,
                level: level,
                pageSize: 12,
                type: type,
                userAddress: web3React.account
            }).then(res => {
                console.log(res.data, "用户徽章")
                setuserCard(res.data.list)
                SetTotalNum(res.data.size)
            })
            // // 推送
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
            //         SetTotalNum(data.size)
            //     })
            // return () => {
            //     try {
            //         stompClient.disconnect()
            //     } catch {

            //     }
            //     clearInterval(sendTimer)
            // }
        } else {
            setuserCard([])
        }
    }, [state.token, web3React.account, level, type, page])

    return (
        <div id='Synthesis'>
            <div className='Title'>{t('NFTs Evolve')}</div>
            <div className='Content'>
                <div className="SynthesisHandle">
                    <div className="SynthesisItems">
                        <div className="CardItems">
                            {/* 三个150px水平排列 */}
                            <div className="CardItemsLeft"><img src={SelCard1?.imageUrl} alt="" ></img>
                            </div>
                            <div className="Add"><img src={AddImg} alt="" /></div>
                            {
                                SelCard2 ? <>
                                    <div className="CardItemsRight"><div className="CardImg"><img src={SelCard2?.imageUrl} alt="" /></div></div>
                                </> : <>
                                    <div className="CardItemsRight"><div className="CardImg"></div></div>
                                </>
                            }
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
                                <div className='TipContent' onClick={() => { setShowMergeRecord(true) }}>合成记录<img style={{ marginLeft: '5px' }} src={translateRecoedIcon} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deviceLine"></div>
                <div className='SynthesisList'>
                    <div className="Category">
                        <div className="dropBox">
                            <DropDown Map={typeMap} change={SetType}></DropDown>
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
                    {/* 徽章 */}
                    <CardListBox></CardListBox>

                </div>
            </div>
            <CardComRule isShow={showMergeRule} close={() => setShowMergeRule(false)}></CardComRule>
            {MergeResult && <CardComSuccess isShow={showMergeSuccess} data={MergeResult} close={() => setShowMergeSuccess(false)}></CardComSuccess>}
            <CardComRecord isShow={showMergeRecord} close={() => setShowMergeRecord(false)}></CardComRecord>
        </div >
    )
}
