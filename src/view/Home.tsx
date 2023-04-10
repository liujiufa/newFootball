import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import copy from "copy-to-clipboard";
import bt1 from "../assets/image/home/bt1.png";
import bt2 from "../assets/image/home/bt2.png";
import bt3 from "../assets/image/home/bt3.png";
import bt4 from "../assets/image/home/bt4.png";
import bt5 from "../assets/image/home/bt5.png";
import bt6 from "../assets/image/home/bt6.png";
import bt7 from "../assets/image/home/bt7.png";
import bt8 from "../assets/image/home/bt8.png";
import bt9 from "../assets/image/home/bt9.png";
import bt10 from "../assets/image/home/bt10.png";
import bt11 from "../assets/image/home/bt11.png";
import bt12 from "../assets/image/home/bt12.png";
import FairyNft from "../assets/image/home/fairy-nft-group.png";
import LandNft from "../assets/image/home/land-nft-group.png";

import Land1 from "../assets/image/home/land1.jpg";
import Land2 from "../assets/image/home/land2.jpg";
import Land3 from "../assets/image/home/land3.jpg";
import Land4 from "../assets/image/home/land4.jpg";
import Land5 from "../assets/image/home/land5.jpg";
import Fairy1 from "../assets/image/home/fairy1.jpg";
import Fairy2 from "../assets/image/home/fairy2.jpg";
import Fairy3 from "../assets/image/home/fairy3.jpg";
import Fairy4 from "../assets/image/home/fairy4.jpg";
import Fairy5 from "../assets/image/home/fairy5.jpg";
import Fairy6 from "../assets/image/home/fairy6.jpg";
import RoadMapZh from "../assets/image/home/road-map-zh.png";
import RoadMapEn from "../assets/image/home/road-map-en.png";

import RoadMapMobileZh from "../assets/image/home/road-map-mobile-zh.png";
import RoadMapMobileEn from "../assets/image/home/road-map-mobile-en.png";

import HabitsProcessFirst from "../assets/image/home/habits-mobile-process-first.png"
import HabitsProcessSecond from "../assets/image/home/habits-mobile-process-second.png"
import HabitsProcessThird from "../assets/image/home/habits-mobile-process-third.png"
import HabitsProcessFourth from "../assets/image/home/habits-mobile-process-fourth.png"
import HabitsProcessFifth from "../assets/image/home/habits-mobile-process-fifth.png"
import HabitsProcessLast from "../assets/image/home/habits-mobile-process-last.png"

import HabitsFirstTitle from "../assets/image/home/habits-first-title.png"
import HabitsSecondTitle from "../assets/image/home/habits-second-title.png"
import HabitsThirdTitle from "../assets/image/home/habits-third-title.png"
import HabitsFourthTitle from "../assets/image/home/habits-fourth-title.png"
import HabitsFifthTitle from "../assets/image/home/habits-fifth-title.png"
import HabitsLastTitle from "../assets/image/home/habits-last-title.png"

import { ReactComponent as PrevIcon } from "../assets/image/home/prev.svg";
import { ReactComponent as NextIcon } from "../assets/image/home/next.svg";
import bannerClose from "../assets/image/bannerClose.svg";

import HomeMouseCard from "../components/HomeMouseCard";
import { debounce } from "../utils/debounce";
import { stateType } from '../store/reducer'
import { dateFormat } from '../utils/tool'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "../assets/style/Home.scss";
import AnimaMain from "../components/AnimaMain";
import { contractAddress } from "../config";
import { addMessage, AddrHandle, NumSplic } from "../utils/tool";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { Contracts } from '../web3'
import BigNumber from 'big.js'
import { getRecentNoticeList } from "../API";
import { TextLoop } from "react-text-loop-next";
import { useViewport } from "../components/viewportContext";
const INIT_BT = [
  {
    img: bt1,
  },
  {
    img: bt2,
  },
  {
    img: bt3,
  },
  {
    img: bt4,
  },
  {
    img: bt5,
  },
  {
    img: bt6,
  },
  {
    img: bt7,
  },
  {
    img: bt8,
  },
  {
    img: bt9,
  },
  {
    img: bt10,
  },
  {
    img: bt11,
  },
  {
    img: bt12,
  },
]

