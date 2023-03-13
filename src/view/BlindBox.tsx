import React, { useState } from 'react'
import { Modal } from 'antd'
import '../assets/style/BlindBox.scss'
import BlindBoxImg from '../assets/image/BlindBoxImg.png'
import iconDemo from '../assets/image/iconDemo.png'
import grade1 from '../assets/image/grade1.png'
import grade2 from '../assets/image/grade2.png'
import grade3 from '../assets/image/grade3.png'
import grade4 from '../assets/image/grade4.png'
import copyIcon from '../assets/image/copyIcon.png'
import closeIcon from '../assets/image/closeIcon.png'

export interface BoxBaseType {
  id: number
  status: number
  coinName: string
  price: number,
  sellNum: number,
  totalNum: number,
  sellCardinality: number,
}
export default function BlindBox() {
  let [TabIndex, SetTabIndex] = useState(0)
  const [confirmBuy, setConfirmBox] = useState(false)
  function changeTab(tab: number) {
    SetTabIndex(tab)
  }

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
        价格：<img src={iconDemo} alt="" />100MBAS（~0.5BNB）
        <div className="boxNum">剩余数量：800/10000</div>
        <div className="buyBtn flexCenter">立即開啟</div>
      </div>
      <div className="goodsBox">
        <div className="goods">
          <img src={grade1} alt="" />
          <div className="title">一等獎</div>
          <div className="num">5BNB</div>
        </div>
        <div className="goods">
          <img src={grade2} alt="" />
          <div className="title">二等獎</div>
          <div className="num">5BNB</div>
        </div>
        <div className="goods">
          <img src={grade3} alt="" />
          <div className="title">三等獎</div>
          <div className="num">5BNB</div>
        </div>
        <div className="goods">
          <img src={grade4} alt="" />
          <div className="title">普通獎</div>
          <div className="num">5BNB</div>
        </div>
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
            <div className="item type">類型</div>
            <div className="item value">金額</div>
            <div className="item hash">交易哈希</div>
          </div>
          <div className="items contents">
            <div className="item time">2022.03.03 18: 03</div>
            <div className="item type">一等獎</div>
            <div className="item value">5 BNB</div>
            <div className="item hash">0Xsdhierfhdhh2347887hskdd</div>
          </div>
        </>}
        {/* 我的開獎記錄 */}
        {TabIndex === 2 && <>
          <div className="items titles">
            <div className="item time">時間</div>
            <div className="item addr">開獎地址</div>
            <div className="item type">類型</div>
            <div className="item value">金額</div>
            <div className="item hash">交易哈希</div>
          </div>
          <div className="items contents">
            <div className="item time">2022.03.03 18: 03</div>
            <div className="item addr">0Xsdhierfhdhh2347887hskdd</div>
            <div className="item type">一等獎</div>
            <div className="item value">5 BNB</div>
            <div className="item hash">0Xsdhierfhdhh2347887hskdd</div>
          </div>
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
        onCancel={() => { setConfirmBox(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setConfirmBox(false)} />
        <div className="box">
          <div className="title">恭喜！</div>
          <img src={BlindBoxImg} alt="" />
          <div className="type">二等獎</div>
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
          <div className='type'>五星-火精靈！</div>
          <img src={BlindBoxImg} alt="" />
          <div className="confirmBtn  flexCenter">去查看</div>
        </div>
      </Modal>
    </div >
  )
}
