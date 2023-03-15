import React, { useEffect, useState } from 'react';
import { getCardCompoundList, compoundCard } from '../API'
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { CardInfoType } from './Card'
import { contractAddress } from '../config'
import { Modal, Pagination } from 'antd';
import { addMessage, NumSplic, showLoding } from '../utils/tool'
import RuleImg from '../assets/image/CardSynthesis.png'
import addIcon from '../assets/image/addIcon.png'
import '../assets/style/componentsStyle/CardSynthesis.scss'
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
function CardSynthesis(props: CardSynthesisPropsType) {
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
    useEffect(() => {
        if (web3React.account && state.token && props.isShow) {
            setSelCard(null)
            getCardCompoundList({
                currentPage: page,
                level: props.CardInfo.cardLevel,
                type: props.CardInfo.cardLevel < 5 ? type : props.CardInfo.cardType,
                pageSize: 12,
                userAddress: web3React.account
            }).then(res => {
                res.data.list = res.data.list.filter((item: CardInfoType) => {
                    return item.tokenId !== props.CardInfo.tokenId
                })
                console.log(res.data, '合成列表')
                toSBLFun(res.data.price, res.data)
                SetTotal(res.data.size)
            })
            Contracts.example.isApprovedForAll(web3React.account, contractAddress.Merge).then((res: boolean) => {
                setIsApproved(res)
            })
        }
    }, [web3React.account, state.token, type, props.isShow, page])

    async function toSBLFun(price: number, item: any) {
        let value = await Contracts.example.toSBL(web3React.account as string, price)
        let valueed = new BigNumber(value).div(10 ** 18).toString()
        console.log(valueed);
        setToBeSelect({ ...item, price: valueed })
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
    /* 合成 */
    async function mager() {
        setShowEnterMerge(false)
        if (!web3React.account) {
            return addMessage(t('Please connect Wallet'))
        }
        if (!SelCard) {
            return addMessage(t('Please select the card to synthesize'))
        }
        if (Math.floor(SelCard?.currentPower / SelCard?.basePower * 100) != 100) {
            return addMessage(t('Please select the card to synthesize'))
        }

        let owner = await Promise.all([
            Contracts.example.ownerOf(web3React.account as string, props.CardInfo.tokenId),
            Contracts.example.ownerOf(web3React.account as string, SelCard.tokenId)
        ])
        console.log('mager1', props.CardInfo.tokenId, SelCard.tokenId);
        if (owner[0] !== web3React.account || owner[1] !== web3React.account) {
            return addMessage(t('The badge to be synthesized does not belong to you'))
        }
        let Balance = await Contracts.example.balanceOf(web3React.account as string)
        Balance = new BigNumber(Balance).div(10 ** 18).toString()
        if (new BigNumber(Balance).lt(ToBeSelect?.price as number)) {
            return addMessage(t('not enough'))
        }
        showLoding(true)
        compoundCard({
            cardId: props.CardInfo.id,
            choiceCardId: SelCard.id
        }).then(resSign => {
            // Contracts.example.toSynthesis(web3React.account as string, resSign.data.sign, ToBeSelect?.price as number).then((res: any) => {
            //     props.mergeSuccess(resSign.data.cardUser)
            // }).finally(() => {
            //     showLoding(false)
            // })
        }, () => {
            showLoding(false)
        })
    }

    function changePage(pageNum: number) {
        SetPage(pageNum)
    }

    function ToBeSelectFun(currentPower: number, basePower: number, obj: any) {
        if (currentPower == basePower) {
            setSelCard(obj)
        } else {
            addMessage(t('Insufficient computing power'))
        }
    }

    useEffect(() => {
        if (web3React.account) {
            // 查询合成授权（SBL）
            Contracts.example.Tokenapprove(web3React.account as string, contractAddress.Merge).then((res: any) => {
                setApproveValue(new BigNumber(res).div(10 ** 18).toString())
            })
        }
    }, [web3React.account])

    return (
        <>
            {/* 确认合成 */}
            <Tips isShow={showEnterMerge} title={t('Expenses')} subTitle={t('The evolving cost') + Math.floor(ToBeSelect?.price as number) + "SBL"} enterFun={mager} close={() => setShowEnterMerge(false)}></Tips>
            <CardComRule isShow={showMergeRule} close={() => setShowMergeRule(false)}></CardComRule>
            <Modal visible={props.isShow && !showMergeRule}
                className='CardSynthesis'
                onCancel={() => props.close()}
                centered
                maskClosable
                width={'1119px'}
                closable={false}
                footer={null}
            >
                <div className='Title'>{t('NFTs Evolve')}</div>
                <div className='Handle'>
                    <div className="SynthesisHandle">
                        <div className="SynthesisItems">
                            <div className="CardItems">
                                {/* 三个150px水平排列 */}
                                <div className="CardItemsLeft"><img src={props.CardInfo && props.CardInfo.imageUrl} alt="" ></img>
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
                                <div className='Tip'><div className='TipContent' onClick={() => { setShowMergeRule(true) }}>{t('Evolve rules')}</div><div className='TipImg'> <img style={{ marginLeft: '5px' }} src={RuleImg} alt="" /></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="deviceLine"></div>

                    <div className='SynthesisList'>
                        <div className="Category">
                            {
                                props.isShow && props.CardInfo.cardLevel < 5 && <DropDown Map={typeMap} change={SetType}></DropDown>
                            }
                            {/* 三个水平排列（保证布局一致） */}
                            {/* <div className="Page">
                                <Pagination simple current={page} total={total} defaultPageSize={12} onChange={changePage} />
                            </div> */}
                            <div className="Page">
                                <Pagination style={{ margin: "auto" }} current={page} defaultPageSize={12} total={total} onChange={changePage} />
                            </div>
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
            </Modal>
        </>
    )
}
export default CardSynthesis