import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
// import { useConnectWallet, injected, ChainId } from "../web3";
import { AddrHandle, addMessage, GetQueryString, showLoding } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserInfo, signBindReferee } from '../API/index'
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
import MBASIcon0 from "../assets/image/MBASIcon0.png";
import MBASIcon1 from "../assets/image/MBASIcon1.png";
import MBASIcon2 from "../assets/image/MBASIcon2.png";
import NFTIcon0 from "../assets/image/NFTIcon0.png";
import NFTIcon1 from "../assets/image/NFTIcon1.png";
import NFTIcon2 from "../assets/image/NFTIcon2.png";
import NFTIcon3 from "../assets/image/NFTIcon3.png";
import NFTIcon4 from "../assets/image/NFTIcon4.png";
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
  Fun: () => void
}
let refereeUserAddress = GetQueryString("address") || ''
const MainLayout: React.FC = () => {

  let state = useSelector<stateType, stateType>(state => state);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [showSubMenu, setShowSubMenu] = useState(false);
  let [showRefereeAddress, setShowRefereeAddress] = useState(false);
  let [showDropMenu, setShowDropMenu] = useState<any>();
  let [SmallActive, setSmallActive] = useState<any>(0);
  let [UserInfo, setUserInfo] = useState<any>();
  let [subMenuList, setSubMenuList] = useState<SubMenuItemType[]>([]);
  const { connectWallet } = useConnectWallet()
  // 底部更多菜单
  const moreSubMenuList = [

    {
      name: t("Invitation"),
      Fun: () => {
        navigate("/Invitation");
      }
    },
    {
      name: "遊戲競技",
      Fun: () => {
        // navigate("/Invitation");
      }
    },
    {
      name: "競猜娛樂",
      Fun: () => {
        // navigate("/Invitation");
      }
    },
  ]
  // 底部节点菜单
  const NodeSubMenuList = [
    {
      name: "节点申请",
      Fun: () => {
        navigateFun("/NodeApply");
      }
    },
    {
      name: "创世节点",
      Fun: () => {
        navigateFun("/CreateNode");
      }
    },
    {
      name: "节点基金",
      Fun: () => {
        navigateFun("/NodeFund");
      }
    },
  ]
  // 底部NFT菜单
  const NFTSubMenuList = [
    {
      name: t("stock2"),
      Fun: () => {
        navigate("/NFT");
      }
    },
    {
      name: t('Land'),
      Fun: () => {
        navigate("/Land");
      }
    },
    {
      name: t("Pledge"),
      Fun: () => {
        navigate("/Pledge");
      }
    },
    {
      name: "交易中心",
      Fun: () => {
        navigate("/Swap");
      }
    },
    {
      name: "合成",
      Fun: () => {
        navigate("/Synthesis");
      }
    },
  ]
  // 底部SBL菜单
  const SBLSubMenuList = [
    {
      name: t("Liquidity"),
      Fun: () => {
        navigate("/Liquidity");
      }
    },
    {
      name: t('Burn fund'),
      Fun: () => {
        navigate("/DestructFund");
      }
    },
    {
      name: t('Coinage'),
      Fun: () => {
        navigate("/Node");
      }
    },
    {
      name: "SWAP",
      Fun: () => {
        window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
        // window.open("https://pancake.kiemtienonline360.com/#/swap")
      }
    },
    // {
    //   name: t('MBA Convert'),
    //   Fun: () => {
    //     navigate("/MBASwap");
    //   }
    // },
  ]
  console.log(web3React);
  function changeLanguage(lang: any) {
    window.localStorage.setItem("lang", lang.key);
    i18n.changeLanguage(lang.key);
  }
  function noOpen() {
    addMessage(t("Not opened yet"));
  }
  function invitation() {
    copy("spaceballok@gmail.com");
    addMessage(t("Copy Success"));
  }
  function goNft(path: any) {
    console.log(path);
    if (path.key === "/NFT" || path.key === "/Land" || path.key === "/Pledge") {
      navigate(path.key);
    } else {
      addMessage(t("Not opened yet"));
    }
  }
  // SBL治理
  function goSBL(path: any) {
    if (path.key === '/Node' || path.key === '/Liquidity' || path.key === '/MBASwap' || path.key === '/DestructFund') {
      navigate(path.key);
    } else {
      addMessage(t("Not opened yet"));
    }
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
          label: <span className="LangItem">繁體</span>,
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
  function showOther() {
    setSubMenuList(moreSubMenuList)
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
      { icon: MBASGovernanceIcon0, title: "流動性", subtitle: '添加流动性激活土地', path: '/Liquidity' },
      { icon: MBASGovernanceIcon1, title: "鑄幣節點", subtitle: '根据MBAS销毁量获生态铸币权', path: '/Node' },
      { icon: MBASGovernanceIcon2, title: "捐贈銷毀", subtitle: '销毁MBAS获得两倍BNB奖励', path: "/DestructFund" },
      { icon: MBASGovernanceIcon3, title: "农场", subtitle: '质押LP获得生态激励', path: "/farms" },
      { icon: MBASIcon2, title: "Swap", subtitle: '通过Pancake买卖MBAS', path: '/outLink' },
    ],
    "/MBAS": [
      { icon: MBASIcon0, title: "节点申请", subtitle: '报名参与节点竞选', path: '/NodeApply' },
      { icon: MBASIcon1, title: "创世节点", subtitle: '创世节点福利专区', path: '/CreateNode' },
      { icon: MBASIcon2, title: "节点基金", subtitle: '节点基金收益领取', path: '/NodeFund' },
    ],
    "/NFT": [
      { icon: NFTIcon0, title: "精灵", subtitle: '精灵查看個人精靈精灵', path: '/NFT' },
      { icon: NFTIcon1, title: "土地", subtitle: '獲取土地分紅和服務獎', path: '/Land' },
      { icon: NFTIcon2, title: "交易中心", subtitle: '自由買賣精灵土地', path: '/Swap' },
      { icon: NFTIcon3, title: "質押", subtitle: '精灵質押獲得MBAS獎勵', path: '/Pledge' },
      { icon: NFTIcon4, title: "合成", subtitle: '精灵合成解鎖更高權益', path: '/Synthesis' },
    ],
    "/Ecology": [
      { icon: EcologyIcon0, title: "遊戲競技", subtitle: '基於MetaBase公鏈協議的區塊鏈遊戲', path: '' },
      { icon: EcologyIcon1, title: "競猜娛樂", subtitle: '通過使用MBAS和NFT參與競猜', path: '' },
    ],
    "/...": [
      { icon: MBASIcon0, title: "邀請", subtitle: '-', path: '/Invitation' },
      // { icon: MBASIcon1, title: "SWAP", subtitle: '-', path: '/outLink' },
    ]
  }
  // 导航
  const navigateFun = (path: string) => {
    if (path === "/outLink") {
      return window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
    }
    if (path === "/CreateNode") {
      if (UserInfo?.nodeLevel > 0 && UserInfo?.endTime < Date.now()) {
        navigate(path)
        setShowDropMenu(null)
      } else {
        addMessage("您没有权限！")
      }
    } else {
      navigate(path)
      setShowDropMenu(null)
    }
  }

  useEffect(() => {
    if (state.token) {
      getUserInfo().then(res => {
        console.log(res.data, "我的信息")
        setUserInfo(res.data)
        if (res.data.isBind == 0) {
          setShowRefereeAddress(true)
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
          addMessage("绑定成功!")
          showLoding(false)
          setShowRefereeAddress(false)
        } else if (res.code === 500) {
          showLoding(false)
          addMessage(res.msg)
        }
      })
    }).catch((res: any) => {
      if (res.code === 4001) {
        addMessage("绑定失败!")
        showLoding(false)

      }
    })
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

          {/* 小屏 */}
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
              节点
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
              MBAS Governance
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
              节点
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
              MBAS Governance
            </div>
            <div
              className={menuActive("/NFT")}
              onClick={() => {
                setShowDropMenu("/NFT");
              }}
            >
              NFT
            </div>
            {/* <div
              className='MenuItem pointer'
              onClick={() => {
                window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
              }}
            >
              SWAP
            </div> */}

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
            <Dropdown
              overlay={menu}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className="Lang">
                <img style={{ width: "24px" }} src={Lang} alt="" />
                {i18n.language === "zh" ? "繁" : "EN"}
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
          <div className="Mobile">
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
            {dropMenuList[showDropMenu].map((item: any, index: any) =>
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
                  // href={
                  //   i18n.language === "zh"
                  //     ? "http://spaceballgames.com/File/SpaceBallZh.pdf"
                  //     : "http://spaceballgames.com/File/SpaceBallEn.pdf"
                  // }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Doc} alt="" />
                  <span>Doc</span>
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
              subMenuList.map((item, index) => <div key={index} className="SubMenuItem" onClick={item.Fun}>{item.name}</div>)
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
          节点

        </div>
        <div className={SmallActive === 2 ? "MenuItem activeMenuItem" : "MenuItem"} onClick={() => {
          navigate("/BlindBox");
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
      {refereeUserAddress && refereeUserAddress.toLowerCase() !== (web3React.account)?.toLowerCase() && <Modal
        visible={showRefereeAddress}
        className='refereeAddressModal'
        centered
        width={'450px'}
        closable={false}
        footer={null}
        onCancel={() => { setShowRefereeAddress(false) }}>
        <img src={closeIcon} className="closeIcon" alt="" onClick={() => setShowRefereeAddress(false)} />
        <div className="refereeAddress">
          <div className="title">您的推荐地址</div>
          <div className="tip">{refereeUserAddress}</div>
          <div className="btnBox">
            <div className="confirmBtn flexCenter" onClick={() => { BindFun() }}>确认绑定</div>
            <div className="cancelBtn flexCenter" onClick={() => setShowRefereeAddress(false)}>取消</div>
          </div>
        </div>
      </Modal>}
    </Layout >
  );
};
export default MainLayout;
