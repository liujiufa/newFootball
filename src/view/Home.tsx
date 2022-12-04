import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../assets/style/Home.scss";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { stateType } from '../store/reducer'
import { Contracts } from '../web3'
import shou from "../assets/image/shou.png";
import home1 from "../assets/image/home1.png";
import home2 from "../assets/image/home2.png";
import home3 from "../assets/image/home3.png";
import home4 from "../assets/image/home4.png";
import home5 from "../assets/image/home5.png";
import home6 from "../assets/image/home6.png";
import fz1 from "../assets/image/fz1.png";
import Group from "../assets/image/Group.png";
import GroupEn from "../assets/image/GroupEn.png";
import zoobox from "../assets/image/zoobox.png";
import zooboxEn from "../assets/image/zooboxEn.png";
import titimg1 from "../assets/image/titimg1.png";
import titimg2 from "../assets/image/titimg2.png";
import bt1 from "../assets/image/bt1.png";
import bt2 from "../assets/image/bt2.png";
import bt3 from "../assets/image/bt3.png";
import bt4 from "../assets/image/bt4.png";
import bt5 from "../assets/image/bt5.png";
import bt6 from "../assets/image/bt6.png";
import bt7 from "../assets/image/bt7.png";
import bt8 from "../assets/image/bt8.png";
import bt9 from "../assets/image/bt9.png";
import bt10 from "../assets/image/bt10.png";
import bt11 from "../assets/image/bt11.png";
import bt12 from "../assets/image/bt12.png";

import G1 from "../assets/image/G1.png";
import G2 from "../assets/image/G2.png";
import G3 from "../assets/image/G3.png";
import G4 from "../assets/image/G4.png";
import G5 from "../assets/image/G5.png";
import G6 from "../assets/image/G6.png";

