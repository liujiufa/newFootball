import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { openBox, boxBase, openBoxResule, wrapRecord, boxRecord, wrapCount } from '../API/index'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { useViewport } from '../components/viewportContext'
import { useWeb3React } from '@web3-react/core'
import { Contracts } from '../web3';
import { showLoding, addMessage, dateFormat, AddrHandle, getBit } from '../utils/tool';
import { contractAddress, nftType, nftLevel } from '../config'
import { BlockUrl, grade } from '../config'
import AnimaMain from "../components/AnimaMain";
import Web3 from 'web3';
import BigNumber from 'big.js'
import '../assets/style/BlindBox.scss'
import BlindBoxImg from '../assets/image/BlindBoxImg.png'
import BlindBoxImg1 from '../assets/image/BlindBox1.png'
import BlindBoxImg2 from '../assets/image/BlindBox2.png'
import BlindBoxImg3 from '../assets/image/BlindBox3.png'
import BlindBoxImg4 from '../assets/image/BlindBox4.png'
import BlindBoxImg5 from '../assets/image/BlindBox5.png'
import BlindBoxImg6 from '../assets/image/BlindBox6.png'
import BlindBoxImg7 from '../assets/image/BlindBox7.png'
import BlindBoxImg1EN from '../assets/image/BlindBox1EN.png'
import BlindBoxImg2EN from '../assets/image/BlindBox2EN.png'
import BlindBoxImg3EN from '../assets/image/BlindBox3EN.png'
import BlindBoxImg4EN from '../assets/image/BlindBox4EN.png'
import BlindBoxImg5EN from '../assets/image/BlindBox5EN.png'
import BlindBoxImg6EN from '../assets/image/BlindBox6EN.png'
import BlindBoxImg7EN from '../assets/image/BlindBox7EN.png'
import coinIcon11 from '../assets/image/coinIcon11.png'
import coinIcon12 from '../assets/image/coinIcon12.png'
import coinIcon13 from '../assets/image/coinIcon13.png'
import coinIcon14 from '../assets/image/coinIcon14.png'
import coinIcon2 from '../assets/image/coinIcon2.png'
import coinIcon3 from '../assets/image/coinIcon3.png'
import coinIcon4 from '../assets/image/coinIcon4.png'
import SBLIcon from '../assets/image/SBLIcon.png'
import gradeAll from '../assets/image/gradeAll.png'
import grade0 from '../assets/image/grade1.png'
import grade1 from '../assets/image/grade2.png'
import grade2 from '../assets/image/grade3.png'
import grade3 from '../assets/image/grade4.png'
import copyIcon from '../assets/image/copyIcon.png'
import closeIcon from '../assets/image/closeIcon.png'
import decIcon from '../assets/image/desIcon.png'
import swichMiddleIcon from '../assets/image/swichMiddleIcon.png'
import { useNavigate } from 'react-router-dom';
import copy from "copy-to-clipboard";
import NoData from '../components/NoData';
import i18n from '../lang/i18n';
export interface BoxBaseType {
  id: number
  status: number
  coinName: string
  price: number,
  sellNum: number,
  totalNum: number,
  sellCardinality: number,
}
let gradeImg = { 0: gradeAll, 1: grade0, 2: grade1, 3: grade2, 4: grade3 }
export default function BlindBox() {
  let { t } = useTranslation()
  let redioObj = [
    { icon: coinIcon11, title: t("First prize"), subtitle: '1%' },
    { icon: coinIcon12, title: t("Second prize"), subtitle: '1.5%' },
    { icon: coinIcon13, title: t("Third prize"), subtitle: '2.5%' },
    { icon: coinIcon14, title: t("General  prize"), subtitle: '10%' },
    { icon: coinIcon2, title: t("1 star"), subtitle: '45%' },
    { icon: coinIcon3, title: t("2 star"), subtitle: '30%' },
    { icon: coinIcon4, title: t("3 star"), subtitle: '10%' },
  ]
  let state = useSelector<stateType, stateType>(state => state);
  const { width } = useViewport();
  const navigate = useNavigate()
  const web3React = useWeb3React()
  let [TabIndex, SetTabIndex] = useState(0)
  const [confirmBuy, setConfirmBox] = useState(false)
  const [RadioModal, setRadioModal] = useState(false)
  const [confirmRewardBox, setConfirmRewardBox] = useState(false)
  const [balance1, setBalance1] = useState('0')
  const [ApproveValue, setApproveValue] = useState('0')
  const [BoxBaseValue, setBoxBaseValue] = useState<any>()
  const [BoxBaseArr, setBoxBaseArr] = useState<any>()
  const [WrapRecord, setWrapRecord] = useState<any>([])
  const [BoxRecord, setBoxRecord] = useState<any>([])
  const [ResultData, setResultData] = useState<any>()
  const [oepnCardList, setOepnCardList] = useState<number[]>([])
  function changeTab(tab: number) {
    SetTabIndex(tab)
  }
  useEffect(() => {
    boxBase().then((res: any) => {
      console.log(res, '盲盒配置');
      res.data.map((item: any) => {
        if (web3React.account) {
          Contracts.example.toMBAS(web3React.account as string, item?.price).then((res: any) => {
            let value = new BigNumber(res).div(10 ** 18).toString()
            console.log({ ...item, MBASPrice: value }, 'value');
            setBoxBaseValue({ ...item, MBASPrice: (parseInt(value) + 1) })
          }).catch((res: any) => {
            setBoxBaseValue({ ...item, MBASPrice: 0 })
          })
        } else {
          setBoxBaseValue({ ...item, MBASPrice: 0 })
        }
      })
    })
  }, [state.token])
  useEffect(() => {
    if (state.token) {
      wrapCount().then((res: any) => {
        console.log(res.data, '红包');
        setBoxBaseArr(res.data)
      })
    }
  }, [state.token])

  useEffect(() => {
    if (state.token) {
      setOepnCardList([])
      wrapRecord().then((res: any) => {
        console.log(res.data, 'BNB开奖');
        setWrapRecord(res.data.reverse())
      })
      boxRecord().then((res: any) => {
        console.log(res.data, '个人开奖');
        setBoxRecord(res.data)
      })
    }
  }, [state.token, TabIndex])

  const openBoxFun = () => {
    if (parseFloat(BoxBaseValue?.MBASPrice) > parseFloat(balance1)) {
      return addMessage(t('Insufficient balance'))
    }
    showLoding(true)
    openBox({}).then((res: any) => {
      console.log(res, '开宝箱');
      if (res.code === 200) {
        Contracts.example.openBox(web3React.account as string, res.data as string).then((res: any) => {
          Contracts.example.web3.eth.getTransactionReceipt(res.transactionHash).then((res: any) => {
            let value1 = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 256, res.logs[res.logs.length - 1].data.length - 192), "wei")
            let type = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 192, res.logs[res.logs.length - 1].data.length - 128), "wei")
            let grade1 = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 128, res.logs[res.logs.length - 1].data.length - 64), "wei")
            // console.log("日志:", res, "类型:", value1, "宝箱类型:", type, "宝箱等级:", grade,);
            // 0:NFT,1:一等奖,2:二等奖,3:三等奖,4:特等奖
            showLoding(false)
            if (value1 === '0') {
              openBoxResule(type, grade1).then((res: any) => {
                if (res.code === 200) {
                  setConfirmBox(true)
                  setResultData(res.data)
                }
              })
            } else {
              setConfirmRewardBox(true)
              setResultData(value1)
            }
          })
        }).finally(() => {
          showLoding(false)
        })
      }
    })
  }
  console.log(ResultData, BoxBaseArr, BoxBaseArr?.list?.find((item: any) => item.level == ResultData)?.amount, '1212');

  // 打开相应记录列表
  const openFun = (key: number) => {
    let list = oepnCardList;
    const flag = list.some(item => Number(item) === Number(key))
    if (flag) {
      list = list.filter(item => Number(item) !== Number(key))
    } else {
      list = [...list, key]
    }
    setOepnCardList(list)
  }

  // 授权
  function ApproveFun(num: number) {
    console.log(num, '授权额度');
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    Contracts.example.toLiquiditySBL(web3React.account as string, num).then((res: any) => {
      let value = new BigNumber(res).div(10 ** 18).toString()
      showLoding(true)
      Contracts.example.approve1(web3React.account as string, contractAddress.BlindBox, value).then(() => {
        Contracts.example.Tokenapprove(web3React.account as string, contractAddress.BlindBox).then((res: any) => {
          setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        })
      }).finally(() => {
        showLoding(false)
      })
    })
  }

  const gradeValueFun = (item: any) => {
    // 2:红包 1:土地
    if (item?.type === 2) {
      return t(grade[item?.level])
    } else if (item?.type === 1) {
      return `${t(nftLevel[item?.level])}-${t(nftType[item?.nftType])}`
    }
  }


  useEffect(() => {
    if (web3React.account) {
      /* 查询MBAS余额 */
      Contracts.example.balanceOf(web3React.account).then((res: any) => {
        setBalance1(new BigNumber(res).div(10 ** 18).toString())
      })
      /* 查询用户授权 */
      Contracts.example.Tokenapprove(web3React.account, contractAddress.BlindBox).then((res: any) => {
        setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        console.log(new BigNumber(res).div(10 ** 18).toString(), '授权额度');
      })
    }
  }, [web3React.account])
  // BNB開獎記錄
  const AutoBox1 = () => {
    if (width > 1024) {
      return <div className='bigRecord'>
        <div className="items titles">
          <div className="item time">{t("Time")}</div>
          <div className="item addr">{t("Address1")}</div>
          <div className="item type">{t("Type")}</div>
          <div className="item value">{t("Amount")}</div>
          <div className="item hash">{t("Transaction hashes")}</div>
        </div>
        <div className="bigBox">
          {WrapRecord?.length > 0 ? WrapRecord.map((item: any, index: any) => <div key={index} className="items contents">
            <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
            <div className="item addr">{AddrHandle(item?.userAddress, 6, 6)}</div>
            <div className="item type">{t(grade[item?.level])}</div>
            <div className="item value">{item?.amount} BNB</div>
            <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{AddrHandle(item?.txId, 6, 6)}</div>
          </div>) : <NoData></NoData>}
        </div>
      </div>
    } else {
      return <div className='middleRecord'>
        <div className="items titles">
          <div className="item time">{t("Time")}</div>
          <div className="item type">{t("Type")}</div>
          <div className="item value">{t("Amount")}</div>
          <div className='switchIcon'></div>
        </div>
        <div className="bigBox">
          {WrapRecord?.length > 0 ? WrapRecord.map((item: any, index: any) =>
            <div className="Box">
              <div key={index} className="items contents">
                <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
                <div className="item type">{t(grade[item?.level])}</div>
                <div className="item value">{item?.amount} BNB</div>
                <div className="item switchIcon" onClick={() => { openFun(index) }}><img className={oepnCardList.some(option => Number(option) === Number(index)) ? 'spanRotate' : 'spanReset'} src={swichMiddleIcon} alt="" /></div>
              </div>
              {
                oepnCardList.some(option => Number(option) === Number(index)) && <div className="smallBox">
                  <div className="item addr">{t("Address1")}<span>{AddrHandle(item?.userAddress, 6, 6)}</span></div>
                  <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{t("Transaction hashes")}<span>{AddrHandle(item?.txId, 6, 6)}</span></div>
                </div>
              }
            </div>
          ) : <NoData></NoData>}
        </div>
      </div>
    }
  }
  // 我的開獎記錄
  const AutoBox2 = () => {
    if (width <= 1024) {
      return <div className='middleRecord'>
        <div className="items titles">
          <div className="item time">{t("Time")}</div>
          <div className="item type">{t("Type")}</div>
          <div className="item value">{t("Amount")}</div>
          {/* <div className="item hash">交易哈希</div> */}
          <div className='switchIcon'></div>
        </div>
        <div className="bigBox">
          {BoxRecord?.length > 0 ? BoxRecord.map((item: any, index: any) =>
            <div className="Box">
              <div key={index} className="items contents">
                <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
                <div className="item type">{gradeValueFun(item)}</div>
                <div className="item value">{!!item?.amount ? `${item?.amount} BNB` : "-"}</div>
                <div className="item switchIcon" onClick={() => { openFun(index) }}><img className={oepnCardList.some(option => Number(option) === Number(index)) ? 'spanRotate' : 'spanReset'} src={swichMiddleIcon} alt="" /></div>
              </div>
              {
                oepnCardList.some(option => Number(option) === Number(index)) && <div className="smallBox">
                  <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{t("Transaction hashes")}<span>{AddrHandle(item?.txId, 6, 6)}</span></div>
                </div>
              }
            </div>
          ) : <NoData></NoData>}
        </div>
      </div>
    } else {
      return <div className='bigRecord'>
        <div className="items titles">
          <div className="item time">{t("Time")}</div>
          <div className="item type">{t("Type")}</div>
          <div className="item value">{t("Amount")}</div>
          <div className="item hash">{t("Transaction hashes")}</div>
        </div>
        <div className="bigBox">
          {BoxRecord?.length > 0 ? BoxRecord.map((item: any, index: any) => <div key={index} className="items contents">
            <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
            <div className="item type">{gradeValueFun(item)}</div>
            <div className="item value">{!!item?.amount ? `${item?.amount} BNB` : "-"}</div>
            <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{AddrHandle(item?.txId, 6, 6)}</div>
          </div>) : <NoData></NoData>}
        </div>
      </div>
    }
  }

  const ImgBox = () => {
    if (width > 600) {
      return <div className="imgBox">
        <img src={BlindBoxImg} alt="" />
        {i18n.language === "zh" ? <div className="boxContainer">
          <img className='img1' src={BlindBoxImg1} alt="" />
          <img className='img2' src={BlindBoxImg2} alt="" />
          <img className='img3' src={BlindBoxImg3} alt="" />
          <img className='img4' src={BlindBoxImg4} alt="" />
          <img className='img7' src={BlindBoxImg5} alt="" />
          <img className='img6' src={BlindBoxImg6} alt="" />
          <img className='img5' src={BlindBoxImg7} alt="" />
        </div> : <div className="boxContainer">
          <img className='img1' src={BlindBoxImg1EN} alt="" />
          <img className='img2' src={BlindBoxImg2EN} alt="" />
          <img className='img3' src={BlindBoxImg3EN} alt="" />
          <img className='img4' src={BlindBoxImg4EN} alt="" />
          <img className='img7' src={BlindBoxImg5EN} alt="" />
          <img className='img6' src={BlindBoxImg6EN} alt="" />
          <img className='img5' src={BlindBoxImg7EN} alt="" />
        </div>}
      </div>
    } else {
      return <div className='imgMiddleBox'> <img src={BlindBoxImg} alt="" /></div>
    }
  }

  return (
    <div className="Edition-Center" id='BlindBox'>
      <div className="Title">{t("Mystery Box")}</div>
      <div className="subTitle">{t("Open the Blind box to unlock special benefits")}</div>
      {/* <div className="imgBox">
        <img src={BlindBoxImg} alt="" />
        <div className="boxContainer">
          <img className='img1' src={BlindBoxImg1} alt="" />
          <img className='img2' src={BlindBoxImg2} alt="" />
          <img className='img3' src={BlindBoxImg3} alt="" />
          <img className='img4' src={BlindBoxImg4} alt="" />
          <img className='img5' src={BlindBoxImg5} alt="" />
          <img className='img6' src={BlindBoxImg6} alt="" />
          <img className='img7' src={BlindBoxImg7} alt="" />
        </div>
      </div> */}
      <ImgBox></ImgBox>
      <div className="priceBox">
        <div className='price'> {t("Price")}：<img src={SBLIcon} alt="" />{BoxBaseValue?.MBASPrice}{BoxBaseValue?.name}（~{BoxBaseValue?.price}BNB）</div>
        <div className="boxNum">{t("Remaining quantity")}：{BoxBaseValue?.totalNum - BoxBaseValue?.sellNum}/{BoxBaseValue?.totalNum}</div>
        <div className="btnBox">
          {
            BoxBaseValue?.MBASPrice > 0 ?
              (parseFloat(ApproveValue) >= parseFloat(BoxBaseValue?.MBASPrice) ? <div className="buyBtn flexCenter" onClick={() => { openBoxFun() }}>{t("OPEN CASE")}</div> : <div className="buyBtn flexCenter approveBtn" onClick={() => { ApproveFun(BoxBaseValue?.MBASPrice) }}>{t("Approve")}</div>) :
              <div className="buyBtn flexCenter">{t("OPEN CASE")}</div>
          }
          {width < 600 && <img src={decIcon} alt="" onClick={() => {
            setRadioModal(true)
          }} />
          }
        </div>
      </div>
      {BoxBaseArr && <div className="goodsBox">
        <div className="goods">
          <img src={gradeImg[0]} alt="" />
          <div className="title">{t("Bonus pool")}</div>
          <div className="num">{BoxBaseArr?.totalAmount}BNB</div>
        </div>
        {BoxBaseArr?.list.length > 0 ? BoxBaseArr?.list?.map((item: any, index: any) => <div key={index} className="goods">
          <div className="ImgBox">
            <img src={gradeImg[item?.level]} alt="" />
            <div className="surplus flexCenter">{item?.surplusCount}</div>
          </div>
          <div className="title">{t(grade[item?.level])}</div>
          <div className="num">{item?.amount}BNB</div>
        </div>) : [1, 2, 3, 4].map((item: any, index: any) => <div key={index} className="goods">
          <div className="ImgBox">
            <img src={gradeImg[item]} alt="" />
            <div className="surplus flexCenter">0</div>
          </div>
          <div className="title">{t(grade[item])}</div>
          <div className="num">0BNB</div>
        </div>)}
      </div>}
      <div className="tabsBox">
        <div className="Tabs">
          <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(0) }}>{t("Introduction")}</div>
          <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(1) }}>{t("BNB winning records")}</div>
          <div className={TabIndex === 2 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(2) }}>{t("My winning record")}</div>
        </div>
      </div>
      <div className="contentBox">
        {/* 盲盒介紹 */}
        {TabIndex === 0 && <>
          {t("Introduction1")}<br></br>
          {t("Introduction2")}<br></br>
          {t("Introduction3")}<br></br>
          {t("Introduction4")}<br></br>

          <div className="contractAddr">
            <div className="addrTitle">{t("Fairy NFT contract address")}</div>
            <div className="addr">{AddrHandle(contractAddress.NFT, 10, 6)} <img onClick={() => {
              copy(
                contractAddress.BlindBox
              );
              addMessage(t("Copy Success"));
            }} src={copyIcon} alt="" /></div>
          </div>
        </>}

        {/* BNB開獎記錄 */}
        {TabIndex === 1 && <AutoBox1></AutoBox1>}

        {/* 我的開獎記錄 */}
        {TabIndex === 2 && <AutoBox2></AutoBox2>}
        {/* {TabIndex === 2 && <div>
          <div className="items titles">
            <div className="item time">時間</div>
            <div className="item type">類型</div>
            <div className="item value">金額</div>
            <div className="item hash">交易哈希</div>
          </div>
          <div className="bigBox">
            {BoxRecord?.length > 0 ? BoxRecord.map((item: any, index: any) => <div key={index} className="items contents">
              <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
              <div className="item type">{gradeValueFun(item)}</div>
              <div className="item value">{!!item?.amount ? `${item?.amount} BNB` : "-"}</div>
              <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{AddrHandle(item?.txId, 6, 6)}</div>
            </div>) : <NoData></NoData>}
          </div>
        </div>} */}
      </div>

      {/* 成功购买弹窗 */}
      <Modal
        visible={confirmRewardBox}
        className='successBuyModal'
        centered
        width={'452px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfirmRewardBox(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmRewardBox(false)} />
        <div className="box autoBox">
          <div className="Title">{t("Congratulations")}！</div>
          {/* <img src={BlindBoxImg} alt="" /> */}
          <AnimaMain visable={true} />
          <div className="type">{t(grade[ResultData])}</div>
          <div className="type">{BoxBaseArr?.list?.find((item: any) => item.level == ResultData)?.amount}BNB</div>
          <div className="confirmBtn  flexCenter" onClick={() => setConfirmRewardBox(false)}>{t("Confirm")}</div>
        </div>
      </Modal>
      {/* 成功打开NFT */}
      <Modal
        visible={confirmBuy}
        className='successBuyModal'
        centered
        width={'552px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfirmBox(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmBox(false)} />
        <div className="box">
          <div className="Title">{t("Congratulations")}！</div>
          <div className='type'>{i18n.language === "zh" ? ResultData?.zhName : ResultData?.name}！</div>
          <img src={ResultData?.image} alt="" />
          <div className="confirmBtn  flexCenter" onClick={() => { navigate("/NFT") }}>{t("View")}</div>
        </div>
      </Modal>
      {/* 概率 */}
      <Modal
        visible={RadioModal}
        className='RadioModal'
        centered
        width={'552px'}
        closable={false}
        footer={null}
        onCancel={() => { setRadioModal(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setRadioModal(false)} />
        <div className="box">
          <div className="Title">{t("Blind box probability")}</div>
          <div className="items">
            {redioObj.map((item: any, index: number) => <div key={index} className="item" >
              <div className="img">
                <img src={item.icon} alt="" />
              </div>
              <div className="right">
                <div className="title">{item.title}</div>
                <div className="value">{item.subtitle}</div>
              </div>
            </div>)}
          </div>
        </div>
      </Modal >
    </div >
  )
}
