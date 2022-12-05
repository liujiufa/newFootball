import React, { useEffect, useState } from "react"
import RaceBoxModal from "../components/RaceBoxModal"
import { useWeb3React } from '@web3-react/core'
import { getBoxBase } from '../API'
import { Contracts } from '../web3'
// import Tips from "../components/Tips"
import { useTranslation } from 'react-i18next'
import { isApprove, addMessage, showLoding, AddrHandle } from '../utils/tool'
import { stateType } from '../store/reducer'

import PurchaseBox from "../components/PurchaseBox"
import BlindBoxImg from '../assets/image/BlindBoxImg.png'
import ContractsImg from '../assets/image/Contracts.svg'
import copyIcon from '../assets/image/copyIcon.png'
import '../assets/style/BlindBox.scss'
import '../assets/style/RaceBoxModal.scss'
import '../assets/style/PurchaseBox.scss'
import copy from 'copy-to-clipboard';
import { NumSplic, getWebsocketData } from '../utils/tool'
import { contractAddress, socketUrl } from "../config"
import BigNumber from 'big.js'
import { useViewport } from "../components/viewportContext"
import { useSelector } from "react-redux"

export interface BoxBaseType {
  id: number
  status: number
  coinName: string
  price: number,
  sellNum: number,
  totalNum: number,
  sellCardinality: number,
}

function BlindBox() {
  const state = useSelector<stateType, stateType>(state => state)
  const { width } = useViewport()
  const web3React = useWeb3React()
  let { t } = useTranslation()
  const [showRaceBoxModal, setShowRaceBoxModal] = useState(false)
  const [showPurchaseBox, setShowPurchaseBox] = useState(false)
  /* 盲盒基本配置 */
  const [BoxBase, setBoxBase] = useState<BoxBaseType[]>([])
  const [buyBoxIndex, setBuyBoxIndex] = useState(0)
  const [BNBPrice, setBNBPrice] = useState(0)
  // const [showCardSynthesis, setshowCardSynthesis] = useState(true)
  /* 购买成功回调 */
  function buySuccess() {
    setShowRaceBoxModal(false)
    setShowPurchaseBox(true)
  }
  function copyFun() {
    copy('0x86C94d3F18D0cb355916705EeDB0bB4329C23b41')
    addMessage(t('Copy Success'))
  }

  function buyBox(index: number) {
    setBuyBoxIndex(index)
    setShowRaceBoxModal(true)
  }

  useEffect(() => {
    if (web3React.account && state.token) {
      /* 查询盲盒基本配置 */
      getBoxBase().then(res => {
        console.log(res.data);
        res.data.map((item: any) => {
          setBNBPrice(item?.price)
          Contracts.example.toSBL(web3React.account as string, item?.price).then((res: any) => {
            let value = new BigNumber(res).div(10 ** 18).toString()
            setBoxBase([{ ...item, price: value }])
          })
        })
      })
      // 推送
      getWebsocketData(socketUrl, `/topic/noOpenEgg/${web3React.account}`, (data: any) => {
        console.log(data, '推送数据')
      })
    }
  }, [web3React.account, state.token])
  return (
    <div>
      <div className="Edition-Center">
        {/* 购买确认弹窗 */}
        {
          BoxBase[buyBoxIndex] && <RaceBoxModal isShow={showRaceBoxModal} BoxInfo={BoxBase[buyBoxIndex]} close={() => { setShowRaceBoxModal(false) }} buySuccess={buySuccess}></RaceBoxModal>
        }

        {/* 购买成功弹窗 */}
        <PurchaseBox isShow={showPurchaseBox} close={() => { setShowPurchaseBox(false) }}></PurchaseBox>
        <div className="BlindBoxTitle">
          {t('BlindBoxTitle')}
        </div>
        <div className="BlindBoxInfo">
          <div className="Info">
            <div className="intr">
              {t('intr')}
            </div>
            <div className="intrContent">
              {
                t('intrContent')
              }
            </div>
            <div className="CopyAddr" onClick={copyFun}>
              {t('Case')}
              <span>{t('Contract')}</span>
              <span>{AddrHandle('0x86C94d3F18D0cb355916705EeDB0bB4329C23b41', 12, 6)}</span>
              <div className="division"></div>
              <img src={copyIcon} alt="" />
            </div>
            <div className="CopyAddr" onClick={copyFun}>
              NFT
              <span>{t('Contract')}</span>
              <span>{AddrHandle('0x86C94d3F18D0cb355916705EeDB0bB4329C23b41', 12, 6)}</span>
              <div className="division"></div>
              <img src={copyIcon} alt="" />
            </div>
            {
              BoxBase.slice(0, 1).map((item, index) => <div key={item.id} className="Row">
                <div className="BuyRow">
                  <div className="buyInfo">
                    <div className="price">{t('price')}:{Math.floor(item.price * 100 + 1) / 100} {item.coinName}
                      {/* {width > 768 && <span>(~{NumSplic(`${BNBPrice}`, 4)} BNB)/{t('pricer')}</span>} */}
                    </div>
                    <span>(~{NumSplic(`${BNBPrice}`, 4)} BNB)/{t('pricer')}</span>

                    {
                      index === 0 && <div className="price">{t('Total')}:{item.totalNum}</div>
                    }
                  </div>
                  {
                    <div className="BuyBtn linear-gradient pointer flex" onClick={() => { buyBox(index) }}>{t('BuyBtn')}</div>
                  }
                </div>
                {
                  index === 0 && <>
                    <div className="PriceDesc">{t('Tips')}:{t("PriceDesc")}</div>
                    <div className="progress">
                      <div className="groove">
                        <div className="Value" style={{ width: (item.sellCardinality + item.sellNum) / item.totalNum * 100 + '%' }}>{NumSplic((item.sellCardinality + item.sellNum) / item.totalNum * 100 + '', 2)}%</div>
                      </div>
                      <div className="progressValue">{item.totalNum - (item.sellCardinality + item.sellNum)}</div>
                    </div>
                  </>
                }
              </div>)
            }
          </div>
          <div className="Img">
            <img src={BlindBoxImg} alt="" />
            <div className="probability">
              <div className="proItem">
                <div className="Dbg flexCenter">
                  <div className="DRadius" style={{ background: '#CFCFCF' }}></div>
                </div>
                <div className="ProInfo">
                  <div className="InfoNum">70%</div>
                  <div className="InfoName">{t("Normal")}</div>
                </div>
              </div>
              <div className="proItem" style={{ marginLeft: 45 }}>
                <div className="Dbg flexCenter">
                  <div className="DRadius" style={{ background: '#4469EA' }}></div>
                </div>
                <div className="ProInfo">
                  <div className="InfoNum">20%</div>
                  <div className="InfoName">{t("Good")}</div>
                </div>
              </div>
              <div className="proItem" style={{ marginLeft: 45 }}>
                <div className="Dbg flexCenter">
                  <div className="DRadius" style={{ background: '#7644EA' }}></div>
                </div>
                <div className="ProInfo">
                  <div className="InfoNum">10%</div>
                  <div className="InfoName">{t("Outstanding")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(BlindBox)