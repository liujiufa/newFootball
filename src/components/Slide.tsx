import React, { useEffect, useState, useRef } from 'react';
import '../assets/style/componentsStyle/Slide.scss'
import banner1 from '../assets/image/land1.jpg';
import banner2 from '../assets/image/land2.jpg';
import banner3 from '../assets/image/land3.jpg';
import banner4 from '../assets/image/land4.jpg';
import banner5 from '../assets/image/land5.jpg';
import tipImg from '../assets/image/tipImg.png'
import { useTranslation } from 'react-i18next';
import {
  LeftCircleOutlined,
  RightCircleOutlined
} from '@ant-design/icons';
import { useViewport } from './viewportContext';
interface SlideType {
  id: number;
  title: string;
  subTitle: string;
  img: string;
  count: number;
}

const EmoCarousel = (props: any) => {
  const { width } = useViewport()
  let { t } = useTranslation()
  const clsRef = useRef(['one', 'two', 'three', 'four', 'five'])
  const dotsRef = useRef(['change', '', '', ''])

  const [dots, setDots] = useState([''])
  const [cls, setCls] = useState([''])


  //操作
  const manageFun = (type: string) => {
    const clsTmp = [...clsRef.current]
    if (type === 'right') {
      let tmp = String(clsTmp.pop())
      clsTmp.unshift(tmp)
    } else {
      let tmp = String(clsTmp.shift())
      clsTmp.push(tmp)
    }

    setCls(clsTmp)
    clsRef.current = clsTmp
  }
  // 图片点击
  const clickFun = (index: number) => {
    const clsTmp = [...clsRef.current]
    const i = clsTmp.findIndex((item) => { return item === 'three' })
    //这里需要判断用户点击的小方块与当前图片的索引之差，如果
    //大于0，则表明用户需要更换的是后面的图片，反之，表明用户
    //需要更换之前也就是前面的图片
    if (index > i) {
      let x = index - i;
      while (x--) {
        manageFun('right');
      }
    } else if (index < i) {
      let x = i - index;
      while (x--) {
        manageFun('left');
      }
    }
  }

  useEffect(() => {
    setCls([...clsRef.current])
    setDots([...dotsRef.current])

    const time = setInterval(() => {
      const clsTmp = [...clsRef.current]
      const dotsTmp = [...dotsRef.current]
      let tmp = String(clsTmp.pop())
      clsTmp.unshift(tmp)
      let dotTmp = String(dotsTmp.pop())
      dotsTmp.unshift(dotTmp)
      setCls(clsTmp)
      setDots(dotsTmp)
      clsRef.current = clsTmp
      dotsRef.current = dotsTmp
    }, 5000)

    return () => clearInterval(time)
  }, [])

  return (
    <div className="slideBox">
      <ul className='imgs' >
        {width <= 425 && <LeftCircleOutlined className='leftIcon' style={{ color: 'rgba(255,255,255,0.8)', fontSize: '30px' }} onClick={() => { manageFun("left") }} />}
        {width <= 425 && <RightCircleOutlined className='rightIcon' style={{ color: 'rgba(255,255,255,0.8)', fontSize: '30px' }} onClick={() => { manageFun("right") }} />}

        <li className={cls[0]}>
          <div className="imgBox" onClick={() => { clickFun(0) }}>
            {props.landObj[0].count !== 0 && <div className="tip">
              <span>{props.landObj[0].count}</span>
              <img src={tipImg} alt="" />
            </div>}
            <img src={banner1} /></div>
          <div className="banner">
            <div className="title">{t("Outstanding quality land")}</div>
            <div className="subTitle">{t("Eligibility: Synthesize Uncommon badge NFT")}</div>
          </div>
        </li>
        <li className={cls[1]}>
          <div className="imgBox" onClick={() => { clickFun(1) }}>
            {props.landObj[1].count !== 0 && <div className="tip">
              <span>{props.landObj[1].count}</span>
              <img src={tipImg} alt="" />
            </div>}
            <img src={banner2} /></div>
          <div className="banner">
            <div className="title">{t("Rare quality land")}</div>
            <div className="subTitle">{t("Eligibility: Synthesize Outstanding Badge NFT")}</div>
          </div>
        </li >
        <li className={cls[2]}>
          <div className="imgBox" onClick={() => { clickFun(2) }}>
            {props.landObj[2].count !== 0 && <div className="tip">
              <span>{props.landObj[2].count}</span>
              <img src={tipImg} alt="" />
            </div>}
            <img src={banner3} /></div>
          <div className="banner">
            <div className="title">{t("Perfect quality land")}</div>
            <div className="subTitle">{t("Eligibility: Synthesize Rare badge NFT")}</div>
          </div>
        </li >
        <li className={cls[3]}>
          <div className="imgBox" onClick={() => { clickFun(3) }}>
            {props.landObj[3].count !== 0 && <div className="tip">
              <span>{props.landObj[3].count}</span>
              <img src={tipImg} alt="" />
            </div>}
            <img src={banner4} /></div>
          <div className="banner">
            <div className="title">{t("Epic quality land")}</div>
            <div className="subTitle">{t("Eligibility: Synthetic Perfect badge NFT")}</div>
          </div>
        </li >
        <li className={cls[4]}>
          <div className="imgBox" onClick={() => { clickFun(4) }}>
            {props.landObj[4].count !== 0 && <div className="tip">
              <span>{props.landObj[4].count}</span>
              <img src={tipImg} alt="" />
            </div>}
            <img src={banner5} /></div>
          <div className="banner">
            <div className="title">{t("Legendary quality land")}</div>
            <div className="subTitle">{t("Eligibility: Synthetic Epic badge NFT")}</div>
          </div>
        </li >
      </ul >

      {/* <ul className="list">
        <li className={dots[0]}></li>
        <li className={dots[1]}></li>
        <li className={dots[2]}></li>
        <li className={dots[3]}></li>
      </ul> */}
    </div >
  )
}

export default EmoCarousel;