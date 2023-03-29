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
import i18next from 'i18next';
function LandCardDetails(props: any) {
  console.log(props.CardInfo);

  let { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const cardObj = {
    0: '',
    1: [t('Supernova'), t('add LP with value of 0.4 BNB'),],
    2: [t('Outpost'), t('add LP with value of 1 BNB'),],
    3: [t('Galactic Hub'), t('add LP with value of 2 BNB'),],
    4: [t('Star Empire'), t('add LP with value of 5 BNB'),],
    5: [t('Cosmic Nexus'), t('add LP with value of 16 BNB'),]
  }
  const LevelObj = { 0: t('Not active'), 1: t('Lord'), 2: t('Castellan'), 3: t('Mayor'), 4: t('Governor'), 5: t('Speaker') }
  const web3React = useWeb3React()
  let [isApproved, setIsApproved] = useState(false)
  // 挂卖授权
  function createOrderApproval() {
    if (!web3React.account) {
      addMessage(t('Please connect Wallet'))
    }
    /* 判断精灵等级 */
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
        <div className="detailModalBox">


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
          <div className='kpdetails'>{t("land introduction")}{i18next.language === "zh" ? props.CardInfo.zhIntroduce : props.CardInfo.introduce}</div>
          <div className='butm'>
            {isApproved ? <button className='hc' onClick={() => { props.showCreateOrder && props.showCreateOrder(props.CardInfo.cardLevel) }}>{t("Sale")}</button> : <button className='gm' onClick={() => { createOrderApproval() }}> <div>{t("Sale")}</div></button>}
            {<button className='hc' onClick={() => { activeFun() }}>{t("Active")}</button>}
          </div>
        </div>
      </Modal>

    </>
  )
}
export default LandCardDetails