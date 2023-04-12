import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
// import { useConnectWallet, injected, ChainId } from "../web3";
import { AddrHandle, addMessage, GetQueryString, showLoding } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserInfo, signBindReferee, getIsWhite } from '../API/index'
import { Contracts } from '../web3'
import copy from "copy-to-clipboard";
import logo from "../assets/image/logo.png";
import Doc from "../assets/image/Doc.svg";
import closeIcon from "../assets/image/closeIcon.png";
import Email from "../assets/image/Email.svg";
import Telegram from "../assets/image/Telegram.svg";
import Discord from "../assets/image/Discord.svg";
import Twitter from "../assets/image/Twitter.svg";
import Lang from "../assets/image/Lang.svg";
import MBASGovernanceIcon0 from "../assets/image/MBASGovernanceIcon0.png";
import MBASGovernanceIcon1 from "../assets/image/MBASGovernanceIcon1.png";
import MBASGovernanceIcon2 from "../assets/image/MBASGovernanceIcon2.png";
import MBASGovernanceIcon3 from "../assets/image/MBASGovernanceIcon3.png";
import MBASGovernanceIcon4 from "../assets/image/MBASGovernanceIcon4.svg";
import MBASIcon0 from "../assets/image/MBASIcon0.png";
import MBASIcon1 from "../assets/image/MBASIcon1.png";
import MBASIcon2 from "../assets/image/MBASIcon2.png";
import NFTIcon0 from "../assets/image/NFTIcon0.png";
import NFTIcon1 from "../assets/image/NFTIcon1.png";
import NFTIcon2 from "../assets/image/NFTIcon2.png";
import NFTIcon3 from "../assets/image/NFTIcon3.png";
import NFTIcon4 from "../assets/image/NFTIcon4.png";
import priceUP from "../assets/image/priceUP.png";
import EcologyIcon0 from "../assets/image/EcologyIcon1.png";
import EcologyIcon1 from "../assets/image/EcologyIcon2.png";
import footerIcon1 from "../assets/image/footerIcon1.svg";
import footerIcon2 from "../assets/image/footerIcon2.svg";
import footerIcon4 from "../assets/image/footerIcon3.svg";
import footerIcon3 from "../assets/image/footerIcon4.svg";
import footerAIcon1 from "../assets/image/footerAIcon1.svg";
import footerAIcon2 from "../assets/image/footerAIcon2.svg";
import footerAIcon3 from "../assets/image/footerAIcon3.svg";
import footerAIcon4 from "../assets/image/footerAIcon4.svg";
import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import useConnectWallet from "../hooks/useConnectWallet";
const { Header, Content, Footer } = Layout;
interface SubMenuItemType {
  name: string,
  path: string,
  Fun: () => void
}
let refereeUserAddress = GetQueryString("address") || ''
const MainLayout: React.FC = () => {

  let state = useSelector<stateType, stateType>(state => state);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [showSubMenu, setShowSubMenu] = useState(false);
  let [priceModal, setPriceModal] = useState(false);
  let [isWhite, setIsWhite] = useState(false);
  let [showRefereeAddress, setShowRefereeAddress] = useState(false);
  let [showDropMenu, setShowDropMenu] = useState<any>();
  let [SmallActive, setSmallActive] = useState<any>(0);
  let [UserInfo, setUserInfo] = useState<any>();
  let [subMenuList, setSubMenuList] = useState<any[]>([]);
  const { connectWallet } = useConnectWallet()
  // 底部更多菜单
  const moreSubMenuList = [
    {
      name: t("Invitation"),
      path: "/Invitation",
      Fun: () => {
        navigateFun("/Invitation");
      }
    },
    {
      name: t("Game Competition"),
      path: "/Games",
      Fun: () => {
        navigateFun("/nodata")
      }
    },
    {
      name: t("Quiz entertainment"),
      path: "/Guess",
      Fun: () => {
        navigateFun("/nodata")
      }
    },
    {
      name: t("Announcement"),
      path: "/Notice",
      Fun: () => {
        navigateFun("/Notice");
      }
    },
    {
      name: t("Whitelist"),
      path: "/WhiteList",
      Fun: () => {
        navigateFun("/WhiteList");
      }
    },
  ]
  // 白皮书
  const moreSubMenuList1 = [
    {
      name: t("Invitation"),
      path: "/Invitation",
      Fun: () => {
        navigateFun("/Invitation");
      }
    },
    {
      name: t("Game Competition"),
      path: "/Games",
      Fun: () => {
        navigateFun("/nodata")
      }
    },
    {
      name: t("Quiz entertainment"),
      path: "/Guess",
      Fun: () => {
        navigateFun("/nodata")
      }
    },
    {
      name: t("Announcement"),
      path: "/Notice",
      Fun: () => {
        navigateFun("/Notice");
      }
    },
  ]
  // 底部节点菜单
  const NodeSubMenuList = [
    {
      name: t("Application"),
      path: "/NodeApply",
      Fun: () => {
        navigateFun("/NodeApply");
      }
    },
    {
      name: t("Genesis Nodes"),
      path: "/CreateNode",
      Fun: () => {
        navigateFun("/CreateNode");
      }
    },
    {
      name: t("Node Fund"),
      path: "/NodeFund",
      Fun: () => {
        navigateFun("/NodeFund");
      }
    },
  ]
  // 底部NFT菜单
  const NFTSubMenuList = [
    {
      name: t("Card"),
      path: "/NFT",
      Fun: () => {
        navigateFun("/NFT");
      }
    },
    {
      name: t('Land'),
      path: "/Land",
      Fun: () => {
        navigateFun("/Land");
      }
    },
    {
      name: t("Pledge"),
      path: "/Pledge",
      Fun: () => {
        navigateFun("/Pledge");
      }
    },
    {
      name: t("Swap"),
      path: "/Swap",
      Fun: () => {
        navigateFun("/Swap");
      }
    },
    {
      name: t("Evolve"),
      path: '/Synthesis',
      Fun: () => {
        navigateFun("/Synthesis");
      }
    },
  ]
  // 底部SBL菜单
  const SBLSubMenuList = [
    {
      name: t("Liquidity"),
      path: "/Liquidity",
      Fun: () => {
        navigateFun("/Liquidity");
      }
    },
    {
      name: t('Burn fund'),
      path: "/DestructFund",
      Fun: () => {
        navigateFun("/DestructFund");
      }
    },
    {
      name: t('Coinage'),
      path: '/Node',
      Fun: () => {
        navigateFun("/Node");
      }
    },
    {
      name: t("SWAPqw"),
      Fun: () => {
        navigateFun("/outLink");
      }
    },
    // {
    //   name: t("Farms"),
    //   Fun: () => {
    //     navigateFun("/nodata");
    //   }
    // },
  ]
  console.log(web3React);
  function changeLanguage(lang: any) {
    window.localStorage.setItem("lang", lang.key);
    i18n.changeLanguage(lang.key);
  }

  const menu = (
    <Menu
      onClick={changeLanguage}
      items={[
        {
          label: <span className="LangItem">English</span>,
          key: "en",
        },
        {
          type: "divider",
        },
        {
          label: <span className="LangItem">简体</span>,
          key: "zh",
        },
      ]}
    />
  );

  const location = useLocation();
  const navigate = useNavigate();
  function menuActive(Path: string) {
    if (Path === "/NFT") {
      return "MenuItem pointer"
    }
    if (Path === location.pathname) {
      return "MenuItem pointer active";
    } else {
      return "MenuItem pointer";
    }
  }

  function menuSmallActive(Path: string) {
    if (Path === location.pathname) {
      return "SubMenuItem activeSubMenuItem";
    } else {
      return "SubMenuItem";
    }
  }
  function showOther() {
    setSubMenuList(isWhite ? moreSubMenuList : moreSubMenuList1)
    setShowSubMenu(true)
  }
  function showNftOther() {
    setSubMenuList(NFTSubMenuList)
    setShowSubMenu(true)
  }
  function showNode() {
    setSubMenuList(NodeSubMenuList)
    setShowSubMenu(true)
  }
  function showSBLOther() {
    setSubMenuList(SBLSubMenuList)
    setShowSubMenu(true)
  }
  // 下拉菜单
  const dropMenuList = {
    "/MBASGovernance": [
      { icon: MBASGovernanceIcon0, title: t("Liquidity"), subtitle: t('Add liquidity to activate land'), path: '/Liquidity' },
      { icon: MBASGovernanceIcon1, title: t("Coinage"), subtitle: t('Obtain ecological minting rights based on the amount of MBAS burned'), path: '/Node' },
      { icon: MBASGovernanceIcon2, title: t("Donate to destroy"), subtitle: t('Destory MBAS to get double BNB rewards'), path: "/DestructFund" },
      // { icon: MBASGovernanceIcon3, title: t("Farms"), subtitle: t('Pledge LP to get ecological incentives'), path: "/nodata" },
      { icon: MBASGovernanceIcon4, title: t("SWAPqw"), subtitle: t('Buy and Sell MBAS with Pancake'), path: '/outLink' },
    ],
    "/MBAS": [
      { icon: MBASIcon0, title: t("Application"), subtitle: t('Apply To Participate In Node Election'), path: '/NodeApply' },
      { icon: MBASIcon1, title: t("Genesis Nodes"), subtitle: t('Genesis Nodes Benefit Zone'), path: '/CreateNode' },
      { icon: MBASIcon2, title: t("Node Fund"), subtitle: t('Claiming Node Fund Earnings'), path: '/NodeFund' },
    ],
    "/NFT": [
      { icon: NFTIcon0, title: t("Card"), subtitle: t('View individual Cards'), path: '/NFT' },
      { icon: NFTIcon1, title: t("Land"), subtitle: t('Get land bonuses and service awards'), path: '/Land' },
      { icon: NFTIcon2, title: t("Trading Center"), subtitle: t('Buy and sell elf land freely'), path: '/Swap' },
      { icon: NFTIcon3, title: t("Stake"), subtitle: t('Genie staking to get MBAS rewards'), path: '/Pledge' },
      { icon: NFTIcon4, title: t("Evolve"), subtitle: t('Genie synthesis unlocks higher rights'), path: '/Synthesis' },
    ],
    "/Ecology": [
      { icon: EcologyIcon0, title: t("Game Competition"), subtitle: t('Blockchain games based on the MetaBase public chain protocol'), path: '/nodata' },
      { icon: EcologyIcon1, title: t("Quiz entertainment"), subtitle: t('Participate in the guessing game by using MBAS and NFT'), path: '/nodata' },
    ],
    "/...": isWhite ? [
      { icon: MBASIcon0, title: t("Invitation"), subtitle: '-', path: '/Invitation' },
      { icon: MBASIcon1, title: t("Announcement"), subtitle: '-', path: '/Notice' },
      { icon: MBASIcon1, title: t("Whitelist"), subtitle: '-', path: '/WhiteList' },
    ] : [
      { icon: MBASIcon0, title: t("Invitation"), subtitle: '-', path: '/Invitation' },
      { icon: MBASIcon1, title: t("Announcement"), subtitle: '-', path: '/Notice' },
    ]
  }
  // 导航
  const navigateFun = (path: string) => {
    if (path === "/outLink") {
      return window.open("https://pancakeswap.finance/swap?outputCurrency=0x094B109d635c34f24b1dC784b2b09F30ccf6408C")
    }
    if (path === "/nodata") {
      return addMessage(t("Open soon"))
    }

    if (path === "/CreateNode") {
      if (UserInfo?.nodeLevel > 0 && UserInfo?.endTime < Date.now()) {
        navigate(path)
        setShowDropMenu(null)
      } else {
        addMessage(t("You do not have permission"))
      }
    } else {
      navigate(path)
      setShowDropMenu(null)
    }
  }

  useEffect(() => {
    if (state.token) {
      console.log("12");
      getUserInfo().then(res => {
        console.log(res.data, "我的信息")
        setUserInfo(res.data)
        if (res.data.isBind == 0) {
          setShowRefereeAddress(true)
        }
      })
      getIsWhite(web3React.account as string).then((res: any) => {
        console.log(res.data, "白名单");
        if (res.code === 200) {
          setIsWhite(!!res.data)
        }
      })
    }
  }, [state.token, refereeUserAddress])


  const BindFun = () => {
    let time = (new Date()).valueOf();
    showLoding(true)
    Contracts.example.Sign(web3React.account as string, `userAddress=${web3React.account}&refereeUserAddress=${refereeUserAddress}&time=${time}`).then((res: string) => {
      signBindReferee({
        "ethAddress": "",
        "msg": `userAddress=${web3React.account}&refereeUserAddress=${refereeUserAddress}&time=${time}`,
        "password": "",
        "refereeUserAddress": refereeUserAddress,
        "sign": res,
        "userAddress": web3React.account,
        "userPower": 0
      }).then((res: any) => {
        if (res.code === 200) {
          addMessage(t("Bind successfully"))
          showLoding(false)
          setShowRefereeAddress(false)
        } else if (res.code === 500) {
          showLoding(false)
          addMessage(res.msg)
        }
      })
    }).catch((res: any) => {
      if (res.code === 4001) {
        addMessage(t("Binding failed!"))
        showLoding(false)

      }
    })
  }
  const PriceFun = () => {
    return <div className="priceBox" onClick={() => { setShowDropMenu(true) }}>
      <img src={priceUP} alt="" />
      $0.1221
    </div>
  }

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 999, width: "100%" }}>
        <div className="Header-Edition-Center HeaderNav">
          <img
            className="HeadMenu"
            src={logo}
            onClick={() => {
              navigate("/");
            }}
            alt=""
          />

          {/* 中屏 */}
          <div className="MenuList Secondary">
            {/* <div
              className={menuActive("/")}
              onClick={() => {
                navigate("/");
              }}
            >
              {t("Home")}
            </div> */}
            <div
              className='MenuItem pointer'
              onClick={() => {
                setShowDropMenu('/MBAS')
              }}
            >
              {t("Nodes")}
            </div>
            <div
              className={menuActive("/BlindBox")}
              onClick={() => {
                navigate("/BlindBox");
              }}
            >
              {t("BlindBox")}
            </div>

            <div
              className={menuActive("/SBL")}
              onClick={() => {
                setShowDropMenu("/MBASGovernance");
              }}
            >
              {t("MBAS Governance")}
            </div>

            <div
              className={menuActive("/NFT")}
              onClick={() => {
                setShowDropMenu("/NFT");
              }}
            >
              NFT
            </div>
            <div
              className={menuActive("/Ecology")}
              onClick={() => {
                setShowDropMenu("/Ecology");
              }}
            >
              {t('Ecology')}
            </div>
            <div
              className={menuActive("/NFT")}
              onClick={() => {
                setShowDropMenu("/...");
              }}
            >
              ...
            </div>

            {/* <Dropdown
              overlay={SecondaryOther}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className={menuActive("")}>...</div>
            </Dropdown> */}

          </div>

          {/* 大屏 */}
          <div className="MenuList LargeScreen">
            <div
              className='MenuItem pointer'
              onClick={() => {
                setShowDropMenu('/MBAS')
              }}
            >
              {t("Nodes")}

            </div>
            <div
              className={menuActive("/BlindBox")}
              onClick={() => {
                navigateFun("/BlindBox");
              }}
            >
              {t("BlindBox")}
            </div>
            <div
              className={menuActive("/SBL")}
              onClick={() => {
                setShowDropMenu("/MBASGovernance");
              }}
            >
              {t("MBAS Governance")}
            </div>
            <div
              className={menuActive("/NFT")}
              onClick={() => {
                setShowDropMenu("/NFT");
              }}
            >
              NFT
            </div>


            <div
              className={menuActive("/Ecology")}
              onClick={() => {
                setShowDropMenu("/Ecology");
              }}
            >
              {t('Ecology')}
            </div>
            {/* <div
              className={menuActive("/farms")}
              onClick={() => {
                navigateFun("/farms");
              }}
            >
              {t("Farms")}
            </div> */}
            <div
              className={menuActive("/Invitation")}
              onClick={() => {
                navigateFun("/Invitation");
              }}
            >
              {t("Invitation")}
            </div>
            <div
              className={menuActive("/Notice")}
              onClick={() => {
                navigateFun("/Notice");
              }}
            >
              {t("Announcement")}
            </div>
            {isWhite && <div
              className={menuActive("/WhiteList")}
              onClick={() => {
                navigateFun("/WhiteList");
              }}
            >
              {t("Whitelist")}
            </div>}
            {/* <div className="MBASPrice">
              {PriceFun()}
              {showDropMenu && (!dropMenuList[showDropMenu]) && <div className="marketPrice">
                <div className="item top">MBAS <span className="BNB"> /BNB</span>
                  <span className="green">0.0001</span>
                </div>
                <div className="item">$0.1221 <span className="red">-0.8%</span></div>
              </div>}
            </div> */}

            <Dropdown
              overlay={menu}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className="Lang">
                <img style={{ width: "24px" }} src={Lang} alt="" />
                {i18n.language === "zh" ? "简" : "EN"}
              </div>
            </Dropdown>
            {web3React.account ? (
              <>
                <div className="Connect  pointer">
                  {AddrHandle(web3React.account as string)}
                </div>
              </>
            ) : (
              <>
                <div
                  className="toConnect  pointer flexCenter"
                  onClick={() => {
                    connectWallet && connectWallet();
                  }}
                >
                  Connect
                </div>
              </>
            )}
          </div>
          {/* 小屏 */}
          <div className="Mobile">

            {/* <div className="MBASPrice">
              {PriceFun()}
              {showDropMenu && (!dropMenuList[showDropMenu]) && <div className="marketPrice">
                <div className="item top">MBAS/ <span className="BNB"> BNB</span>
                  <span className="green">0.0001</span>
                </div>
                <div className="item">$0.1221 <span className="red">-0.8%</span></div>
              </div>}
            </div> */}
            <Dropdown
              arrow={true}
              overlay={menu}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
            >
              <img style={{ width: "24px" }} src={Lang} alt="" />
            </Dropdown>
            {web3React.account ? (
              <>
                <div className="Connect  pointer">
                  {AddrHandle(web3React.account as string)}
                </div>
              </>
            ) : (
              <>
                <div
                  className="toConnect  pointer"
                  onClick={() => {
                    connectWallet && connectWallet()
                  }}
                >
                  Connect
                </div>
              </>
            )}
          </div>
        </div>
        {showDropMenu && <div className="dropMenuBox">
          <div className="menuContent">
            {dropMenuList[showDropMenu]?.map((item: any, index: any) =>
              <div className="item" key={index} onClick={() => { navigateFun(item.path) }}>
                <div className="left">
                  <img src={item.icon} alt="" />
                </div>
                <div className="right">
                  <div className="title">{item.title}</div>
                  <div className="subtitle">{item.subtitle}</div>
                </div>
              </div>
            )}
            <div className="autoitem"></div>
            {/* {while(dropMenuList[showDropMenu].length % 3){
              }} */}
          </div>
        </div>}
      </Header>
      <Content
        className="MainContent"
        style={{ marginTop: 64, position: "relative", zIndex: 10 }}
      >
        <Outlet />
        <div className="bg1"></div>
        <div className="bg2"></div>
      </Content>
      {
        <Footer className="footer">
          <div className="footerLink">
            {/* <img src={logo} alt="" /> */}
            <div className="SOCIALRow">
              <div className="SOCIAL">SOCIAL</div>
              <div className="SOCIALItem">
                <a
                  href="https://twitter.com/MetaBaseDAO"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Twitter} alt="" />
                  <span>Twitter</span>
                </a>
              </div>
              <div className="SOCIALItem">
                <a
                  href="https://t.me/MetaBaseDAO"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Telegram} alt="" />
                  <span>Telegram</span>
                </a>
              </div>
              <div className="SOCIALItem">
                <a
                  href={
                    i18n.language === "zh"
                      ? "https://mbasdao.com/whitePaper/cn_white_paper.pdf"
                      : "https://mbasdao.com/whitePaper/en_white_paper.pdf"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Doc} alt="" />
                  <span>{t("White paper")}</span>
                </a>
              </div>
              {/* <div className="SOCIALItem">
              <a
                href="https://discord.gg/sxbN5ZVKTW"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Discord} alt="" />
                <span>Discord</span>
              </a>
            </div>
            <div className="SOCIALItem">
              <a
                href={
                  i18n.language === "zh"
                    ? "http://spaceballgames.com/File/SpaceBallZh.pdf"
                    : "http://spaceballgames.com/File/SpaceBallEn.pdf"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={Doc} alt="" />
                <span>Doc</span>
              </a>
            </div>
            <div className="SOCIALItem" onClick={invitation}>
              <img src={Email} alt="" />
              <span>spaceballok@gmail.com</span>
            </div> 
            */}
            </div>
          </div>
        </Footer>
      }
      {
        showSubMenu && <div className="subMenuMold" onClick={() => { setShowSubMenu(false) }}>
          <div className="subMenu">
            {
              subMenuList.map((item, index) => <div key={index} className={menuSmallActive(item?.path)} onClick={() => { item.Fun(); }}>{item.name}</div>)
            }
          </div>
        </div>
      }

      {/* <div className="FootMenu">
        <div className={SmallActive === 1 ? "MenuItem flexCenter activeMenuItem" : "MenuItem flexCenter"} onClick={() => {
          showNode(); setSmallActive(1)
        }}>节点{SmallActive === 1 && <img src={activeBg} alt="" />}</div>
        <div className={SmallActive === 2 ? "MenuItem flexCenter activeMenuItem" : "MenuItem flexCenter"} onClick={() => {
          navigate("/BlindBox");
          setSmallActive(2)
        }}>{t("BlindBox")}{SmallActive === 2 && <img src={activeBg} alt="" />}</div>
        <div className={SmallActive === 3 ? "MenuItem flexCenter activeMenuItem" : "MenuItem flexCenter"} onClick={() => {
          showNftOther(); setSmallActive(3)
        }}>NFT{SmallActive === 3 && <img src={activeBg} alt="" />}</div>
        <div className={SmallActive === 4 ? "MenuItem flexCenter activeMenuItem" : "MenuItem flexCenter"} onClick={() => {
          showSBLOther(); setSmallActive(4)
        }}>MBAS{SmallActive === 4 && <img src={activeBg} alt="" />}</div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={() => { showOther(); setSmallActive(5) }}>
          <div className="other flexCenter">
            ···
          </div>
        </div >
      </div > */}
      <div className="FootMenu">
        <div className={SmallActive === 1 ? "MenuItem activeMenuItem" : "MenuItem"} onClick={() => {
          showNode(); setSmallActive(1)
        }}>
          {SmallActive === 1 ? <img src={footerAIcon1} alt="" /> : <img src={footerIcon1} alt="" />}
          {t("Nodes")}

        </div>
        <div className={SmallActive === 2 ? "MenuItem activeMenuItem" : "MenuItem"} onClick={() => {
          navigate("/BlindBox");
          setShowSubMenu(false)
          setSmallActive(2)
        }}>
          {SmallActive === 2 ? <img src={footerAIcon2} alt="" /> : <img src={footerIcon2} alt="" />}
          {t("BlindBox")}

        </div>
        <div className={SmallActive === 3 ? "MenuItem activeMenuItem" : "MenuItem"} onClick={() => {
          showNftOther(); setSmallActive(3)
        }}>
          {SmallActive === 3 ? <img src={footerAIcon3} alt="" /> : <img src={footerIcon3} alt="" />}
          NFT

        </div>

        <div className={SmallActive === 4 ? "MenuItem activeMenuItem" : "MenuItem"} onClick={() => {
          showSBLOther(); setSmallActive(4)
        }}>
          {SmallActive === 4 ? <img src={footerAIcon4} alt="" /> : <img src={footerIcon4} alt="" />}
          MBAS

        </div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={() => { showOther(); setSmallActive(5) }}>
          <div className={SmallActive === 5 ? "other activeOther flexCenter" : "other flexCenter"} >
            ···
          </div>
        </div >
      </div >

      {showDropMenu && <div className="Mask" onClick={() => { setShowDropMenu(null); }}></div>}
      {
        refereeUserAddress && refereeUserAddress.toLowerCase() !== (web3React.account)?.toLowerCase() && <Modal
          visible={showRefereeAddress}
          className='refereeAddressModal'
          centered
          width={'450px'}
          closable={false}
          footer={null}
          onCancel={() => { setShowRefereeAddress(false) }}>
          <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowRefereeAddress(false)} />
          <div className="refereeAddress">
            <div className="title">{t("Your referral address")}</div>
            <div className="tip">{refereeUserAddress}</div>
            <div className="btnBox">
              <div className="confirmBtn flexCenter" onClick={() => { BindFun() }}>{t("Confirm")}</div>
              <div className="cancelBtn flexCenter" onClick={() => setShowRefereeAddress(false)}>{t("Cancel")}</div>
            </div>
          </div>
        </Modal>
      }
    </Layout >
  );
};
export default MainLayout;
