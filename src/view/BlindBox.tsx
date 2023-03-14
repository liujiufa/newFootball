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
import { contractAddress } from '../config'
import Web3 from 'web3';
import BigNumber from 'big.js'
import '../assets/style/BlindBox.scss'
import BlindBoxImg from '../assets/image/BlindBoxImg.png'
import iconDemo from '../assets/image/iconDemo.png'
import grade0 from '../assets/image/grade1.png'
import grade1 from '../assets/image/grade2.png'
import grade2 from '../assets/image/grade3.png'
import grade3 from '../assets/image/grade4.png'
import copyIcon from '../assets/image/copyIcon.png'
import closeIcon from '../assets/image/closeIcon.png'
import { useNavigate } from 'react-router-dom';

export interface BoxBaseType {
  id: number
  status: number
  coinName: string
  price: number,
  sellNum: number,
  totalNum: number,
  sellCardinality: number,
}
let grade = { 1: "一等奖", 2: "二等奖", 3: "三等奖", 4: "普通" }
let gradeImg = { 1: grade0, 2: grade1, 3: grade2, 4: grade3 }
let landGrade = { 1: "111", 2: "222", 3: "333", 4: "444", 5: "555" }
export default function BlindBox() {
  let { t } = useTranslation()
  let state = useSelector<stateType, stateType>(state => state);
  const { width } = useViewport();
  const navigate = useNavigate()
  const web3React = useWeb3React()
  let [TabIndex, SetTabIndex] = useState(0)
  const [confirmBuy, setConfirmBox] = useState(false)
  const [confirmRewardBox, setConfirmRewardBox] = useState(false)
  const [balance1, setBalance1] = useState('0')
  const [ApproveValue, setApproveValue] = useState('0')
  const [BoxBaseValue, setBoxBaseValue] = useState<any>()
  const [BoxBaseArr, setBoxBaseArr] = useState<any>([])
  const [WrapRecord, setWrapRecord] = useState<any>([])
  const [BoxRecord, setBoxRecord] = useState<any>([])
  const [ResultData, setResultData] = useState<any>()
  function changeTab(tab: number) {
    SetTabIndex(tab)
  }
  useEffect(() => {
    if (state.token) {
      boxBase().then((res: any) => {
        console.log(res, '盲盒配置');
        res.data.map((item: any) => {
          try {
            Contracts.example.toSBL(web3React.account as string, item?.price).then((res: any) => {
              let value = new BigNumber(res).div(10 ** 18).toString()
              console.log({ ...item, MBASPrice: value }, 'value');
              setBoxBaseValue({ ...item, MBASPrice: parseInt(value) })
            })
          } catch {
          }
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
      wrapRecord().then((res: any) => {
        console.log(res.data, '开奖');
        setWrapRecord(res.data)
      })
      boxRecord().then((res: any) => {
        console.log(res.data, '个人开奖');
        setBoxRecord(res.data)
      })
    }
  }, [state.token, TabIndex])

  const openBoxFun = () => {
    if (parseFloat(BoxBaseValue?.price) > parseFloat(balance1)) {
      return addMessage(t('Insufficient balance'))
    }
    showLoding(true)
    openBox({}).then((res: any) => {
      console.log(res, '开宝箱');
      if (res.code === 200) {
        Contracts.example.openBox(web3React.account as string, res.data as string).then((res: any) => {
          console.log(res, '购买宝箱');
          Contracts.example.web3.eth.getTransactionReceipt(res.transactionHash).then((res: any) => {
            let value1 = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 192, res.logs[res.logs.length - 1].data.length - 128), "ether")
            let type = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 128, res.logs[res.logs.length - 1].data.length - 64), "wei")
            let grade = Web3.utils.fromWei("0x" + res.logs[res.logs.length - 1].data.slice(res.logs[res.logs.length - 1].data.length - 64), "wei")
            console.log(res, value1);
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


  // 授权
  function ApproveFun(num: string) {
    if (!web3React.account) {
      return addMessage(t('Please connect Wallet'))
    }
    showLoding(true)
    Contracts.example.toLiquiditySBL(web3React.account as string, parseFloat(num)).then((res: any) => {
      let value = new BigNumber(res).div(10 ** 18).toString()
      Contracts.example.approve1(web3React.account as string, contractAddress.BlindBox, value).then(() => {
        Contracts.example.Tokenapprove(web3React.account as string, contractAddress.BlindBox).then((res: any) => {
          setApproveValue(new BigNumber(res).div(10 ** 18).toString())
        }).finally(() => {
          showLoding(false)
        })
      })
    })
  }
  const gradeValueFun = (item: any) => {
    if (item?.type === 2) {
      return grade[item?.type]
    } else if (item?.type === 1) {
      return `${landGrade[item?.nftType]}-${item?.level}星`
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

  return (
    <div className="Edition-Center" id='BlindBox'>
      <div className="Title">寶箱</div>
      <div className="subTitle">開啟神秘盲盒 解鎖特殊權益</div>
      <div className="imgBox">
        <div className="boxContainer">
          <img src={BlindBoxImg} alt="" />
        </div>
      </div>
      <div className="priceBox">
        <div className='price'> 价格：<img src={iconDemo} alt="" />{BoxBaseValue?.MBASPrice}{BoxBaseValue?.name}（~{BoxBaseValue?.price}BNB）</div>
        <div className="boxNum">剩余数量：{BoxBaseValue?.totalNum - BoxBaseValue?.sellNum}/{BoxBaseValue?.totalNum}</div>
        {parseFloat(ApproveValue) >= parseFloat(BoxBaseValue?.price) ? <div className="buyBtn flexCenter" onClick={() => { openBoxFun() }}>立即開啟</div> : <div className="buyBtn flexCenter" onClick={() => { ApproveFun(BoxBaseValue?.price) }}>授权</div>}
      </div>
      <div className="goodsBox">
        {BoxBaseArr.map((item: any, index: any) => <div key={index} className="goods">
          <img src={gradeImg[item?.level]} alt="" />
          <div className="surplus flexCenter">{item?.surplusCount}</div>
          <div className="title">{grade[item?.level]}</div>
          <div className="num">{item?.amount}BNB</div>
        </div>)}
      </div>
      <div className="Tabs">
        <div className={TabIndex === 0 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(0) }}>盲盒介紹</div>
        <div className={TabIndex === 1 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(1) }}>BNB開獎記錄</div>
        <div className={TabIndex === 2 ? 'activeTab linear-gradient' : 'invalidTab'} onClick={() => { changeTab(2) }}>我的開獎記錄</div>
      </div>
      <div className="contentBox">
        {/* 盲盒介紹 */}
        {TabIndex === 0 && <> 寶箱可以隨機開出一星、二星、三星三種屬性的精靈徽章NFT和一等獎、二等獎、三等獎、普通的BNB。精靈徽章NFT可以參與質押挖礦獲取MBAS，低星徽章合成高星徽章時，可以獲得土地NFT獎勵。NFT可在Metabase生態內的交易市場交易，也支持在第三方交易平臺交易。
          <div className="contractAddr">
            徽章NFT合約地址
            <div className="addr">0xghgjgkhjh...hjkhjhk <img src={copyIcon} alt="" /></div>
          </div>
        </>}

        {/* BNB開獎記錄 */}
        {TabIndex === 1 && <>
          <div className="items titles">
            <div className="item time">時間</div>
            <div className="item addr">開獎地址</div>
            <div className="item type">類型</div>
            <div className="item value">金額</div>
            <div className="item hash">交易哈希</div>
          </div>
          {WrapRecord?.length > 0 && WrapRecord.map((item: any, index: any) => <div key={index} className="items contents">
            <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
            <div className="item addr">{item?.userAddress}</div>
            <div className="item type">{grade[item?.level]}</div>
            <div className="item value">{item?.amount} BNB</div>
            <div className="item hash">{AddrHandle(item?.txId, 6, 6)}</div>
          </div>)}
        </>}
        {/* 我的開獎記錄 */}
        {TabIndex === 2 && <>
          <div className="items titles">
            <div className="item time">時間</div>
            <div className="item type">類型</div>
            <div className="item value">金額</div>
            <div className="item hash">交易哈希</div>
          </div>
          {BoxRecord?.length > 0 && BoxRecord.map((item: any, index: any) => <div key={index} className="items contents">
            <div className="item time">{dateFormat('YYYY-mm-dd HH:MM', new Date(item?.createTime))}</div>
            <div className="item type">{gradeValueFun(item)}</div>
            <div className="item value">{item?.amount} BNB</div>
            <div className="item hash">{AddrHandle(item?.txId, 6, 6)}</div>
          </div>)}
        </>}
      </div>


      {/* 成功购买弹窗 */}
      <Modal
        visible={false}
        className='successBuyModal'
        centered
        width={'552px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfirmRewardBox(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmRewardBox(false)} />
        <div className="box">
          <div className="title">恭喜！</div>
          <img src={BlindBoxImg} alt="" />
          <div className="type">{grade[ResultData]}</div>
          <div className="confirmBtn  flexCenter">確認</div>
        </div>
      </Modal>
      {/* 成功打开NFT */}
      <Modal
        visible={false}
        className='successBuyModal'
        centered
        width={'552px'}
        closable={false}
        footer={null}
        onCancel={() => { setConfirmBox(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmBox(false)} />
        <div className="box">
          <div className="title">恭喜！</div>
          <div className='type'>{ResultData?.name}！</div>
          <img src={ResultData?.image} alt="" />
          <div className="confirmBtn  flexCenter" onClick={() => { navigate("/NFT") }}>去查看</div>
        </div>
      </Modal>
    </div >
  )
}