import fe1 from "../assets/image/fe1.png";
import fel1 from "../assets/image/fel1.png";
import fel2 from "../assets/image/fel2.png";
import fel3 from "../assets/image/fel3.png";
import fel4 from "../assets/image/fel4.png";
import zi1 from "../assets/image/zi1.png";
import zi2 from "../assets/image/zi2.png";
import zi3 from "../assets/image/zi3.png";
import zi4 from "../assets/image/zi4.png";
import bzt1 from "../assets/image/bzt1.png";
import bzt2 from "../assets/image/bzt2.png";
import { addMessage } from "../utils/tool";
import BScroll from "@better-scroll/core";
import { request } from "http";
import { url } from "inspector";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { contractAddress } from "../config";
import BigNumber from 'big.js'
function Home() {
  const web3React = useWeb3React()
  let state = useSelector<stateType, stateType>(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    const wrapper: any = document.querySelector(".scroll");
    const scroll = new BScroll(wrapper, {
      scrollX: true, //开启横向滚动
      click: true, // better-scroll 默认会阻止浏览器的原生 click 事件
      scrollY: false, //关闭竖向滚动
    });
  }, []);
  let { t, i18n } = useTranslation();
  let [lxt] = useState([
    {
      title: "Road Map title 1",
      nei: ["Road Map sub title 1", "Road Map subTitle 1"],
    },
    {
      title: "Road Map title 2",
      nei: ["Road Map sub title 2"],
    },
    {
      title: "Road Map title 3",
      nei: ["Road Map sub title 3"],
    },
    {
      title: "Road Map title 4",
      nei: ["Road Map sub title 4", "Road Map subtitle 4"],
    },
    {
      title: "Road Map title 5",
      nei: ["Road Map sub title 5"],
    },
    {
      title: "Road Map title 6",
      nei: ["Road Map sub title 6"],
    },
    {
      title: "Road Map title 7",
      nei: ["Road Map sub title 7"],
    },
    {
      title: "Road Map title 8",
      nei: ["Road Map sub title 8"],
    },
    {
      title: "Road Map title 9",
      nei: ["Road Map sub title 9"],
    },
    {
      title: "Road Map title 10",
      nei: ["Road Map sub title 10"],
    },
    {
      title: "Road Map title 11",
      nei: ["Road Map sub title 11"],
    },
    {
      title: "Road Map title 12",
      nei: ["Road Map sub title 12"],
    },
    {
      title: "Road Map title 13",
      nei: ["Road Map sub title 13", "Road Map subtitle 13"],
    },
  ]);
  let [bt, setBt] = useState([
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
  ]);
  let [nian, seinian] = useState({
    title: "Road Map title 1",
    nei: ["Road Map sub title 1", "Road Map subTitle 1"],
  });
  function sznian(a: string) {
    setnum(a);
    if (a === "01") {
      let title = lxt[0].title;
      let nei = lxt[0].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "02") {
      let title = lxt[1].title;
      let nei = lxt[1].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "03") {
      let title = lxt[2].title;
      let nei = lxt[2].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "04") {
      let title = lxt[3].title;
      let nei = lxt[3].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "05") {
      let title = lxt[4].title;
      let nei = lxt[4].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "06") {
      let title = lxt[5].title;
      let nei = lxt[5].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "07") {
      let title = lxt[6].title;
      let nei = lxt[6].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "08") {
      let title = lxt[7].title;
      let nei = lxt[7].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "09") {
      let title = lxt[8].title;
      let nei = lxt[8].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "10") {
      let title = lxt[9].title;
      let nei = lxt[9].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "11") {
      let title = lxt[10].title;
      let nei = lxt[10].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "12") {
      let title = lxt[11].title;
      let nei = lxt[11].nei;
      seinian({
        title,
        nei,
      });
    }
    if (a === "13") {
      let title = lxt[12].title;
      let nei = lxt[12].nei;
      seinian({
        title,
        nei,
      });
    }
  }
  let [appgy] = useState([
    {
      tit: "NFT",
      ne: "Freely",
      tu: G1,
    },
    {
      tit: "Guessing",
      ne: "Get more",
      tu: G2,
    },
    {
      tit: "Staking",
      ne: "Staking NF",
      tu: G3,
    },
    {
      tit: "Coinage",
      ne: "Space Ba",
      tu: G4,
    },
    {
      tit: "Donation",
      ne: "Reduce",
      tu: G5,
    },
    {
      tit: "Games",
      ne: "PVP battles",
      tu: G6,
    },
  ]);
  let [isfea, setisfea] = useState(true);
  let [isfen, setisfen] = useState(true);
  let [isnum, setnum] = useState("01");
  const [totalSupply, setTotalSupply] = useState('0')
  const [allBalance, setAllBalance] = useState('0')

  function getlbox(name: any): void {
    console.log(name);
    if (name === "NFT") {
      return navigate("/Swap");
    }
    if (name === "Coinage") {
      return navigate("/Node");
    }
    if (name === "Staking") {
      return navigate("/Pledge");
    }
    if (name === "Donation") {
      return navigate("/DestructFund");
    }
    addMessage(t("Coming Soon"));
  }

  useEffect(() => {
    if (web3React.account && state.token) {
      Contracts.example.totalSupply(web3React.account).then((res: any) => {
        // console.log(res);
        setTotalSupply(new BigNumber(res).div(10 ** 18).toString())
      })
      Contracts.example.balanceOf(contractAddress.DestructBalance).then((res: any) => {
        // console.log(res);
        setAllBalance(new BigNumber(res).div(10 ** 18).toString())
      })
    }
  }, [state.token, web3React.account])

  return (
    <div className="bj">
      <div className="space">
        <div className="tit">
          <div className="title">SPACE BALL</div>
          <div className="xiang">{t("SPACE BALL")}</div>
          <a href={i18n.language === "zh" ? "http://spaceballgames.com/File/SpaceBallZh.pdf" : "http://spaceballgames.com/File/SpaceBallEn.pdf"} target="downloadFile">
            <div className="btn">{t("WHITEPAPER")}</div>
          </a>
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
              <div className="nebox">
                <div className="tytie">{t("MYSTERY CASE")}</div>
                <div className="mynei">{t("Mystery cases")}</div>
                <div className="mybtn" onClick={() => navigate("/BlindBox")}>
                  {t("BUY CASE")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 应用生态 */}
        <div>
          <div className="ecol">
            <div className="title">
              <div className="bei">{t("APPLICATION ECOLOGY")}</div>
              <div className="zhi">{t("APPLICATION ECOLOGY")}</div>
            </div>
            <div className="ecolbox">
              {appgy.map((item, index) => {
                return (
                  <div
                    className="nebox"
                    key={index}
                    onClick={() => getlbox(item.tit)}
                  >
                    <div className="tit">{t(item.tit)}</div>
                    <div className="ne">{t(item.ne)}</div>
                    <img src={item.tu} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 特色板块 */}
      <div className="feans">
        <div className="title">
          <div className="bei">{t("FEATURED FUNCTIONS")}</div>
          <div className="zhi">{t("FEATURED FUNCTIONS")}</div>
        </div>
        <div className="fenbox">
          <div className="fenletf">
            {isfea ? (
              <div className="kai" onClick={() => setisfea(false)}>
                <Carousel autoplay dots={false}>
                  <div className="kaibox">
                    <img src={fel4} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={fel3} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={fel2} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={fel1} alt="" />
                  </div>
                </Carousel>
                <div className="Badge">{t("Badge NFT")}</div>
              </div>
            ) : (
              <div className="guan">
                <div className="gunbox">
                  <div className="tit">{t("Badge NFT")}</div>
                  <div className="nei">{t("Holding the")}</div>
                  <div className="btn" onClick={() => navigate("/BlindBox")}>
                    {t("GET BADGE")}
                  </div>
                </div>

                <div className="kai" onClick={() => setisfea(true)}>
                  <Carousel autoplay dots={false}>
                    <div className="kaibox myImgAuto1">
                      <img src={fel4} alt="" />
                    </div>
                    <div className="kaibox myImgAuto2">
                      <img src={fel3} alt="" />
                    </div>
                    <div className="kaibox myImgAuto3">
                      <img src={fel2} alt="" />
                    </div>
                    <div className="kaibox myImgAuto4">
                      <img src={fel1} alt="" />
                    </div>
                  </Carousel>
                </div>
              </div>
            )}
          </div>

          <div className="fenright">
            {isfen ? (
              <div className="kai myAuto" onClick={() => setisfen(false)}>
                <Carousel autoplay dots={false}>
                  <div className="kaibox">
                    <img src={zi1} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={zi2} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={zi3} alt="" />
                  </div>
                  <div className="kaibox">
                    <img src={zi4} alt="" />
                  </div>
                </Carousel>
                {/* <img src={zi1} alt="" /> */}
                <div className="Badge">{t("Land NFT")}</div>
              </div>
            ) : (
              <div className="ribox">
                <div className="gunbox">
                  <div className="tit">{t("Land NFT")}</div>
                  <div className="nei">{t("jointly build")}</div>
                  <div
                    className="btn"
                    onClick={() =>
                      navigate("/Land")
                    }
                  >
                    {t("VIEW LAND")}
                  </div>
                </div>

                <div className="kai myAuto" onClick={() => setisfen(true)}>
                  <div className="">
                    <Carousel autoplay dots={false}>
                      <div className="kaibox">
                        <img src={zi1} alt="" />
                      </div>
                      <div className="kaibox">
                        <img src={zi2} alt="" />
                      </div>
                      <div className="kaibox">
                        <img src={zi3} alt="" />
                      </div>
                      <div className="kaibox">
                        <img src={zi4} alt="" />
                      </div>
                    </Carousel>
                    {/* <img src={zi1} alt="" /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 代笔经济 */}
      <div className="tokens">
        <div className="title">
          <div className="bei">{t("Tokenomicst")}</div>
          <div className="zhi">{t("Tokenomicst")}</div>
        </div>
        <div className="todbj">
          <div className="stou">
            <div className="stone">{t("Space Ball adopts a")}</div>
            <div className="stone">{t("SBL is Space Ball's")}</div>
            <img src={i18n.language === "zh" ? bzt2 : bzt1} alt="" />

            <div className="box">
              <div className="destructAll">
                {t("SBL destroyed")}：<span>{Number(allBalance).toLocaleString()}</span>
              </div>
              <div className="provideAll">
                {t("SBL total supply")}：<span>{Number(totalSupply).toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>
        <div className="fsbtm"></div>
      </div>

      {/* 路线图 */}
      <div className="WaspNest">
        <div className="title">
          <div className="bei">{t("Road Map")}</div>
          <div className="zhi">{t("Road Map")}</div>
        </div>
        <div className="scroll">
          <div className="scbox">
            <div className="hexagonRow hexagonRow1">
              <div className="hexagon"></div>
              <div className="hexagon hexagon1"></div>
              <div className="hexagon"></div>
              <div className="hexagon hexagon1"></div>
              <div className="hexagon hexagon1"></div>
              <div className="hexagon"></div>
            </div>
            <div className="hexagonRow">
              <div
                onClick={() => sznian("01")}
                className={
                  isnum === "01" ? "hexagon hexagons" : "hexagon hexagon01"
                }
              >
                <div className={isnum === "01" ? "num" : "nums"}>01</div>
              </div>
              <div
                onClick={() => sznian("03")}
                className={
                  isnum === "03" ? "hexagon hexagons" : "hexagon hexagon03"
                }
              >
                <div className={isnum === "03" ? "num" : "nums"}>03</div>
              </div>
              <div
                onClick={() => sznian("05")}
                className={
                  isnum === "05" ? "hexagon hexagons" : "hexagon hexagon05"
                }
              >
                <div className={isnum === "05" ? "num" : "nums"}>05</div>
              </div>
              <div
                onClick={() => sznian("07")}
                className={
                  isnum === "07" ? "hexagon hexagons" : "hexagon hexagon07"
                }
              >
                <div className={isnum === "07" ? "num" : "nums"}>07</div>
              </div>
              <div
                onClick={() => sznian("08")}
                className={
                  isnum === "08" ? "hexagon hexagons" : "hexagon hexagon08"
                }
              >
                <div className={isnum === "08" ? "num" : "nums"}>08</div>
              </div>
              <div
                onClick={() => sznian("10")}
                className={
                  isnum === "10" ? "hexagon hexagons" : "hexagon hexagon10"
                }
              >
                <div className={isnum === "10" ? "num" : "nums"}>10</div>
              </div>
              <div
                onClick={() => sznian("12")}
                className={
                  isnum === "12" ? "hexagon hexagons" : "hexagon hexagon12"
                }
              >
                <div className={isnum === "12" ? "num" : "nums"}>12</div>
              </div>
            </div>
            <div className="hexagonRow hexagonRow3">
              <div
                onClick={() => sznian("02")}
                className={
                  isnum === "02" ? "hexagon hexagons" : "hexagon hexagon02"
                }
              >
                <div className={isnum === "02" ? "num" : "nums"}>02</div>
              </div>
              <div
                onClick={() => sznian("04")}
                className={
                  isnum === "04" ? "hexagon hexagons" : "hexagon hexagon04"
                }
              >
                <div className={isnum === "04" ? "num" : "nums"}>04</div>
              </div>
              <div
                onClick={() => sznian("06")}
                className={
                  isnum === "06" ? "hexagon hexagons" : "hexagon hexagon06"
                }
              >
                <div className={isnum === "06" ? "num" : "nums"}>06</div>
              </div>
              <div className="hexagon "></div>
              <div
                onClick={() => sznian("09")}
                className={
                  isnum === "09" ? "hexagon hexagons" : "hexagon hexagon09"
                }
              >
                <div className={isnum === "09" ? "num" : "nums"}>09</div>
              </div>
              <div
                onClick={() => sznian("11")}
                className={
                  isnum === "11" ? "hexagon hexagons" : "hexagon hexagon11"
                }
              >
                <div className={isnum === "11" ? "num" : "nums"}>11</div>
              </div>
              <div
                onClick={() => sznian("13")}
                className={
                  isnum === "13" ? "hexagon hexagons" : "hexagon hexagon13"
                }
              >
                <div className={isnum === "13" ? "num" : "nums"}>13</div>
              </div>
            </div>
          </div>
        </div>

        <div className="april">
          <div className="biao">{t(nian.title)}</div>
          {nian.nei.map((item, index) => {
            return (
              <div key={index} className="then">
                {t(item)}
              </div>
            );
          })}
        </div>
      </div>

      {/* 战略合作 */}
      <div className="partner">
        <div className="partibox">
          <div className="title">
            <div className="bei">{t("Strategic Cooperations")}</div>
            <div className="zhi">{t("Strategic Cooperations")}</div>
          </div>
        </div>
        <div className="pabtbox">
          {bt.map((item, index) => {
            return (
              <div className="bt" key={index}>
                <img src={item.img} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default React.memo(Home);
