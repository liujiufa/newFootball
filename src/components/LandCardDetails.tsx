import React, { useEffect, useState } from 'react';
import { Contracts } from '../web3'
import { useWeb3React } from '@web3-react/core'
import { CardInfoType } from './Card'
// import {orderInfoType} from '../view/Swap'
import { useTranslation } from 'react-i18next'
import { addMessage, showLoding } from '../utils/tool'
import { Modal } from 'antd';
import { contractAddress } from '../config'
import { useNavigate } from 'react-router-dom';
import BigNumber from 'big.js'
import '../assets/style/componentsStyle/carddetails.scss'
function LandCardDetails(props: any) {
  console.log(props.CardInfo);

  let { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const cardObj = {
    0: '',
    1: [t('Excellent'), t('add LP with value of 0.4 BNB'), t('LandServiceIncome1'), t('LandDividend')],
    2: [t('Rare'), t('add LP with value of 1 BNB'), t('LandServiceIncome2'), t('LandDividend')],
    3: [t('Good'), t('add LP with value of 2 BNB'), t('LandServiceIncome3'), t('LandDividend')],
    4: [t('Epic'), t('add LP with value of 5 BNB'), t('LandServiceIncome4'), t('LandDividend')],
    5: [t('Legend'), t('add LP with value of 16 BNB'), t('LandServiceIncome5'), t('LandDividend')]
  }
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const web3React = useWeb3React()
  let [isApproved, setIsApproved] = useState(false)
  // 挂卖授权
  function createOrderApproval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断徽章等级 */
    Contracts.example.setLandApprovalForAll(web3React.account as string, contractAddress.EXChangeNFT, true).then(() => {
      setIsApproved(true)
      addMessage(t('Authorization succeeded'))
    })
  }

  useEffect(() => {
    if (web3React.account && props.isShow) {
      // 查询挂卖是否授权
      Contracts.example.isApprovedForAll(web3React.account, contractAddress.EXChangeNFT).then((res: any) => {
        setIsApproved(res)
      })
    }
  }, [web3React.account, props.isShow])


  const activeFun = () => {
    console.log("ni");
    navigate('/Liquidity', { state: { cardLevel: props.CardInfo.cardLevel as number } })
  }

  return (
    <>
      <Modal visible={props.showModal}
        destroyOnClose
        onCancel={() => props.close()}
        className='landCard'
        centered
        width={'417px'}
        closable={false}
        footer={null}
      >
        <div className='title'>{t("Land details")}</div>
        <div className='hzimg'>
          {props.CardInfo.isActivation == 1 && <div className="pending">{t("Activated")}</div>}
          <img src={props.CardInfo.imageUrl} alt=""></img>
        </div>
        <div className="p1">
          <div className='kpdetails'>{t("Land quality")}: {cardObj[props.CardInfo.cardLevel][0]}</div>
          <div className='kpdetails'>ID：{props.CardInfo.cardNo}</div>
        </div>
        <div className="p2">
          <div className='kpdetails'>{t("Land title")}：{LevelObj[props.userLevel]}</div>
          <div className='kpdetails'>{t("Status")}：{props.CardInfo.isActivation == 1 ? t('Active') : t('Not active')}</div>
        </div>

        <div className='kpdetails'>{t("Activation requirement")}：{cardObj[props.CardInfo.cardLevel][1]}</div>
        <div className='kpdetails'>{t("Land service income")}：{cardObj[props.CardInfo.cardLevel][2]}</div>
        <div className='kpdetails'>{t("Land dividend")}：{cardObj[props.CardInfo.cardLevel][3]}</div>
        <div className='butm'>
          {isApproved ? <button className='hc' onClick={() => { props.showCreateOrder && props.showCreateOrder(props.CardInfo.cardLevel) }}>{t("Sale")}</button> : <button className='gm' onClick={() => { createOrderApproval() }}> <div>{t("Sale")}</div></button>}
          {<button className='hc' onClick={() => { activeFun() }}>激活</button>}
        </div>
      </Modal>

    </>
  )
}
export default LandCardDetails