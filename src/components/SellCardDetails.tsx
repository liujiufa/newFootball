import React, { useEffect, useState } from 'react';
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { CardInfoType } from './Card'
// import {orderInfoType} from '../view/Swap'
import { useTranslation } from 'react-i18next'
import { addMessage, showLoding } from '../utils/tool'
import { Modal, Image } from 'antd';
import { contractAddress } from '../config'
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/carddetails.scss'

interface CardDetailPropsType {
  isShow: boolean,
  close: Function,
  type: string,
  CardInfo: CardInfoType,
  showCreateOrder?: Function
  CreateOrderSuccess?: Function
  showMerge?: Function
  pledgeSuccessModal: Function,
}
const cardClass = ['', 'Perseus Badge', 'Khaos Badge', 'Gaea Badge', 'Astra Badge']
const level = ['', 'Common', 'Uncommon', 'Outstanding', 'Rare', 'Perfect', 'Epic']
/* type:Swap 交易场详情 CreateOrder 挂单详情 NFT 背包徽章详情 */
// const cardObj = {
//   0: '',
//   1: ['优秀', '添加价值0.4BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的7%，同品质土地新增收益5%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   2: ['稀有', '添加价值1BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的10%，同品质土地新增收益10%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   3: ['良品', '添加价值2BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的13%，同品质土地新增收益15%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   4: ['史诗', '添加价值5BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的15%，同品质土地新增收益20%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%'],
//   5: ['传奇', '添加价值16BNB的LP', '土地内新增购买宝箱和徽章升级消耗SBL的18%，同品质土地新增收益25%', '所有同品质土地每日均分新增购买宝箱和徽章升级消耗SBL的2.5%']
// }

function CardDetails(props: any) {
  let { t, i18n } = useTranslation()
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const cardObj = {
    0: '',
    1: [t('Excellent'), t('add LP with value of 0.4 BNB'), t('LandServiceIncome1'), t('LandDividend')],
    2: [t('Rare'), t('add LP with value of 1 BNB'), t('LandServiceIncome2'), t('LandDividend')],
    3: [t('Good'), t('add LP with value of 2 BNB'), t('LandServiceIncome3'), t('LandDividend')],
    4: [t('Epic'), t('add LP with value of 5 BNB'), t('LandServiceIncome4'), t('LandDividend')],
    5: [t('Legend'), t('add LP with value of 16 BNB'), t('LandServiceIncome5'), t('LandDividend')]
  }
  const web3React = useWeb3React()
  // 挂卖授权
  let [isApproved, setIsApproved] = useState(false)
  // 质押授权
  const [isApprovePledgeValue, setIsApprovePledgeValue] = useState(false)
  // 铸造授权
  const [isApproveMergeValue, setIsApproveMergeValue] = useState(false)
  let [putPrice, setPutPrice] = useState('')
  async function createOrder() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    let owenr = await Contracts.example.ownerLandOf(web3React.account as string, props.CardInfo.tokenId)
    if (owenr !== web3React.account) {
      return addMessage(t("Cards don't belong to you"))
    }
    if (putPrice.length === 0) {
      return addMessage(t('Please enter the correct price'))
    }
    let numSplit = putPrice.toString().split(".")
    if (numSplit.length === 2 && numSplit[1].length > 4) {
      return addMessage(t('Please enter the correct precision'))
    }
    if (putPrice === '.') {
      return addMessage(t('Please enter the correct price'))
    }
    if (numSplit.length > 2) {
      return addMessage(t('Please enter the correct price'))
    }
    if (numSplit[0].length > 18) {
      return addMessage(t('Please enter the correct precision'))
    }
    if (new BigNumber(putPrice).lte(0)) {
      return addMessage(t('Please enter the correct price'))
    }
    showLoding(true)
    Contracts.example.createOrder(web3React.account as string, props.CardInfo.tokenId, putPrice, contractAddress.Token, contractAddress.LandNFT).then((res: any) => {
      // addMessage("创建订单成功")
      props.CreateOrderSuccess && props.CreateOrderSuccess()
    }).finally(() => {
      showLoding(false)
    })
  }

  useEffect(() => {
    if (web3React.account && props.isShow) {
      setPutPrice('')
      // 查询挂卖是否授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.EXChangeNFT).then((res: any) => {
        setIsApproved(res)
      })

      // 查询质押授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.Pledge).then((res: any) => {
        setIsApprovePledgeValue(res)
      })

      // 查询合成授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.Merge).then((res: any) => {
        setIsApproveMergeValue(res)
      })

    }
  }, [web3React.account, props.type, props.isShow])

  // 挂卖授权
  function createOrderApproval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断徽章等级 */
    Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.EXChangeNFT, true).then(() => {
      setIsApproved(true)
      addMessage(t('Authorization succeeded'))
    })
  }

  // 质押授权
  function Approval() {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.Pledge, true).then(() => {
      setIsApprovePledgeValue(true)
      return addMessage(t('Authorization succeeded'))
    })
  }

  // 合成函数
  function ApproveEvolveFun() {
    if (!isApproveMergeValue) {
      if (!web3React.account) {
        return addMessage(t('Please connect Wallet'))
      }
      Contracts.example.setApprovalForAll(web3React.account as string, contractAddress.Merge, true).then(() => {
        setIsApproveMergeValue(true)
        return addMessage(t('Authorization succeeded'))
      })
    }
  }

  function putNum(e: React.ChangeEvent<HTMLInputElement>) {
    setPutPrice(e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
  }
  return (
    <>
      {
        props.CardInfo && <Modal visible={props.isShow}
          destroyOnClose
          onCancel={() => props.close()}
          className='landCard'
          centered
          width={'417px'}
          closable={false}
          footer={null}
        >
          <p className='title'>{props.type === "CreateOrder" ? t('Listing details') : t('Card Details')}</p>
          <div className='hzimg'>
            <Image src={props.CardInfo.imageUrl} alt=""></Image>
          </div>
          <div className="p1">
            <p className='kpdetails'>{t("Land quality")}: {cardObj[props.CardInfo.cardLevel][0]}</p>
            <p className='kpdetails'>ID：{props.CardInfo.cardNo}</p>
          </div>
          <div className="p2">
            <p className='kpdetails'>{t("Land title")}：{LevelObj[props.userLevel]}</p>
            <p className='kpdetails'>{t("Status")}：{props.CardInfo.isActivation == 1 ? t('Active') : t('Not active')}</p>
          </div>

          <p className='kpdetails'>{t("Activation requirement")}：{cardObj[props.CardInfo.cardLevel][1]}</p>
          <p className='kpdetails'>{t("Land service income")}：{cardObj[props.CardInfo.cardLevel][2]}</p>
          <p className='kpdetails'>{t("Land dividend")}：{cardObj[props.CardInfo.cardLevel][3]}</p>

          {/* 挂卖 */}
          {
            props.type === "CreateOrder" && <p className='kpdetails'>{t('Please enter price')}:<input type='text' value={putPrice} onChange={putNum} />SBL</p>
          }
          {
            props.type === "CreateOrder" && <div className='butm'>
              <button className='hc' onClick={createOrder}>{t('Verify')}</button>
            </div>
          }
        </Modal>
      }

    </>
  )
}
export default CardDetails