const LAND_NFT = [
  { img: Land1 },
  { img: Land2 },
  { img: Land3 },
  { img: Land4 },
  { img: Land5 },
]
const FAIRY_NFT = [
  { img: Fairy2 },
  { img: Fairy6 },
  { img: Fairy3 },
  { img: Fairy4 },
  { img: Fairy5 },
  { img: Fairy1 },
]

let GLOBAL_IS_NFT_ENter = false

function Home() {
  const { width } = useViewport()
  const [totalSupply, setTotalSupply] = useState('0')
  const [allBalance, setAllBalance] = useState('0')
  let state = useSelector<stateType, stateType>(state => state);
  const web3React = useWeb3React()
  const navigate = useNavigate()
  const pabtboxRef = useRef<HTMLDivElement | null>(null)
  const ecolboxRef = useRef<HTMLDivElement | null>(null)
  const [animate, setAnimate] = useState(false)

  const [layoutPabt, setLayoutPabt] = useState(false)
  const [isEnter, setIsEnter] = useState(false)
  const [shwoBanner, setShowBanner] = useState<any>()
  const [isNftEnter, setIsNftEnter] = useState(false)
  const [isUp, setIsup] = useState(0)
  const [habitsIndex, setHabitsIndex] = useState(0)

  const [activeProcessIndex, setActiveProcessIndex] = useState<null | number>(null)

  let { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0)
  const [animaVisable, setAnimaVisable] = useState(true)
  const [animaMobileVisable, setAnimaMobileVisable] = useState(true)
  const [ShowBannerState, setShowBannerState] = useState(true)

  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  let [bt, setBt] = useState<Array<{ img: string, className?: string }>>(INIT_BT);
  let [nftMouse, setNftMouse] = useState<Array<{ img: string, className?: string }>>([]);

  const [ecolboxData, setEcolboxData] = useState([
    {
      title: t("Meta Fairy NFT"),
      content: t("Meta Fairy NFT is an NFT collection composed of multiple"),
      img: FairyNft

    },
    {
      title: t("Meta Land NFT"),
      content: t("Meta Land NFT is a series of digital assets designed based"),
      img: LandNft

    }
  ])
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<any>()
  useEffect(() => {
    getRecentNoticeList().then((res: any) => {
      if (res.code === 200) {
        console.log(res.data, "公告");
        if (res.data?.length > 3) {
          setShowBanner(res.data)
        } else {
          setShowBanner([...res.data, ...res.data, ...res.data])
        }
      }

    })

  }, [state.token])

  useEffect(() => {
    setEcolboxData([
      {
        title: t("Meta Fairy NFT"),
        content: t("Meta Fairy NFT is an NFT collection composed of multiple"),
        img: FairyNft

      },
      {
        title: t("Meta Land NFT"),
        content: t("Meta Land NFT is a series of digital assets designed based"),
        img: LandNft

      }
    ])
  }, [t])


  const [HABITS_DATA, setHABITS_DATA] = useState([
    {
      className: "habits-process-first-group",
      title: "MetaBase ",
      viceTitle: t("public chain protocol"),
      content: [
        t("DAG framework protocol"),
        t("GHOST Rules")
      ],
      img: HabitsProcessFirst,
      titleImg: HabitsFirstTitle

    },
    {
      className: "habits-process-second-group",
      title: "Meta BaaS",
      viceTitle: "",
      content: [
        t("Meta BaaS (Blockchain as")
      ],
      img: HabitsProcessSecond,
      titleImg: HabitsSecondTitle
    },
    {
      className: "habits-process-third-group",
      title: t("Meta Base Metaverse"),
      viceTitle: "",
      content: [
        t("Meta Base Metaverse is a metaverse")
      ],
      img: HabitsProcessThird,
      titleImg: HabitsThirdTitle
    },
    {
      className: "habits-process-fourth-group",
      title: t("Meta Wallet"),
      viceTitle: "",
      content: [
        t("Meta Wallet is committed to creating")
      ],
      img: HabitsProcessFourth,
      titleImg: HabitsFourthTitle
    }
    , {
      className: "habits-process-fifth-group",
      title: "Meta",
      viceTitle: t("Digital Pay"),
      content: [
        t("Meta is the only circulation token on the Meta Chain")
      ],
      img: HabitsProcessFifth,
      titleImg: HabitsFifthTitle
    },
    {
      className: "habits-process-last-group",
      title: "Meta Base DeFi",
      viceTitle: t("Ecology"),
      content: [
        t("Defi decentralized finance is an important part of Meta ecology"),
        t("Meta Swap")
      ],
      img: HabitsProcessLast,
      titleImg: HabitsLastTitle

    }
  ])

  useEffect(() => {
    setHABITS_DATA([
      {
        className: "habits-process-first-group",
        title: "MetaBase ",
        viceTitle: t("public chain protocol"),
        content: [
          t("DAG framework protocol"),
          t("GHOST Rules")
        ],
        img: HabitsProcessFirst,
        titleImg: HabitsFirstTitle

      },
      {
        className: "habits-process-second-group",
        title: "Meta BaaS",
        viceTitle: "",
        content: [
          t("Meta BaaS (Blockchain as")
        ],
        img: HabitsProcessSecond,
        titleImg: HabitsSecondTitle
      },
      {
        className: "habits-process-third-group",
        title: t("Meta Base Metaverse"),
        viceTitle: "",
        content: [
          t("Meta Base Metaverse is a metaverse")
        ],
        img: HabitsProcessThird,
        titleImg: HabitsThirdTitle
      },
      {
        className: "habits-process-fourth-group",
        title: t("Meta Wallet"),
        viceTitle: "",
        content: [
          t("Meta Wallet is committed to creating")
        ],
        img: HabitsProcessFourth,
        titleImg: HabitsFourthTitle
      }
      , {
        className: "habits-process-fifth-group",
        title: "Meta",
        viceTitle: t("Digital Pay"),
        content: [
          t("Meta is the only circulation token on the Meta Chain")
        ],
        img: HabitsProcessFifth,
        titleImg: HabitsFifthTitle
      },
      {
        className: "habits-process-last-group",
        title: "Meta Base DeFi",
        viceTitle: t("Ecology"),
        content: [
          t("Defi decentralized finance is an important part of Meta ecology"),
          t("Meta Swap")
        ],
        img: HabitsProcessLast,
        titleImg: HabitsLastTitle

      }
    ])
  }, [i18n.language])



  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--animate-duration', '2s');
  }, [])

  useEffect(() => {
    const all = bt.every(item => !!item?.className)

    if (layoutPabt && !all) {

      const list = bt.filter(item => !!item?.className)
      const index = list?.length / 3

      let data: Array<{ img: string, className?: string }> = bt

      setTimeout(() => {
        data = bt.map((item: any, idx: number) => {
          const flag = (idx % 4) === index
          if (flag) {
            item = {
              ...item,
              className: "animate__animated animate__fadeInUp"
            }
          }
          return item
        })
        setBt(data)
      }, 400);
    }

  }, [layoutPabt, bt])

  useEffect(() => {
    if (web3React.account && state.token) {
      Contracts.example.totalSupply(web3React.account).then((res: any) => {
        // console.log(res);
        setTotalSupply(new BigNumber(res).div(10 ** 18).toString())
      })

    }
  }, [state.token, web3React.account])

  useLayoutEffect(() => {
    if (pabtboxRef?.current && !layoutPabt) {
      const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const offsetTop = pabtboxRef?.current?.offsetTop || 0
      const scrollTop = document.documentElement.scrollTop
      const top = offsetTop - scrollTop
      setLayoutPabt(top <= viewPortHeight)
      window.addEventListener("scroll", () => {
        const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const offsetTop = pabtboxRef?.current?.offsetTop || 0
        const scrollTop = document.documentElement.scrollTop
        const top = offsetTop - scrollTop
        setLayoutPabt(top <= viewPortHeight)

      })
    }

  }, [pabtboxRef, layoutPabt])

  useLayoutEffect(() => {
    if (ecolboxRef?.current) {
      if (isEnter) {
        const scrollY = window.scrollY;

        (ecolboxRef.current as any).onmousewheel = function scrollWheel(event: any) {
          event = event || window.event;
          if (navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
            event.returnValue = false;
          } else {
            event.preventDefault();
          };
        };

        if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
          //firefox支持onmousewheel
          // eslint-disable-next-line
          addEventListener('DOMMouseScroll',
            function (event) {
              var obj = event.target;
              var onmousewheel;
              while (obj) {
                onmousewheel = (obj as any).getAttribute('onmousewheel') || (obj as any).onmousewheel;
                if (onmousewheel) break;
                if ((obj as any).tagName == 'BODY') break;
                obj = (obj as any).parentNode;
              };
              if (onmousewheel) {
                if (event.preventDefault) event.preventDefault();
                event.returnValue = false; //禁止页面滚动
                if (typeof (obj as any).onmousewheel != 'function') {
                  //将onmousewheel转换成function
                  eval('window._tmpFun = function(event){' + onmousewheel + '}');
                  (obj as any).onmousewheel = (window as any)._tmpFun;
                  (window as any)._tmpFun = null;
                };
                // 不直接执行是因为若onmousewheel(event)运行时间较长的话，会导致锁定滚动失效，使用setTimeout可避免
                setTimeout(function () {
                  (obj as any).onmousewheel(event);
                },
                  1);
              };
            },
            false);
        };
        let flag = 0

        ecolboxRef.current.addEventListener("mousewheel", (event: any) => {

          window.scrollTo({
            left: 0,
            top: scrollY,
            behavior: "smooth"
          })
          window.screenTop = scrollY
          let up = 0
          if (event.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (event.wheelDelta > 0) { //当滑轮向上滚动时
              up = 1
            }
            if (event.wheelDelta < 0) { //当滑轮向下滚动时
              up = 2
            }
          } else if (event.detail) {  //Firefox滑轮事件
            if (event.detail > 0) { //当滑轮向上滚动时
              up = 1
            }
            if (event.detail < 0) { //当滑轮向下滚动时
              up = 2
            }
          }
          flag += 1
          if (flag > 1) {
            return;
          }
          debounce(() => {
            flag = 0
            setIsup(up)
          }, 400)

          return false
        }, {
          capture: false
        });
        ecolboxRef.current.addEventListener("mousewheel", () => {
          window.scrollTo({
            left: 0,
            top: scrollY,
            behavior: "smooth"
          })
        })
      }
    }
  }, [ecolboxRef, isEnter])

  useEffect(() => {
    if (!!isUp) {
      setActiveIndex(isUp - 1)
    }
  }, [isUp])

  const changeActiveIndex = useCallback(
    () => {
      if (!GLOBAL_IS_NFT_ENter) {
        setActiveIndex(activeIndex ? 0 : 1)
      }
    },
    [activeIndex]
  )

  useEffect(() => {
    let timer: number | undefined = undefined

    timer = window.setTimeout(() => {
      changeActiveIndex()
    }, 5000);

    return () => {
      clearTimeout(timer)
    }

  }, [activeIndex, isNftEnter])

  const changeNftGroup = useCallback(
    () => {
      const nftData = activeIndex ? LAND_NFT : FAIRY_NFT

      const num = nftMouse.filter((item) => item.className).length

      if (num < nftData?.length) {

        let data: Array<{ img: string, className?: string }> = nftMouse

        data = nftData.map((item, index) => {
          let currentItem: { img: string, className?: string } = item
          const flag = index <= num
          if (flag) {
            currentItem = ({
              ...currentItem,
              className: "animate__animated animate__fadeInUp"
            })
          } else {
            currentItem = ({
              ...currentItem,
              className: ""
            })
          }
          return currentItem
        })
        setNftMouse(data)
      }
    },
    [activeIndex, nftMouse]
  )

  useEffect(() => {
    let timer: number | undefined = undefined
    if (GLOBAL_IS_NFT_ENter) {
      timer = window.setTimeout(() => {
        changeNftGroup()
      }, 200);
    }

    return () => {
      clearTimeout(timer)
    }

  }, [isNftEnter, nftMouse])



  useEffect(() => {
    let timer: number | undefined = undefined

    timer = window.setTimeout(() => {
      setAnimaVisable(!animaVisable)
    }, animaVisable ? 3000 : 500);
    return () => {
      clearTimeout(timer)
    }
  }, [animaVisable])

  useEffect(() => {
    let timer: number | undefined = undefined

    timer = window.setTimeout(() => {
      setAnimaMobileVisable(!animaMobileVisable)
    }, animaMobileVisable ? 3000 : 500);
    return () => {
      clearTimeout(timer)
    }
  }, [animaMobileVisable])


  // 公告向上轮播
  const changeAnim = () => {
    if (shwoBanner) {
      setTimeout(() => {
        shwoBanner.push(shwoBanner[0]);
        shwoBanner.shift();
        setShowBanner(shwoBanner)
        setAnimate(false)
      }, 1500)
    } else {

    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimate(true)
      changeAnim()
      setTimer(timer + 1)
    }, 1500)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [timer])


  return (
    <div id="home" className="bj">
      {ShowBannerState && <div className="bannerBox">
        <div className="title">{t("Announcement")}</div>
        <div className={"content"}>
          {shwoBanner?.map((item: any, index: any) => <div className={animate ? 'anim box' : 'box'} key={index}>
            <div className={index === 1 ? " active subBannerTitle" : "subBannerTitle"}>{(i18n.language === "zh" ? item?.title : item?.enTitle)}</div>{width > 425 && <div className={index === 1 ? "date active" : "date"}> {dateFormat('YYYY-mm-dd', new Date(item.createTime))} </div >}
            {width > 425 ? (index === 1 && <div className="view" onClick={() => { navigate("/Notice") }}>{t("View")}</div>) : <div className="view" onClick={() => { navigate("/Notice") }}>{t("View")}</div>}
          </div>
          )}
        </div>
        <div className="close" onClick={() => { setShowBannerState(false) }}><img src={bannerClose} alt="" /></div>
      </div >}
      <div className="space">
        <div className="tit">
          <div className="title">META BASE</div>
          <div className="xiang">{t("The first Metaverse world created with welfare as the theme")}</div>
          {/* <a href={i18n.language === "zh" ? "https://mbasdao.com/whitePaper/cn_white_paper.pdf" : "https://mbasdao.com/whitePaper/en_white_paper.pdf"} target="downloadFile">
            <div className="btn">{t("WHITEPAPER")}</div>
          </a> */}
          {/* <div className="btn"></div> */}
        </div>
      </div>

      <div className="group">
        {/* 盲盒宝箱 */}
        <div>
          <div className="case">
            <div className="title">
              <div className="bei">{t("CASE")}</div>
              <div className="zhi">{t("CASE")}</div>
            </div>
            <div className="casebox">
              <div className="casebox-left">
                <AnimaMain visable={animaVisable} />
              </div>
              <div className="casebox-right">
                <div className="casebox-right-img"></div>
                <div className="casebox-right-group">
                  <div className="casebox-right-text">
                    {t("The MetaBase Welfare Blind Box is a pilot product of MetaBase")}
                  </div>
                  <div className="casebox-right-btn" onClick={() => { navigate("/BlindBox"); window.scrollTo({ top: 0 }) }}>
                    <div className="casebox-right-btn-content" >
                      {t("OPEN CASE")}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="casebox-mobile">
              <div className="casebox-mobile-vicetitle">MYSTERY CASE</div>
              <div className="casebox-mobile-content">
                {t("The MetaBase Welfare Blind Box is a pilot product of MetaBase")}
              </div>
              <div className="casebox-mobile-group">

                <div className="casebox-mobile-img">
                  <AnimaMain visable={animaMobileVisable} />
                </div>
              </div>
              <div className="casebox-mobile-group">

                <div className="casebox-mobile-btn">
                  <div className="casebox-mobile-btn-content" onClick={() => { navigate("/BlindBox") }}>
                    {t("OPEN CASE")}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* 应用生态 */}
        <div className="ecol">
          <div className="title">
            <div className="bei">Meta NFT</div>
            <div className="zhi">Meta NFT</div>
          </div>
          <div className="ecolbox" style={isNftEnter ? { margin: "144px auto 0" } : {}} onMouseEnter={(event) => {
            setIsEnter(true)
          }}
            onMouseLeave={(event) => {
              setIsEnter(false)
            }}
          >
            <div className="ecolbox-group-card">
              {
                nftMouse.map((item) => <div style={{ width: (100 / nftMouse.length).toFixed(2) + "%", padding: `${(50 / nftMouse.length).toFixed(2) + "%"} 0`, visibility: item?.className ? "visible" : "hidden", backgroundImage: `url(${item.img})` }} className={`ecolbox-group-card-item ${item?.className || ""}`} ></div>
                )
              }
            </div>
            <div className="ecolbox-left" style={{ backgroundImage: `url(${ecolboxData[activeIndex].img})` }}
              onMouseEnter={(event) => {
                GLOBAL_IS_NFT_ENter = true
                setIsNftEnter(true)
              }}
              onMouseLeave={(event) => {
                GLOBAL_IS_NFT_ENter = false
                setNftMouse([])
                setIsNftEnter(false)
              }}
            ></div>
            <div className="ecolbox-right" ref={ecolboxRef}>
              <div className="ecolbox-right-nft-content">
                <div className="ecolbox-right-name">{ecolboxData[activeIndex].title}</div>
                <div className="ecolbox-right-content">
                  {ecolboxData[activeIndex].content}
                </div>
              </div>
              <div className="ecolbox-right-process">
                <div onClick={() => {
                  setActiveIndex(0)
                }} style={{ backgroundColor: !activeIndex ? "#14FD87" : "#C8D1C8" }} className="ecolbox-right-process-item">

                </div>
                <div onClick={() => {
                  setActiveIndex(1)
                }} style={{ backgroundColor: !!activeIndex ? "#14FD87" : "#C8D1C8" }} className="ecolbox-right-process-item">

                </div>
              </div>
            </div>
          </div>
          <div className="ecolbox-mobile">
            <div className="ecolbox-mobile-group">
              {/* <div className="ecolbox-mobile-img" style={{ backgroundImage: `url(${ecolboxData[activeIndex].img})` }}></div> */}
              <Swiper
                slidesPerView={1.5}
                spaceBetween={10}
                grabCursor={true}
                modules={[Autoplay]}
                className="mySwiper"
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}

              >
                {
                  (mobileActiveIndex === 0 ? FAIRY_NFT : LAND_NFT).map((item) =>
                    <SwiperSlide>
                      <div className="ecolbox-mobile-img" style={{ backgroundImage: `url(${item.img})` }}></div>
                    </SwiperSlide>
                  )
                }
              </Swiper>
            </div>
            <div className="ecolbox-mobile-group">

              <div className="ecolbox-mobile-name">{ecolboxData[mobileActiveIndex].title}</div>

            </div>
            <div className="ecolbox-mobile-content-group">
              <PrevIcon className="ecolbox-mobile-content-icon" onClick={() => {
                setMobileActiveIndex((mobileActiveIndex + 1) % 2)
              }} />
              <div className="ecolbox-mobile-content">
                {ecolboxData[mobileActiveIndex].content}
              </div>
              <NextIcon className="ecolbox-mobile-content-icon" onClick={() => {
                setMobileActiveIndex((mobileActiveIndex + 3) % 2)
              }} />
            </div>


          </div>
        </div>
      </div>
      {/* 特色板块 */}

      <div className="feans">
        <div className="title">
          <div className="bei">{t("TOKENOMICS")}</div>
          <div className="zhi">{t("TOKENOMICS")}</div>
        </div>
        <div className="feans-contract-address">
          {t("Contract address")}
          {contractAddress?.Token ? AddrHandle(contractAddress?.Token, 10, 6) : "--"}
          <div className="feans-contract-address-copy" onClick={() => {
            if (contractAddress?.Token) {
              copy(contractAddress?.Token);
              addMessage(t("Copy Success"))
            }
          }}></div>
        </div>
        <div className="feans-group">
          <div className="feans-content">
            {t("MBAS is the native governance token of MetaBase")}
          </div>
          {i18n.language === "zh" ? <div className="feans-content-next feans-content">
            {t("Through")}
            <div className="feans-content-next-link feans-content-next-link-first  animate__animated animate__heartBeat" onClick={() => { navigate("/DestructFund") }}>{t("MBAS burning")}</div>
            {t("users can")}
            <div className="feans-content-next-link feans-content-next-link-last  animate__animated animate__heartBeat" onClick={() => { navigate("/Node") }}>
              {t("Coinage nodezh")}
            </div>{t("you can also")}
          </div> :
            <div className="feans-content-next feans-content">
              {t("ThroughEN")}
              <div className="feans-content-next-link feans-content-next-link-first  animate__animated animate__heartBeat" onClick={() => { navigate("/DestructFund") }}>{t("MBAS burningEN")}</div>
              {t("users canEN")}
              <div className="feans-content-next-link feans-content-next-link-last  animate__animated animate__heartBeat" onClick={() => { navigate("/Node") }}>
                {t("Coinage nodeEN")}
              </div>{t("you can alsoEN")}
            </div>}

          <div className="feans-asstes-chart-group-container">
            <div className="feans-asstes-chart-group">

              <div className="feans-asstes-group-chart1"></div>
              <div className="feans-asstes-group-chart-base feans-asstes-group-chart2">
                <div className="feans-asstes-group-chart-logo">

                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process1">
                {t("NFT staking")}
                <div className="feans-asstes-share-text">
                  35%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process2">
                {t("Game ecology")}
                <div className="feans-asstes-share-text">
                  33%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process3">
                {t("Guessing ecology")}
                <div className="feans-asstes-share-text">
                  15%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process4">
                {t("Foundation")}
                <div className="feans-asstes-share-text">
                  5%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process5">
                {t("Coinage node")}
                <div className="feans-asstes-share-text">
                  10%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process6">
                {t("Initial liquidity")}
                <div className="feans-asstes-share-text">
                  1.35%
                </div>
              </div>
              <div className="feans-asstes-share-process-base feans-asstes-share-process7">
                {t("Public offering")}
                <div className="feans-asstes-share-text">
                  0.65%
                </div>
              </div>
            </div>
          </div>


          <div className="feans-asstes-amount-group">
            <div className="feans-asstes-amount-group-base feans-asstes-amount-group-left">
              <div className="feans-asstes-amount-label">{t("MBAS Destory")}</div>
              {NumSplic(`${200000000 - Number(totalSupply)}`, 4)}
            </div>
            <div className="feans-asstes-amount-group-base feans-asstes-amount-group-right">
              <div className="feans-asstes-amount-label">{t("MBAS Total supply")}</div>
              {Number(totalSupply).toLocaleString()}
            </div>
          </div>

        </div>
      </div>

      {/* 应用生态 */}
      <div className="habits">
        <div className="title">
          <div className="bei">{t("APPLICATION ECOLOGY")}</div>
          <div className="zhi">{t("APPLICATION ECOLOGY")}</div>
        </div>
        <div className="habits-group">
          <div className="habits-group-chart">
            {
              HABITS_DATA.map((item, index) =>
                <HomeMouseCard
                  onMouseEnter={() => {
                    setActiveProcessIndex(index)
                  }}
                  className={item.className}
                  cardClassName={activeProcessIndex === index ? "animate__animated animate__fadeInUp" : ""}
                  title={item.title}
                  viceTitle={item.viceTitle}
                  content={item.content}
                />)
            }

          </div>
          <div className="habits-mobile">
            <div className="habits-mobile-group">

              <div className="habits-mobile-content-group">
                <PrevIcon className="habits-mobile-content-icon" onClick={() => {
                  setHabitsIndex((habitsIndex + 5) % 6)
                }} />
                <div className="habits-mobile-content" style={{ backgroundImage: `url(${HABITS_DATA[habitsIndex].img})` }}>
                </div>
                <NextIcon className="habits-mobile-content-icon" onClick={() => {
                  setHabitsIndex((habitsIndex + 1) % 6)
                }} />
              </div>

            </div>

            <div className="habits-mobile-card-group">

              <div className="habits-mobile-card">
                <img className="habits-mobile-card-title-img" src={HABITS_DATA[habitsIndex].titleImg} />
                <div className="habits-mobile-card-content">
                  <div className="habits-mobile-card-title-group">
                    <div className="habits-mobile-card-title">
                      {HABITS_DATA[habitsIndex].title}
                    </div>
                    <div className="habits-mobile-card-vicetitle">
                      {HABITS_DATA[habitsIndex].viceTitle}
                    </div>
                  </div>
                  {
                    HABITS_DATA[habitsIndex]?.content.map((item) => <div className="habits-mobile-card-text">{item}</div>
                    )
                  }
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Road Map */}
      <div className="road-map">
        <div className="title">
          <div className="bei">{t("ROAD MAP")}</div>
          <div className="zhi">{t("ROAD MAP")}</div>
        </div>
        <div className="road-map-group" style={{ backgroundImage: `url(${i18n?.language === "en" ? RoadMapEn : RoadMapZh})` }}>
        </div>
        <div className="road-map-mobile-group-chart" style={{ backgroundImage: `url(${i18n?.language === "en" ? RoadMapMobileEn : RoadMapMobileZh})` }} ></div>
      </div>

      {/* 战略合作 */}
      <div className="partner">
        <div className="partibox">
          <div className="title">
            <div className="bei">{t("STRATEGIC COOPERATION")}</div>
            <div className="zhi">{t("STRATEGIC COOPERATION")}</div>
          </div>
        </div>
        <div ref={pabtboxRef} className="pabtbox">
          {bt.map((item, index) => {
            return (
              <div style={{ visibility: item?.className ? "visible" : "hidden" }} className={`bt ${item?.className || ""}`} key={index}>
                <img src={item.img} alt="" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="home-bg-first"></div>
      <div className="home-bg-second"></div>
      <div className="home-bg-third"></div>
      <div className="home-bg-last"></div>

    </div >
  );
}
export default React.memo(Home);
