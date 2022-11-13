import React, { useState } from 'react';
import BigNumber from 'big.js'
import { BoxBaseType } from '../view/BlindBox'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { showLoding, addMessage } from '../utils/tool'
import { Contracts } from '../web3'
import { buyBox } from '../API'
import { Modal } from 'antd';
import BlindBoxImg from '../assets/image/BlindBoxImg.png';
import reduce from '../assets/image/reduce.png';
import reduceProhibit from '../assets/image/reduceProhibit.png';
import Add from '../assets/image/Add.png';
import AddProhibit from '../assets/image/AddProhibit.png';

interface RaceBoxModalPropsType {
  BoxInfo: BoxBaseType
  isShow: boolean,
  close: Function,
  buySuccess: Function
}

function RaceBoxModal(props: RaceBoxModalPropsType) {
  let { t } = useTranslation()
  const web3React = useWeb3React()
  let [putNum, setPutNum] = useState('1')
  let [totalPrice, setTotalPrice] = useState(props.BoxInfo.price)
  async function Buy() {
    if (!web3React.account) {
      return addMessage(t('not enough'))
    }
    /* 获取BNB余额 */

    let Balance: number | string
    console.log(props.BoxInfo.coinName)
    if (Number(putNum) > 10 || Number(putNum) <= 0) {
      return addMessage(t('Enter correct quantity'))
    }
    if (props.BoxInfo.coinName === 'BNB') {
      Balance = await Contracts.example.getBalance(web3React.account)
      Balance = new BigNumber(Balance).div(10 ** 18).toString()
    } else {
      Balance = await Contracts.example.balanceOf(web3React.account)
      Balance = new BigNumber(Balance).div(10 ** 18).toString()
    }
    if (new BigNumber(Balance).lt(props.BoxInfo.price)) {
      return addMessage(t('not enough'))
    }
    showLoding(true)
    buyBox({
      id: props.BoxInfo.id,
      userAddress: web3React.account,
      buyCount: Number(putNum)
    }).then(res => {
      console.log('购买加密', res)
      Contracts.example.buyBox(web3React.account as string, res.data, totalPrice).then(() => {
        props.buySuccess()
      }).finally(() => {
        showLoding(false)
      })
    }, () => {
      showLoding(false)
    })
  }
  function changeNum(e: React.ChangeEvent<HTMLInputElement> | number) {
    if (typeof e === 'number') {
      if (e < 0) {
        setTotalPrice(0)
        setPutNum('0')
      } else if (e > 10) {
        setTotalPrice(new BigNumber(10).times(props.BoxInfo.price).toNumber())
        setPutNum('10')
      } else {
        setTotalPrice(new BigNumber(e).times(props.BoxInfo.price).toNumber())
        setPutNum(String(e))
      }
    } else {
      let num: string | number = e.target.value.replace(/[^\d]/g, "")
      num = Number(num) > 10 ? '10' : num
      num = Number(num) < 0 ? '1' : num
      setTotalPrice(new BigNumber(num).times(props.BoxInfo.price).toNumber())
      setPutNum(num)
    }
  }
  return (
    <>
      <Modal visible={props.isShow}
        className='RaceBoxModal'
        centered
        onCancel={() => props.close()}
        maskClosable
        width={'646px'}
        closable={false}
        footer={null}
      >
        <div className="Img">
          <img className="BoxImg" src={BlindBoxImg} alt="" />
        </div>
        <div className="buyNum">
          <div className="Label">
            {t('quantity')}
          </div>
          <img src={putNum === '0' ? reduceProhibit : reduce} className="reduce" onClick={() => {
            changeNum(Number(putNum) - 1)
          }} alt="" />
          <input type="text" value={putNum} onChange={changeNum} />
          <img src={putNum === '10' ? AddProhibit : Add} className="reduce" onClick={() => {
            changeNum(Number(putNum) + 1)
          }} alt="" />
        </div>

        <div className='Tip'>{t('Tip')}{totalPrice}{props.BoxInfo.coinName}</div>
        <button className='Verify' onClick={Buy}>{t('Verify')}</button>
      </Modal>
    </>
  )
}
export default RaceBoxModal