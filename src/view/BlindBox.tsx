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
import coinIcon1 from '../assets/image/coinIcon1.png'
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
export interface BoxBaseType {
  id: number
  status: number
  coinName: string
  price: number,
  sellNum: number,
  totalNum: number,
  sellCardinality: number,
}
let redioObj = [
  { icon: coinIcon1, title: "一等獎", subtitle: '0.5%' },
  { icon: coinIcon1, title: "二等獎", subtitle: '1%' },
  { icon: coinIcon1, title: "三等獎", subtitle: '1.5%' },
  { icon: coinIcon1, title: "幸运奖", subtitle: '7%' },
  { icon: coinIcon2, title: "1星", subtitle: '54%' },
  { icon: coinIcon3, title: "2星", subtitle: '27%' },
  { icon: coinIcon4, title: "3星", subtitle: '9%' },
]
let gradeImg = { 0: gradeAll, 1: grade0, 2: grade1, 3: grade2, 4: grade3 }
export default function BlindBox() {
  let { t } = useTranslation()
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
    if (state.token) {
      boxBase().then((res: any) => {
        console.log(res, '盲盒配置');
        res.data.map((item: any) => {
          Contracts.example.toMBAS(web3React.account as string, item?.price).then((res: any) => {
            let value = new BigNumber(res).div(10 ** 18).toString()
            console.log({ ...item, MBASPrice: value }, 'value');
            setBoxBaseValue({ ...item, MBASPrice: (parseInt(value) + 1) })
          })
        })
      })
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
            let grade = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 128, res.logs[res.logs.length - 1].data.length - 64), "wei")
            console.log("日志:", res, "类型:", value1, "宝箱类型:", type, "宝箱等级:", grade,);
            // 0:NFT,1:一等奖,2:二等奖,3:三等奖,4:特等奖
            showLoding(false)
            if (value1 === '0') {
              openBoxResule(type, grade).then((res: any) => {
                console.log("jieduo", res);
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
      return grade[item?.level]
    } else if (item?.type === 1) {
      return `${nftLevel[item?.level]}-${nftType[item?.nftType]}`
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
          <div className="item time">時間</div>
          <div className="item addr">開獎地址</div>
          <div className="item type">類型</div>
          <div className="item value">金額</div>
          <div className="item hash">交易哈希</div>
        </div>
        <div className="bigBox">
          {WrapRecord?.length > 0 ? WrapRecord.map((item: any, index: any) => <div key={index} className="items contents">
            <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
            <div className="item addr">{AddrHandle(item?.userAddress, 6, 6)}</div>
            <div className="item type">{grade[item?.level]}</div>
            <div className="item value">{item?.amount} BNB</div>
            <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>{AddrHandle(item?.txId, 6, 6)}</div>
          </div>) : <NoData></NoData>}
        </div>
      </div>
    } else {
      return <div className='middleRecord'>
        <div className="items titles">
          <div className="item time">時間</div>
          <div className="item type">類型</div>
          <div className="item value">金額</div>
          <div className='switchIcon'></div>
        </div>
        <div className="bigBox">
          {WrapRecord?.length > 0 ? WrapRecord.map((item: any, index: any) =>
            <div className="Box">
              <div key={index} className="items contents">
                <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
                <div className="item type">{grade[item?.level]}</div>
                <div className="item value">{item?.amount} BNB</div>
                <div className="item switchIcon" onClick={() => { openFun(index) }}><img className={oepnCardList.some(option => Number(option) === Number(index)) ? 'spanRotate' : 'spanReset'} src={swichMiddleIcon} alt="" /></div>
              </div>
              {
                oepnCardList.some(option => Number(option) === Number(index)) && <div className="smallBox">
                  <div className="item addr">开奖地址<span>{AddrHandle(item?.userAddress, 6, 6)}</span></div>
                  <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>交易哈希<span>{AddrHandle(item?.txId, 6, 6)}</span></div>
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
          <div className="item time">時間</div>
          <div className="item type">類型</div>
          <div className="item value">金額</div>
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
                  <div className="item hash" onClick={() => { window.open(BlockUrl + item?.txId) }}>交易哈希<span>{AddrHandle(item?.txId, 6, 6)}</span></div>
                </div>
              }
            </div>
          ) : <NoData></NoData>}
        </div>
      </div>
    } else {
      return <div className='bigRecord'>
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
      </div>
    }
  }

  const ImgBox = () => {
    if (width > 600) {
      return <div className="imgBox">
        <img src={BlindBoxImg} alt="" />
        <div className="boxContainer">
          <img className='img1' src={BlindBoxImg1} alt="" />
          <img className='img2' src={BlindBoxImg2} alt="" />
          <img className='img3' src={BlindBoxImg3} alt="" />
          <img className='img4' src={BlindBoxImg4} alt="" />
          <img className='img7' src={BlindBoxImg5} alt="" />
          <img className='img6' src={BlindBoxImg6} alt="" />
          <img className='img5' src={BlindBoxImg7} alt="" />
        </div>
      </div>
    } else {
      return <div className='imgMiddleBox'> <img src={BlindBoxImg} alt="" /></div>
    }
  }

  return (
    <div className="Edition-Center" id='BlindBox'>
      <div className="Title">寶箱</div>
      <div className="subTitle">開啟神秘盲盒 解鎖特殊權益</div>
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
        <div className='price'> 价格：<img src={SBLIcon} alt="" />{BoxBaseValue?.MBASPrice}{BoxBaseValue?.name}（~{BoxBaseValue?.price}BNB）</div>
        <div className="boxNum">剩余数量：{BoxBaseValue?.totalNum - BoxBaseValue?.sellNum}/{BoxBaseValue?.totalNum}</div>
        <div className="btnBox">
          {parseFloat(ApproveValue) >= parseFloat(BoxBaseValue?.MBASPrice) ? <div className="buyBtn flexCenter" onClick={() => { openBoxFun() }}>立即開啟</div> : <div className="buyBtn flexCenter approveBtn" onClick={() => { ApproveFun(BoxBaseValue?.MBASPrice) }}>授权</div>}
          {width < 600 && <img src={decIcon} alt="" onClick={() => {
            setRadioModal(true)
          }} />}
        </div>
      </div>
      {BoxBaseArr && <div className="goodsBox">
        <div className="goods">
          <img src={gradeImg[0]} alt="" />
          <div className="title">奖金池</div>
          <div className="num">{BoxBaseArr?.totalAmount}BNB</div>
        </div>
        {BoxBaseArr?.list?.map((item: any, index: any) => <div key={index} className="goods">
          <div className="ImgBox">
            <img src={gradeImg[item?.level]} alt="" />
            <div className="surplus flexCenter">{item?.surplusCount}</div>
          </div>
          <div className="title">{grade[item?.level]}</div>
          <div className="num">{item?.amount}BNB</div>
        </div>)}
      </div>}
      <div className="tabsBox">
        <div className="Tabs">
          <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(0) }}>盲盒介紹</div>
          <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(1) }}>BNB開獎記錄</div>
          <div className={TabIndex === 2 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(2) }}>我的開獎記錄</div>
        </div>
      </div>
      <div className="contentBox">
        {/* 盲盒介紹 */}
        {TabIndex === 0 && <> 寶箱可以隨機開出一星、二星、三星三種屬性的精靈徽章NFT和一等獎、二等獎、三等獎、普通的BNB。精靈徽章NFT可以參與質押挖礦獲取MBAS，低星徽章合成高星徽章時，可以獲得土地NFT獎勵。NFT可在Metabase生態內的交易市場交易，也支持在第三方交易平臺交易。
          <div className="contractAddr">
            <div className="addrTitle"> 徽章NFT合約地址</div>
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
          <div className="Title">恭喜！</div>
          {/* <img src={BlindBoxImg} alt="" /> */}
          <AnimaMain visable={true} />
          <div className="type">{grade[ResultData]}</div>
          <div className="type">{BoxBaseArr?.list?.find((item: any) => item.level == ResultData)?.amount}BNB</div>
          <div className="confirmBtn  flexCenter" onClick={() => setConfirmRewardBox(false)}>確認</div>
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
          <div className="Title">恭喜！</div>
          <div className='type'>{ResultData?.name}！</div>
          <img src={ResultData?.image} alt="" />
          <div className="confirmBtn  flexCenter" onClick={() => { navigate("/NFT") }}>去查看</div>
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
          <div className="Title">盲盒概率</div>
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
