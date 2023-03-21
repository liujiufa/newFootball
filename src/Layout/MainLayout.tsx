import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { useConnectWallet, injected, ChainId } from "../web3";
import { AddrHandle, addMessage } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { stateType } from '../store/reducer'
import { getUserInfo } from '../API/index'
import copy from "copy-to-clipboard";
import logo from "../assets/image/logo.png";
import Doc from "../assets/image/Doc.svg";
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
import "../assets/style/layout.scss";
import { Menu, Dropdown } from "antd";
const { Header, Content, Footer } = Layout;
interface SubMenuItemType {
  name: string,
  Fun: () => void
}
const MainLayout: React.FC = () => {
  let state = useSelector<stateType, stateType>(state => state);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [showSubMenu, setShowSubMenu] = useState(false);
  let [showDropMenu, setShowDropMenu] = useState<any>();
  let [UserInfo, setUserInfo] = useState<any>();
  let [subMenuList, setSubMenuList] = useState<SubMenuItemType[]>([]);
  let Connect = useConnectWallet();
  // 底部更多菜单
  const moreSubMenuList = [
    {
      name: t("Swap"),
      Fun: () => {
        navigate("/Swap");
      }
    },
    {
      name: "SWAP",
      Fun: () => {
        window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
        // window.open("https://pancake.kiemtienonline360.com/#/swap")
      }
    },
    {
      name: t("Guess"),
      Fun: noOpen
    },
    {
      name: t("Games"),
      Fun: noOpen
    },
    {
      name: t('Farms'),
      Fun: () => {
        navigate("/Farms");
      }
    },
    {
      name: t("Invitation"),
      Fun: () => {
        navigate("/Invitation");
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
    // {
    //   name: t('MBA Convert'),
    //   Fun: () => {
    //     navigate("/MBASwap");
    //   }
    // },
  ]
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
  const NftMenu = (
    <Menu
      onClick={goNft}
      items={[
        {
          label: <div className="DropItem">{t("stock2")}</div>,
          key: "/NFT",
        },
        {
          type: "divider",
        },
        {
          label: <div className="DropItem">{t('Land')}</div>,
          key: "/Land",
        },
        {
          type: "divider",
        },
        {
          label: <div className="DropItem">{t("Pledge")}</div>,
          key: "/Pledge",
        },
      ]}
    />
  );
  const ecologyMenu = (
    <Menu
      // onClick={goNft}
      items={[
        {
          label: <div className="DropItem">{t("Guess")}</div>,
          key: "/NFT",
        },
        {
          type: "divider",
        },
        {
          label: <div className="DropItem">{t("Games")}</div>,
          key: "/Land",
        },
      ]}
    />
  );

  // SBL下拉菜单
  const SBLMenu = (
    <Menu
      className="SBLMenu"
      onClick={goSBL}
      items={[
        {
          label: <div className="DropItem">{t("Liquidity")}</div>,
          key: "/Liquidity",
        },
        {
          type: "divider",
        },
        {
          label: <div className="DropItem">{t('Burn fund')}</div>,
          key: "/DestructFund",
        },
        {
          type: "divider",
        },
        {
          label: <div className="DropItem">{t('Coinage')}</div>,
          key: "/Node",
        },
        // {
        //   type: "divider",
        // },
        // {
        //   label: <div className="DropItem">{t('MBA Convert')}</div>,
        //   key: "/MBASwap",
        // },
      ]}
    />
  );
  // 更多
  const SecondaryOther = (
    <Menu>
      {/* <Menu.Item key="6" onClick={noOpen}>
        {t("Guess")}
      </Menu.Item>
      <Menu.Item key="7" onClick={noOpen}>
        {t("Games")}
      </Menu.Item> */}
      <Menu.Item
        key="4"
        onClick={() => {
          navigate("/Swap");
        }}
      >
        {t("Swap")}
      </Menu.Item>
      <Menu.Item
        key="7"
        onClick={() => {
          window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
        }}
      >
        SWAP
      </Menu.Item>
      <Menu.Item
        key="6"
        onClick={() => {
          navigate("/farms");
        }}
      >
        {t('Farms')}
      </Menu.Item>
      <Menu.Item
        key="5"
        onClick={() => {
          navigate("/Invitation");
        }}
      >
        {t("Invitation")}
      </Menu.Item>
    </Menu>
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
    ],
    "/MBAS": [
      { icon: MBASIcon0, title: "节点申请", subtitle: '报名参与节点竞选', path: '/NodeApply' },
      { icon: MBASIcon1, title: "创世节点", subtitle: '创世节点福利专区', path: '/CreateNode' },
      { icon: MBASIcon2, title: "节点基金", subtitle: '节点基金收益领取', path: '/NodeFund' },
    ],
    "/NFT": [
      { icon: NFTIcon0, title: "徽章", subtitle: '徽章查看個人精靈徽章', path: '/NFT' },
      { icon: NFTIcon1, title: "土地", subtitle: '獲取土地分紅和服務獎', path: '/Land' },
      { icon: NFTIcon2, title: "交易中心", subtitle: '自由買賣徽章土地', path: '/Swap' },
      { icon: NFTIcon3, title: "質押", subtitle: '徽章質押獲得MBAS獎勵', path: '/Pledge' },
      { icon: NFTIcon4, title: "合成", subtitle: '徽章合成解鎖更高權益', path: '/Synthesis' },
    ],
    "/Ecology": [
      { icon: MBASIcon0, title: "競猜娛樂", subtitle: '-', path: '/NFT' },
      { icon: MBASIcon1, title: "遊戲競技", subtitle: '-', path: '/Land' },
    ]
  }
  // 导航
  const navigateFun = (path: string) => {
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
      })
    }
  }, [state.token])

  // const AutoItem = () => {
  //   while (dropMenuList[showDropMenu].length % 3 === 0) {
  //     <div className="autoItem">
  //     </div>
  //   }
  // }

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

            <Dropdown
              overlay={SBLMenu}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className={menuActive("/SBL")}>{t("SBL Governance")}</div>
            </Dropdown>

            <Dropdown
              overlay={NftMenu}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className={menuActive("/NFT")}>NFT</div>
            </Dropdown>

            <Dropdown
              overlay={SecondaryOther}
              placement="bottom"
              overlayClassName="LangDropDown"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div className={menuActive("")}>...</div>
            </Dropdown>

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
            <div
              className='MenuItem pointer'
              onClick={() => {
                window.open("https://pancakeswap.finance/swap?outputCurrency=0xA013e36C78BA39Ff6bE4781f0f2FBF935f6BA05A")
              }}
            >
              SWAP
            </div>

            {/* <div
              className={menuActive("/Ecology")}
              onClick={() => {
                setShowDropMenu("/Ecology");
              }}
            >
              {t('Ecology')}
            </div> */}
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
            {web3React.active ? (
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
                    Connect(injected, ChainId.BSC);
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
            //   arrow={{ pointAtCenter: true }}
            >
              <img style={{ width: "24px" }} src={Lang} alt="" />
            </Dropdown>
            {web3React.active ? (
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
                    Connect(injected, ChainId.BSC);
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
      <Footer>
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
            </div> */}
          </div>
        </div>
      </Footer>
      {
        showSubMenu && <div className="subMenuMold" onClick={() => { setShowSubMenu(false) }}>
          <div className="subMenu">
            {
              subMenuList.map((item, index) => <div key={index} className="SubMenuItem" onClick={item.Fun}>{item.name}</div>)
            }
          </div>
        </div>
      }
      <div className="FootMenu">
        <div className="MenuItem flexCenter" onClick={showNode}>节点</div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={() => {
          navigate("/BlindBox");
        }}>{t("BlindBox")}</div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={showNftOther}>NFT</div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={showSBLOther}>SBL</div>
        <div className="division"></div>
        <div className="MenuItem flexCenter" onClick={showOther}>
          <div className="other flexCenter">
            ···
          </div>
        </div>
      </div>
      {showDropMenu && <div className="Mask" onClick={() => { setShowDropMenu(null) }}></div>}
    </Layout >
  );
};
export default MainLayout;
