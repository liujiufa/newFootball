import React, { useEffect, useState, useRef } from 'react';
import '../assets/style/componentsStyle/Slide.scss'
import banner1 from '../assets/image/land1.jpg';
import banner2 from '../assets/image/land2.jpg';
import banner3 from '../assets/image/land3.jpg';
import banner4 from '../assets/image/land4.jpg';
import banner5 from '../assets/image/land5.jpg';
import tipImg from '../assets/image/tipImg.png'
import { useTranslation } from 'react-i18next';

interface SlideType {
  id: number;
  title: string;
  subTitle: string;
  img: string;
  count: number;
}

const EmoCarousel = (props: any) => {
  let { t } = useTranslation()
  const clsRef = useRef(['one', 'two', 'three', 'four', 'five'])
  const dotsRef = useRef(['change', '', '', ''])

  const [dots, setDots] = useState([''])
  const [cls, setCls] = useState([''])

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
      <ul className='imgs'>
        <li className={cls[0]}>
          <div className="imgBox">
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
          <div className="imgBox">
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
          <div className="imgBox">
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
          <div className="imgBox">
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
          <div className="imgBox">
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